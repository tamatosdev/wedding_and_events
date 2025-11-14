'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface FAQItem {
  id: number
  question: string
  answer: string
}

interface CategoryFAQProps {
  category?: string
}

// Category-specific FAQs
const categoryFAQs: Record<string, FAQItem[]> = {
  'Venue': [
    {
      id: 1,
      question: 'How can I book wedding venues in Karachi through Wedding & Event?',
      answer: 'You can easily book through Wedding & Events website http://Theweddingandevent.com by selecting your preferred budget, type, and capacity, and mentioning Wedding & Event to get a good deal.',
    },
    {
      id: 2,
      question: 'What is the average budget per person for wedding venues in Karachi?',
      answer: 'Wedding venues in Karachi usually range from PKR 800 to PKR 3,000+ per person, depending on facilities and services.',
    },
    {
      id: 3,
      question: 'Do wedding venues in Karachi provide parking space and Valet service?',
      answer: 'Yes, most venues in Karachi have dedicated parking areas for guests. Some also provide Valet service or can be arranged on payment.',
    },
    {
      id: 4,
      question: 'What types of wedding venues can I find in Karachi?',
      answer: 'You can find halls, outdoor lawns, marquees/banquets, and other customized setups in Karachi.',
    },
    {
      id: 5,
      question: 'Is a standby generator or backup power available?',
      answer: 'Most of the venues have a backup power system, but it\'s better to reconfirm.',
    },
    {
      id: 6,
      question: 'Are there separate arrangements for male and female guests?',
      answer: 'Yes, on request at the time of booking.',
    },
    {
      id: 7,
      question: 'Are bridal/dressing rooms available?',
      answer: 'Yes, most of the venue has, but please do ask at the time of booking.',
    },
    {
      id: 8,
      question: 'Are wheelchair-accessible wedding venues available in Karachi?',
      answer: 'Yes, many modern venues in Karachi are wheelchair accessible for the convenience of all guests.',
    },
  ],
  'Catering': [
    {
      id: 1,
      question: 'What catering services are available in Karachi?',
      answer: 'Karachi caterers offer full wedding and event catering with diverse cuisines and professional setups. Customized / special menu on request can be arranged but varies from caterer to caterer.',
    },
    {
      id: 2,
      question: 'Can I filter catering services in Karachi by budget?',
      answer: 'Yes, packages start from around PKR 500 to 3,500+ per person and go up to premium options.',
    },
    {
      id: 3,
      question: 'What amenities do catering companies in Karachi provide?',
      answer: 'Many offer waiters, cutlery, buffet setups, food testing, seating, and décor.',
    },
    {
      id: 4,
      question: 'Are there trusted catering companies in Karachi?',
      answer: 'On our platform, you will see a variety of caterers, and you can choose from them as per your budget and reputation.',
    },
    {
      id: 5,
      question: 'Why book catering services in Karachi through the wedding and event?',
      answer: 'We connect you with verified caterers, easy filters, and reliable customer support. We give you access to choices and packages as per your budget and needs.',
    },
    {
      id: 6,
      question: 'Can we taste the food before finalizing the booking?',
      answer: 'Most caterers offer trials/ taste testing. It\'s better to ask for a trial before booking.',
    },
    {
      id: 7,
      question: 'Can we customize the menu according to our family\'s taste or cultural preferences?',
      answer: 'Yes, it is possible in most cases.',
    },
    {
      id: 8,
      question: 'Can we mix cuisines (e.g., Pakistani + Chinese + BBQ)?',
      answer: 'Yes, it is possible in most cases.',
    },
    {
      id: 9,
      question: 'Are soft drinks, desserts, and salads included in the per-head rate?',
      answer: 'Yes, in most packages, but it\'s better to reconfirm at the time of booking.',
    },
  ],
  'Decoration': [
    {
      id: 1,
      question: 'What décor themes do you offer (traditional, modern, Mughal, royal, floral, etc.)?',
      answer: 'We have multiple Décor partners offering a wide range of themes and services. You can choose them and discuss your theme plan directly with them.',
    },
    {
      id: 2,
      question: 'Can you create a custom theme according to our preferences or colour scheme?',
      answer: 'Yes, customization is possible with our DÉCOR Partners.',
    },
    {
      id: 3,
      question: 'How flexible are you if we want to mix two different styles (e.g., elegant + desi)?',
      answer: 'Yes, it is possible with most partners.',
    },
    {
      id: 4,
      question: 'Do you use fresh flowers, artificial, or a mix of both?',
      answer: 'Yes, it is possible as per customer demand and budget.',
    },
    {
      id: 5,
      question: 'How can I request a quote for decor services?',
      answer: 'Inquire about decor services by requesting a quote online or contacting the person directly.',
    },
    {
      id: 6,
      question: 'Can these companies accommodate specific themes or styles for decor?',
      answer: 'Yes, the decor vendors available on our website can customize the decor.',
    },
    {
      id: 7,
      question: 'Are your decor services available for both indoor and outdoor events?',
      answer: 'Yes, based on your preference, these companies can do both.',
    },
    {
      id: 8,
      question: 'Do you provide delivery, setup, and takedown of decor items?',
      answer: 'The Wedding and Event is a platform for booking vendors, including decor services. Delivery, setup, and takedown depend on the specific vendor you choose. You need to contact the selected vendor directly to discuss and confirm these services, as offerings may vary.',
    },
    {
      id: 9,
      question: 'Do you provide customized decor solutions for special events?',
      answer: 'Yes, we offer customized decor solutions for special events. Our team works closely with clients to understand their preferences and create bespoke decor that aligns with the theme and atmosphere of the event. Contact us to discuss your specific requirements and bring your vision to life.',
    },
  ],
  'Photography': [
    {
      id: 1,
      question: 'What photography packages are available?',
      answer: 'Packages typically include pre-wedding shoots, full event coverage, drone photography, and video services. Most photographers offer different packages based on hours of coverage and deliverables.',
    },
    {
      id: 2,
      question: 'How many photos will I receive?',
      answer: 'This varies by photographer and package, but typically ranges from 200-800 edited photos for a full wedding event. Discuss the exact number of deliverables when booking.',
    },
    {
      id: 3,
      question: 'Do photographers provide videography too?',
      answer: 'Many photographers also offer videography services or work with partner videographers. Ask about combined photo/video packages for better coordination and pricing.',
    },
    {
      id: 4,
      question: 'What is the typical delivery time for photos?',
      answer: 'Most photographers deliver edited photos within 2-4 weeks after the event. Rush delivery may be available for an additional fee if you need photos sooner.',
    },
    {
      id: 5,
      question: 'Can I request specific shots or poses?',
      answer: 'Yes! Share your shot list and any specific requirements with your photographer beforehand. They\'ll work to capture all your must-have moments and family combinations.',
    },
  ],
  'Beauty Parlor': [
    {
      id: 1,
      question: 'Which makeup products and brands do you use (local or international)?',
      answer: 'Most of our partners offer quality and branded products; however, it is recommended that you directly ask the beautician before availing the service.',
    },
    {
      id: 2,
      question: 'Do you handle bridal touch-ups or changes between events?',
      answer: 'Yes, it is possible with most partners, but please confirm at the time of booking.',
    },
    {
      id: 3,
      question: 'What types of makeup do you offer — bridal, Valima, mehndi, engagement, or party makeup?',
      answer: 'We have multiple partners offering a variety of services and budget options. You can visit our page and choose the beauty salon.',
    },
    {
      id: 4,
      question: 'What is the average price range for bridal makeup artists in Karachi?',
      answer: 'Karachi is a versatile city of 21 million. Bridal makeup packages vary based on location and beauty salon. In Karachi usually range from PKR 10,000 to 250,000+, depending on the artist\'s expertise and services offered.',
    },
    {
      id: 5,
      question: 'Do makeup artists in Karachi provide both salon and freelance services?',
      answer: 'Yes, you can choose between salon-based artists or freelance makeup artists who provide flexible services at your location.',
    },
    {
      id: 6,
      question: 'Can I find makeup artists in Karachi who offer home services?',
      answer: 'Yes, many bridal makeup artists are available to travel to your home for convenience and a stress-free experience.',
    },
    {
      id: 7,
      question: 'How can I book a makeup artist through the wedding and event in Karachi?',
      answer: 'Simply visit http://theweddingandevent.com select your desired makeup artist, check availability, and confirm your booking online with ease.',
    },
  ],
  'Boutiques': [
    {
      id: 1,
      question: 'Do you design custom-made dresses or only sell ready-to-wear?',
      answer: 'Both are possible; it depends upon Boutique.',
    },
    {
      id: 2,
      question: 'Can I bring my own design or reference picture for you to replicate or modify?',
      answer: 'Yes, it is possible, but Boutique will confirm it.',
    },
    {
      id: 3,
      question: 'Can alterations be made if the fitting isn\'t perfect?',
      answer: 'A request can be considered, but it will vary from partner to partner.',
    },
    {
      id: 4,
      question: 'Can you coordinate bridesmaid or family dresses to match the bridal theme?',
      answer: 'A request can be considered, but it will vary from partner to partner.',
    },
    {
      id: 5,
      question: 'In case of RENT A DRESS, what are your rental charges for bridal and party dresses?',
      answer: 'Only selected Boutiques offer dresses for rent, and they have their own policy and charges vary dress to dress.',
    },
    {
      id: 6,
      question: 'How much advance or security deposit is required to confirm the booking?',
      answer: 'It depends on the Boutique and the dress.',
    },
    {
      id: 7,
      question: 'Is the security deposit refundable?',
      answer: 'Yes, but confirm the terms with Boutique.',
    },
    {
      id: 8,
      question: 'What documents are required to rent a dress (CNIC copy, reference, etc.)?',
      answer: 'Usually, CNIC and the electricity bill are with the same address.',
    },
  ],
}

