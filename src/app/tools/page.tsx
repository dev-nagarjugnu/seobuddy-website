// src/app/tools/page.tsx

import { MagnifyingGlassIcon, ChartBarIcon, RocketLaunchIcon, ClockIcon } from '@heroicons/react/24/outline';

const tools = [
  {
    name: 'Website Audit Tool',
    description: 'Enter your URL for an instant analysis of your site\'s technical SEO, performance, and content.',
    icon: RocketLaunchIcon,
    placeholder: 'https://example.com',
    buttonText: 'Analyze Website'
  },
  {
    name: 'Keyword Research Tool',
    description: 'Discover valuable keywords, search volume, and competition to guide your content strategy.',
    icon: MagnifyingGlassIcon,
    placeholder: 'e.g., "digital marketing services"',
    buttonText: 'Find Keywords'
  },
  {
    name: 'Rank Tracker',
    description: 'Monitor your keyword positions in Google and track your progress against competitors over time.',
    icon: ChartBarIcon,
    placeholder: 'Enter Your Domain',
    buttonText: 'Track Rankings'
  },
  {
    name: 'Page Speed Analyzer',
    description: 'Check your Core Web Vitals and get actionable recommendations to improve your site\'s loading speed.',
    icon: ClockIcon,
    placeholder: 'https://example.com/a-specific-page',
    buttonText: 'Test Speed'
  },
]

export default function ToolsPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section for the Tools Page */}
      <div className="relative bg-white pt-24 pb-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Free SEO Tools
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
            Get instant insights and data to power your SEO strategy. No sign-up required.
          </p>
        </div>
      </div>

      {/* Tools Grid Section */}
      <div className="py-20 sm:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {tools.map((tool) => (
              <div key={tool.name} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-start gap-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <tool.icon className="h-7 w-7 text-blue-800" style={{ color: '#1E40AF' }} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-x-3">
                  <input
                    type="text"
                    name="tool-input"
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                    placeholder={tool.placeholder}
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    style={{ backgroundColor: '#1E40AF' }}
                  >
                    {tool.buttonText}
                  </button>
                </div>
                {/* Placeholder for results */}
                <div className="mt-6 h-32 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <p className="text-sm text-gray-400">Analysis results will appear here.</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
            <h3 className="text-lg font-semibold text-gray-900">Client Dashboard</h3>
            <p className="mt-1 text-sm text-gray-600">Looking for your campaign reports and performance metrics?</p>
            <button
                type="button"
                className="mt-6 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                style={{ backgroundColor: '#F59E0B' }}
            >
                Login to Your Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}