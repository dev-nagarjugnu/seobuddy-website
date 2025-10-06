'use client';

import { CheckCircleIcon, ChartBarIcon, ShieldCheckIcon, ArrowTrendingUpIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

export default function TechnicalSEOPage() {
  return (
    <main className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 min-h-screen text-white pb-16">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center pt-20 pb-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">Technical SEO Services</h1>
        <p className="text-lg text-gray-300 mb-6">Unlock your website’s full potential with our expert technical SEO solutions. We ensure your site is fast, crawlable, secure, and built for long-term search success.</p>
      </section>

      {/* What is Technical SEO */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gray-800/80 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">What is Technical SEO?</h2>
          <p className="text-gray-300 mb-2">Technical SEO is the foundation of your website’s search performance. It covers everything from site speed and mobile-friendliness to crawlability, indexation, and security. Without a strong technical base, even the best content can struggle to rank.</p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ChartBarIcon className="h-8 w-8 text-blue-400 mb-2" />
            <div className="font-semibold text-white mb-1">Boost Rankings</div>
            <div className="text-gray-400 text-sm">Sites with strong technical SEO rank higher and get more traffic.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ShieldCheckIcon className="h-8 w-8 text-green-400 mb-2" />
            <div className="font-semibold text-white mb-1">Site Security</div>
            <div className="text-gray-400 text-sm">HTTPS, secure architecture, and best practices for user trust.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ArrowTrendingUpIcon className="h-8 w-8 text-purple-400 mb-2" />
            <div className="font-semibold text-white mb-1">Faster Load Times</div>
            <div className="text-gray-400 text-sm">Speed is a ranking factor and improves user experience.</div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Our Technical SEO Approach</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2 flex items-center"><WrenchScrewdriverIcon className="h-5 w-5 mr-2 text-blue-400" />Comprehensive Site Audit</h4>
            <p className="text-gray-400 text-sm">We analyze every technical aspect of your site, from crawl errors to mobile usability and site speed.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2 flex items-center"><CheckCircleIcon className="h-5 w-5 mr-2 text-green-400" />Actionable Fixes</h4>
            <p className="text-gray-400 text-sm">You get a prioritized action plan and our team implements every fix for maximum impact.</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <CheckCircleIcon className="h-8 w-8 text-green-400 mb-2" />
            <div className="font-semibold text-white mb-1">Crawl Optimization</div>
            <div className="text-gray-400 text-sm">XML sitemaps, robots.txt, and internal linking for better indexation.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ShieldCheckIcon className="h-8 w-8 text-blue-400 mb-2" />
            <div className="font-semibold text-white mb-1">HTTPS & Security</div>
            <div className="text-gray-400 text-sm">SSL, secure headers, and best practices for user trust.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg">
            <ArrowTrendingUpIcon className="h-8 w-8 text-purple-400 mb-2" />
            <div className="font-semibold text-white mb-1">Speed Optimization</div>
            <div className="text-gray-400 text-sm">Image compression, lazy loading, and code minification for blazing-fast load times.</div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">How Our Technical SEO Process Works</h3>
        <ol className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-6 text-center">
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-400 mb-2">1</span>
            <span className="font-semibold text-white mb-1">Discovery & Audit</span>
            <span className="text-gray-400 text-sm">We analyze your site’s current technical health and identify opportunities.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-green-400 mb-2">2</span>
            <span className="font-semibold text-white mb-1">Action Plan</span>
            <span className="text-gray-400 text-sm">You receive a clear, prioritized roadmap for technical improvements.</span>
          </li>
          <li className="bg-gray-800/80 rounded-xl p-6 shadow-lg flex flex-col items-center">
            <span className="text-3xl font-bold text-purple-400 mb-2">3</span>
            <span className="font-semibold text-white mb-1">Implementation</span>
            <span className="text-gray-400 text-sm">Our team fixes issues and optimizes your site for peak performance.</span>
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
          <p className="text-gray-300 mb-2">We’ve helped 500+ businesses achieve technical SEO excellence. Our transparent process, expert team, and proven results set us apart.</p>
          <blockquote className="italic text-green-300 mt-4">“SEOBuddy’s technical audit uncovered issues we never knew existed. Our rankings and site speed improved dramatically!”<br/><span className="text-gray-400 not-italic">– Jamie L., CTO, TechFlow Solutions</span></blockquote>
        </div>
      </section>

      {/* FAQs - Add more questions */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">Technical SEO FAQs</h3>
        <div className="space-y-4">
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">How long does technical SEO take?</h4>
            <p className="text-gray-400 text-sm">Most sites see improvements within 30-60 days after implementation, but results can vary based on site size and complexity.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Do you work with all platforms?</h4>
            <p className="text-gray-400 text-sm">Yes! We support WordPress, Shopify, custom sites, and more.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Will technical SEO help my site load faster?</h4>
            <p className="text-gray-400 text-sm">Absolutely. Speed optimization is a core part of our service, improving both user experience and rankings.</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 shadow-lg">
            <h4 className="font-semibold text-white mb-2">Is technical SEO a one-time fix?</h4>
            <p className="text-gray-400 text-sm">It’s ongoing. Search engines and technology change, so we offer ongoing support and monitoring.</p>
          </div>
        </div>
      </section>

      {/* CTA - Make more persuasive */}
      <section className="max-w-2xl mx-auto px-4 text-center">
        <a href="/seo-audit" className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:from-green-500 hover:to-blue-600 transition-all text-lg animate-bounce">Get Your Free Technical SEO Audit</a>
        <p className="text-gray-400 mt-4">Ready to fix your site’s foundation? <span className="text-green-400 font-semibold">Book a free consultation</span> and let’s talk about your technical SEO goals.</p>
      </section>
    </main>
  );
} 