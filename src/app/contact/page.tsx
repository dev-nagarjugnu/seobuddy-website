// src/app/contact/page.tsx

import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import FaqAccordion from '@/components/FaqAccordion';

export default function ContactPage() {
  return (
    <>
      <div className="relative isolate bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          
          {/* Left side: Contact Information */}
          <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Get in touch</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We're here to help you grow. Reach out to us through any of the methods below, or fill out the form and we'll get back to you within 24 hours.
              </p>
              <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <BuildingOffice2Icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    123 SEO Lane, Search City
                    <br />
                    Web, 90210
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-gray-900" href="tel:+1 (555) 234-5678">
                      +1 (555) 234-5678
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-gray-900" href="mailto:hello@seobuddy.com">
                      hello@seobuddy.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right side: Contact Form */}
          <form action="#" method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">First name</label>
                  <div className="mt-2.5"><input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" /></div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
                  <div className="mt-2.5"><input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" /></div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                  <div className="mt-2.5"><input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" /></div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="website" className="block text-sm font-semibold leading-6 text-gray-900">Current Website (URL)</label>
                    <div className="mt-2.5"><input type="url" name="website" id="website" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" /></div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Goals & Challenges</label>
                  <div className="mt-2.5"><textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" defaultValue={''} /></div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button type="submit" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" style={{backgroundColor: '#1E40AF'}}>Send message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* FAQ Section */}
      <FaqAccordion />
    </>
  )
}