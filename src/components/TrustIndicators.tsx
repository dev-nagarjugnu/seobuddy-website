// src/components/TrustIndicators.tsx

import { StarIcon, ChartBarIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';
import LogoCarousel from './LogoCarousel'; // 1. Import the new component

const TrustIndicators = () => {
  return (
    <section className="bg-gray-900 py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-green-400 tracking-widest uppercase">
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
          <div className="p-8 bg-gray-800/50 rounded-xl">
            <RocketLaunchIcon className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <div className="text-4xl font-extrabold text-white">500+</div>
            <p className="text-gray-400 mt-2">Websites Optimized</p>
          </div>
          <div className="p-8 bg-gray-800/50 rounded-xl">
            <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <div className="text-4xl font-extrabold text-white">150%</div>
            <p className="text-gray-400 mt-2">Average Traffic Increase</p>
          </div>
          <div className="p-8 bg-gray-800/50 rounded-xl">
            <StarIcon className="h-12 w-12 mx-auto mb-4 text-orange-400" />
            <div className="text-4xl font-extrabold text-white">4.9/5</div>
            <p className="text-gray-400 mt-2">Google & Clutch Rating</p>
          </div>
        </div>
        
        {/* Client Logos Carousel */}
        {/* 2. Replace the old placeholder with this component */}
        <div className="mt-12">
            <LogoCarousel />
        </div>

      </div>
    </section>
  );
};

export default TrustIndicators;