// src/app/(admin)/layout.tsx
import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Admin Header */}
        <AdminHeader />

        {/* Main content with improved styling */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}