// Default FAQs for general or unknown categories
const defaultFAQs: FAQItem[] = [
  {
    id: 1,
    question: 'How do I contact vendors?',
    answer: 'Use the contact form on each vendor page or click the WhatsApp button to message them directly. Our platform makes it easy to connect with verified vendors.',
  },
  {
    id: 2,
    question: 'Are all vendors verified?',
    answer: 'Yes! All vendors on our platform go through a verification process to ensure quality and reliability. We check their credentials, portfolio, and customer reviews.',
  },
  {
    id: 3,
    question: 'How do I compare different vendors?',
    answer: 'Use our filtering and sorting options to compare vendors by price, rating, location, and services. You can also read customer reviews and view portfolios to make informed decisions.',
  },
  {
    id: 4,
    question: 'Is there a booking fee?',
    answer: 'Wedding & Events is free to browse and contact vendors. Pricing varies by vendor and service type. All payments are made directly to vendors according to their terms.',
  },
  {
    id: 5,
    question: 'What if I need to cancel or reschedule?',
    answer: 'Cancellation and rescheduling policies vary by vendor. Check the specific vendor\'s terms and conditions, and communicate directly with them for any changes to your booking.',
  },
]

export default function CategoryFAQ({ category }: CategoryFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  // Get FAQs for the specific category or use default
  const faqs = category && categoryFAQs[category] ? categoryFAQs[category] : defaultFAQs
  
  // Generate title based on category
  const getTitle = () => {
    if (!category) return "Frequently Asked Questions"
    
    switch (category) {
      case 'Venue': return "Venue Booking FAQs"
      case 'Catering': return "Catering Services FAQs"
      case 'Decoration': return "Decoration Services FAQs"
      case 'Photography': return "Photography Services FAQs"
      case 'Beauty Parlor': return "Beauty Services FAQs"
      case 'Boutiques': return "Bridal Fashion FAQs"
      default: return "Frequently Asked Questions"
    }
  }

  const getSubtitle = () => {
    if (!category) return "Find answers to common questions about our services"
    
    switch (category) {
      case 'Venue': return "Everything you need to know about booking wedding venues"
      case 'Catering': return "Common questions about catering services and pricing"
      case 'Decoration': return "Get answers about decoration services and customization"
      case 'Photography': return "Learn about photography packages and deliverables"
      case 'Beauty Parlor': return "Beauty services and bridal grooming information"
      case 'Boutiques': return "Bridal fashion, tailoring, and accessory questions"
      default: return "Find answers to common questions about our services"
    }
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {getTitle()}
          </h2>
          <p className="text-lg text-gray-600">
            {getSubtitle()}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq: FAQItem, index: number) => (
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