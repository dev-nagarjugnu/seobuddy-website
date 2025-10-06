'use client';

import { LinkIcon, CheckCircleIcon, ChartBarIcon, StarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid';

export default function OffPageSEOPage() {
  return (
    <main className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 min-h-screen text-white pb-16">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center pt-20 pb-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">Off Page SEO Services</h1>
        <p className="text-lg text-gray-300 mb-6">Build authority, trust, and rankings with our off-page SEO solutions. We help you earn high-quality links, mentions, and a powerful online reputation.</p>
      </section>

      {/* What is Off Page SEO */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gray-800/80 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">What is Off Page SEO?</h2>
          <p className="text-gray-300 mb-2">Off-page SEO refers to all activities you do outside your website to improve its rankings. The most important is link building, but it also includes PR, reviews, and brand mentions.</p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <LinkIcon className="h-8 w-8 text-blue-400 mb-2" />
            <div className="font-semibold text-white mb-1">High-Quality Backlinks</div>
            <div className="text-gray-400 text-sm">Earn links from trusted, relevant sites to boost authority.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <StarIcon className="h-8 w-8 text-green-400 mb-2" />
            <div className="font-semibold text-white mb-1">Brand Mentions</div>
            <div className="text-gray-400 text-sm">Get your brand featured on top publications and industry sites.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ArrowTrendingUpIcon className="h-8 w-8 text-purple-400 mb-2" />
            <div className="font-semibold text-white mb-1">Trust & Authority</div>
            <div className="text-gray-400 text-sm">Off-page SEO is the #1 driver of long-term rankings and trust.</div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Our Off Page SEO Approach</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2 flex items-center"><CheckCircleIcon className="h-5 w-5 mr-2 text-blue-400" />Link Building Campaigns</h4>
            <p className="text-gray-400 text-sm">We secure high-quality, relevant links from trusted sources.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2 flex items-center"><CheckCircleIcon className="h-5 w-5 mr-2 text-green-400" />Digital PR & Outreach</h4>
            <p className="text-gray-400 text-sm">We promote your brand to journalists, bloggers, and influencers.</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <LinkIcon className="h-8 w-8 text-blue-400 mb-2" />
            <div className="font-semibold text-white mb-1">White-Hat Link Building</div>
            <div className="text-gray-400 text-sm">Ethical, sustainable strategies for long-term results.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <StarIcon className="h-8 w-8 text-green-400 mb-2" />
            <div className="font-semibold text-white mb-1">Reputation Management</div>
            <div className="text-gray-400 text-sm">Monitor and improve your brand’s online reputation.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ChartBarIcon className="h-8 w-8 text-purple-400 mb-2" />
            <div className="font-semibold text-white mb-1">Performance Tracking</div>
            <div className="text-gray-400 text-sm">Transparent reporting and analytics to measure every link.</div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">How Our Off Page SEO Process Works</h3>
        <ol className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-6 text-center">
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-400 mb-2">1</span>
            <span className="font-semibold text-white mb-1">Strategy & Research</span>
            <span className="text-gray-400 text-sm">We analyze your industry and competitors to craft a custom link strategy.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-green-400 mb-2">2</span>
            <span className="font-semibold text-white mb-1">Outreach & PR</span>
            <span className="text-gray-400 text-sm">We connect with journalists, bloggers, and influencers for quality mentions.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-purple-400 mb-2">3</span>
            <span className="font-semibold text-white mb-1">Link Building</span>
            <span className="text-gray-400 text-sm">We secure high-authority, relevant links to boost your rankings.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-400 mb-2">4</span>
            <span className="font-semibold text-white mb-1">Reporting & Support</span>
            <span className="text-gray-400 text-sm">You get transparent reports and ongoing support for lasting results.</span>
          </li>
        </ol>
      </section>

      {/* Trust Signals - Add testimonial */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border-l-4 border-green-400 rounded-lg p-8 shadow-lg text-center">
          <h4 className="text-xl font-bold text-white mb-2">Why Trust SEOBuddy?</h4>
          <p className="text-gray-300 mb-2">We’ve helped hundreds of brands earn powerful links and mentions. Our transparent process, expert team, and proven results set us apart.</p>
          <blockquote className="italic text-green-300 mt-4">“We landed features on top industry sites thanks to SEOBuddy’s outreach. Our authority and traffic soared!”<br/><span className="text-gray-400 not-italic">– Morgan T., Marketing Lead</span></blockquote>
        </div>
      </section>

      {/* FAQs - Add more questions */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Off Page SEO FAQs</h3>
        <div className="space-y-4">
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">How long does off-page SEO take?</h4>
            <p className="text-gray-400 text-sm">Link building is ongoing, but most clients see results in 2-6 months.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Do you guarantee links?</h4>
            <p className="text-gray-400 text-sm">We guarantee outreach and quality, not specific placements (no one can!).</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Are your link building methods safe?</h4>
            <p className="text-gray-400 text-sm">Yes, we use only white-hat, Google-compliant strategies for sustainable results.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Can you help with online reputation?</h4>
            <p className="text-gray-400 text-sm">Absolutely. We monitor and improve your brand’s reputation as part of our service.</p>
          </div>
        </div>
      </section>

      {/* CTA - Make more persuasive */}
      <section className="max-w-2xl mx-auto px-4 text-center">
        <a href="/seo-audit" className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:from-green-500 hover:to-blue-600 transition-all text-lg animate-bounce">Get Your Free Off Page SEO Audit</a>
        <p className="text-gray-400 mt-4">Ready to build authority? <span className="text-green-400 font-semibold">Book a free consultation</span> and let’s talk about your off-page SEO goals.</p>
      </section>
    </main>
  );
} 