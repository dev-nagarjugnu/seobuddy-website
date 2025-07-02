// src/app/services/page.tsx

import { CheckBadgeIcon } from '@heroicons/react/24/solid';

const services = [
  {
    name: "Technical SEO",
    description: "We perform comprehensive site audits, optimize for speed, and enhance crawlability to build a rock-solid foundation that search engines love.",
    features: ["Core Web Vitals Optimization", "Schema Markup Implementation", "XML Sitemap & Robots.txt", "Site Architecture Review"],
    id: "technical"
  },
  {
    name: "On-Page SEO",
    description: "Our team dives deep into content optimization, keyword research, and meta tag strategies to make every page on your site an SEO powerhouse.",
    features: ["In-depth Keyword Research", "Content Gap Analysis", "Meta Title & Description Crafting", "Internal Linking Strategy"],
    id: "on-page"
  },
  {
    name: "Off-Page SEO",
    description: "We build your website's authority and credibility across the web through high-quality link building, strategic outreach, and brand mentions.",
    features: ["Ethical Link Building", "Digital PR & Outreach", "Brand Authority Building", "Competitor Backlink Analysis"],
    id: "off-page"
  },
  {
    name: "Local SEO",
    description: "Dominate the local search landscape. We optimize your Google Business Profile, build local citations, and manage your online reputation to attract local customers.",
    features: ["Google Business Profile (GBP) Management", "Local Citation Building", "Review Generation Strategy", "Local Keyword Targeting"],
    id: "local"
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>Our SEO Services</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            A comprehensive suite of services designed to deliver sustainable growth and a dominant online presence.
          </p>
        </div>
      </section>

      {/* Detailed Service Categories Section */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-6">
          <div className="space-y-20">
            {services.map((service) => (
              <div key={service.name} id={service.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="prose prose-lg text-gray-600 lg:max-w-none">
                  <h2 className="text-3xl font-extrabold text-gray-900">{service.name}</h2>
                  <p>{service.description}</p>
                  <ul className="mt-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckBadgeIcon className="h-6 w-6 text-green-500" style={{ color: '#10B981' }} />
                        </div>
                        <span className="ml-3">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-100 rounded-lg p-8 h-80 flex items-center justify-center">
                    <p className="text-gray-400">Illustrative Icon/Graphic Here</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}