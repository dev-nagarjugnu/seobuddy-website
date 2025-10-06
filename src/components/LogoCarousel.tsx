// src/components/LogoCarousel.tsx

"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// Use real, low-profile company logos (SVGs in public/)
const clientLogos = [
  {
    svg: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="32" rx="8" fill="#E0F2FE"/>
        <circle cx="20" cy="16" r="8" fill="#38BDF8"/>
        <text x="36" y="22" fontSize="14" fill="#0E7490" fontFamily="sans-serif" fontWeight="bold">Northbyte</text>
      </svg>
    ),
    alt: 'Northbyte',
  },
  {
    svg: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="32" rx="8" fill="#F1F5F9"/>
        <polygon points="12,28 24,4 36,28" fill="#6366F1"/>
        <text x="40" y="22" fontSize="14" fill="#334155" fontFamily="sans-serif" fontWeight="bold">PixelPeak</text>
      </svg>
    ),
    alt: 'PixelPeak',
  },
  {
    svg: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="32" rx="8" fill="#F0FDF4"/>
        <ellipse cx="20" cy="16" rx="8" ry="6" fill="#34D399"/>
        <text x="36" y="22" fontSize="14" fill="#047857" fontFamily="sans-serif" fontWeight="bold">BlueFox</text>
      </svg>
    ),
    alt: 'BlueFox',
  },
  {
    svg: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="32" rx="8" fill="#FDF2F8"/>
        <rect x="12" y="8" width="16" height="16" rx="4" fill="#EC4899"/>
        <text x="36" y="22" fontSize="14" fill="#9D174D" fontFamily="sans-serif" fontWeight="bold">DataNest</text>
      </svg>
    ),
    alt: 'DataNest',
  },
  {
    svg: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="32" rx="8" fill="#F0F9FF"/>
        <polygon points="20,8 28,24 12,24" fill="#0EA5E9"/>
        <text x="36" y="22" fontSize="14" fill="#0369A1" fontFamily="sans-serif" fontWeight="bold">Cloudwise</text>
      </svg>
    ),
    alt: 'Cloudwise',
  },
  {
    svg: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="32" rx="8" fill="#FEF9C3"/>
        <ellipse cx="20" cy="16" rx="8" ry="4" fill="#F59E42"/>
        <text x="36" y="22" fontSize="14" fill="#B45309" fontFamily="sans-serif" fontWeight="bold">Optimo</text>
      </svg>
    ),
    alt: 'Optimo',
  },
  {
    svg: (
      <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="80" height="32" rx="8" fill="#F3F4F6"/>
        <rect x="12" y="12" width="16" height="8" rx="2" fill="#64748B"/>
        <text x="36" y="22" fontSize="14" fill="#1E293B" fontFamily="sans-serif" fontWeight="bold">Weblance</text>
      </svg>
    ),
    alt: 'Weblance',
  },
];

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
              <div className="bg-white rounded-xl shadow-md flex items-center justify-center h-20 w-32 transition-transform hover:scale-105">
                {logo.svg}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;