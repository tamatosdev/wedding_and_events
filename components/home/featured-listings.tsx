'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface Vendor {
  id: string
  name: string
  image: string
  rating: number
  reviews: number
  price: string
  category: string
}

const featuredVendors: Vendor[] = [
  {
    id: '1',
    name: 'Auditorium Banquet',
    image: '/placeholder-image.jpg',
    rating: 4.5,
    reviews: 25,
    price: 'PKR 50,000 - 100,000',
    category: 'Venue'
  },
  {
    id: '2',
    name: 'Royal Garden Hall',
    image: '/placeholder-image.jpg',
    rating: 4.8,
    reviews: 42,
    price: 'PKR 80,000 - 150,000',
    category: 'Venue'
  },
  {
    id: '3',
    name: 'Luxury Palace',
    image: '/placeholder-image.jpg',
    rating: 4.7,
    reviews: 38,
    price: 'PKR 120,000 - 250,000',
    category: 'Venue'
  },
  {
    id: '4',
    name: 'Grand Ballroom',
    image: '/placeholder-image.jpg',
    rating: 4.6,
    reviews: 31,
    price: 'PKR 90,000 - 180,000',
    category: 'Venue'
  },
  {
    id: '5',
    name: 'Elite Catering',
    image: '/placeholder-image.jpg',
    rating: 4.9,
    reviews: 67,
    price: 'PKR 500 - 1,200 per person',
    category: 'Catering'
  },
  {
    id: '6',
    name: 'Royal Cuisine',
    image: '/placeholder-image.jpg',
    rating: 4.7,
    reviews: 54,
    price: 'PKR 400 - 1,000 per person',
    category: 'Catering'
  }
]

const categories = [
  { title: 'Find Best Venues', vendors: featuredVendors.filter(v => v.category === 'Venue') },
  { title: 'Find Best Catering Service', vendors: featuredVendors.filter(v => v.category === 'Catering') },
  { title: 'Find Best Beauty Salon', vendors: featuredVendors.slice(0, 4) },
  { title: 'Find Best Boutiques', vendors: featuredVendors.slice(0, 4) },
  { title: 'Find Best Decor Service', vendors: featuredVendors.slice(0, 4) }
]

export function FeaturedListings() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {category.title}
              </h2>
              <Link href="/vendors">
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  View All
                </Button>
              </Link>
            </div>

            <VendorCarousel vendors={category.vendors} />
          </div>
        ))}
      </div>
    </div>
  )
}

function VendorCarousel({ vendors }: { vendors: Vendor[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4
  const maxIndex = Math.max(0, vendors.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {vendors.map((vendor) => (
            <div key={vendor.id} className="w-1/4 flex-shrink-0 px-3">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={vendor.image}
                    alt={vendor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{vendor.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {vendor.rating} ({vendor.reviews} Reviews)
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{vendor.price}</p>
                  <Link href={`/vendors/${vendor.id}`}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center mt-6 space-x-4">
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
  )
}
