'use client';

import { ChartBarIcon, StarIcon, CurrencyDollarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const caseStudies = [
  {
    client: 'TechFlow Solutions',
    industry: 'SaaS Platform',
    summary: '340% organic traffic growth, 450% more top-3 keywords, and 15x ROI in 6 months.',
    url: '/case-studies/techflow-solutions',
    color: 'from-green-400 to-blue-400',
    icon: ChartBarIcon,
  },
  {
    client: 'Luxe Apparel',
    industry: 'E-commerce Fashion',
    summary: '180% revenue growth, 12:1 ROAS, and #1-3 local rankings in 8 months.',
    url: '/case-studies/luxe-apparel',
    color: 'from-blue-400 to-purple-400',
    icon: StarIcon,
  },
  {
    client: 'Artisan Collective',
    industry: 'Local Business',
    summary: '280% local search visibility, 150% more foot traffic, and 650% ROI in 4 months.',
    url: '/case-studies/artisan-collective',
    color: 'from-green-400 to-blue-400',
    icon: CurrencyDollarIcon,
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 min-h-screen text-white pb-16">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center pt-20 pb-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">Client Success Stories</h1>
        <p className="text-lg text-gray-300 mb-6">See how SEOBuddy delivers real, measurable results for businesses of all sizes. Explore our proven case studies and discover what’s possible for your brand.</p>
      </section>

      {/* Approach Summary */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-gray-800/80 rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2 text-white">Our Approach</h3>
          <p className="text-gray-300 mb-2">We combine AI-powered analytics, technical SEO, and creative content strategies to drive sustainable growth. Every client gets a custom plan, transparent reporting, and a relentless focus on ROI.</p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div key={study.client} className={`bg-gradient-to-br ${study.color} rounded-2xl shadow-lg p-8 flex flex-col justify-between animate-fade-in-up`}>
              <div>
                <div className="flex items-center mb-4">
                  <study.icon className="h-8 w-8 mr-3 text-white" />
                  <div>
                    <div className="text-lg font-bold text-white">{study.client}</div>
                    <div className="text-sm text-white/70">{study.industry}</div>
                  </div>
                </div>
                <div className="text-gray-100 text-base mb-6">{study.summary}</div>
              </div>
              <Link href={study.url} className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white transition-all group">
                Read Full Case Study
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 