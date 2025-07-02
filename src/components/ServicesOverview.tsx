// src/components/ServicesOverview.tsx

import { WrenchScrewdriverIcon, MagnifyingGlassIcon, LinkIcon, MapPinIcon } from '@heroicons/react/24/outline';

const services = [
  {
    name: 'Technical SEO',
    description: 'Site audits, speed optimization, and crawlability fixes to build a strong foundation.',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'On-Page SEO',
    description: 'In-depth content optimization, keyword research, and meta tag strategies.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Off-Page SEO',
    description: 'High-quality link building, outreach, and authority building to boost your domain.',
    icon: LinkIcon,
  },
  {
    name: 'Local SEO',
    description: 'Dominate local search with Google Business Profile optimization and citations.',
    icon: MapPinIcon,
  }
]

const ServicesOverview = () => {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
            A Full-Funnel SEO Approach
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600" style={{ fontFamily: 'Inter, Open Sans, sans-serif' }}>
            We cover every aspect of search engine optimization to ensure your success.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.name} className="text-center p-8 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <service.icon className="h-8 w-8 text-blue-800" style={{ color: '#1E40AF' }} aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-lg font-bold text-gray-900">{service.name}</h3>
                <p className="mt-4 text-base text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesOverview;