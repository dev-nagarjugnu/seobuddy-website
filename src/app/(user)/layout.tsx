// src/app/(user)/layout.tsx
import React from 'react';
import UserSidebar from '@/components/UserSidebar'; // We will create this
import UserDashboardHeader from '@/components/UserDashboardHeader'; // We will create this

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* User Sidebar */}
      <UserSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* User Dashboard Header (Top bar for user section) */}
        <UserDashboardHeader />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {children} {/* This will be your user-dashboard/page.tsx content */}
        </main>
      </div>
    </div>
  );
}