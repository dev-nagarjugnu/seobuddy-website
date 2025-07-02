// src/components/WhyChooseUs.tsx

import { ShieldCheckIcon, PresentationChartLineIcon, LightBulbIcon, UsersIcon, ScaleIcon, ChatBubbleBottomCenterTextIcon, BeakerIcon, MagnifyingGlassCircleIcon, ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const valuePropositions = [
  {
    name: 'Data-Driven Strategies',
    description: 'We use advanced analytics to make informed decisions, ensuring every action is backed by data.',
    icon: PresentationChartLineIcon,
  },
  {
    name: 'Transparent Reporting',
    description: 'You get clear, concise reports that show real progress and a tangible return on your investment.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Custom-Fit Solutions',
    description: 'No cookie-cutter plans. We tailor every SEO strategy to your unique business goals and market.',
    icon: LightBulbIcon,
  },
  {
    name: 'Proactive Communication',
    description: 'You\'ll always be in the loop with a dedicated account manager and regular progress updates.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'Ethical & Sustainable',
    description: 'We only use white-hat SEO techniques that build long-term authority and sustainable growth.',
    icon: ScaleIcon,
  },
  {
    name: 'Expert Team',
    description: 'Our team consists of certified professionals who are passionate about staying ahead of SEO trends.',
    icon: UsersIcon,
  },
]

const processSteps = [
    {
        name: 'Discovery & Audit',
        description: 'We start with a deep dive into your website, competitors, and industry to find opportunities.',
        icon: MagnifyingGlassCircleIcon,
    },
    {
        name: 'Strategy & Planning',
        description: 'Next, we build a custom, goal-oriented SEO roadmap tailored to your specific needs.',
        icon: BeakerIcon,
    },
    {
        name: 'Execution & Optimization',
        description: 'Our team implements the strategy, continuously optimizing for performance and results.',
        icon: ChartBarIcon,
    },
    {
        name: 'Reporting & Growth',
        description: 'We provide transparent reports and refine our strategy to ensure sustained growth.',
        icon: ArrowTrendingUpIcon,
    },
]

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        
        <div className="lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600" style={{ color: '#1E40AF' }}>Why Partner With Us</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Dominate the SERPs
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 lg:mx-auto">
            We&apos;re more than just an agency; we&apos;re your dedicated partner in digital growth.
          </p>
        </div>

        <div className="mt-20">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {valuePropositions.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-8 w-8 flex-none text-blue-600" style={{ color: '#1E40AF' }} aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-24 pt-16 border-t border-gray-200">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
                    Our Proven Process
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-600">
                    A streamlined workflow designed for maximum impact and transparency.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-4 md:gap-x-8">
                {processSteps.map((step, index) => (
                    <div key={step.name} className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-xl" style={{ color: '#1E40AF' }}>
                                {index + 1}
                            </div>
                            <step.icon className="h-8 w-8 ml-4 text-gray-500" />
                        </div>
                        <h3 className="mt-6 text-lg font-bold text-gray-900">{step.name}</h3>
                        <p className="mt-2 text-base text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs;