// src/components/AdminHeader.tsx
"use client"

import { useState, useEffect, useRef } from 'react';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  UserCircleIcon, 
  PowerIcon, 
  XMarkIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';

interface NotificationData {
  id: string;
  type: 'message' | 'order';
  content: string;
  timestamp: string;
  read: boolean;
}

// Initialize Pusher Client with error handling
let pusherClient: any = null;
try {
  if (typeof window !== 'undefined' && 
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY && 
      process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER) {
    const PusherClient = require('pusher-js');
    pusherClient = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        authEndpoint: '/api/pusher/auth',
        auth: {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      }
    );
  }
} catch (error) {
  console.warn('Pusher initialization failed:', error);
}

export default function AdminHeader() {
  const { data: session, status } = useSession();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState<NotificationData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationError, setNotificationError] = useState<string | null>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);

  // Function to fetch notifications with better error handling
  const fetchNotifications = async () => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      try {
        setNotificationError(null);
        const response = await fetch("/api/notifications", { 
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setNotificationCount(data.totalNotifications || 0);
        setRecentNotifications(data.recentNotifications || []);
      } catch (err: any) {
        console.warn("Notifications temporarily unavailable:", err?.message || err);
        setNotificationError(err.message || "Failed to fetch notifications");
        setNotificationCount(0);
        setRecentNotifications([]);
      }
    }
  };

  // Mark all notifications as read
  const markNotificationsAsRead = async () => {
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      try {
        await fetch("/api/notifications", { method: "PATCH" });
        setNotificationCount(0);
      } catch (err) {
        console.error("Failed to mark notifications as read:", err);
      }
    }
  };

  // Effect to fetch notifications on mount and session change
  useEffect(() => {
    fetchNotifications();

    // Pusher Real-time for Notifications (only if Pusher is available)
    let adminChannel: any;
    if (pusherClient && status === "authenticated" && session?.user?.role === "ADMIN" && session.user.id) {
      try {
        const channelName = `private-admin-${session.user.id}`;
        adminChannel = pusherClient.subscribe(channelName);

        adminChannel.bind('admin-notification', function(data: NotificationData) {
          console.log('New real-time notification received:', data);
          fetchNotifications();
        });

        pusherClient.connection.bind('error', function(err: any) {
          if (err.error.data.code === 4005) {
            console.warn("Pusher admin channel authentication failed. Check /api/pusher/auth route. Error:", err);
          }
        });
      } catch (pusherError) {
        console.warn('Pusher subscription failed:', pusherError);
      }
    }

    return () => {
      if (adminChannel && pusherClient) {
        try {
          adminChannel.unbind('admin-notification');
          pusherClient.unsubscribe(adminChannel.name);
        } catch (error) {
          console.warn('Error cleaning up Pusher subscription:', error);
        }
      }
    };
  }, [session, status]);

  // When opening the dropdown, mark notifications as read
  useEffect(() => {
    if (notificationsDropdownOpen && notificationCount > 0) {
      markNotificationsAsRead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationsDropdownOpen]);

  // Click outside dropdown to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target as Node)) {
        setNotificationsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Search and Title */}
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 w-64"
            />
          </div>
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <div className="relative z-50" ref={notificationsDropdownRef}>
            <button
              onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}
              className="relative p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200 group"
            >
              <BellIcon className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-700/50">
                  <h3 className="text-sm font-semibold text-white">Notifications ({notificationCount})</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notificationError ? (
                    <div className="px-4 py-6 text-center">
                      <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-red-400 mb-2">Error loading notifications</p>
                      <p className="text-xs text-slate-400">{notificationError}</p>
                      <button 
                        onClick={fetchNotifications}
                        className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Try again
                      </button>
                    </div>
                  ) : recentNotifications.length === 0 ? (
                    <div className="px-4 py-6 text-center">
                      <BellIcon className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">No new notifications</p>
                    </div>
                  ) : (
                    recentNotifications.map(notification => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-slate-700/50 transition-colors">
                        <p className="text-sm text-white">{notification.content}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                {notificationCount > recentNotifications.length && !notificationError && (
                  <div className="px-4 py-2 border-t border-slate-700/50">
                    <button className="w-full text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">
                  {session?.user?.name || session?.user?.email || "Admin"}
                </p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
            </button>

            {/* User Dropdown */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-700/50">
                  <p className="text-sm text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-white truncate">
                    {session?.user?.email}
                  </p>
                </div>
                
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors">
                    <Cog6ToothIcon className="h-4 w-4 mr-3" />
                    Settings
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors">
                    <UserCircleIcon className="h-4 w-4 mr-3" />
                    Profile
                  </button>
                </div>
                
                <div className="border-t border-slate-700/50 pt-1">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}