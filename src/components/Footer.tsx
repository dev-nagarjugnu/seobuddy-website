// src/components/Footer.tsx

"use client"; // Required for components with state and event handlers

import { useState } from 'react';
import Link from 'next/link';

const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
    <span className="sr-only">{children}</span>
    {children}
  </a>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('Subscribing...');

    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      setEmail(''); // Clear the input field on success
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-6 py-16 sm:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
             <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
               <img src="/globe.svg" alt="SEOBuddy Logo" className="h-8 w-8" />
               SEOBuddy
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Your dedicated partner in achieving digital excellence and search engine dominance.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Quick Links</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li><a href="/about" className="text-sm leading-6 text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="/services" className="text-sm leading-6 text-gray-300 hover:text-white">Services</a></li>
              <li><a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">Case Studies</a></li>
              <li><a href="/contact" className="text-sm leading-6 text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li><a href="/services/technical-seo" className="text-sm leading-6 text-gray-300 hover:text-white">Technical SEO</a></li>
              <li><a href="/services/on-page-seo" className="text-sm leading-6 text-gray-300 hover:text-white">On-Page SEO</a></li>
              <li><a href="/services/off-page-seo" className="text-sm leading-6 text-gray-300 hover:text-white">Off-Page SEO</a></li>
              <li><a href="/services/local-seo" className="text-sm leading-6 text-gray-300 hover:text-white">Local SEO</a></li>
            </ul>
          </div>
          
          <div className="col-span-2">
            <h3 className="text-sm font-semibold leading-6 text-white">Subscribe to our newsletter</h3>
            <p className="mt-4 text-sm text-gray-400">The latest news, articles, and resources, sent to your inbox weekly.</p>
            <form className="mt-6 max-w-md" onSubmit={handleSubmit}>
              <div className="flex gap-x-4">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input 
                  id="email-address" 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" 
                  placeholder="Enter your email" 
                />
                <button 
                  type="submit" 
                  className="flex-none rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  style={{ backgroundColor: '#1E40AF' }}
                >
                  Subscribe
                </button>
              </div>
              {message && <p className="mt-2 text-sm text-gray-400">{message}</p>}
            </form>
          </div>
        </div>

        {/* Awards & Recognition Section */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">Awards & Recognition</h3>
            <p className="text-sm text-gray-400">Recognized as a leading SEO company by industry experts</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-10">
            {/* Clutch Badge */}
            <div className="flex flex-col items-center group">
              <img 
                src="/images/clutch.png" 
                alt="Clutch Top SEO Companies 2023" 
                className="h-16 w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="sr-only">Clutch Top SEO Companies 2023</span>
            </div>

            {/* Find Best SEO Badge */}
            <div className="flex flex-col items-center group">
              <img 
                src="/images/find-best-seo.png" 
                alt="Find Best SEO - Top 10 Company" 
                className="h-16 w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="sr-only">Find Best SEO - Top 10 Company</span>
            </div>

            {/* GoodFirms Badge */}
            <div className="flex flex-col items-center group">
              <img 
                src="/images/goodfirms-footer.png" 
                alt="GoodFirms Best SEO Services" 
                className="h-16 w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="sr-only">GoodFirms Best SEO Services</span>
            </div>

            {/* Red Herring Asia Badge */}
            <div className="flex flex-col items-center group">
              <img 
                src="/images/red-herring-asia.png" 
                alt="Red Herring Asia 100 Winner" 
                className="h-16 w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="sr-only">Red Herring Asia 100 Winner</span>
            </div>

            {/* Small Business Badge */}
            <div className="flex flex-col items-center group">
              <img 
                src="/images/small-business.png" 
                alt="Small Business Community Association Award" 
                className="h-16 w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="sr-only">Small Business Community Association Award</span>
            </div>

            {/* Top SEO Badge */}
            <div className="flex flex-col items-center group">
              <img 
                src="/images/top-seo.png" 
                alt="TopSEOs Best in Search Organic Optimization" 
                className="h-16 w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="sr-only">TopSEOs Best in Search Organic Optimization</span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/terms-conditions" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
              Terms & Conditions
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/cancellation-refund" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
              Cancellation & Refund Policy
            </Link>
          </div>
          
          {/* Copyright and Social */}
          <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm leading-5 text-gray-400 md:order-1">&copy; 2025 SEOBuddy. All rights reserved.</p>
          <div className="mt-4 md:mt-0 md:order-2 flex space-x-6">
            <SocialIcon href="#">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </SocialIcon>
            <SocialIcon href="#">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </SocialIcon>
            <SocialIcon href="#">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.019c0 4.438 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.019C22 6.477 17.523 2 12 2z" clipRule="evenodd" /></svg>
            </SocialIcon>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;