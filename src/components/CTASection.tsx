'use client';

import { StarIcon, CheckCircleIcon, ClockIcon, ShieldCheckIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CTASection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    website: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setFormData({ fullName: '', email: '', website: '', company: '' });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const testimonials = [
    {
      text: "Got our free audit and was blown away by the insights. Increased our traffic by 200% in 3 months!",
      author: "Alex Thompson",
      role: "Marketing Manager",
      company: "TechStart Inc."
    },
    {
      text: "The free SEO audit revealed opportunities we never knew existed. ROI has been incredible.",
      author: "Maria Garcia",
      role: "CEO",
      company: "EcoVentures"
    }
  ];

  const benefits = [
    "Comprehensive website analysis",
    "Keyword opportunity report",
    "Technical SEO audit",
    "Competitor analysis",
    "Action plan with priorities",
    "30-minute consultation call"
  ];

  return (
    <section className="relative bg-gray-800">
      {/* Decorative gradient */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-gray-900 to-gray-800 pointer-events-none"></div>

      <div className="relative container mx-auto px-6 py-20 sm:py-28">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-700/50">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Column: Enhanced Text Content */}
            <div className="p-8 md:p-12 lg:p-16">
              <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
                  Get Your Free SEO Audit
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Ready to transform your online presence? Enter your website URL to get a comprehensive, no-obligation SEO analysis and discover your biggest growth opportunities.
                </p>
                
                {/* Enhanced Social Proof */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5" />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-gray-400">Trusted by over 500+ businesses</p>
                  </div>
                  
                  {/* Trust Badges */}
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <ShieldCheckIcon className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">SSL Secured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">No Spam</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">24h Response</span>
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">What You&apos;ll Get:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                      <p className="text-gray-300 text-sm italic mb-3">&quot;{testimonial.text}&quot;</p>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{testimonial.author}</div>
                          <div className="text-gray-400 text-xs">{testimonial.role} at {testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Enhanced Form */}
            <div className="p-8 md:p-12 lg:p-16 bg-gray-800/50">
              <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Start Your Free Analysis</h3>
                  <p className="text-gray-400 text-sm">Get your comprehensive SEO audit in 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-lg border-0 bg-white/5 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-lg border-0 bg-white/5 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                      Website URL *
                    </label>
                    <input
                      type="url"
                      name="website"
                      id="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-lg border-0 bg-white/5 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 transition-all duration-300"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border-0 bg-white/5 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center items-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-green-600 hover:to-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Get My Free SEO Audit
                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </button>
                </form>

                {/* Additional Trust Signals */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-400 mb-3">🔒 Your information is secure and will never be shared</p>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                    <span>✓ No credit card required</span>
                    <span>✓ 100% free</span>
                    <span>✓ No obligation</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Urgency Banner */}
        <div className="mt-12 mb-8 flex justify-center">
          <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-500/30 rounded-full px-8 py-3">
            <ClockIcon className="h-4 w-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">Limited Time: Free audit reports delivered within 24 hours</span>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 py-16 px-4 sm:px-12 text-center rounded-3xl shadow-lg mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Ready to Transform Your SEO?</h2>
          <p className="text-lg text-white mb-10 max-w-2xl mx-auto">Get a free consultation and discover how our comprehensive SEO approach can drive real business growth.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact" className="inline-block bg-white text-blue-700 font-semibold px-10 py-5 rounded-lg shadow hover:bg-blue-50 transition text-lg">Get Free Consultation</Link>
            <Link href="/case-studies" className="inline-block bg-white text-blue-700 font-semibold px-10 py-5 rounded-lg shadow hover:bg-blue-50 transition text-lg">View Case Studies</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;