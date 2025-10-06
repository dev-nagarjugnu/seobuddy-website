'use client';
// src/app/case-studies/artisan-collective/page.tsx

import { ChartBarIcon, StarIcon, CurrencyDollarIcon, CalendarIcon, ArrowTrendingUpIcon, CheckCircleIcon, SparklesIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

const metrics = [
  { label: 'Local Search Visibility', value: 280, suffix: '%', icon: ChartBarIcon, color: 'text-green-400' },
  { label: 'Foot Traffic', value: 150, suffix: '%', icon: ChartBarIcon, color: 'text-blue-400' },
  { label: 'Phone Calls', value: 200, suffix: '%', icon: CurrencyDollarIcon, color: 'text-purple-400' },
  { label: 'Google Reviews', value: 85, suffix: '%', icon: StarIcon, color: 'text-emerald-400' },
];

const timeline = [
  { title: 'Challenge', desc: 'Limited online visibility and poor local search presence affecting foot traffic.', icon: ExclamationIcon },
  { title: 'Strategy', desc: 'Local SEO, Google Business Profile optimization, and review management.', icon: SparklesIcon },
  { title: 'Results', desc: 'Skyrocketed local visibility and customer engagement.', icon: CheckCircleIcon },
];

function ExclamationIcon(props:any) {
  return <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-yellow-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}

function AnimatedCounter({ value, suffix, className }: { value: number, suffix?: string, className?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let incrementTime = 20;
    let step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return <span className={className}>{count}{suffix}</span>;
}

export default function ArtisanCollectiveCaseStudy() {
  return (
    <main className="bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 min-h-screen text-white pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-10 px-4 sm:px-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg mb-4 animate-fade-in">
              <span>A</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2 animate-fade-in">Artisan Collective</h1>
            <h2 className="text-lg text-green-400 font-semibold mb-2 animate-fade-in">Local Business</h2>
            <p className="text-gray-300 max-w-2xl mx-auto animate-fade-in">Limited online visibility and poor local search presence were hurting Artisan Collective's foot traffic. SEOBuddy delivered a local SEO transformation.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 animate-fade-in">
            <div className="flex items-center space-x-2 bg-gray-800/70 rounded-lg px-4 py-2">
              <CalendarIcon className="h-5 w-5 text-blue-400" />
              <span className="text-gray-400 text-sm">Timeline:</span>
              <span className="text-white font-semibold">4 months</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/70 rounded-lg px-4 py-2">
              <CurrencyDollarIcon className="h-5 w-5 text-green-400" />
              <span className="text-gray-400 text-sm">Investment:</span>
              <span className="text-white font-semibold">$8,500</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/70 rounded-lg px-4 py-2">
              <ChartBarIcon className="h-5 w-5 text-purple-400" />
              <span className="text-gray-400 text-sm">ROI:</span>
              <span className="text-white font-semibold">650%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Metrics */}
      <section className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in-up">
        {metrics.map((m) => (
          <div key={m.label} className="bg-gray-800/80 rounded-xl p-6 text-center shadow-lg">
            <m.icon className={`h-7 w-7 mx-auto mb-2 ${m.color}`} />
            <AnimatedCounter value={m.value} suffix={m.suffix} className={`text-3xl font-extrabold ${m.color}`} />
            <div className="text-gray-400 text-sm mt-1">{m.label}</div>
          </div>
        ))}
      </section>

      {/* Timeline Section */}
      <section className="max-w-3xl mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          {timeline.map((step, idx) => (
            <div key={step.title} className="flex flex-col items-center mb-8 md:mb-0 animate-fade-in-up">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center mb-2 shadow-lg">
                <step.icon className="h-7 w-7 text-white" />
              </div>
              <div className="text-lg font-bold text-white mb-1">{step.title}</div>
              <div className="text-gray-400 text-sm text-center max-w-xs">{step.desc}</div>
              {idx < timeline.length - 1 && (
                <div className="hidden md:block h-16 w-1 bg-gradient-to-b from-green-400 to-blue-400 my-2" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* What We Did */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h3 className="text-2xl font-bold mb-6 text-white">What We Did</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg animate-fade-in-up">
            <SparklesIcon className="h-8 w-8 text-blue-400 mb-2" />
            <div className="font-semibold text-white mb-1">Local SEO Strategy</div>
            <div className="text-gray-400 text-sm">Boosted local search rankings and visibility in Google Maps.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg animate-fade-in-up">
            <MapPinIcon className="h-8 w-8 text-green-400 mb-2" />
            <div className="font-semibold text-white mb-1">Google Profile Optimization</div>
            <div className="text-gray-400 text-sm">Enhanced Google Business Profile for maximum local impact.</div>
          </div>
          <div className="bg-gray-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg animate-fade-in-up">
            <PhoneIcon className="h-8 w-8 text-purple-400 mb-2" />
            <div className="font-semibold text-white mb-1">Review Management</div>
            <div className="text-gray-400 text-sm">Drove more positive reviews and improved reputation.</div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="max-w-2xl mx-auto px-4 mb-16 animate-fade-in">
        <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border-l-4 border-green-400 rounded-lg p-8 shadow-lg">
          <p className="text-lg italic text-gray-200 mb-4">"Professional, transparent, and results-driven. SEOBuddy transformed our online presence completely. Our local visibility has skyrocketed."</p>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-lg">JP</div>
            <div>
              <div className="text-white font-semibold">Jennifer Park</div>
              <div className="text-gray-400 text-sm">Founder, Artisan Collective</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center z-40 animate-fade-in-up pointer-events-none">
        <a href="/contact" className="pointer-events-auto inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:from-green-500 hover:to-blue-600 transition-all text-lg animate-bounce">Boost Your Local Business</a>
      </div>
    </main>
  );
} 