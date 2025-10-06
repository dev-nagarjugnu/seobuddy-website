'use client';

import { ShieldCheckIcon, PresentationChartLineIcon, LightBulbIcon, UsersIcon, ScaleIcon, ChatBubbleBottomCenterTextIcon, BeakerIcon, MagnifyingGlassCircleIcon, ChartBarIcon, ArrowTrendingUpIcon, StarIcon, TrophyIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Image from 'next/image';

const valuePropositions = [
  {
    name: 'Data-Driven Strategies',
    description: 'We use advanced analytics and AI-powered insights to make informed decisions, ensuring every action is backed by real data and delivers measurable results.',
    icon: PresentationChartLineIcon,
    color: 'blue',
    benefits: ['AI-powered keyword research', 'Predictive analytics', 'Real-time performance tracking', 'Competitive intelligence']
  },
  {
    name: 'Transparent Reporting',
    description: 'You get clear, comprehensive reports that show real progress, detailed insights, and a tangible return on your investment with monthly performance reviews.',
    icon: ShieldCheckIcon,
    color: 'green',
    benefits: ['Monthly detailed reports', 'Real-time dashboard access', 'ROI tracking', 'Performance benchmarks']
  },
  {
    name: 'Custom-Fit Solutions',
    description: 'No cookie-cutter plans. We tailor every SEO strategy to your unique business goals, market position, and competitive landscape.',
    icon: LightBulbIcon,
    color: 'purple',
    benefits: ['Industry-specific strategies', 'Competitor analysis', 'Custom content plans', 'Scalable solutions']
  },
  {
    name: 'Proactive Communication',
    description: 'You&apos;ll always be in the loop with a dedicated account manager, weekly updates, and direct access to our SEO experts.',
    icon: ChatBubbleBottomCenterTextIcon,
    color: 'orange',
    benefits: ['Dedicated account manager', 'Weekly progress calls', '24/7 support access', 'Regular strategy reviews']
  },
  {
    name: 'Ethical & Sustainable',
    description: 'We only use white-hat SEO techniques that build long-term authority, sustainable growth, and protect your brand reputation.',
    icon: ScaleIcon,
    color: 'indigo',
    benefits: ['White-hat techniques only', 'Long-term authority building', 'Brand protection', 'Future-proof strategies']
  },
  {
    name: 'Expert Team',
    description: 'Our team consists of certified professionals with 10+ years of experience, staying ahead of SEO trends and algorithm updates.',
    icon: UsersIcon,
    color: 'pink',
    benefits: ['Google certified experts', '10+ years experience', 'Continuous training', 'Industry thought leaders']
  },
];

const processSteps = [
    {
        name: 'Discovery & Audit',
        description: 'We start with a comprehensive analysis of your website, competitors, and industry to identify the biggest opportunities for growth.',
        icon: MagnifyingGlassCircleIcon,
        duration: '1-2 weeks',
        deliverables: ['Technical audit report', 'Competitor analysis', 'Keyword opportunity map', 'Action plan']
    },
    {
        name: 'Strategy & Planning',
        description: 'Next, we build a custom, goal-oriented SEO roadmap tailored to your specific business objectives and market conditions.',
        icon: BeakerIcon,
        duration: '2-3 weeks',
        deliverables: ['Custom SEO strategy', 'Content calendar', 'Link building plan', 'Timeline & milestones']
    },
    {
        name: 'Execution & Optimization',
        description: 'Our team implements the strategy with continuous optimization, A/B testing, and performance monitoring for maximum impact.',
        icon: ChartBarIcon,
        duration: 'Ongoing',
        deliverables: ['Technical implementation', 'Content optimization', 'Link building', 'Performance monitoring']
    },
    {
        name: 'Reporting & Growth',
        description: 'We provide transparent reports, refine our strategy based on data, and ensure sustained growth month after month.',
        icon: ArrowTrendingUpIcon,
        duration: 'Monthly',
        deliverables: ['Monthly performance reports', 'Strategy adjustments', 'ROI analysis', 'Growth recommendations']
    },
];

const teamCredentials = [
  {
    name: 'Emily Johnson',
    role: 'Founder & CEO',
    experience: '15+ years',
    certifications: ['Google Analytics', 'Moz Pro', 'HubSpot'],
    expertise: 'SEO Strategy, Leadership',
    imageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    name: 'Michael Thompson',
    role: 'Chief Strategy Officer',
    experience: '15+ years',
    certifications: ['Google Ads', 'SEMrush', 'Analytics'],
    expertise: 'Digital Strategy, Analytics',
    imageUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    name: 'Jessica Lee',
    role: 'Head of Technical SEO',
    experience: '12+ years',
    certifications: ['Google Developer', 'Core Web Vitals'],
    expertise: 'Technical SEO, Site Performance',
    imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'David Martinez',
    role: 'Director of Content & Outreach',
    experience: '10+ years',
    certifications: ['Content Marketing', 'Copywriting'],
    expertise: 'Content, Link Building',
    imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Ashley Brown',
    role: 'Senior SEO Analyst',
    experience: '8+ years',
    certifications: ['Google Analytics', 'Ahrefs'],
    expertise: 'Keyword Research, On-Page SEO',
    imageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
  },
  {
    name: 'Christopher Wilson',
    role: 'Lead Web Developer',
    experience: '10+ years',
    certifications: ['Webflow', 'React'],
    expertise: 'Web Development, Site Speed',
    imageUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    name: 'Olivia Davis',
    role: 'Client Success Manager',
    experience: '7+ years',
    certifications: ['HubSpot', 'Customer Success'],
    expertise: 'Client Relations, Communication',
    imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    name: 'James Anderson',
    role: 'PPC & Analytics Lead',
    experience: '9+ years',
    certifications: ['Google Ads', 'Google Analytics'],
    expertise: 'PPC, Analytics',
    imageUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
  },
];

const WhyChooseUs = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        
        <div className="lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600" style={{ color: '#1E40AF' }}>Why Partner With Us</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Dominate the SERPs
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 lg:mx-auto">
            We&apos;re more than just an agency; we&apos;re your dedicated partner in digital growth with proven expertise and transparent processes.
          </p>
        </div>

        <div className="mt-20">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {valuePropositions.map((feature, index) => {
              const colors = getColorClasses(feature.color);
              return (
                <div 
                  key={feature.name} 
                  className={`flex flex-col p-6 rounded-2xl transition-all duration-300 ${hoveredFeature === index ? 'bg-gray-50 shadow-lg scale-105' : 'hover:bg-gray-50'}`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}>
                      <feature.icon className={`h-6 w-6 ${colors.text}`} aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto mb-4">{feature.description}</p>
                    
                    {/* Benefits on Hover */}
                    {hoveredFeature === index && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Benefits:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {feature.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center">
                              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        {/* Team Credentials */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Meet Our Expert Team</h3>
            <p className="text-gray-600">Certified professionals with proven track records</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamCredentials.map((member) => (
              <div key={member.name} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover w-16 h-16 border-2 border-blue-200 shadow"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '';
                    }}
                  />
                  {/* Fallback initials if image fails (optional, can be improved with state) */}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-3">{member.experience} experience</p>
                <p className="text-gray-500 text-sm mb-4">{member.expertise}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.certifications.map((cert, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-200">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
                    Our Proven Process
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-600 max-w-3xl mx-auto">
                    A streamlined workflow designed for maximum impact, transparency, and sustainable growth.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-4 md:gap-x-8">
                {processSteps.map((step, index) => (
                    <div 
                      key={step.name} 
                      className={`text-center md:text-left p-6 rounded-2xl transition-all duration-300 ${selectedStep === index ? 'bg-blue-50 border-2 border-blue-200' : 'hover:bg-gray-50'}`}
                      onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                    >
                        <div className="flex items-center justify-center md:justify-start mb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-xl mr-4">
                                {index + 1}
                            </div>
                            <step.icon className="h-8 w-8 text-gray-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{step.name}</h3>
                        <p className="text-base text-gray-600 mb-3">{step.description}</p>
                        
                        {/* Step Details on Click */}
                        {selectedStep === index && (
                          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-gray-500">Duration:</span>
                              <span className="text-sm font-semibold text-gray-900">{step.duration}</span>
                            </div>
                            <div className="mb-3">
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Deliverables:</h4>
                              <ul className="space-y-1 text-xs text-gray-600">
                                {step.deliverables.map((deliverable, i) => (
                                  <li key={i} className="flex items-center">
                                    <CheckCircleIcon className="h-3 w-3 text-green-500 mr-2" />
                                    {deliverable}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Clients Choose SEOBuddy</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <StarIcon className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-gray-600">Client Rating</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrophyIcon className="h-8 w-8 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ClockIcon className="h-8 w-8 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">6.2</div>
                <div className="text-gray-600">Avg. Months to Results</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircleIcon className="h-8 w-8 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-gray-600">Client Retention</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;