// src/app/contact/page.tsx

import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import FaqAccordion from '@/components/FaqAccordion';
import Image from 'next/image';

const teamContacts = [
  {
    name: 'Olivia Davis',
    role: 'Client Success Manager',
    email: 'olivia@seobuddy.com',
    phone: '+1 (512) 555-0198',
    imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    name: 'James Anderson',
    role: 'Sales & Partnerships',
    email: 'james@seobuddy.com',
    phone: '+1 (512) 555-0245',
    imageUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
  },
  {
    name: 'Ashley Brown',
    role: 'Support Lead',
    email: 'ashley@seobuddy.com',
    phone: '+1 (512) 555-0312',
    imageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="relative isolate bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          {/* Trust-building intro and office photo */}
          <div className="flex flex-col gap-8 mb-12">
            <div className="w-full max-w-2xl text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Contact SEOBuddy</h1>
              <p className="text-lg text-gray-700 mb-4">We’re here to help you grow. Whether you have a question, want a free consultation, or just want to say hello, our team is ready to connect. We reply to every message within <span className="font-semibold text-blue-700">1 business day</span>.</p>
              <ul className="flex gap-4 mt-4">
                <li><a href="https://www.linkedin.com/company/seobuddy" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">LinkedIn</a></li>
                <li><a href="https://twitter.com/seobuddy" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Twitter</a></li>
                <li><a href="https://facebook.com/seobuddy" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side: Contact Information */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-xl shadow p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Office</h2>
                <div className="flex items-start gap-4 mb-2">
                  <BuildingOffice2Icon className="h-7 w-7 text-gray-400 mt-1" aria-hidden="true" />
                  <div>
                    SEOBuddy Digital LLC<br />600 Congress Ave, 14th Floor<br />Austin, TX 78701, USA
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <PhoneIcon className="h-7 w-7 text-gray-400" aria-hidden="true" />
                  <a className="hover:text-gray-900" href="tel:+1 (512) 555-0100">+1 (512) 555-0100</a>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <EnvelopeIcon className="h-7 w-7 text-gray-400" aria-hidden="true" />
                  <a className="hover:text-gray-900" href="mailto:hello@seobuddy.com">hello@seobuddy.com</a>
                </div>
                <div className="text-xs text-gray-500 mt-2">EIN: 82-1234567</div>
                <div className="mt-4">
                  <iframe
                    title="SEOBuddy Austin Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.21096429512!2d-97.7446996848786!3d30.26715398180039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b5a3e8b0e7e1%3A0x7e8b0e7e1b0e7e1b!2s600%20Congress%20Ave%2C%20Austin%2C%20TX%2078701%2C%20USA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                    width="100%"
                    height="180"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Direct Contacts</h3>
                <ul className="space-y-4">
                  {teamContacts.map((person) => (
                    <li key={person.email} className="flex items-center gap-4">
                      <Image src={person.imageUrl} alt={person.name} width={48} height={48} className="rounded-full" />
                      <div>
                        <div className="font-semibold text-gray-900">{person.name}</div>
                        <div className="text-xs text-gray-500 mb-1">{person.role}</div>
                        <div className="text-xs"><a href={`mailto:${person.email}`} className="text-blue-700 hover:underline">{person.email}</a> | <a href={`tel:${person.phone}`} className="text-blue-700 hover:underline">{person.phone}</a></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: Contact Form */}
            <form action="#" method="POST" className="bg-gray-50 rounded-xl shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
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
              <div className="mt-6 text-xs text-gray-500">We respect your privacy. Your information is never shared and is used only to respond to your inquiry.</div>
              <div className="mt-8 flex justify-end">
                <button type="submit" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" style={{backgroundColor: '#1E40AF'}}>Send message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* FAQ Section - visually separated */}
      <div className="bg-gray-50 py-16 mt-8 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <FaqAccordion />
        </div>
      </div>
    </>
  )
}