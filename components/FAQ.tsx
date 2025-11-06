'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface FAQItem {
  id: number
  question: string
  answer: string
}

// TODO: Replace with real FAQ content once provided by content team
const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'How do I book a venue through Wedding & Events?',
    answer: 'Browse our venue listings, compare options, and click "Inquire" to send a message to the venue owner. They will respond with availability and pricing details.',
  },
  {
    id: 2,
    question: 'What types of venues are available?',
    answer: 'We offer a wide range of venues including wedding halls, outdoor spaces, marquees, hotels, and traditional banquet halls. Filter by type to find exactly what you need.',
  },
  {
    id: 3,
    question: 'Can I see venue photos before booking?',
    answer: 'Yes! Each venue listing includes multiple photos, descriptions, capacity information, and pricing details. You can also read reviews from previous customers.',
  },
  {
    id: 4,
    question: 'How do I contact vendors?',
    answer: 'Use the contact form on each vendor page or click the WhatsApp button to message them directly. Our platform makes it easy to connect with vendors.',
  },
  {
    id: 5,
    question: 'Is there a booking fee?',
    answer: 'Wedding & Events is free to browse. Venue pricing varies by location and venue type. Contact venues directly for detailed pricing and booking information.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            {/* TODO: Awaiting SEO-optimized content */}
            Find answers to common questions about our services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={faq.id}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-xl font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 text-[#d13f43] flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

