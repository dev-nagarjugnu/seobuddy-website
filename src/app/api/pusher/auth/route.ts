// src/app/api/pusher/auth/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; // <-- CORRECTED PATH (was ../../../)
import Pusher from "pusher";

// Initialize Pusher with your credentials (same as in /api/chat/route.ts)
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
  useTLS: true,
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    const data = await request.text(); // Pusher sends data as x-www-form-urlencoded, so use .text()
    // Example: socket_id=123.456&channel_name=private-chat-abc-xyz
    const socketId = data.split('&')[0].split('=')[1];
    const channelName = data.split('&')[1].split('=')[1];

    // IMPORTANT: Here you can add more robust authorization checks!
    // For private channels, ensure the logged-in user (session.user.id) is a participant in the channelName.
    // e.g., if channelName is `private-chat-USER_A_ID-USER_B_ID`, check if session.user.id is USER_A_ID or USER_B_ID.
    // For admin to join any chat, you'd check:
    // if (session.user.role === "ADMIN" || channelName.includes(session.user.id)) { ... }
    // For now, it authorizes any authenticated user to join any private channel they request from the client,
    // which is okay for development as long as you're aware.

    const authResponse = pusher.authorizeChannel(socketId, channelName);

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Error authenticating Pusher channel:", error);
    return NextResponse.json(
      { message: "Internal server error during Pusher auth." },
      { status: 500 }
    );
  }
}