// src/app/api/chat/route.ts

// --- IMPORTS ---
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // Corrected import path
import Pusher from "pusher";

// --- PRISMA CLIENT INITIALIZATION ---
const prisma = new PrismaClient();

// --- PUSHER INITIALIZATION ---
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
  useTLS: true,
});

// --- POST REQUEST HANDLER (Sending Messages) ---
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    const { recipientId, content } = await request.json();

    // Basic validation
    if (!content) {
      return NextResponse.json({ message: "Message content cannot be empty." }, { status: 400 });
    }

    // Save message to database
    const newMessage = await prisma.message.create({
      data: {
        senderId: session.user.id,
        recipientId: recipientId || null,
        content: content,
        read: false,
      },
      include: { // Include sender/recipient info for the Pusher payload
        sender: { select: { id: true, name: true, email: true, role: true } }, // Added role for notification context
        recipient: { select: { id: true, name: true, email: true, role: true } }, // Added role for notification context
      },
    });

    // Trigger Pusher event for real-time delivery to chat participants
    const channelName = `private-chat-${[newMessage.senderId, newMessage.recipientId].sort().join('-')}`;
    await pusher.trigger(channelName, 'new-message', {
      message: newMessage,
    });

    // NEW: Trigger notification to Admin if the message is from a user to an admin
    // This checks if the recipient exists, has a role, and that role is ADMIN
    if (newMessage.recipient?.role === "ADMIN" && newMessage.recipientId) {
        await pusher.trigger(
            `private-admin-${newMessage.recipientId}`, // Admin's specific notification channel
            'admin-notification',
            {
                id: newMessage.id,
                type: 'message',
                content: `New message from ${newMessage.sender?.name || newMessage.sender?.email}: ${newMessage.content.substring(0, 30)}${newMessage.content.length > 30 ? '...' : ''}`, // Truncate content for notification
                timestamp: newMessage.timestamp,
                read: newMessage.read,
                senderId: newMessage.senderId, // Include sender ID for potential linking
            }
        );
    }

    return NextResponse.json({ message: "Message sent successfully!", newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// --- GET REQUEST HANDLER (Fetching Message History) ---
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const otherUserId = searchParams.get('otherUserId');

    let messages;

    // If 'otherUserId' is provided, fetch direct messages between current user and otherUserId
    if (otherUserId) {
      messages = await prisma.message.findMany({
        where: {
          OR: [
            {
              senderId: session.user.id,
              recipientId: otherUserId,
            },
            {
              senderId: otherUserId,
              recipientId: session.user.id,
            },
          ],
        },
        orderBy: {
          timestamp: "asc",
        },
        include: {
          sender: { select: { id: true, name: true, email: true } },
          recipient: { select: { id: true, name: true, email: true } },
        },
      });
    } else if (session.user.role === "ADMIN") {
        // Admin can request recent conversations or prompt for a user.
        return NextResponse.json(
            { message: "Admin: Please provide 'otherUserId' query parameter to view specific chat history." },
            { status: 400 }
        );
    } else {
        // Regular user cannot request history without a chat partner
        return NextResponse.json(
            { message: "User: Invalid request for chat history. Please specify a chat partner." },
            { status: 400 }
        );
    }

    return NextResponse.json({ messages: messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}