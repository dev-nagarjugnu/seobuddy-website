'use client';

import { ChartBarIcon, CheckCircleIcon, ShieldCheckIcon, MagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function SeoAuditPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', website: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 min-h-screen text-white pb-16">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center pt-20 pb-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">Get Your Free SEO Audit</h1>
        <p className="text-lg text-gray-300 mb-6">Unlock your website’s true potential. Our expert team will analyze your site and deliver a personalized, actionable SEO report—completely free.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center space-x-2 bg-gray-800/70 rounded-lg px-4 py-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-blue-400" />
            <span className="text-gray-400 text-sm">Comprehensive Site Analysis</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800/70 rounded-lg px-4 py-2">
            <ShieldCheckIcon className="h-5 w-5 text-green-400" />
            <span className="text-gray-400 text-sm">No Obligation, 100% Free</span>
          </div>
        </div>
      </section>

      {/* Audit Form or Success Message */}
      <section className="max-w-lg mx-auto bg-gray-800/80 rounded-2xl shadow-xl p-8 mb-12 animate-fade-in">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-left text-gray-300 font-semibold mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-left text-gray-300 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-left text-gray-300 font-semibold mb-2">Website URL</label>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                placeholder="https://yourwebsite.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <ArrowRightIcon className="h-5 w-5 mr-2 animate-pulse" />
                  Sending...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Request Audit
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-12">
            <CheckCircleIcon className="h-12 w-12 text-green-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-2">Request Received!</h2>
            <p className="text-gray-300 mb-4">Our SEO experts will review your site and send your personalized audit to <span className="text-green-400 font-semibold">{form.email}</span> within 24 hours.</p>
            <p className="text-gray-400">Want to talk to an expert right away? <a href="/contact" className="text-blue-400 underline hover:text-blue-300">Contact us</a>.</p>
          </div>
        )}
      </section>

      {/* Value Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">What’s Included in Your Free Audit?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg animate-fade-in-up">
            <ChartBarIcon className="h-8 w-8 text-blue-400 mb-2" />
            <div className="font-semibold text-white mb-1">Technical SEO Review</div>
            <div className="text-gray-400 text-sm">We’ll check your site’s speed, crawlability, and technical health.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg animate-fade-in-up">
            <CheckCircleIcon className="h-8 w-8 text-green-400 mb-2" />
            <div className="font-semibold text-white mb-1">Keyword & Content Analysis</div>
            <div className="text-gray-400 text-sm">See how your content ranks and where you can win more traffic.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg animate-fade-in-up">
            <ShieldCheckIcon className="h-8 w-8 text-purple-400 mb-2" />
            <div className="font-semibold text-white mb-1">Competitor Benchmarking</div>
            <div className="text-gray-400 text-sm">Discover what your top competitors are doing—and how to beat them.</div>
          </div>
        </div>
      </section>
    </main>
  );
} 