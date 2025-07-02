// src/components/Header.tsx

"use client"; // This is a client component because it uses state (for the mobile menu)

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Tools', href: '/tools' },
];

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
              SEOBuddy
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA and Mobile Menu Button */}
          <div className="flex items-center">
            <div className="hidden md:block">
                <button className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors" style={{ backgroundColor: '#1E40AF' }}>
                    Get Quote
                </button>
            </div>
            <div className="md:hidden ml-4">
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white">
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-8 w-8" />
                ) : (
                  <Bars3Icon className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors block px-3 py-2 rounded-md text-base font-medium">
                  {link.name}
                </Link>
              ))}
              <button className="w-full mt-4 px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors" style={{ backgroundColor: '#1E40AF' }}>
                Get Quote
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;