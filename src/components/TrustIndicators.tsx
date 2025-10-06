'use client';

import { StarIcon, ChartBarIcon, RocketLaunchIcon, CheckCircleIcon, TrophyIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import LogoCarousel from './LogoCarousel';

const TrustIndicators = () => {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    websitesOptimized: 0,
    trafficIncrease: 0,
    rating: 0,
    clientsRetention: 0,
    keywordsRanked: 0,
    roiAverage: 0
  });

  useEffect(() => {
    // Animate metrics on mount
    const timer = setTimeout(() => {
      setAnimatedMetrics({
        websitesOptimized: 500,
        trafficIncrease: 150,
        rating: 4.9,
        clientsRetention: 98,
        keywordsRanked: 25000,
        roiAverage: 850
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const certifications = [
    { name: "Google Partner", icon: "🔍", description: "Certified Google Partner" },
    { name: "Bing Ads", icon: "🔎", description: "Microsoft Advertising Partner" },
    { name: "HubSpot", icon: "📈", description: "HubSpot Certified Agency" },
    { name: "SEMrush", icon: "📊", description: "SEMrush Certified Partner" }
  ];

  const awards = [
    { name: "Best SEO Agency 2024", source: "Digital Marketing Awards", icon: TrophyIcon },
    { name: "Excellence in Growth", source: "Business Growth Awards", icon: AcademicCapIcon },
    { name: "Top 10 SEO Companies", source: "Clutch.co", icon: StarIcon }
  ];

  return (
    <section className="bg-gray-900 py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-green-400 tracking-widest uppercase mb-2">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join 500+ businesses that trust SEOBuddy to drive their digital growth
          </p>
        </div>

        {/* Enhanced Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center mb-16">
          <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
            <RocketLaunchIcon className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <div className="text-4xl font-extrabold text-white mb-2">
              {animatedMetrics.websitesOptimized.toLocaleString()}+
            </div>
            <p className="text-gray-400">Websites Optimized</p>
            <p className="text-green-400 text-sm mt-2">Last 12 months</p>
          </div>
          
          <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
            <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-blue-400" />
            <div className="text-4xl font-extrabold text-white mb-2">
              {animatedMetrics.trafficIncrease}%
            </div>
            <p className="text-gray-400">Average Traffic Increase</p>
            <p className="text-blue-400 text-sm mt-2">Across all clients</p>
          </div>
          
          <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300 hover:scale-105">
            <StarIcon className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <div className="text-4xl font-extrabold text-white mb-2">
              {animatedMetrics.rating}/5
            </div>
            <p className="text-gray-400">Google & Clutch Rating</p>
            <p className="text-yellow-400 text-sm mt-2">Based on 200+ reviews</p>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
            <CheckCircleIcon className="h-12 w-12 mx-auto mb-4 text-purple-400" />
            <div className="text-4xl font-extrabold text-white mb-2">
              {animatedMetrics.clientsRetention}%
            </div>
            <p className="text-gray-400">Client Retention Rate</p>
            <p className="text-purple-400 text-sm mt-2">Long-term partnerships</p>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 hover:scale-105">
            <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-indigo-400" />
            <div className="text-4xl font-extrabold text-white mb-2">
              {animatedMetrics.keywordsRanked.toLocaleString()}+
            </div>
            <p className="text-gray-400">Keywords Ranked</p>
            <p className="text-indigo-400 text-sm mt-2">Top 3 positions</p>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-2xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105">
            <TrophyIcon className="h-12 w-12 mx-auto mb-4 text-emerald-400" />
            <div className="text-4xl font-extrabold text-white mb-2">
              {animatedMetrics.roiAverage}%
            </div>
            <p className="text-gray-400">Average ROI</p>
            <p className="text-emerald-400 text-sm mt-2">Return on investment</p>
          </div>
        </div>

        {/* Certifications & Awards */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-2">Certifications & Awards</h3>
            <p className="text-gray-400">Recognized excellence in digital marketing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Certifications */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
              <h4 className="text-lg font-semibold text-white mb-4">Industry Certifications</h4>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-2xl">{cert.icon}</span>
                    <div>
                      <div className="text-white font-medium text-sm">{cert.name}</div>
                      <div className="text-gray-400 text-xs">{cert.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
              <h4 className="text-lg font-semibold text-white mb-4">Recent Awards</h4>
              <div className="space-y-4">
                {awards.map((award) => (
                  <div key={award.name} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                    <award.icon className="h-6 w-6 text-yellow-400" />
                    <div>
                      <div className="text-white font-medium text-sm">{award.name}</div>
                      <div className="text-gray-400 text-xs">{award.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Client Logos Carousel */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-2">Trusted by Leading Brands</h3>
            <p className="text-gray-400">From startups to Fortune 500 companies</p>
          </div>
          <LogoCarousel />
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-gray-800/50 rounded-2xl px-8 py-4 border border-gray-700/50">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <span className="text-white text-sm">SSL Secured</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <span className="text-white text-sm">GDPR Compliant</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <span className="text-white text-sm">24/7 Support</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustIndicators;