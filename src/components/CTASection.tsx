// src/components/CTASection.tsx
import { StarIcon } from '@heroicons/react/24/solid';

const CTASection = () => {
  return (
    <section className="relative bg-gray-800">
      {/* Decorative gradient */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-gray-900 to-gray-800"></div>

      <div className="relative container mx-auto px-6 py-20 sm:py-28">
        <div className="relative bg-gray-900 shadow-2xl rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Column: Text Content */}
            <div className="p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
                Get Your Free SEO Audit
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Ready to grow? Enter your website URL to get a complimentary, no-obligation SEO analysis and discover your biggest opportunities.
              </p>
              
              {/* Social Proof Element */}
              <div className="mt-8">
                <div className="flex items-center">
                  <div className="flex items-center text-orange-400" style={{ color: '#F59E0B' }}>
                    <StarIcon className="h-5 w-5" />
                    <StarIcon className="h-5 w-5" />
                    <StarIcon className="h-5 w-5" />
                    <StarIcon className="h-5 w-5" />
                    <StarIcon className="h-5 w-5" />
                  </div>
                  <p className="ml-3 text-sm text-gray-400">Trusted by over 500 happy clients</p>
                </div>
              </div>
            </div>

            {/* Right Column: Simplified Form */}
            <div className="p-8 md:p-12 lg:p-16 bg-gray-800/50">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="full-name" className="sr-only">Full Name</label>
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="sr-only">Website</label>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                    placeholder="Your Website URL"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors"
                    style={{ backgroundColor: '#F59E0B' }}
                  >
                    Get My Free Audit
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection;