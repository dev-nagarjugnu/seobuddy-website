// src/components/CaseStudies.tsx

"use client";

import { ArrowUpRightIcon, StarIcon, ChartBarIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import AnimatedCounter from './AnimatedCounter';

const caseStudies = [
  {
    client: 'TechFlow Solutions',
    industry: 'SaaS Platform',
    challenge: 'Stagnant organic growth and low conversion rates from search traffic.',
    solution: 'Implemented comprehensive technical SEO audit, content optimization, and link building strategy.',
    metrics: [
      { label: 'Organic Traffic', value: '+340%', icon: ChartBarIcon, color: 'text-green-400' },
      { label: 'Keyword Rankings (Top 3)', value: '+450%', icon: StarIcon, color: 'text-blue-400' },
      { label: 'Lead Conversions', value: '+85%', icon: CurrencyDollarIcon, color: 'text-purple-400' },
      { label: 'Revenue Growth', value: '+220%', icon: ChartBarIcon, color: 'text-emerald-400' },
    ],
    timeframe: '6 months',
    investment: '$15,000',
    roi: '850%',
    testimonial: {
      text: "SEOBuddy transformed our online presence completely. Their data-driven approach doubled our organic leads in just six months. The ROI has been incredible - we're seeing 15x return on our investment.",
      author: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow Solutions",
      rating: 5,
      avatar: "SC"
    },
    imageUrl: '/placeholder-innovate.png'
  },
  {
    client: 'Luxe Apparel',
    industry: 'E-commerce Fashion',
    challenge: 'Fierce competition in online fashion, struggling to rank for key terms and low conversion rates.',
    solution: 'Developed comprehensive local SEO strategy, technical optimization, and content marketing campaign.',
    metrics: [
      { label: 'E-commerce Revenue', value: '+180%', icon: CurrencyDollarIcon, color: 'text-green-400' },
      { label: 'ROAS from SEO', value: '12:1', icon: ChartBarIcon, color: 'text-blue-400' },
      { label: 'Category Page Views', value: '+420%', icon: ChartBarIcon, color: 'text-purple-400' },
      { label: 'Local Search Rankings', value: '#1-3', icon: StarIcon, color: 'text-emerald-400' },
    ],
    timeframe: '8 months',
    investment: '$12,000',
    roi: '1200%',
    testimonial: {
      text: "We went from page 3 to #1 for our main keywords. The ROI has been incredible - 12x return on investment. Our local business has never been stronger.",
      author: "Marcus Rodriguez",
      role: "CEO",
      company: "Luxe Apparel",
      rating: 5,
      avatar: "MR"
    },
    imageUrl: '/placeholder-luxe.png'
  },
  {
    client: 'Artisan Collective',
    industry: 'Local Business',
    challenge: 'Limited online visibility and poor local search presence affecting foot traffic.',
    solution: 'Implemented comprehensive local SEO strategy, Google Business Profile optimization, and review management.',
    metrics: [
      { label: 'Local Search Visibility', value: '+280%', icon: ChartBarIcon, color: 'text-green-400' },
      { label: 'Foot Traffic', value: '+150%', icon: ChartBarIcon, color: 'text-blue-400' },
      { label: 'Phone Calls', value: '+200%', icon: CurrencyDollarIcon, color: 'text-purple-400' },
      { label: 'Google Reviews', value: '+85%', icon: StarIcon, color: 'text-emerald-400' },
    ],
    timeframe: '4 months',
    investment: '$8,500',
    roi: '650%',
    testimonial: {
      text: "Professional, transparent, and results-driven. SEOBuddy transformed our online presence completely. Our local visibility has skyrocketed.",
      author: "Jennifer Park",
      role: "Founder",
      company: "Artisan Collective",
      rating: 5,
      avatar: "JP"
    },
    imageUrl: '/placeholder-artisan.png'
  }
];

const parseMetric = (metricValue: string) => {
    const numberValue = parseFloat(metricValue.replace(/[^0-9.]/g, ''));
    const target = isNaN(numberValue) ? 0 : numberValue;
    const prefix = metricValue.match(/^[^\d.]*/)?.[0] || '';
    const suffix = metricValue.match(/[^0-9.][^0-9.]*$/)?.[0] || '';
    return { target, prefix, suffix };
};

const CaseStudies = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-gray-900 py-20 sm:py-28 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
            Proven Results, Tangible Growth
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-400 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, Open Sans, sans-serif' }}>
            We don&apos;t just promise rankings; we deliver measurable business outcomes that drive real revenue growth.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-6 w-6 text-yellow-400 mx-1" />
              ))}
            </div>
            <p className="text-2xl font-medium text-gray-200 italic mb-6">
              &quot;SEOBuddy transformed our online presence completely. Their data-driven approach doubled our organic leads in just six months. An essential partner for growth.&quot;
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-lg">Sarah Chen, Marketing Director</div>
                <div className="text-gray-500">TechFlow Solutions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div 
              key={study.client} 
              className={`group relative flex flex-col bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 border border-gray-700/50 hover:border-green-500/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="p-8 flex-grow">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase mb-2">{study.industry}</h3>
                  <h4 className="text-2xl font-bold text-white mb-2">{study.client}</h4>
                  <p className="text-gray-400 text-sm">{study.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-6 p-4 bg-gray-700/30 rounded-lg">
                  <h5 className="font-semibold text-white mb-2">Our Solution:</h5>
                  <p className="text-gray-300 text-sm">{study.solution}</p>
                </div>

                {/* Metrics */}
                <div className="mb-6">
                  <h5 className="font-semibold text-white mb-4">Key Results:</h5>
                  <div className="grid grid-cols-2 gap-4">
                    {study.metrics.map((metric) => {
                      const { target, prefix, suffix } = parseMetric(metric.value);
                      const MetricIcon = metric.icon;
                      return (
                        <div key={metric.label} className="text-center p-3 bg-gray-700/30 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <MetricIcon className={`h-4 w-4 ${metric.color}`} />
                          </div>
                          <p className="text-gray-400 text-xs mb-1">{metric.label}</p>
                          <AnimatedCounter 
                            target={target} 
                            prefix={prefix} 
                            suffix={suffix} 
                            className={`text-lg font-bold ${metric.color}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div className="p-3 bg-gray-700/30 rounded-lg">
                    <CalendarIcon className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Timeline</div>
                    <div className="text-sm font-semibold text-white">{study.timeframe}</div>
                  </div>
                  <div className="p-3 bg-gray-700/30 rounded-lg">
                    <CurrencyDollarIcon className="h-4 w-4 text-green-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Investment</div>
                    <div className="text-sm font-semibold text-white">{study.investment}</div>
                  </div>
                  <div className="p-3 bg-gray-700/30 rounded-lg">
                    <ChartBarIcon className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">ROI</div>
                    <div className="text-sm font-semibold text-white">{study.roi}</div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="p-4 bg-gray-700/20 rounded-lg border-l-4 border-green-400">
                  <p className="text-gray-300 text-sm italic mb-3">&quot;{study.testimonial.text}&quot;</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {study.testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{study.testimonial.author}</div>
                      <div className="text-gray-400 text-xs">{study.testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gray-700/50 p-4">
                <a
                  href={
                    study.client === 'TechFlow Solutions' ? '/case-studies/techflow-solutions' :
                    study.client === 'Luxe Apparel' ? '/case-studies/luxe-apparel' :
                    study.client === 'Artisan Collective' ? '/case-studies/artisan-collective' :
                    '#'
                  }
                  className="flex items-center justify-between text-green-400 font-semibold hover:text-green-300 transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Success Metrics Summary */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">Our Success Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">850%</div>
                <div className="text-gray-400">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">6.2</div>
                <div className="text-gray-400">Months to Results</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">95%</div>
                <div className="text-gray-400">Client Retention</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;