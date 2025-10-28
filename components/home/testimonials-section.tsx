'use client'

import { useState } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    quote: "We found our Dream Venue in Just Two Days! The Portal Made Everything So Simple And Stress-Free.",
    author: "Sarah & Ali",
    image: "/placeholder-image.jpg"
  },
  {
    id: 2,
    quote: "The catering service we booked through this portal was absolutely amazing. Our guests are still talking about the food!",
    author: "Fatima & Ahmed",
    image: "/placeholder-image.jpg"
  },
  {
    id: 3,
    quote: "From photography to decorations, we found all our vendors in one place. Saved us so much time and effort.",
    author: "Ayesha & Hassan",
    image: "/placeholder-image.jpg"
  },
  {
    id: 4,
    quote: "The vendor quality is outstanding. Every single vendor exceeded our expectations. Highly recommended!",
    author: "Zara & Usman",
    image: "/placeholder-image.jpg"
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3
  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say?
          </h2>
        </div>

        <div className="relative">
          {/* Testimonials Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <blockquote className="text-gray-700 text-center mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="text-center font-semibold text-gray-900">
                      - {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
