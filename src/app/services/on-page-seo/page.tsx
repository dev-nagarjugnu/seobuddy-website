'use client';

import { DocumentTextIcon, CheckCircleIcon, ChartBarIcon, StarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid';

export default function OnPageSEOPage() {
  return (
    <main className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 min-h-screen text-white pb-16">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center pt-20 pb-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">On Page SEO Services</h1>
        <p className="text-lg text-gray-300 mb-6">Maximize your rankings with expert on-page SEO. We optimize every element of your site for search engines and users—content, structure, and more.</p>
      </section>

      {/* What is On Page SEO */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gray-800/80 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">What is On Page SEO?</h2>
          <p className="text-gray-300 mb-2">On-page SEO is the practice of optimizing individual web pages to rank higher and earn more relevant traffic. It includes content, HTML tags, internal links, and user experience.</p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <DocumentTextIcon className="h-8 w-8 text-blue-400 mb-2" />
            <div className="font-semibold text-white mb-1">Content Optimization</div>
            <div className="text-gray-400 text-sm">High-quality, keyword-rich content that drives rankings and engagement.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <StarIcon className="h-8 w-8 text-green-400 mb-2" />
            <div className="font-semibold text-white mb-1">User Experience</div>
            <div className="text-gray-400 text-sm">Fast, mobile-friendly, and easy to navigate for visitors and search engines.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ArrowTrendingUpIcon className="h-8 w-8 text-purple-400 mb-2" />
            <div className="font-semibold text-white mb-1">Higher Rankings</div>
            <div className="text-gray-400 text-sm">On-page SEO is the #1 driver of search visibility and conversions.</div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Our On Page SEO Approach</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2 flex items-center"><CheckCircleIcon className="h-5 w-5 mr-2 text-blue-400" />Content & Keyword Strategy</h4>
            <p className="text-gray-400 text-sm">We research, plan, and optimize every page for your target keywords and audience.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2 flex items-center"><CheckCircleIcon className="h-5 w-5 mr-2 text-green-400" />Technical & UX Enhancements</h4>
            <p className="text-gray-400 text-sm">We improve site structure, internal links, and usability for better results.</p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">How Our On Page SEO Process Works</h3>
        <ol className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-6 text-center">
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-400 mb-2">1</span>
            <span className="font-semibold text-white mb-1">Site & Content Audit</span>
            <span className="text-gray-400 text-sm">We review your site’s content, structure, and on-page elements.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-green-400 mb-2">2</span>
            <span className="font-semibold text-white mb-1">Keyword & Content Strategy</span>
            <span className="text-gray-400 text-sm">We research and map keywords to every page for maximum relevance.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-purple-400 mb-2">3</span>
            <span className="font-semibold text-white mb-1">Optimization & Enhancements</span>
            <span className="text-gray-400 text-sm">We optimize meta tags, content, internal links, and UX.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-400 mb-2">4</span>
            <span className="font-semibold text-white mb-1">Reporting & Growth</span>
            <span className="text-gray-400 text-sm">You get transparent reports and ongoing support for continued growth.</span>
          </li>
        </ol>
      </section>

      {/* Key Features */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <DocumentTextIcon className="h-8 w-8 text-blue-400 mb-2" />
            <div className="font-semibold text-white mb-1">Meta & Schema</div>
            <div className="text-gray-400 text-sm">Optimized meta tags, schema markup, and structured data for rich results.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <StarIcon className="h-8 w-8 text-green-400 mb-2" />
            <div className="font-semibold text-white mb-1">Internal Linking</div>
            <div className="text-gray-400 text-sm">Strategic links to boost authority and guide users through your site.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ChartBarIcon className="h-8 w-8 text-purple-400 mb-2" />
            <div className="font-semibold text-white mb-1">Performance Tracking</div>
            <div className="text-gray-400 text-sm">Transparent reporting and analytics to measure every improvement.</div>
          </div>
        </div>
      </section>

      {/* Trust Signals - Add testimonial */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border-l-4 border-green-400 rounded-lg p-8 shadow-lg text-center">
          <h4 className="text-xl font-bold text-white mb-2">Why Trust SEOBuddy?</h4>
          <p className="text-gray-300 mb-2">We’ve helped hundreds of brands achieve on-page SEO excellence. Our transparent process, expert team, and proven results set us apart.</p>
          <blockquote className="italic text-green-300 mt-4">“Our organic traffic doubled after SEOBuddy’s on-page optimization. The results speak for themselves!”<br/><span className="text-gray-400 not-italic">– Alex R., Founder, Artisan Collective</span></blockquote>
        </div>
      </section>

      {/* FAQs - Add more questions */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">On Page SEO FAQs</h3>
        <div className="space-y-4">
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">How long does on-page SEO take?</h4>
            <p className="text-gray-400 text-sm">Most sites see improvements within 2-4 weeks after optimization.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Do you write content too?</h4>
            <p className="text-gray-400 text-sm">Yes! We offer full-service content writing and optimization.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Can you optimize existing pages?</h4>
            <p className="text-gray-400 text-sm">Absolutely. We can audit and improve your current content for better results.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Is on-page SEO a one-time fix?</h4>
            <p className="text-gray-400 text-sm">No, it’s ongoing. We monitor and update your site as search trends evolve.</p>
          </div>
        </div>
      </section>

      {/* CTA - Make more persuasive */}
      <section className="max-w-2xl mx-auto px-4 text-center">
        <a href="/seo-audit" className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:from-green-500 hover:to-blue-600 transition-all text-lg animate-bounce">Get Your Free On Page SEO Audit</a>
        <p className="text-gray-400 mt-4">Ready to optimize your site? <span className="text-green-400 font-semibold">Book a free consultation</span> and let’s talk about your on-page SEO goals.</p>
      </section>
    </main>
  );
} 