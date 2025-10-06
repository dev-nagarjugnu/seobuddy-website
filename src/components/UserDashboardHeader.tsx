// src/components/UserDashboardHeader.tsx
"use client"

import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
// Removed signOut import as it's no longer needed in this component's header
// import { signOut } from 'next-auth/react';

export default function UserDashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between p-6 bg-gray-800 border-b border-gray-700">
      <h1 className="text-2xl font-semibold text-white">User Dashboard</h1>
      <div className="flex items-center space-x-2">
        <UserCircleIcon className="h-8 w-8 text-green-400" />
        <span className="font-medium text-white">{session?.user?.name || session?.user?.email}</span>
        {/* OLD LOGOUT BUTTON REMOVED FROM HERE */}
        {/* You can add a button here if you want quick logout, but we'll rely on main header's dropdown */}
      </div>
    </header>
  );
}