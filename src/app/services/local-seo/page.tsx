'use client';

import { MapPinIcon, CheckCircleIcon, ChartBarIcon, StarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid';

export default function LocalSEOPage() {
  return (
    <main className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 min-h-screen text-white pb-16">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center pt-20 pb-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">Local SEO Services</h1>
        <p className="text-lg text-gray-300 mb-6">Get found by more local customers. Our local SEO solutions help you dominate Google Maps, local search, and drive real foot traffic to your business.</p>
      </section>

      {/* What is Local SEO */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gray-800/80 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">What is Local SEO?</h2>
          <p className="text-gray-300 mb-2">Local SEO is the process of optimizing your online presence to attract more business from relevant local searches. It’s essential for brick-and-mortar businesses and service providers who want to win in their area.</p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <MapPinIcon className="h-8 w-8 text-blue-400 mb-2" />
            <div className="font-semibold text-white mb-1">Google Maps Dominance</div>
            <div className="text-gray-400 text-sm">Show up in the top 3 for local searches and maps results.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <StarIcon className="h-8 w-8 text-green-400 mb-2" />
            <div className="font-semibold text-white mb-1">Reputation Management</div>
            <div className="text-gray-400 text-sm">Get more 5-star reviews and build trust with your community.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ArrowTrendingUpIcon className="h-8 w-8 text-purple-400 mb-2" />
            <div className="font-semibold text-white mb-1">Real Foot Traffic</div>
            <div className="text-gray-400 text-sm">Drive more calls, visits, and sales from local customers.</div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Our Local SEO Approach</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2 flex items-center"><CheckCircleIcon className="h-5 w-5 mr-2 text-blue-400" />Google Business Profile Optimization</h4>
            <p className="text-gray-400 text-sm">We optimize your Google profile for maximum visibility and engagement.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2 flex items-center"><CheckCircleIcon className="h-5 w-5 mr-2 text-green-400" />Local Citations & Links</h4>
            <p className="text-gray-400 text-sm">We build local citations and high-quality links to boost your authority.</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <MapPinIcon className="h-8 w-8 text-blue-400 mb-2" />
            <div className="font-semibold text-white mb-1">Local Listings</div>
            <div className="text-gray-400 text-sm">Accurate, consistent listings across all major platforms.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <StarIcon className="h-8 w-8 text-green-400 mb-2" />
            <div className="font-semibold text-white mb-1">Review Generation</div>
            <div className="text-gray-400 text-sm">Automated review requests and monitoring for reputation growth.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ChartBarIcon className="h-8 w-8 text-purple-400 mb-2" />
            <div className="font-semibold text-white mb-1">Local Rank Tracking</div>
            <div className="text-gray-400 text-sm">See your progress with transparent, real-time reporting.</div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">How Our Local SEO Process Works</h3>
        <ol className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-6 text-center">
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-400 mb-2">1</span>
            <span className="font-semibold text-white mb-1">Local Audit</span>
            <span className="text-gray-400 text-sm">We assess your current local presence, citations, and reviews.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-green-400 mb-2">2</span>
            <span className="font-semibold text-white mb-1">Optimization</span>
            <span className="text-gray-400 text-sm">We optimize your Google Business Profile and local listings.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-purple-400 mb-2">3</span>
            <span className="font-semibold text-white mb-1">Reputation & Links</span>
            <span className="text-gray-400 text-sm">We help you earn more reviews and build local authority links.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-400 mb-2">4</span>
            <span className="font-semibold text-white mb-1">Reporting & Growth</span>
            <span className="text-gray-400 text-sm">You get transparent reports and ongoing support for continued growth.</span>
          </li>
        </ol>
      </section>

      {/* Trust Signals - Add testimonial */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border-l-4 border-green-400 rounded-lg p-8 shadow-lg text-center">
          <h4 className="text-xl font-bold text-white mb-2">Why Trust SEOBuddy?</h4>
          <p className="text-gray-300 mb-2">We’ve helped hundreds of local businesses dominate their markets. Our transparent process, expert team, and proven results set us apart.</p>
          <blockquote className="italic text-green-300 mt-4">“Our business went from invisible to the top 3 in Google Maps. SEOBuddy’s local SEO is a game changer!”<br/><span className="text-gray-400 not-italic">– Priya S., Owner, Luxe Apparel</span></blockquote>
        </div>
      </section>

      {/* FAQs - Add more questions */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Local SEO FAQs</h3>
        <div className="space-y-4">
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">How long does local SEO take?</h4>
            <p className="text-gray-400 text-sm">Most businesses see results in 1-3 months, but it depends on competition and starting point.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Do you work with multi-location businesses?</h4>
            <p className="text-gray-400 text-sm">Absolutely! We have solutions for single and multi-location brands.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Can you help with review generation?</h4>
            <p className="text-gray-400 text-sm">Yes, we have proven strategies to help you earn more 5-star reviews.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Is local SEO a one-time service?</h4>
            <p className="text-gray-400 text-sm">No, it’s ongoing. We offer continuous optimization and support for lasting results.</p>
          </div>
        </div>
      </section>

      {/* CTA - Make more persuasive */}
      <section className="max-w-2xl mx-auto px-4 text-center">
        <a href="/seo-audit" className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:from-green-500 hover:to-blue-600 transition-all text-lg animate-bounce">Get Your Free Local SEO Audit</a>
        <p className="text-gray-400 mt-4">Ready to win your local market? <span className="text-green-400 font-semibold">Book a free consultation</span> and let’s talk about your local SEO goals.</p>
      </section>
    </main>
  );
} 