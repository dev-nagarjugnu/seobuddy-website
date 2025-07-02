// src/components/FaqAccordion.tsx

"use client"; // This component uses state, so it's a client component

import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

const faqs = [
  {
    question: "How long does it take to see SEO results?",
    answer: "Typically, you can expect to see initial results within 3-6 months. SEO is a long-term strategy, and significant, lasting results build over time as we improve your site's authority and content."
  },
  {
    question: "What is the difference between On-Page and Off-Page SEO?",
    answer: "On-Page SEO refers to optimizations done directly on your website (like content, meta tags, and site speed). Off-Page SEO refers to actions taken outside of your website to build its authority (like link building and social media presence)."
  },
  {
    question: "Do you guarantee a #1 ranking on Google?",
    answer: "No reputable SEO agency can guarantee a #1 ranking. The search engine algorithms are complex and constantly changing. We do, however, guarantee that we will use proven, ethical strategies to significantly improve your rankings and organic traffic."
  },
    {
    question: "What kind of reporting will I receive?",
    answer: "You will receive a detailed monthly report that covers key metrics like keyword rankings, organic traffic, conversions, and backlink acquisition. We also provide a live dashboard for real-time tracking."
  },
];

const FaqItem = ({ faq }: { faq: { question: string, answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-gray-200 py-6">
      <dt>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-start justify-between text-left text-gray-900"
        >
          <span className="text-base font-semibold leading-7">{faq.question}</span>
          <span className="ml-6 flex h-7 items-center">
            {isOpen ? (
              <MinusIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <PlusIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </span>
        </button>
      </dt>
      {isOpen && (
        <dd className="mt-2 pr-12">
          <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
        </dd>
      )}
    </div>
  );
};

const FaqAccordion = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                           <FaqItem key={faq.question} faq={faq} />
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default FaqAccordion;