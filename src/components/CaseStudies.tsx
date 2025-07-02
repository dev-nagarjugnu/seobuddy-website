// src/components/CaseStudies.tsx

"use client";

import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import AnimatedCounter from './AnimatedCounter';

const caseStudies = [
  {
    client: 'Innovate Inc.',
    industry: 'SaaS Platform',
    challenge: 'Stagnant organic growth and low conversion rates from search.',
    metrics: [
      { label: 'Organic Traffic', value: '+250%' },
      { label: 'Keyword Rankings (Top 3)', value: '+400%' },
      { label: 'Lead Conversions', value: '+75%' },
    ],
    imageUrl: '/placeholder-innovate.png'
  },
  {
    client: 'Luxe Apparel',
    industry: 'E-commerce Fashion',
    challenge: 'Fierce competition in online fashion, struggling to rank for key terms.',
    metrics: [
      { label: 'E-commerce Revenue', value: '+120%' },
      { label: 'ROAS from SEO', value: '8:1' },
      { label: 'Category Page Views', value: '+300%' },
    ],
    imageUrl: '/placeholder-luxe.png'
  },
]

const parseMetric = (metricValue: string) => {
    const numberValue = parseFloat(metricValue.replace(/[^0-9.]/g, ''));
    const target = isNaN(numberValue) ? 0 : numberValue;
    const prefix = metricValue.match(/^[^\d.]*/)?.[0] || '';
    const suffix = metricValue.match(/[^0-9.][^0-9.]*$/)?.[0] || '';
    return { target, prefix, suffix };
};

const CaseStudies = () => {
  return (
    <section className="bg-gray-900 py-20 sm:py-28 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
            Proven Results, Tangible Growth
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-400" style={{ fontFamily: 'Inter, Open Sans, sans-serif' }}>
            We don&apos;t just promise rankings; we deliver business outcomes.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto text-center">
          <p className="text-2xl font-medium text-gray-200">
            &quot;SEOBuddy transformed our online presence. Their data-first approach doubled our organic leads in just six months. An essential partner for growth.&quot;
          </p>
          <div className="mt-8">
            <div className="font-bold text-white text-lg">Jane Doe, CEO of Innovate Inc.</div>
            <div className="text-gray-500">SaaS Industry Leader</div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {caseStudies.map((study) => (
            <div key={study.client} className="group relative flex flex-col bg-gray-800/50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
              <div className="p-8 flex-grow">
                <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">{study.industry}</h3>
                <p className="mt-4 text-2xl font-bold text-white">{study.client}</p>
                <p className="mt-2 text-gray-400">{study.challenge}</p>
                <div className="mt-8 border-t border-gray-700 pt-6">
                  <h4 className="text-base font-semibold text-white">Key Results:</h4>
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                    {study.metrics.map(metric => {
                      const { target, prefix, suffix } = parseMetric(metric.value);
                      return (
                        <div key={metric.label}>
                          <p className="text-gray-400 text-sm">{metric.label}</p>
                          <AnimatedCounter 
                            target={target} 
                            prefix={prefix} 
                            suffix={suffix} 
                            className="text-xl font-bold text-white"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-gray-700/50 p-4">
                <a href="#" className="flex items-center justify-between text-green-400 font-semibold">
                  <span>Read Full Case Study</span>
                  <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies;