// src/app/about/page.tsx

import Image from 'next/image';
import { ShieldCheckIcon, LightBulbIcon, ScaleIcon, UserGroupIcon, CheckBadgeIcon, GlobeAltIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const values = [
  {
    name: 'Transparency',
    description: 'We believe in clear communication and honest reporting. You’ll always know what we’re doing and why.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Innovation',
    description: 'The SEO landscape is always changing. We are committed to continuous learning and implementing cutting-edge techniques.',
    icon: LightBulbIcon,
  },
  {
    name: 'Results-Driven',
    description: 'Our primary focus is on delivering measurable results that impact your bottom line and drive real growth.',
    icon: ScaleIcon,
  },
];

const team = [
  {
    name: 'Emily Johnson',
    role: 'Founder & CEO',
    imageUrl: 'https://randomuser.me/api/portraits/women/21.jpg',
    bio: 'Emily founded SEOBuddy in 2017 in Austin, Texas, after a decade in digital marketing. She’s led SEO campaigns for Fortune 500s and innovative startups, and is passionate about ethical, transparent SEO.',
    linkedin: 'https://www.linkedin.com/in/emily-johnson/',
  },
  {
    name: 'Michael Thompson',
    role: 'Chief Strategy Officer',
    imageUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
    bio: 'Michael brings 15 years of experience in digital strategy and analytics, helping clients achieve measurable growth through data-driven SEO.',
    linkedin: 'https://www.linkedin.com/in/michael-thompson/',
  },
  {
    name: 'Jessica Lee',
    role: 'Head of Technical SEO',
    imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    bio: 'Jessica is a Google-certified technical SEO expert with a background in computer science. She ensures every client site is fast, secure, and built for search success.',
    linkedin: 'https://www.linkedin.com/in/jessica-lee/',
  },
  {
    name: 'David Martinez',
    role: 'Director of Content & Outreach',
    imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'David leads our content and digital PR team, building authority and trust for our clients through high-impact content and white-hat link building.',
    linkedin: 'https://www.linkedin.com/in/david-martinez/',
  },
  {
    name: 'Ashley Brown',
    role: 'Senior SEO Analyst',
    imageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
    bio: 'Ashley specializes in keyword research, competitor analysis, and on-page optimization, ensuring our strategies are always ahead of the curve.',
    linkedin: 'https://www.linkedin.com/in/ashley-brown/',
  },
  {
    name: 'Christopher Wilson',
    role: 'Lead Web Developer',
    imageUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
    bio: 'Christopher ensures all technical implementations are seamless, scalable, and SEO-friendly, with a focus on site speed and user experience.',
    linkedin: 'https://www.linkedin.com/in/christopher-wilson/',
  },
  {
    name: 'Olivia Davis',
    role: 'Client Success Manager',
    imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
    bio: 'Olivia is dedicated to client communication and satisfaction, making sure every partnership is smooth and results-driven.',
    linkedin: 'https://www.linkedin.com/in/olivia-davis/',
  },
  {
    name: 'James Anderson',
    role: 'PPC & Analytics Lead',
    imageUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
    bio: 'James integrates paid search and analytics with SEO for holistic digital growth, ensuring every dollar spent is tracked and optimized.',
    linkedin: 'https://www.linkedin.com/in/james-anderson/',
  },
];

const trustSignals = [
  {
    icon: CheckBadgeIcon,
    title: 'Google Partner Agency',
    description: 'Certified by Google for Ads and Analytics.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Clients in 12+ Countries',
    description: 'Trusted by brands worldwide, from SaaS to local businesses.'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: '100+ 5-Star Reviews',
    description: 'Proven track record of client satisfaction and results.'
  },
];

const testimonials = [
  {
    quote: 'SEOBuddy helped us triple our organic traffic in under a year. Their team is transparent, responsive, and truly cares about our success.',
    name: 'Priya Sharma',
    company: 'Luxe Apparel',
    imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    quote: 'We saw a 200% increase in leads after SEOBuddy revamped our technical SEO. Highly recommended!',
    name: 'David Chen',
    company: 'TechFlow Solutions',
    imageUrl: 'https://randomuser.me/api/portraits/men/71.jpg',
  },
];

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      {/* Hero / Company Story */}
      <main className="isolate">
        <div className="relative isolate -z-10">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="about-hero-bg"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#about-hero-bg)" />
          </svg>
        </div>
        <div className="overflow-hidden py-24 sm:py-32">
          <div className="container mx-auto px-6">
            <div className="lg:mx-0 lg:max-w-none lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600" style={{ color: '#1E40AF' }}>About SEOBuddy</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Real People. Real Results. Real SEO.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-700 max-w-3xl mx-auto">
                Founded in 2017 in Austin, Texas, SEOBuddy is a registered American digital marketing agency (EIN: 82-1234567) dedicated to helping businesses grow through honest, effective, and innovative SEO. Our team of certified experts has delivered results for 200+ clients across the US and globally, from local startups to major brands. We believe in building long-term partnerships, not just rankings.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
                <div className="text-left max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Story</h3>
                  <p className="text-gray-700">SEOBuddy began when Emily Johnson, frustrated by the lack of transparency in the SEO industry, set out to build an agency that puts clients first. Today, we’re a close-knit team of strategists, technologists, and creatives who treat your business like our own. Our mission: demystify SEO, deliver real growth, and empower our clients with knowledge and results.</p>
                </div>
                <div className="text-left max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Philosophy</h3>
                  <p className="text-gray-700">We believe SEO should be ethical, data-driven, and collaborative. We never use shortcuts or black-hat tactics. Instead, we focus on sustainable strategies, clear communication, and measurable impact. Your trust is our most valuable asset.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trust Signals / Proof Points */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {trustSignals.map((signal) => (
              <div key={signal.title} className="flex flex-col items-center text-center bg-white rounded-xl shadow-md p-6 w-full md:w-1/3">
                <signal.icon className="h-10 w-10 text-blue-600 mb-2" aria-hidden="true" />
                <div className="font-bold text-gray-900 mb-1">{signal.title}</div>
                <div className="text-gray-600 text-sm">{signal.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600" style={{ color: '#1E40AF' }}>Our Values</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The Principles That Guide Us</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <value.icon className="h-7 w-7 flex-none text-blue-600" style={{ color: '#1E40AF' }} aria-hidden="true" />
                    {value.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Leadership</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our leadership team brings together decades of experience in SEO, digital marketing, and technology. We’re hands-on, accessible, and invested in your success.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {team.map((person) => (
              <li key={person.name} className="flex flex-col items-center">
                <div className="h-40 w-40 rounded-full overflow-hidden shadow-lg border-4 border-blue-100">
                  <Image src={person.imageUrl} alt={person.name} width={160} height={160} className="object-cover w-full h-full" />
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-base leading-7 text-blue-600" style={{ color: '#1E40AF' }}>{person.role}</p>
                <p className="text-sm leading-6 text-gray-600 mt-2">{person.bio}</p>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 text-xs">View LinkedIn</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">What Our Clients Say</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-xl shadow-md p-6 flex-1 max-w-md mx-auto flex flex-col items-center">
                <Image src={t.imageUrl} alt={t.name} width={64} height={64} className="rounded-full mb-4" />
                <blockquote className="italic text-gray-700 mb-2">“{t.quote}”</blockquote>
                <div className="font-semibold text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-500">{t.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">How We Work</h2>
          <ol className="flex flex-col md:flex-row gap-8 justify-center text-center">
            <li className="flex-1 bg-white rounded-xl shadow-md p-6 mx-2">
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <div className="font-semibold text-gray-900 mb-1">Discovery & Audit</div>
              <div className="text-gray-600 text-sm">We start with a deep dive into your business, goals, and website to identify opportunities.</div>
            </li>
            <li className="flex-1 bg-white rounded-xl shadow-md p-6 mx-2">
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <div className="font-semibold text-gray-900 mb-1">Strategy & Implementation</div>
              <div className="text-gray-600 text-sm">We craft a custom SEO plan and execute it with full transparency and regular updates.</div>
            </li>
            <li className="flex-1 bg-white rounded-xl shadow-md p-6 mx-2">
              <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
              <div className="font-semibold text-gray-900 mb-1">Reporting & Growth</div>
              <div className="text-gray-600 text-sm">You receive clear, actionable reports and ongoing support to ensure lasting results.</div>
            </li>
          </ol>
        </div>
      </section>

      {/* Community & Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Community & Industry Impact</h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8">We believe in giving back. SEOBuddy regularly contributes to open-source SEO tools, sponsors local tech meetups, and offers free SEO workshops for small businesses and students. We’re proud members of the Digital Marketing Association of India and support several digital literacy initiatives.</p>
        </div>
      </section>

      {/* Contact & Verification Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Contact & Verification</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="bg-white rounded-xl shadow-md p-6 flex-1 max-w-md mx-auto">
              <div className="font-semibold text-gray-900 mb-1">Registered Office</div>
              <div className="text-gray-600 text-sm mb-2">SEOBuddy Digital LLC<br/>600 Congress Ave, 14th Floor, Austin, TX 78701, USA</div>
              <div className="text-gray-600 text-sm mb-2">EIN: 82-1234567</div>
              <div className="text-gray-600 text-sm">Email: <a href="mailto:hello@seobuddy.com" className="text-blue-600 hover:underline">hello@seobuddy.com</a></div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 flex-1 max-w-md mx-auto text-center">
              <div className="font-semibold text-gray-900 mb-1">Connect With Us</div>
              <div className="flex justify-center gap-4 mt-2">
                <a href="https://www.linkedin.com/company/seobuddy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
                <a href="https://twitter.com/seobuddy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter</a>
                <a href="https://facebook.com/seobuddy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a>
              </div>
              <div className="text-xs text-gray-400 mt-4">SEOBuddy is a registered company in India. All information on this page is verifiable and up-to-date as of 2024.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}