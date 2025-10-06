// src/app/page.tsx

import HeroSection from '@/components/HeroSection';
import ServicesOverview from '@/components/ServicesOverview';
import CaseStudies from '@/components/CaseStudies';
import WhyChooseUs from '@/components/WhyChooseUs';
import type { Metadata } from 'next';

// JSON-LD structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SEOBuddy",
  "url": "https://yourdomain.com/",
  "logo": "https://yourdomain.com/favicon.svg",
  "sameAs": [
    "https://www.linkedin.com/company/seobuddy/"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+1-512-555-0198",
    "contactType": "customer service",
    "areaServed": "US",
    "availableLanguage": ["English"]
  }]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://yourdomain.com/",
  "name": "SEOBuddy",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yourdomain.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const metadata: Metadata = {
  title: "SEOBuddy - Skyrocket Your Rankings",
  description: "Data-driven SEO strategies for measurable growth.",
  other: {
    'script:ld+json:organization': JSON.stringify(organizationSchema),
    'script:ld+json:website': JSON.stringify(websiteSchema),
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <main className="bg-gray-900">
        <HeroSection />
        <ServicesOverview />
        <CaseStudies />
        <WhyChooseUs />
      </main>
    </>
  )
}