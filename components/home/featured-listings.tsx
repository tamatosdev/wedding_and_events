'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useHomepageCMS } from '@/hooks/useHomepageCMS'

interface Vendor {
  id: string
  name: string
  category: string
  city: string
  pricing: string
  description: string
  images: string[]
  rating: number
  reviews: number
}

// Map business types to vendor categories
const categoryMapping: Record<string, { title: string; category: string; link: string }> = {
  'Wedding': { title: 'Find Best Wedding Venues', category: 'Venue', link: '/venues' },
  'Catering': { title: 'Find Best Catering Services', category: 'Catering', link: '/vendors?category=Catering' },
  'Beauty Parlor': { title: 'Find Best Beauty Parlors', category: 'Beauty Parlor', link: '/vendors?category=Beauty Parlor' },
  'Boutiques': { title: 'Find Best Boutiques', category: 'Boutiques', link: '/vendors?category=Boutiques' },
  'Decoration': { title: 'Find Best Decor Services', category: 'Decoration', link: '/vendors?category=Decoration' },
}

// Get categories from CMS or use defaults
function getCategories() {
  // This will be set from CMS data
  return [
    { title: 'Find Best Wedding Venues', category: 'Wedding', vendorCategory: 'Venue', link: '/venues' },
    { title: 'Find Best Catering Services', category: 'Catering', vendorCategory: 'Catering', link: '/vendors?category=Catering' },
    { title: 'Find Best Beauty Parlors', category: 'Beauty Parlor', vendorCategory: 'Beauty Parlor', link: '/vendors?category=Beauty Parlor' },
    { title: 'Find Best Boutiques', category: 'Boutiques', vendorCategory: 'Boutiques', link: '/vendors?category=Boutiques' },
    { title: 'Find Best Decor Services', category: 'Decoration', vendorCategory: 'Decoration', link: '/vendors?category=Decoration' },
  ]
}

export function FeaturedListings() {
  const { data: cmsData } = useHomepageCMS()
  
  // Get categories from CMS or use defaults
  const categoriesContent = cmsData?.content?.categories
  const categories = categoriesContent?.content?.items || getCategories()

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories.map((categoryData: any, categoryIndex: number) => {
          // Map category to vendor category
          const vendorCategory = categoryData.vendorCategory || categoryMapping[categoryData.category]?.category || categoryData.category
          const link = categoryData.link || categoryMapping[categoryData.category]?.link || `/vendors?category=${vendorCategory}`
          
          return (
            <CategorySection 
              key={categoryIndex} 
              title={categoryData.title || categoryData.name || `Find Best ${categoryData.category}`}
              category={categoryData.category}
              vendorCategory={vendorCategory}
              link={link}
            />
          )
        })}
      </div>
    </div>
  )
}

function CategorySection({ title, category, vendorCategory, link }: { title: string; category: string; vendorCategory: string; link: string }) {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVendors() {
      try {
        setLoading(true)
        // Fetch vendors from database API
        const params = new URLSearchParams({
          category: vendorCategory,
          limit: '8', // Show max 8 per category
          sort: 'rating_desc', // Sort by rating
        })
        
        const response = await fetch(`/api/vendors?${params}`)
        if (response.ok) {
          const data = await response.json()
          setVendors(data?.vendors || [])
        } else {
          console.error('Failed to fetch vendors:', response.status)
          setVendors([])
        }
      } catch (error) {
        console.error('Error fetching vendors:', error)
        setVendors([])
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [vendorCategory])

  if (loading) {
    return (
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-64"></div>
          ))}
        </div>
      </div>
    )
  }

  if (vendors.length === 0) {
    return null // Don't show empty categories
  }

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {title}
        </h2>
        <Link href={link}>
          <Button variant="outline" className="text-[#D13F43] border-[#D13F43] hover:bg-[#F7E9DB]">
            View All
          </Button>
        </Link>
      </div>

      <VendorCarousel vendors={vendors} />
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

  if (vendors.length === 0) {
    return null
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
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-[#DD374033]">
                <div className="relative h-48 bg-gradient-to-br from-[#F7E9DB] to-[#F7E9DB]/50">
                  {vendor.images && vendor.images.length > 0 && vendor.images[0] ? (
                    <Image
                      src={vendor.images[0]}
                      alt={vendor.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-t-xl"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      priority={true}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[#D13F43] text-4xl font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {vendor.name.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>{vendor.name}</h3>
                  <div className="flex items-center mb-2">
                    {vendor.rating && (
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(vendor.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}
                    <span className="text-sm text-[#666666] ml-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {vendor.rating?.toFixed(1) || '0.0'} ({vendor.reviews || 0})
                    </span>
                  </div>
                  <p className="text-sm text-[#666666] mb-3 line-clamp-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>{vendor.description}</p>
                  {vendor.pricing && (
                    <p className="text-sm font-semibold text-[#D13F43] mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>{vendor.pricing}</p>
                  )}
                  <Link href={`/vendors/${vendor.id}`}>
                    <Button className="w-full bg-[#D13F43] hover:bg-[#b82f33] text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
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
      {vendors.length > itemsPerView && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-10 h-10 bg-[#D13F43] text-white rounded-full flex items-center justify-center hover:bg-[#b82f33] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="w-10 h-10 bg-[#D13F43] text-white rounded-full flex items-center justify-center hover:bg-[#b82f33] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
