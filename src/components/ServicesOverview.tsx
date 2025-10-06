'use client';

import { WrenchScrewdriverIcon, MagnifyingGlassIcon, LinkIcon, MapPinIcon, ChartBarIcon, RocketLaunchIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Link from 'next/link';

const services = [
  {
    name: 'Technical SEO',
    description: 'Site audits, speed optimization, and crawlability fixes to build a strong foundation.',
    icon: WrenchScrewdriverIcon,
    color: 'blue',
    features: ['Core Web Vitals Optimization', 'Schema Markup Implementation', 'XML Sitemap Generation', 'Robots.txt Optimization'],
    benefits: ['Faster page load times', 'Better search engine crawling', 'Improved user experience', 'Higher conversion rates'],
    timeframe: '2-4 weeks',
    price: 'From $2,500'
  },
  {
    name: 'On-Page SEO',
    description: 'In-depth content optimization, keyword research, and meta tag strategies.',
    icon: MagnifyingGlassIcon,
    color: 'green',
    features: ['Keyword Research & Analysis', 'Content Optimization', 'Meta Tag Optimization', 'Internal Linking Strategy'],
    benefits: ['Higher search rankings', 'Increased organic traffic', 'Better content visibility', 'Improved click-through rates'],
    timeframe: '4-6 weeks',
    price: 'From $3,500'
  },
  {
    name: 'Off-Page SEO',
    description: 'High-quality link building, outreach, and authority building to boost your domain.',
    icon: LinkIcon,
    color: 'purple',
    features: ['Link Building Strategy', 'Guest Post Outreach', 'PR & Media Relations', 'Brand Mention Monitoring'],
    benefits: ['Enhanced domain authority', 'Increased referral traffic', 'Better brand visibility', 'Stronger online presence'],
    timeframe: '6-8 weeks',
    price: 'From $4,500'
  },
  {
    name: 'Local SEO',
    description: 'Dominate local search with Google Business Profile optimization and citations.',
    icon: MapPinIcon,
    color: 'orange',
    features: ['Google Business Profile Setup', 'Local Citation Building', 'Review Management', 'Local Content Strategy'],
    benefits: ['Higher local rankings', 'More foot traffic', 'Increased phone calls', 'Better local visibility'],
    timeframe: '3-5 weeks',
    price: 'From $2,000'
  }
];

const additionalServices = [
  {
    name: 'Content Marketing',
    description: 'Strategic content creation that ranks and converts.',
    icon: ChartBarIcon,
    color: 'indigo'
  },
  {
    name: 'E-commerce SEO',
    description: 'Specialized optimization for online stores.',
    icon: RocketLaunchIcon,
    color: 'pink'
  },
  {
    name: 'International SEO',
    description: 'Global reach with multi-language optimization.',
    icon: GlobeAltIcon,
    color: 'cyan'
  },
  {
    name: 'SEO Consulting',
    description: 'Expert guidance for in-house teams.',
    icon: ShieldCheckIcon,
    color: 'emerald'
  }
];

const ServicesOverview = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string; hover: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', hover: 'hover:border-blue-300' },
      green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', hover: 'hover:border-green-300' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200', hover: 'hover:border-purple-300' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', hover: 'hover:border-orange-300' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200', hover: 'hover:border-indigo-300' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200', hover: 'hover:border-pink-300' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-200', hover: 'hover:border-cyan-300' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200', hover: 'hover:border-emerald-300' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
            Comprehensive SEO Solutions
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, Open Sans, sans-serif' }}>
            From technical optimization to content strategy, we provide end-to-end SEO services that drive measurable results and sustainable growth.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color);
              return (
                <div 
                  key={service.name} 
                  className={`text-center p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-2 ${colors.border} ${colors.hover} cursor-pointer`}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => setSelectedService(selectedService === index ? null : index)}
                >
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${colors.bg} mb-6 transition-transform duration-300 ${hoveredService === index ? 'scale-110' : ''}`}>
                    <service.icon className={`h-8 w-8 ${colors.text}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-base text-gray-600 mb-4">{service.description}</p>
                  
                  {/* Service Details */}
                  <div className="text-left space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Timeline:</span>
                      <span className="font-semibold text-gray-900">{service.timeframe}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Starting at:</span>
                      <span className="font-semibold text-gray-900">{service.price}</span>
                    </div>
                  </div>

                  {/* Features on Hover */}
                  {hoveredService === index && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">What&apos;s Included:</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {selectedService === index && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Key Benefits:</h4>
                      <ul className="space-y-2 text-xs text-gray-600 mb-4">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <div className="w-1 h-1 bg-green-500 rounded-full mr-2 mt-1.5"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={
                          index === 0 ? '/services/technical-seo' :
                          index === 1 ? '/services/on-page-seo' :
                          index === 2 ? '/services/off-page-seo' :
                          index === 3 ? '/services/local-seo' : '#'
                        }
                        className="w-full inline-block bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center mt-2"
                      >
                        Learn More
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Specialized Services</h3>
            <p className="text-gray-600">Tailored solutions for specific business needs</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service, index) => {
              const colors = getColorClasses(service.color);
              return (
                <div 
                  key={service.name} 
                  className={`p-6 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg border ${colors.border} ${colors.hover} cursor-pointer`}
                  onMouseEnter={() => setHoveredService(index + 4)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg} mb-4 transition-transform duration-300 ${hoveredService === index + 4 ? 'scale-110' : ''}`}>
                    <service.icon className={`h-6 w-6 ${colors.text}`} aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;