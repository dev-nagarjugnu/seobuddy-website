'use client';

import { PlayIcon, EyeIcon, ArrowRightIcon, ChartBarIcon, RocketLaunchIcon, GlobeAltIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NUM_PARTICLES = 20;
const NUM_BARS = 8;

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const [liveMetrics, setLiveMetrics] = useState({
    clientsServed: 0,
    rankingsImproved: 0,
    trafficGrowth: 0
  });

  const features = [
    { icon: ChartBarIcon, text: "Data-Driven Insights", color: "text-green-400", description: "AI-powered analytics" },
    { icon: RocketLaunchIcon, text: "Rapid Results", color: "text-blue-400", description: "See improvements in 30 days" },
    { icon: GlobeAltIcon, text: "Global Reach", color: "text-purple-400", description: "International SEO expertise" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow Solutions",
      text: "SEOBuddy increased our organic traffic by 340% in just 6 months. Their data-driven approach is unmatched.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO",
      company: "EcoVentures",
      text: "We went from page 3 to #1 for our main keywords. The ROI has been incredible - 15x return on investment.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Jennifer Park",
      role: "Founder",
      company: "Artisan Collective",
      text: "Professional, transparent, and results-driven. SEOBuddy transformed our online presence completely.",
      rating: 5,
      avatar: "JP"
    }
  ];

  const FeatureIcon = features[currentFeature].icon;

  useEffect(() => {
    setIsVisible(true);
    
    // Feature rotation
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    // Testimonial rotation
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Live metrics animation
    const metricsInterval = setInterval(() => {
      setLiveMetrics(prev => ({
        clientsServed: Math.min(prev.clientsServed + Math.floor(Math.random() * 3), 500),
        rankingsImproved: Math.min(prev.rankingsImproved + Math.floor(Math.random() * 5), 2000),
        trafficGrowth: Math.min(prev.trafficGrowth + Math.floor(Math.random() * 2), 150)
      }));
    }, 2000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(testimonialInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  // Generate particles and bar heights only on client after mount
  useEffect(() => {
    const generatedParticles = Array.from({ length: NUM_PARTICLES }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(generatedParticles);

    const generatedHeights = Array.from({ length: NUM_BARS }, () => 60 + Math.random() * 40);
    setBarHeights(generatedHeights);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* Left Side: Enhanced Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            {/* Enhanced Trust Badge */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-4 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-green-400 text-sm font-medium">Trusted by 500+ Businesses Worldwide</span>
            </div>

            {/* Main Heading with Enhanced Animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
              Dominate Search Results with{' '}
              <span className="relative">
                <span className="text-green-400 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  AI-Powered SEO
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              </span>
            </h1>

            {/* Enhanced Subtitle with Dynamic Content */}
            <p className={`text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-5 transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ fontFamily: 'Inter, Open Sans, sans-serif' }}>
              We combine cutting-edge AI technology with proven SEO strategies to deliver{' '}
              <span className="text-green-400 font-semibold">measurable business growth</span> and dominate search results.
            </p>

            {/* Enhanced Feature Rotator with Description */}
            <div className={`mb-5 transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                <FeatureIcon className={`h-5 w-5 ${features[currentFeature].color}`} />
                <span className={`text-lg font-medium ${features[currentFeature].color}`}>
                  {features[currentFeature].text}
                </span>
              </div>
              <p className="text-sm text-gray-400">{features[currentFeature].description}</p>
            </div>

            {/* Live Metrics Display */}
            <div className={`mb-5 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{liveMetrics.clientsServed}+</div>
                <div className="text-xs text-gray-400">Clients Served</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{liveMetrics.rankingsImproved}+</div>
                <div className="text-xs text-gray-400">Rankings Improved</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{liveMetrics.trafficGrowth}%</div>
                <div className="text-xs text-gray-400">Avg. Traffic Growth</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className={`flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link href="/seo-audit" className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25">
                <PlayIcon className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                Get Free SEO Audit
                <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/case-studies" className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-base font-semibold rounded-xl text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/25">
                <EyeIcon className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                View Case Studies
              </Link>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className={`mt-8 flex items-center justify-center lg:justify-start space-x-6 transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <Image src="https://randomuser.me/api/portraits/women/68.jpg" alt="Priya Sharma, Business Owner" title="Priya Sharma – Business Owner" width={32} height={32} className="rounded-full border-2 border-white" />
                  <Image src="https://randomuser.me/api/portraits/men/71.jpg" alt="David Chen, SaaS Founder" title="David Chen – SaaS Founder" width={32} height={32} className="rounded-full border-2 border-white" />
                  <Image src="https://randomuser.me/api/portraits/women/12.jpg" alt="Maria Garcia, E-commerce Manager" title="Maria Garcia – E-commerce Manager" width={32} height={32} className="rounded-full border-2 border-white" />
                  <Image src="https://randomuser.me/api/portraits/men/41.jpg" alt="James Anderson, Marketing Director" title="James Anderson – Marketing Director" width={32} height={32} className="rounded-full border-2 border-white" />
                </div>
                <span className="text-sm text-gray-300">500+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-300">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Side: Enhanced Visual with Testimonials */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end pointer-events-none">
            <div className={`relative transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
              {/* Main Dashboard Card */}
              <div 
                className="relative w-full max-w-lg h-80 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-xl overflow-hidden group hover:scale-105 transition-all duration-500 pointer-events-none"
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Dashboard Content */}
                <div className="relative p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">SEO Dashboard</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Chart Placeholder */}
                  <div className="flex-1 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-4 mb-4">
                    <div className="h-full flex items-end space-x-2">
                      {barHeights.map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-green-400 to-emerald-400 rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">+247%</div>
                      <div className="text-xs text-gray-400">Traffic Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">#1</div>
                      <div className="text-xs text-gray-400">Google Ranking</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">98%</div>
                      <div className="text-xs text-gray-400">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Testimonial Card */}
              <div className="absolute -top-4 -right-4 w-64 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg pointer-events-none">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-400 text-xs">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">&quot;{testimonials[currentTestimonial].text}&quot;</p>
                <div className="flex items-center mt-2">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <StarIcon key={i} className="h-3 w-3 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl shadow-lg animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;