// src/app/(admin)/dashboard/chat/page.tsx (Server Component)

import AdminChatPageClient from "./_clientPage"; // Import the renamed client component

export default function ChatPageWrapper() {
  // Access environment variables on the server (where process.env is defined)
  const pusherAppKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
  const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER; // CORRECTED: Now accesses with NEXT_PUBLIC_

  // NEW: Add these console.log statements for debugging
  console.log('DEBUG: NEXT_PUBLIC_PUSHER_APP_KEY from server:', pusherAppKey);
  console.log('DEBUG: NEXT_PUBLIC_PUSHER_APP_CLUSTER from server:', pusherCluster);
  // END NEW DEBUG LINES

  // Basic validation for env vars
  if (!pusherAppKey || !pusherCluster) {
    // Handle missing env vars gracefully, e.g., display an error message
    console.error("Pusher environment variables are not set correctly for client-side use.");
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p className="text-red-500">Configuration Error: Pusher keys are missing or incorrectly set. Please check your .env file.</p>
    </div>;
  }

  return (
    <AdminChatPageClient pusherKeys={{ key: pusherAppKey, cluster: pusherCluster }} />
  );
}