// src/app/(admin)/dashboard/chat/_clientPage.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import PusherClient from "pusher-js" // Import PusherClient here

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  role: 'USER' | 'ADMIN';
}

interface MessageData {
  id: string;
  senderId: string;
  recipientId: string | null;
  content: string;
  timestamp: string;
  read: boolean;
  sender: { id: string; name: string | null; email: string | null } | null;
  recipient: { id: string; name: string | null; email: string | null } | null;
}

// NEW: AdminChatPage now accepts pusherKeys as props
export default function AdminChatPage({ pusherKeys }: { pusherKeys: { key: string; cluster: string; } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State for PusherClient instance
  const [pusherInstance, setPusherInstance] = useState<PusherClient | null>(null);

  const [allUsers, setAllUsers] = useState<UserData[]>([])
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null)
  const [messages, setMessages] = useState<MessageData[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // --- NEW: Initialize PusherClient inside useEffect ---
  useEffect(() => {
    // Initialize only once and if keys are provided
    if (!pusherInstance && pusherKeys.key && pusherKeys.cluster) {
      try {
        const client = new PusherClient(
          pusherKeys.key, // Use key from props
          {
            cluster: pusherKeys.cluster, // Use cluster from props
            authEndpoint: '/api/pusher/auth',
            auth: {
              headers: {
                'X-Requested-With': 'XMLHttpRequest'
              }
            }
          }
        );
        setPusherInstance(client);

        // Optional: Basic Pusher connection logging for debugging
        client.connection.bind('connected', () => console.log('Pusher client connected!'));
        client.connection.bind('disconnected', () => console.log('Pusher client disconnected!'));

        // Bind global error handler for Pusher client
        client.connection.bind('error', function(err: any) {
          if (err.error.data.code === 4004) {
            console.error("Pusher connection error: App key not found.", err);
            setError("Real-time chat error: App key not found or invalid.");
          } else if (err.error.data.code === 4009) {
            console.error("Pusher connection error: Cluster not found.", err);
            setError("Real-time chat error: Cluster not found or invalid.");
          } else if (err.error.data.code === 4005) {
            console.warn("Pusher authentication failed during connection:", err);
            setError("Real-time chat error: Authentication failed. Check /api/pusher/auth route.");
          } else {
            console.error("Pusher general error:", err);
            setError("Real-time chat error: Check console for details.");
          }
        });

      } catch (initError) {
        console.error("Error initializing PusherClient:", initError);
        setError("Failed to initialize chat client. Check console.");
      }
    }
    // Cleanup: Disconnect Pusher when component unmounts
    return () => {
      if (pusherInstance && pusherInstance.connection.state === 'connected') {
        pusherInstance.disconnect();
        console.log('Pusher client disconnected on component unmount.');
      }
    };
  }, [pusherInstance, pusherKeys.key, pusherKeys.cluster]); // Only run once when pusherInstance is null initially, and if keys change

  // --- Protection & Redirect Logic ---
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session, router]);

  // --- Fetch All Users for Chat List ---
  useEffect(() => {
    const fetchUsers = async () => {
      if (status === "authenticated" && session?.user?.role === "ADMIN") {
        setLoadingUsers(true);
        setError(null);
        try {
          const response = await fetch("/api/users", { method: "GET" });
          const data = await response.json();

          if (response.ok) {
            const chatUsers = data.users.filter((user: UserData) => user.id !== session.user.id);
            setAllUsers(chatUsers);
          } else {
            setError(data.message || "Failed to fetch users for chat.");
          }
        } catch (err) {
          setError("Network error fetching users for chat.");
          console.error("Error fetching chat users:", err);
        } finally {
          setLoadingUsers(false);
        }
      }
    };
    fetchUsers();
  }, [session, status]);


  // --- Fetch Messages for Selected User & Pusher Real-time ---
  useEffect(() => {
    let channel: any;

    // Only proceed if pusherInstance is available, and user is selected/authenticated
    if (!pusherInstance || !selectedUser || status !== "authenticated" || session?.user?.role !== "ADMIN") {
      setMessages([]);
      return;
    }

    const fetchMessagesAndSubscribe = async () => {
      setLoadingMessages(true);
      setError(null);

      try {
        // Fetch historical messages
        const response = await fetch(`/api/chat?otherUserId=${selectedUser.id}`, { method: "GET" });
        const data = await response.json();

        if (response.ok) {
          setMessages(data.messages);
        } else {
          setError(data.message || "Failed to fetch messages.");
        }
      } catch (err) {
        setError("Network error fetching messages.");
        console.error("Error fetching messages:", err);
      } finally {
        setLoadingMessages(false);
      }

      // --- Pusher Real-time Integration ---
      const currentAdminId = session.user?.id;
      const targetUserId = selectedUser.id;
      const channelName = `private-chat-${[currentAdminId, targetUserId].sort().join('-')}`;

      try {
        // Subscribe to the private channel
        channel = pusherInstance.subscribe(channelName); // Use the instance from state

        // Bind to 'new-message' event on this channel
        channel.bind('new-message', function(data: { message: MessageData }) {
          setMessages((prevMessages) => {
            if (!prevMessages.some(msg => msg.id === data.message.id)) {
              return [...prevMessages, data.message];
            }
            return prevMessages;
          });
        });

      } catch (pusherError) {
        console.error("Pusher subscription error:", pusherError);
        setError("Could not connect to real-time chat. Check console.");
      }

      // Cleanup function for when component unmounts or selectedUser changes
      return () => {
        if (channel) {
          channel.unbind('new-message');
          pusherInstance.unsubscribe(channelName);
        }
      };
    };

    fetchMessagesAndSubscribe();
  }, [selectedUser, session, status, pusherInstance]); // Added pusherInstance to dependencies


  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  // --- Handle Sending Message ---
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedUser || !session?.user?.id) return;

    const tempId = `temp-${Date.now()}`;
    const newMessage: MessageData = {
      id: tempId,
      senderId: session.user.id,
      recipientId: selectedUser.id,
      content: messageInput.trim(),
      timestamp: new Date().toISOString(),
      read: false,
      sender: {
        id: session.user.id,
        name: session.user.name ?? null, // Ensure string | null
        email: session.user.email ?? null // Ensure string | null
      },
      recipient: {
        id: selectedUser.id,
        name: selectedUser.name ?? null, // Ensure string | null
        email: selectedUser.email ?? null // Ensure string | null
      }
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientId: selectedUser.id, content: newMessage.content }),
      });

      if (!response.ok) {
        setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== tempId));
        setError("Failed to send message: Server error.");
      }

    } catch (err) {
      setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== tempId));
      setError("Network error sending message.");
      console.error("Error sending message:", err);
    }
  };


  // Display loading/redirect states for the page
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading session...</div>;
  }
  if (status === "unauthenticated") {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Redirecting to sign-in...</div>;
  }
  if (session?.user?.role !== "ADMIN") {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Access Denied. Redirecting to home...</div>;
  }

  // --- Main Admin Chat Layout ---
  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-950 rounded-lg shadow-lg overflow-hidden">
      {/* Left Sidebar: User List */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Clients Chat</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loadingUsers ? (
            <p className="p-4 text-gray-400">Loading clients...</p>
          ) : allUsers.length === 0 ? (
            <p className="p-4 text-gray-400">No clients to chat with.</p>
          ) : (
            allUsers.map(user => (
              <div
                key={user.id}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-700 transition-colors
                  ${selectedUser?.id === user.id ? 'bg-blue-700' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  {user.name ? user.name[0].toUpperCase() : user.email?.[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-white">{user.name || user.email}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Section: Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-900">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                {selectedUser.name ? selectedUser.name[0].toUpperCase() : selectedUser.email?.[0].toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-white">{selectedUser.name || selectedUser.email}</h3>
            </div>

            {/* Messages Display Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loadingMessages ? (
                <p className="text-gray-400 text-center">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-gray-400 text-center">No messages yet. Start the conversation!</p>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === session.user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs p-3 rounded-lg ${
                      msg.senderId === session.user?.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs mt-1 text-right text-gray-300">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-gray-800 border-t border-gray-700 flex">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="ml-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-xl">
            Select a client to start chatting.
          </div>
        )}
      </div>
    </div>
  )
}