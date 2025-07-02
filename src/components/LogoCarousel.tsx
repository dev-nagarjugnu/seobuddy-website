// src/components/LogoCarousel.tsx

"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// We'll use simple text placeholders for logos.
const clientLogos = ['Client A', 'Logo B', 'Brand C', 'Org D', 'Company E', 'Partner F', 'Acme G'];

const LogoCarousel = () => {
  // The { loop: true } option creates the infinite scroll effect.
  // Autoplay() plugin makes it scroll automatically.
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 2000 })]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {clientLogos.map((logo, index) => (
          <div className="flex-grow-0 flex-shrink-0 basis-1/3 md:basis-1/4 lg:basis-1/5 min-w-0 pl-4" key={index}>
            <div className="flex items-center justify-center h-24">
              <span className="text-2xl font-semibold text-gray-500">{logo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;