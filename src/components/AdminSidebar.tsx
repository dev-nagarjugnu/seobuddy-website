// src/components/AdminSidebar.tsx
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  HomeIcon, 
  UsersIcon, 
  ShoppingCartIcon, 
  ChatBubbleLeftRightIcon,
  DocumentTextIcon, 
  Cog8ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      description: 'Overview & Analytics'
    },
    {
      name: 'Users',
      href: '/dashboard/users',
      icon: UsersIcon,
      description: 'Manage Users'
    },
    {
      name: 'Orders',
      href: '/dashboard/orders',
      icon: ShoppingCartIcon,
      description: 'Order Management'
    },
    {
      name: 'Chat',
      href: '/dashboard/chat',
      icon: ChatBubbleLeftRightIcon,
      description: 'Customer Support'
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: ChartBarIcon,
      description: 'Reports & Insights'
    },
    {
      name: 'Blog',
      href: '/dashboard/blog',
      icon: DocumentTextIcon,
      description: 'Blog Post Manager'
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: Cog8ToothIcon,
      description: 'System Configuration'
    }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-700/80 transition-all duration-200"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-80 bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl
        border-r border-slate-700/50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SEOBuddy
                </h1>
                <p className="text-xs text-slate-400">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center space-x-3 px-4 py-3 rounded-xl
                    transition-all duration-200 ease-out
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-105'
                    }
                  `}
                >
                  <item.icon className={`
                    h-5 w-5 transition-all duration-200
                    ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}
                  `} />
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <BellIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Live Updates</p>
                  <p className="text-xs text-slate-400">Real-time notifications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}