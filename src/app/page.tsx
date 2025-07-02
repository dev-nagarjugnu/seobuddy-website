// src/app/page.tsx

import HeroSection from '@/components/HeroSection';
import TrustIndicators from '@/components/TrustIndicators';
import ServicesOverview from '@/components/ServicesOverview';
import CaseStudies from '@/components/CaseStudies';
import WhyChooseUs from '@/components/WhyChooseUs';
import CTASection from '@/components/CTASection'; // 1. Import the new component

export default function HomePage() {
  return (
    <main className="bg-gray-900">
      <HeroSection />
      <TrustIndicators />
      <ServicesOverview />
      <CaseStudies />
      <WhyChooseUs />
      <CTASection /> {/* 2. Add it here */}
    </main>
  )
}