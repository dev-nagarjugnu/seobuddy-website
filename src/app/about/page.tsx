// src/app/about/page.tsx

import { ShieldCheckIcon, LightBulbIcon, ScaleIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const values = [
  {
    name: 'Transparency',
    description: 'We believe in clear communication and honest reporting. You\'ll always know what we\'re doing and why.',
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
    name: 'John Carter',
    role: 'Founder & Head of SEO Strategy',
    imageUrl: '/team-member-1.png', // Placeholder
    bio: 'With over a decade of experience, John founded SEOBuddy to create a truly client-focused SEO agency.',
  },
  {
    name: 'Jane Doe',
    role: 'Lead Technical SEO Specialist',
    imageUrl: '/team-member-2.png', // Placeholder
    bio: 'Jane is a master of site architecture and Core Web Vitals, ensuring our clients\' sites are technically flawless.',
  },
  {
    name: 'Peter Jones',
    role: 'Head of Content & Outreach',
    imageUrl: '/team-member-3.png', // Placeholder
    bio: 'Peter leads our content and link-building efforts, creating strategies that build authority and trust.',
  },
];

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      {/* Company Story Section */}
      <main className="isolate">
        <div className="relative isolate -z-10">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
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
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
          </svg>
        </div>
        
        <div className="overflow-hidden py-24 sm:py-32">
          <div className="container mx-auto px-6">
            <div className="lg:mx-0 lg:max-w-none lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600" style={{ color: '#1E40AF' }}>Our Mission</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Demystifying SEO, Delivering Results
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-700 max-w-3xl mx-auto">
                SEOBuddy was founded on a simple principle: to provide transparent, effective, and data-driven SEO strategies that help businesses of all sizes achieve their growth potential. We cut through the noise to focus on what truly moves the needle, building sustainable success for our clients.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Company Values Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
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
      <section className="bg-white py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A dedicated group of passionate SEO experts committed to your success.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {team.map((person) => (
              <li key={person.name}>
                <div className="h-56 w-full rounded-2xl bg-gray-200 flex items-center justify-center">
                  <UserGroupIcon className="h-20 w-20 text-gray-400" />
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-base leading-7 text-blue-600" style={{ color: '#1E40AF' }}>{person.role}</p>
                <p className="text-sm leading-6 text-gray-600 mt-2">{person.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}