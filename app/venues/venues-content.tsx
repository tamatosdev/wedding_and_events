'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/footer'

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
  capacity?: string
  type?: string
  user: {
    name: string | null
    email: string
  }
}

interface VendorsResponse {
  vendors: Vendor[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export default function VenuesContent() {
  const searchParams = useSearchParams()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    pages: 0,
  })
  const [showFilters, setShowFilters] = useState(true)
  const [sortBy, setSortBy] = useState('newest')

  // Filter states - default to Venue category
  const [filters, setFilters] = useState({
    search: '',
    category: 'Venue', // Default to Venue category
    city: searchParams?.get('city') || '',
    minPrice: '',
    maxPrice: '',
    capacity: searchParams?.get('capacity')?.split(',').filter(Boolean) || [],
    type: searchParams?.get('type')?.split(',').filter(Boolean) || [],
    rating: searchParams?.get('rating')?.split(',').filter(Boolean) || [],
  })

  // Initialize filters from URL params
  useEffect(() => {
    if (searchParams) {
      setFilters({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || 'Venue', // Default to Venue
        city: searchParams.get('city') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        capacity: searchParams.get('capacity')?.split(',').filter(Boolean) || [],
        type: searchParams.get('type')?.split(',').filter(Boolean) || [],
        rating: searchParams.get('rating')?.split(',').filter(Boolean) || [],
      })
    }
  }, [searchParams])

  const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 
    'Faisalabad', 'Multan', 'Peshawar', 'Quetta'
  ]

  const capacityRanges = [
    '0-100', '100-300', '300-500', '500-1000', '1000-1500', '1500-2000'
  ]

  const venueTypes = ['Hall', 'Outdoor', 'Marquee', 'Other']

  const ratingOptions = ['Any Rating', '2.5 Above', '3.5 Above', '4.5 Above']

  const fetchVendors = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '6',
        sort: sortBy,
        category: 'Venue', // Always filter by Venue category
      })
      
      if (filters.search) params.append('search', filters.search)
      if (filters.city) params.append('city', filters.city)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.capacity.length > 0) params.append('capacity', filters.capacity.join(','))
      if (filters.type.length > 0) params.append('type', filters.type.join(','))
      if (filters.rating.length > 0) params.append('rating', filters.rating.join(','))

      const response = await fetch(`/api/vendors?${params}`)
      if (!response.ok) {
        console.error('Error fetching venues:', response.status, response.statusText)
        setVendors([])
        return
      }
      const data: VendorsResponse = await response.json()
      
      setVendors(data?.vendors || [])
      setPagination(data?.pagination || { page: 1, limit: 6, total: 0, pages: 0 })
    } catch (error) {
      console.error('Error fetching venues:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, sortBy, filters])

  useEffect(() => {
    fetchVendors()
  }, [fetchVendors])

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const handleCapacityChange = (capacity: string) => {
    setFilters(prev => ({
      ...prev,
      capacity: prev.capacity.includes(capacity)
        ? prev.capacity.filter(c => c !== capacity)
        : [...prev.capacity, capacity]
    }))
    setCurrentPage(1)
  }

  const handleTypeChange = (type: string) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type]
    }))
    setCurrentPage(1)
  }

  const handleRatingChange = (rating: string) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating.includes(rating)
        ? prev.rating.filter(r => r !== rating)
        : [...prev.rating, rating]
    }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'Venue',
      city: '',
      minPrice: '',
      maxPrice: '',
      capacity: [],
      type: [],
      rating: [],
    })
    setCurrentPage(1)
  }

  const applyFilters = () => {
    fetchVendors()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Venues</span>
          </div>
        </nav>

        {/* Header Section */}
        <div className="relative mb-8">
          <div className="absolute left-0 top-0 w-32 h-32 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 rounded-full"></div>
          </div>
          <div className="absolute right-0 top-0 w-24 h-24 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Top Event Venues
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Browse verified venues across your city. Filter by location, price and capacity to find your dream space.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80 flex-shrink-0">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Filters</h3>
                  
                  {/* Location */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      value={filters.city}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="h-10"
                      />
                      <Input
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Capacity
                    </label>
                    <div className="space-y-2">
                      {capacityRanges.map((capacity) => (
                        <label key={capacity} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.capacity.includes(capacity)}
                            onChange={() => handleCapacityChange(capacity)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{capacity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Type
                    </label>
                    <div className="space-y-2">
                      {venueTypes.map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.type.includes(type)}
                            onChange={() => handleTypeChange(type)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Rating
                    </label>
                    <div className="space-y-2">
                      {ratingOptions.map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.rating.includes(rating)}
                            onChange={() => handleRatingChange(rating)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{rating}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="space-y-3">
                    <Button 
                      onClick={applyFilters}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      Apply Filters
                    </Button>
                    <button
                      onClick={clearFilters}
                      className="w-full text-sm text-gray-600 hover:text-red-600"
                    >
                      Clear Filter
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Showing {vendors.length} of {pagination.total} results
                </span>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-sm text-gray-600 hover:text-red-600"
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort By:</span>
                <select
                  className="h-8 px-3 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Vendors Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : vendors.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {vendors.map((vendor) => (
                    <Card key={vendor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={vendor.images[0] || '/placeholder-image.jpg'}
                          alt={vendor.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{vendor.name}</h3>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {vendor.city}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                            </svg>
                            {vendor.capacity || '500-1000'}
                          </span>
                        </div>

                        <div className="flex items-center mb-3">
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
                            {vendor.rating} ({vendor.reviews || 18} reviews)
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {vendor.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-red-600">
                            Starting At {vendor.pricing}
                          </span>
                          <Link href={`/vendors/${vendor.id}`}>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    
                    {[...Array(pagination.pages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        className={currentPage === i + 1 ? "bg-red-600 hover:bg-red-700 text-white" : ""}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      disabled={currentPage === pagination.pages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No venues found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

