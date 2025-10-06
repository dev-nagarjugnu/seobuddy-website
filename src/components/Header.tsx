// src/components/Header.tsx
"use client"

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const baseButtonClasses = "px-4 py-2 rounded-md transition-colors font-medium";

  const isDashboardRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/user-dashboard'); // NEW: Check for user-dashboard route too

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClasses = (href: string) => {
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    return (
      "relative px-3 py-2 rounded-lg text-sm " +
      (isActive
        ? "text-white after:w-full"
        : "text-gray-300 hover:text-white after:w-0 hover:after:w-full") +
      " after:absolute after:left-3 after:-bottom-1 after:h-0.5 after:bg-blue-500 after:rounded-full after:transition-all after:duration-200"
    );
  }
  

  let authButtonsContent;
  if (status === "loading") {
    authButtonsContent = null;
  } else if (status === "authenticated") {
    if (!isDashboardRoute) {
      authButtonsContent = (
        <Link
          href={session.user?.role === "ADMIN" ? "/dashboard" : "/user-dashboard"} // <-- UPDATED: Conditional href
          className={`${baseButtonClasses} bg-blue-600 hover:bg-blue-700 text-white`}
        >
          Dashboard
        </Link>
      );
    } else {
      authButtonsContent = null;
    }
  } else { // status === "unauthenticated"
    authButtonsContent = (
      <>
        <button
          onClick={() => signIn()}
          className={`px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white/90 hover:text-white hover:bg-white/10 hover:border-white/25 transition-colors cursor-pointer`}
        >
          Sign In
        </button>
        <Link href="/auth/signup" className={`px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-md shadow-blue-900/20 transition-colors`}>
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/80 to-slate-800/60 supports-[backdrop-filter]:bg-opacity-60 backdrop-blur text-white h-16 border-b border-slate-700/40 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      <div className="max-w-7xl mx-auto h-full px-4 flex justify-between items-center">
      {/* Logo / Site Title */}
      <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white">
        <img src="/globe.svg" alt="SEOBuddy Logo" className="h-8 w-8" />
        SEOBuddy
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-6 relative">
        <Link href="/" className={linkClasses('/')}>Home</Link>
        <div className="inline-block relative">
          <button
            className="hover:text-gray-200 text-gray-300 transition-colors inline-flex items-center focus:outline-none"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onFocus={() => setServicesOpen(true)}
            onBlur={() => setServicesOpen(false)}
            aria-haspopup="true"
            aria-expanded={servicesOpen}
            tabIndex={0}
          >
            <span>Services</span>
            <ChevronDownIcon className="h-4 w-4 ml-1" />
          </button>
          {servicesOpen && (
            <div
              className="absolute left-0 mt-2 w-56 bg-gray-900/95 border border-gray-700 rounded-xl shadow-2xl z-50 backdrop-blur"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link href="/services/technical-seo" className="block px-6 py-3 hover:bg-gray-800/80 text-white transition-colors rounded-t-xl">Technical SEO</Link>
              <Link href="/services/local-seo" className="block px-6 py-3 hover:bg-gray-800/80 text-white transition-colors">Local SEO</Link>
              <Link href="/services/on-page-seo" className="block px-6 py-3 hover:bg-gray-800/80 text-white transition-colors">On Page SEO</Link>
              <Link href="/services/off-page-seo" className="block px-6 py-3 hover:bg-gray-800/80 text-white transition-colors rounded-b-xl">Off Page SEO</Link>
            </div>
          )}
        </div>
        <Link href="/about" className={linkClasses('/about')}>About Us</Link>
        <Link href="/blog" className={linkClasses('/blog')}>Blog</Link>
        <Link href="/contact" className={linkClasses('/contact')}>Contact</Link>
      </nav>

      {/* Action Buttons Container */}
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen(v => !v)}
        >
          <span className="block w-4 h-0.5 bg-white mb-1"></span>
          <span className="block w-4 h-0.5 bg-white mb-1"></span>
          <span className="block w-4 h-0.5 bg-white"></span>
        </button>
        <div className="hidden md:flex items-center space-x-4">
          {authButtonsContent}
        </div>
      </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-gray-950/90 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            <Link href="/" className="block text-gray-300 hover:text-white">Home</Link>
            <details className="group">
              <summary className="list-none text-gray-300 hover:text-white flex items-center cursor-pointer">Services <ChevronDownIcon className="h-4 w-4 ml-1 transition-transform group-open:rotate-180" /></summary>
              <div className="mt-2 ml-3 space-y-2">
                <Link href="/services/technical-seo" className="block text-gray-300 hover:text-white">Technical SEO</Link>
                <Link href="/services/local-seo" className="block text-gray-300 hover:text-white">Local SEO</Link>
                <Link href="/services/on-page-seo" className="block text-gray-300 hover:text-white">On Page SEO</Link>
                <Link href="/services/off-page-seo" className="block text-gray-300 hover:text-white">Off Page SEO</Link>
              </div>
            </details>
            <Link href="/about" className="block text-gray-300 hover:text-white">About Us</Link>
            <Link href="/blog" className="block text-gray-300 hover:text-white">Blog</Link>
            <Link href="/contact" className="block text-gray-300 hover:text-white">Contact</Link>
            <div className="pt-3 border-t border-white/10 flex items-center gap-3">
              {status === 'authenticated' ? (
                !isDashboardRoute ? (
                  <Link href={session.user?.role === 'ADMIN' ? '/dashboard' : '/user-dashboard'} className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white">Dashboard</Link>
                ) : null
              ) : (
                <>
                  <button onClick={() => signIn()} className="px-4 py-2 rounded-full text-white bg-white/10 border border-white/15 hover:bg-white/20 cursor-pointer">Sign In</button>
                  <Link href="/auth/signup" className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}