// src/components/UserSidebar.tsx
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, ShoppingCartIcon, Cog8ToothIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
// Removed PowerIcon and signOut import as they are no longer used here
// import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from 'next-auth/react';

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center mb-10">
          <span className="text-2xl font-bold text-blue-400">SEOBuddy User</span>
        </div>

        <nav className="space-y-2">
          {/* Dashboard Overview Link */}
          <Link href="/user-dashboard" className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
            ${pathname === '/user-dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}>
            <HomeIcon className="h-6 w-6" />
            <span>Overview</span>
          </Link>

          {/* Your Orders Link */}
          <Link href="/user-dashboard/orders" className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
            ${pathname === '/user-dashboard/orders' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}>
            <ShoppingCartIcon className="h-6 w-6" />
            <span>Your Orders</span>
          </Link>

          {/* Account Settings Link */}
          <Link href="/user-dashboard/account" className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
            ${pathname === '/user-dashboard/account' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}>
            <Cog8ToothIcon className="h-6 w-6" />
            <span>Account Settings</span>
          </Link>

          {/* Chat Link (Optional, if you want a direct sidebar link to chat) */}
          <div className="border-t border-gray-700 my-4"></div>
          <Link href="/user-dashboard/chat" className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
            ${pathname === '/user-dashboard/chat' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}>
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
            <span>Chat History</span>
          </Link>
        </nav>
      </div>

      {/* OLD LOGOUT BUTTON BLOCK REMOVED FROM HERE */}
    </aside>
  );
}