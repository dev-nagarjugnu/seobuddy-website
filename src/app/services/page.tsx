"use client";
// src/app/services/page.tsx

import { 
  CheckBadgeIcon, 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  GlobeAltIcon, 
  MapPinIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  TrophyIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  ChevronRightIcon,
  PlayIcon
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const services = [
  {
    name: "Technical SEO",
    description: "We perform comprehensive site audits, optimize for speed, and enhance crawlability to build a rock-solid foundation that search engines love.",
    features: ["Core Web Vitals Optimization", "Schema Markup Implementation", "XML Sitemap & Robots.txt", "Site Architecture Review"],
    icon: ChartBarIcon,
    color: "bg-blue-500",
    id: "technical",
    price: "From $2,500",
    timeframe: "4-6 weeks"
  },
  {
    name: "On-Page SEO",
    description: "Our team dives deep into content optimization, keyword research, and meta tag strategies to make every page on your site an SEO powerhouse.",
    features: ["In-depth Keyword Research", "Content Gap Analysis", "Meta Title & Description Crafting", "Internal Linking Strategy"],
    icon: MagnifyingGlassIcon,
    color: "bg-green-500",
    id: "on-page",
    price: "From $1,800",
    timeframe: "3-4 weeks"
  },
  {
    name: "Off-Page SEO",
    description: "We build your website's authority and credibility across the web through high-quality link building, strategic outreach, and brand mentions.",
    features: ["Ethical Link Building", "Digital PR & Outreach", "Brand Authority Building", "Competitor Backlink Analysis"],
    icon: GlobeAltIcon,
    color: "bg-purple-500",
    id: "off-page",
    price: "From $3,200",
    timeframe: "6-8 weeks"
  },
  {
    name: "Local SEO",
    description: "Dominate the local search landscape. We optimize your Google Business Profile, build local citations, and manage your online reputation to attract local customers.",
    features: ["Google Business Profile (GBP) Management", "Local Citation Building", "Review Generation Strategy", "Local Keyword Targeting"],
    icon: MapPinIcon,
    color: "bg-orange-500",
    id: "local",
    price: "From $1,500",
    timeframe: "3-5 weeks"
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "SEO Buddy transformed our online presence. We went from page 3 to #1 for our main keywords in just 4 months. Our organic traffic increased by 340%!",
    rating: 5,
    company: "TechStart Inc."
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, LocalBiz",
    content: "The local SEO work was incredible. We're now ranking #1 for all our local searches and getting 5x more qualified leads. ROI was 1200% in the first year.",
    rating: 5,
    company: "LocalBiz"
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, EcoProducts",
    content: "Professional, transparent, and results-driven. SEO Buddy helped us dominate our niche and increase sales by 280%. Highly recommend!",
    rating: 5,
    company: "EcoProducts"
  }
];

const caseStudies = [
  {
    title: "E-commerce Site: 450% Traffic Increase",
    industry: "Fashion Retail",
    results: ["450% increase in organic traffic", "From page 8 to #1 for main keywords", "320% increase in conversions", "ROI: 890% in 6 months"],
    image: "/case-study-1.jpg"
  },
  {
    title: "Local Business: Complete Market Domination",
    industry: "Dental Practice",
    results: ["#1 ranking for all local searches", "500% increase in phone calls", "Fully booked within 3 months", "ROI: 1500% in first year"],
    image: "/case-study-2.jpg"
  },
  {
    title: "SaaS Platform: Global SEO Success",
    industry: "B2B Software",
    results: ["200% increase in qualified leads", "Ranking in 15+ countries", "40% reduction in CAC", "ROI: 650% in 8 months"],
    image: "/case-study-3.jpg"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Comprehensive Audit",
    description: "We analyze your current SEO performance, identify opportunities, and create a strategic roadmap for success."
  },
  {
    step: "02",
    title: "Strategic Planning",
    description: "Based on your goals and competition, we develop a customized SEO strategy tailored to your business."
  },
  {
    step: "03",
    title: "Implementation",
    description: "Our experts execute the plan with precision, optimizing every aspect of your website for search engines."
  },
  {
    step: "04",
    title: "Monitoring & Optimization",
    description: "We continuously monitor performance, make data-driven adjustments, and scale successful strategies."
  }
];

const faqs = [
  {
    question: "How long does it take to see results?",
    answer: "While every project is different, most clients see initial improvements within 4-6 weeks. Significant traffic increases typically occur within 3-6 months of consistent optimization."
  },
  {
    question: "Do you guarantee #1 rankings?",
    answer: "We don't guarantee specific rankings, but we do guarantee improvement in your organic traffic and search visibility. Our track record shows 95% of clients achieve top 3 rankings for their target keywords."
  },
  {
    question: "What makes you different from other SEO agencies?",
    answer: "We combine data-driven strategies with white-hat techniques, provide transparent reporting, and focus on sustainable long-term growth rather than quick wins that could harm your site."
  },
  {
    question: "Do you work with small businesses?",
    answer: "Absolutely! We have packages designed for businesses of all sizes. Our local SEO services are particularly effective for small businesses looking to dominate their local market."
  },
  {
    question: "How do you measure success?",
    answer: "We track multiple KPIs including organic traffic, keyword rankings, conversion rates, and ROI. You'll receive detailed monthly reports showing your progress and the impact on your business."
  }
];

const stats = [
  { number: "95%", label: "Client Retention Rate" },
  { number: "450%", label: "Average Traffic Increase" },
  { number: "15+", label: "Years Experience" },
  { number: "500+", label: "Successful Projects" }
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('technical');

  const serviceSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Technical SEO',
      'description': 'Site audits, speed optimization, and crawlability fixes to build a strong foundation.',
      'provider': {
        '@type': 'Organization',
        'name': 'SEOBuddy',
        'url': 'https://yourdomain.com/'
      },
      'areaServed': 'US',
      'serviceType': 'Technical SEO',
      'offers': {
        '@type': 'Offer',
        'price': '2500',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
        'url': 'https://yourdomain.com/services/technical-seo'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'On-Page SEO',
      'description': 'In-depth content optimization, keyword research, and meta tag strategies.',
      'provider': {
        '@type': 'Organization',
        'name': 'SEOBuddy',
        'url': 'https://yourdomain.com/'
      },
      'areaServed': 'US',
      'serviceType': 'On-Page SEO',
      'offers': {
        '@type': 'Offer',
        'price': '3500',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
        'url': 'https://yourdomain.com/services/on-page-seo'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Off-Page SEO',
      'description': 'High-quality link building, outreach, and authority building to boost your domain.',
      'provider': {
        '@type': 'Organization',
        'name': 'SEOBuddy',
        'url': 'https://yourdomain.com/'
      },
      'areaServed': 'US',
      'serviceType': 'Off-Page SEO',
      'offers': {
        '@type': 'Offer',
        'price': '4500',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
        'url': 'https://yourdomain.com/services/off-page-seo'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Local SEO',
      'description': 'Dominate local search with Google Business Profile optimization and citations.',
      'provider': {
        '@type': 'Organization',
        'name': 'SEOBuddy',
        'url': 'https://yourdomain.com/'
      },
      'areaServed': 'US',
      'serviceType': 'Local SEO',
      'offers': {
        '@type': 'Offer',
        'price': '2000',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
        'url': 'https://yourdomain.com/services/local-seo'
      }
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <>
      <Head>
        {serviceSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
          <div className="relative container mx-auto px-6 py-24 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
                Professional SEO Services
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Transform your online presence with data-driven SEO strategies that deliver sustainable growth and dominate search rankings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center">
                  Get Free Audit
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-gray-900 flex items-center">
                  <PlayIcon className="mr-2 h-5 w-5" />
                  Watch Case Study
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive SEO Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From technical optimization to content strategy, we provide end-to-end SEO services that drive real business results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 z-10">
              {services.map((service) => {
                let link = '#';
                if (service.id === 'technical') link = '/services/technical-seo';
                if (service.id === 'on-page') link = '/services/on-page-seo';
                if (service.id === 'off-page') link = '/services/off-page-seo';
                if (service.id === 'local') link = '/services/local-seo';
                return (
                  <Link href={link} key={service.id} className="group flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden z-10 outline outline-2 outline-red-500">
                    <div>
                      <div className={`${service.color} p-6 text-white`}>
                        <service.icon className="h-12 w-12" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="space-y-2 mb-6">
                          {service.features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckBadgeIcon className="h-4 w-4 text-green-500 mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-4">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{service.price}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {service.timeframe}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Remove the Learn More button; the whole card is now a link */}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Proven Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We follow a systematic approach that ensures consistent, sustainable results for every client.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ChevronRightIcon className="h-8 w-8 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Results, Real Clients</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how we've transformed businesses across different industries with our SEO strategies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <TrophyIcon className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-xl font-bold">{study.industry}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{study.title}</h3>
                    <ul className="space-y-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our clients have to say about their results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-blue-600">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get answers to the most common questions about our SEO services.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100">
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      <ChevronRightIcon className="h-5 w-5 text-gray-500 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Dominate Search Rankings?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses that have transformed their online presence with our proven SEO strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Get Your Free SEO Audit
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600">
                Schedule a Consultation
              </button>
            </div>
            <p className="text-sm mt-6 opacity-90">
              No commitment required • 30-minute consultation • Custom strategy plan
            </p>
          </div>
        </section>
      </div>
    </>
  );
}