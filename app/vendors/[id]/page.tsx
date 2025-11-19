'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import Image from 'next/image'
import Link from 'next/link'

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
  // Owner Details
  ownerName?: string | null
  ownerMobile1?: string | null
  ownerMobile2?: string | null
  ownerLandline?: string | null
  ownerEmail?: string | null
  // Manager Details
  managerName?: string | null
  managerMobile1?: string | null
  managerMobile2?: string | null
  managerLandline?: string | null
  managerEmail?: string | null
  // Business Details
  area?: string | null
  completeAddress?: string | null
  website?: string | null
  businessEmail?: string | null
  // Bank Details
  bankName?: string | null
  branchCity?: string | null
  accountNumber?: string | null
  ibanNumber?: string | null
  // Common Fields
  businessDuration?: string | null
  numberOfBranches?: string | null
  cancellationPolicy?: string | null
  fireInsurance?: string | null
  weArrangeInsurance?: string | null
  wheelchairAccessible?: string | null
  // Venue specific
  venueType?: string | null
  guestCapacity?: string | null
  venuePricingRange?: string | null
  cateringAvailable?: string | null
  outsideCateringAllowed?: string | null
  parkingCapacity?: string | null
  parkingType?: string | null
  amenities?: string | null
  bridalSuite?: string | null
  namazAreaMen?: string | null
  namazAreaLadies?: string | null
  // Boutique specific
  dressType?: string | null
  designOrResell?: string | null
  fabrics?: string | null
  priceRange?: string | null
  customization?: string | null
  rentalPolicy?: string | null
  delivery?: string | null
  // Salon specific
  servicesList?: string | null
  packages?: string | null
  operatingHours?: string | null
  brandsUsed?: string | null
  staffExpertise?: string | null
  bridalTrials?: string | null
  salonPricing?: string | null
  promotions?: string | null
  hygiene?: string | null
  // Décor specific
  decorType?: string | null
  decorStyle?: string | null
  eventTypes?: string | null
  decorPricingRange?: string | null
  setupTime?: string | null
  equipmentProvided?: string | null
  customDesign?: string | null
  themesAvailable?: string | null
  floralsIncluded?: string | null
  lightingServices?: string | null
  // Catering specific
  cuisineType?: string | null
  menuStyle?: string | null
  servingStyle?: string | null
  minimumGuests?: string | null
  maximumGuests?: string | null
  cateringPricingRange?: string | null
  halalCertified?: string | null
  vegetarianOptions?: string | null
  dietaryAccommodations?: string | null
  setupService?: string | null
  servingStaff?: string | null
  equipmentRental?: string | null
}

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export default function VendorDetailPage() {
  const params = useParams()
  const vendorId = params?.id as string
  
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    numberOfGuests: '',
    additionalInfo: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Sara Khan',
      rating: 5,
      comment: 'Amazing Long-Standing Craftsmen, Much Love <3. The venue was absolutely beautiful and the staff was incredibly helpful throughout our event.',
      date: '4 months ago',
      verified: true,
    },
    {
      id: '2',
      name: 'Nadeem Baig',
      rating: 5,
      comment: 'Love The Designs And Art. The decoration was stunning and everything was perfectly organized. Highly recommended!',
      date: '25 days ago',
      verified: true,
    },
    {
      id: '3',
      name: 'Ijaz Khan',
      rating: 5,
      comment: 'Amazing Long-Standing Craftsmen, Much Love <3. The service was excellent and the venue exceeded our expectations.',
      date: '1 month ago',
      verified: true,
    },
  ]

  useEffect(() => {
    if (!vendorId) return
    
    const fetchVendor = async () => {
      try {
        const response = await fetch(`/api/vendors/${vendorId}`)
        if (response.ok) {
          const data = await response.json()
          setVendor(data)
        }
      } catch (error) {
        console.error('Error fetching vendor:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVendor()
  }, [vendorId])

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    // Validate required fields
    if (!bookingForm.fullName || !bookingForm.email) {
      setError('Please fill in all required fields')
      setSubmitting(false)
      return
    }

    if (!vendorId) {
      setError('Vendor ID is missing. Please refresh the page and try again.')
      setSubmitting(false)
      return
    }

    try {
      const inquiryData = {
        vendorId: vendorId,
        name: bookingForm.fullName,
        email: bookingForm.email,
        message: `Booking Request:
Event Date: ${bookingForm.eventDate || 'Not specified'}
Event Time: ${bookingForm.eventTime || 'Not specified'}
Number of Guests: ${bookingForm.numberOfGuests || 'Not specified'}
Phone: ${bookingForm.phone || 'Not provided'}
Additional Information: ${bookingForm.additionalInfo || 'None'}`,
      }

      console.log('Submitting inquiry:', inquiryData)

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Inquiry submission failed:', data)
        setError(data.error || 'Failed to submit inquiry. Please try again.')
        return
      }

      console.log('Inquiry submitted successfully:', data)
      setSubmitted(true)
      setBookingForm({
        fullName: '',
        email: '',
        phone: '',
        eventDate: '',
        eventTime: '',
        numberOfGuests: '',
        additionalInfo: '',
      })
    } catch (error) {
      console.error('Error submitting booking:', error)
      setError('An error occurred. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const nextImage = () => {
    if (vendor && vendor.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % vendor.images.length)
    }
  }

  const prevImage = () => {
    if (vendor && vendor.images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + vendor.images.length) % vendor.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Vendor not found
            </h1>
            <Link href="/vendors">
              <Button>Back to Vendors</Button>
            </Link>
          </div>
        </div>
      </div>
    )
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
            <Link href="/vendors" className="hover:text-red-600">Venues</Link>
            <span>/</span>
            <span className="text-gray-900">{vendor.name}</span>
          </div>
        </nav>

        {/* Venue Title */}
        <div className="relative mb-8">
          <div className="absolute left-0 top-0 w-16 h-16 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-300 rounded-full"></div>
          </div>
          <div className="absolute right-0 top-0 w-12 h-12 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {vendor.name}
            </h1>
          </div>
        </div>

        {/* Main Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
            <Image
              src={vendor.images[selectedImage] || '/placeholder-image.jpg'}
              alt={vendor.name}
              fill
              className="object-cover"
              unoptimized
            />
            
            {/* Navigation Arrows */}
            {vendor.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {vendor.images.length > 1 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {vendor.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                    selectedImage === index ? 'ring-2 ring-red-500' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${vendor.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details Card */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Space Type</p>
                    <p className="font-semibold">{vendor.type || 'Hall'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-semibold">{vendor.capacity || '500-1000'}</p>
                  </div>
                </div>

                {vendor.cancellationPolicy && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cancellation Policy</p>
                      <p className="font-semibold text-xs line-clamp-1">{vendor.cancellationPolicy}</p>
                    </div>
                  </div>
                )}

                {vendor.cateringAvailable && vendor.category === 'Venue' && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Catering</p>
                      <p className="font-semibold">{vendor.cateringAvailable}</p>
                    </div>
                  </div>
                )}

                {vendor.wheelchairAccessible && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Wheelchair Accessibility</p>
                      <p className="font-semibold">{vendor.wheelchairAccessible}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{vendor.city}</p>
                  </div>
                </div>

                {/* Category-Specific Quick Details */}
                {vendor.category === 'Catering' && (
                  <>
                    <div className="pt-6 border-t">
                      <h4 className="font-semibold mb-3 text-gray-900">Catering Details</h4>
                      <div className="space-y-3">
                        {vendor.cuisineType && (
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-600">Cuisine Type</p>
                              <p className="font-semibold text-sm truncate">{vendor.cuisineType}</p>
                            </div>
                          </div>
                        )}
                        {vendor.servingStyle && (
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-600">Serving Style</p>
                              <p className="font-semibold text-sm truncate">{vendor.servingStyle}</p>
                            </div>
                          </div>
                        )}
                        {vendor.minimumGuests && (
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-600">Guest Range</p>
                              <p className="font-semibold text-sm truncate">{vendor.minimumGuests} - {vendor.maximumGuests || 'N/A'}</p>
                            </div>
                          </div>
                        )}
                        {vendor.cateringPricingRange && (
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-600">Pricing Range</p>
                              <p className="font-semibold text-sm truncate">{vendor.cateringPricingRange}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Share Section */}
                <div className="pt-6 border-t">
                  <h4 className="font-semibold mb-3">Share</h4>
                  <div className="flex space-x-3">
                    <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - About & Booking */}
          <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">
            {/* About Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This {vendor.category}</h2>
              <div className="space-y-4 text-gray-700">
                <p>{vendor.description}</p>
              </div>

              {/* Contact Information */}
              {(vendor.ownerMobile1 || vendor.managerMobile1 || vendor.ownerEmail || vendor.businessEmail) && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {vendor.ownerName && (
                      <div>
                        <p className="text-sm text-gray-600">Owner</p>
                        <p className="font-semibold">{vendor.ownerName}</p>
                        {vendor.ownerMobile1 && <p className="text-sm text-gray-700">📱 {vendor.ownerMobile1}</p>}
                        {vendor.ownerMobile2 && <p className="text-sm text-gray-700">📱 {vendor.ownerMobile2}</p>}
                        {vendor.ownerLandline && <p className="text-sm text-gray-700">☎️ {vendor.ownerLandline}</p>}
                        {vendor.ownerEmail && <p className="text-sm text-gray-700">✉️ {vendor.ownerEmail}</p>}
                      </div>
                    )}
                    {vendor.managerName && (
                      <div>
                        <p className="text-sm text-gray-600">Manager</p>
                        <p className="font-semibold">{vendor.managerName}</p>
                        {vendor.managerMobile1 && <p className="text-sm text-gray-700">📱 {vendor.managerMobile1}</p>}
                        {vendor.managerMobile2 && <p className="text-sm text-gray-700">📱 {vendor.managerMobile2}</p>}
                        {vendor.managerLandline && <p className="text-sm text-gray-700">☎️ {vendor.managerLandline}</p>}
                        {vendor.managerEmail && <p className="text-sm text-gray-700">✉️ {vendor.managerEmail}</p>}
                      </div>
                    )}
                    {vendor.businessEmail && (
                      <div>
                        <p className="text-sm text-gray-600">Business Email</p>
                        <p className="text-sm text-gray-700">✉️ {vendor.businessEmail}</p>
                      </div>
                    )}
                    {vendor.website && (
                      <div>
                        <p className="text-sm text-gray-600">Website</p>
                        <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          {vendor.website}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Location Details */}
              {(vendor.area || vendor.completeAddress) && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Location Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {vendor.area && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600">Area</p>
                        <p className="font-semibold">{vendor.area}</p>
                      </div>
                    )}
                    {vendor.completeAddress && (
                      <div>
                        <p className="text-sm text-gray-600">Complete Address</p>
                        <p className="text-gray-700">{vendor.completeAddress}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Business Information */}
              {(vendor.businessDuration || vendor.numberOfBranches) && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Business Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {vendor.businessDuration && (
                      <div>
                        <p className="text-sm text-gray-600">Business Duration</p>
                        <p className="font-semibold">{vendor.businessDuration}</p>
                      </div>
                    )}
                    {vendor.numberOfBranches && (
                      <div>
                        <p className="text-sm text-gray-600">Number of Branches</p>
                        <p className="font-semibold">{vendor.numberOfBranches}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Policies & Additional Information */}
              {(vendor.cancellationPolicy || vendor.fireInsurance || vendor.weArrangeInsurance || vendor.wheelchairAccessible) && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Policies & Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {vendor.cancellationPolicy && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Cancellation Policy</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.cancellationPolicy}</p>
                      </div>
                    )}
                    {vendor.fireInsurance && (
                      <div>
                        <p className="text-sm text-gray-600">Fire Insurance</p>
                        <p className="font-semibold">{vendor.fireInsurance}</p>
                      </div>
                    )}
                    {vendor.weArrangeInsurance && (
                      <div>
                        <p className="text-sm text-gray-600">We Arrange Insurance</p>
                        <p className="font-semibold">{vendor.weArrangeInsurance}</p>
                      </div>
                    )}
                    {vendor.wheelchairAccessible && (
                      <div>
                        <p className="text-sm text-gray-600">Wheelchair Accessible</p>
                        <p className="font-semibold">{vendor.wheelchairAccessible}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Category-Specific Information */}
              {vendor.category === 'Venue' && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Venue Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {vendor.venueType && (
                      <div>
                        <p className="text-sm text-gray-600">Venue Type</p>
                        <p className="font-semibold">{vendor.venueType}</p>
                      </div>
                    )}
                    {vendor.guestCapacity && (
                      <div>
                        <p className="text-sm text-gray-600">Guest Capacity</p>
                        <p className="font-semibold">{vendor.guestCapacity}</p>
                      </div>
                    )}
                    {vendor.venuePricingRange && (
                      <div>
                        <p className="text-sm text-gray-600">Pricing Range</p>
                        <p className="font-semibold">{vendor.venuePricingRange}</p>
                      </div>
                    )}
                    {vendor.cateringAvailable && (
                      <div>
                        <p className="text-sm text-gray-600">Catering Available</p>
                        <p className="font-semibold">{vendor.cateringAvailable}</p>
                      </div>
                    )}
                    {vendor.outsideCateringAllowed && (
                      <div>
                        <p className="text-sm text-gray-600">Outside Catering Allowed</p>
                        <p className="font-semibold">{vendor.outsideCateringAllowed}</p>
                      </div>
                    )}
                    {vendor.parkingCapacity && (
                      <div>
                        <p className="text-sm text-gray-600">Parking Capacity</p>
                        <p className="font-semibold">{vendor.parkingCapacity}</p>
                      </div>
                    )}
                    {vendor.parkingType && (
                      <div>
                        <p className="text-sm text-gray-600">Parking Type</p>
                        <p className="font-semibold">{vendor.parkingType}</p>
                      </div>
                    )}
                    {vendor.amenities && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Amenities</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.amenities}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      {vendor.bridalSuite && (
                        <div>
                          <p className="text-sm text-gray-600">Bridal Suite</p>
                          <p className="font-semibold">{vendor.bridalSuite}</p>
                        </div>
                      )}
                      {vendor.namazAreaMen && (
                        <div>
                          <p className="text-sm text-gray-600">Namaz Area (Men)</p>
                          <p className="font-semibold">{vendor.namazAreaMen}</p>
                        </div>
                      )}
                      {vendor.namazAreaLadies && (
                        <div>
                          <p className="text-sm text-gray-600">Namaz Area (Ladies)</p>
                          <p className="font-semibold">{vendor.namazAreaLadies}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {vendor.category === 'Boutiques' && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Boutique Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {vendor.dressType && (
                      <div>
                        <p className="text-sm text-gray-600">Dress Type</p>
                        <p className="font-semibold">{vendor.dressType}</p>
                      </div>
                    )}
                    {vendor.designOrResell && (
                      <div>
                        <p className="text-sm text-gray-600">Design or Resell</p>
                        <p className="font-semibold">{vendor.designOrResell}</p>
                      </div>
                    )}
                    {vendor.fabrics && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Fabrics</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.fabrics}</p>
                      </div>
                    )}
                    {vendor.priceRange && (
                      <div>
                        <p className="text-sm text-gray-600">Price Range</p>
                        <p className="font-semibold">{vendor.priceRange}</p>
                      </div>
                    )}
                    {vendor.customization && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Customization</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.customization}</p>
                      </div>
                    )}
                    {vendor.rentalPolicy && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Rental Policy</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.rentalPolicy}</p>
                      </div>
                    )}
                    {vendor.delivery && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Delivery</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.delivery}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {vendor.category === 'Beauty Parlor' && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Salon Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {vendor.servicesList && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Services Offered</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.servicesList}</p>
                      </div>
                    )}
                    {vendor.packages && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Packages & Pricing</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.packages}</p>
                      </div>
                    )}
                    {vendor.operatingHours && (
                      <div>
                        <p className="text-sm text-gray-600">Operating Hours</p>
                        <p className="font-semibold">{vendor.operatingHours}</p>
                      </div>
                    )}
                    {vendor.brandsUsed && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Brands & Products Used</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.brandsUsed}</p>
                      </div>
                    )}
                    {vendor.staffExpertise && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Staff Expertise</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.staffExpertise}</p>
                      </div>
                    )}
                    {vendor.bridalTrials && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Bridal Trials</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.bridalTrials}</p>
                      </div>
                    )}
                    {vendor.salonPricing && (
                      <div>
                        <p className="text-sm text-gray-600">Salon Pricing</p>
                        <p className="font-semibold">{vendor.salonPricing}</p>
                      </div>
                    )}
                    {vendor.promotions && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Promotions</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.promotions}</p>
                      </div>
                    )}
                    {vendor.hygiene && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Hygiene Standards</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.hygiene}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {vendor.category === 'Décor' && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Décor Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {vendor.decorType && (
                      <div>
                        <p className="text-sm text-gray-600">Décor Type</p>
                        <p className="font-semibold">{vendor.decorType}</p>
                      </div>
                    )}
                    {vendor.decorStyle && (
                      <div>
                        <p className="text-sm text-gray-600">Décor Style</p>
                        <p className="font-semibold">{vendor.decorStyle}</p>
                      </div>
                    )}
                    {vendor.eventTypes && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Event Types</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.eventTypes}</p>
                      </div>
                    )}
                    {vendor.decorPricingRange && (
                      <div>
                        <p className="text-sm text-gray-600">Pricing Range</p>
                        <p className="font-semibold">{vendor.decorPricingRange}</p>
                      </div>
                    )}
                    {vendor.setupTime && (
                      <div>
                        <p className="text-sm text-gray-600">Setup Time</p>
                        <p className="font-semibold">{vendor.setupTime}</p>
                      </div>
                    )}
                    {vendor.equipmentProvided && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Equipment Provided</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.equipmentProvided}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      {vendor.customDesign && (
                        <div>
                          <p className="text-sm text-gray-600">Custom Design</p>
                          <p className="font-semibold">{vendor.customDesign}</p>
                        </div>
                      )}
                      {vendor.floralsIncluded && (
                        <div>
                          <p className="text-sm text-gray-600">Florals Included</p>
                          <p className="font-semibold">{vendor.floralsIncluded}</p>
                        </div>
                      )}
                    </div>
                    {vendor.themesAvailable && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Themes Available</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.themesAvailable}</p>
                      </div>
                    )}
                    {vendor.lightingServices && (
                      <div>
                        <p className="text-sm text-gray-600">Lighting Services</p>
                        <p className="font-semibold">{vendor.lightingServices}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {vendor.category === 'Catering' && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Catering Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {vendor.cuisineType && (
                      <div>
                        <p className="text-sm text-gray-600">Cuisine Type</p>
                        <p className="font-semibold">{vendor.cuisineType}</p>
                      </div>
                    )}
                    {vendor.menuStyle && (
                      <div>
                        <p className="text-sm text-gray-600">Menu Style</p>
                        <p className="font-semibold">{vendor.menuStyle}</p>
                      </div>
                    )}
                    {vendor.servingStyle && (
                      <div>
                        <p className="text-sm text-gray-600">Serving Style</p>
                        <p className="font-semibold">{vendor.servingStyle}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      {vendor.minimumGuests && (
                        <div>
                          <p className="text-sm text-gray-600">Minimum Guests</p>
                          <p className="font-semibold">{vendor.minimumGuests}</p>
                        </div>
                      )}
                      {vendor.maximumGuests && (
                        <div>
                          <p className="text-sm text-gray-600">Maximum Guests</p>
                          <p className="font-semibold">{vendor.maximumGuests}</p>
                        </div>
                      )}
                    </div>
                    {vendor.cateringPricingRange && (
                      <div>
                        <p className="text-sm text-gray-600">Pricing Range</p>
                        <p className="font-semibold">{vendor.cateringPricingRange}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      {vendor.halalCertified && (
                        <div>
                          <p className="text-sm text-gray-600">Halal Certified</p>
                          <p className="font-semibold">{vendor.halalCertified}</p>
                        </div>
                      )}
                      {vendor.vegetarianOptions && (
                        <div>
                          <p className="text-sm text-gray-600">Vegetarian Options</p>
                          <p className="font-semibold">{vendor.vegetarianOptions}</p>
                        </div>
                      )}
                    </div>
                    {vendor.dietaryAccommodations && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Dietary Accommodations</p>
                        <p className="text-gray-700 whitespace-pre-line">{vendor.dietaryAccommodations}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      {vendor.setupService && (
                        <div>
                          <p className="text-sm text-gray-600">Setup Service</p>
                          <p className="font-semibold">{vendor.setupService}</p>
                        </div>
                      )}
                      {vendor.servingStaff && (
                        <div>
                          <p className="text-sm text-gray-600">Serving Staff</p>
                          <p className="font-semibold">{vendor.servingStaff}</p>
                        </div>
                      )}
                      {vendor.equipmentRental && (
                        <div>
                          <p className="text-sm text-gray-600">Equipment Rental</p>
                          <p className="font-semibold">{vendor.equipmentRental}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-6">
                <p className="text-2xl font-bold text-red-600 mb-4">
                  Starting At {vendor.pricing}
                </p>
                
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Send a Message</span>
                  </Button>
                  {(vendor.ownerMobile1 || vendor.managerMobile1) && (
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2"
                      onClick={() => {
                        const phone = vendor.ownerMobile1 || vendor.managerMobile1 || ''
                        window.location.href = `tel:${phone.replace(/[^0-9+]/g, '')}`
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Call Now {vendor.ownerMobile1 || vendor.managerMobile1}</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Check Availability & Book Venue</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below to check availability and submit your booking request.
                </p>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-green-600 text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Booking Request Submitted!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for your interest. We&apos;ll contact you soon to confirm availability.
                    </p>
                    <Button onClick={() => setSubmitted(false)}>
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitBooking} className="space-y-6">
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                        {error}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="Reyyan Rana"
                          value={bookingForm.fullName}
                          onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="reyyanrana@example.com"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="0300-01234567"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventDate">Preferred Event Date</Label>
                        <DatePicker
                          id="eventDate"
                          value={bookingForm.eventDate}
                          onChange={(date) => setBookingForm({ ...bookingForm, eventDate: date })}
                          placeholder="Select your preferred date"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventTime">Event Time</Label>
                        <select
                          id="eventTime"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={bookingForm.eventTime}
                          onChange={(e) => setBookingForm({ ...bookingForm, eventTime: e.target.value })}
                          required
                        >
                          <option value="">Select Time</option>
                          <option value="Morning">Morning</option>
                          <option value="Afternoon">Afternoon</option>
                          <option value="Evening">Evening</option>
                          <option value="Night">Night</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="numberOfGuests">Number of Guests</Label>
                        <select
                          id="numberOfGuests"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={bookingForm.numberOfGuests}
                          onChange={(e) => setBookingForm({ ...bookingForm, numberOfGuests: e.target.value })}
                          required
                        >
                          <option value="">Select Guests</option>
                          <option value="Less than 100">Less than 100</option>
                          <option value="100-300">100-300</option>
                          <option value="300-500">300-500</option>
                          <option value="500-1000">500-1000</option>
                          <option value="More than 1000">More than 1000</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Please specify if you have any requests for vendor."
                        value={bookingForm.additionalInfo}
                        onChange={(e) => setBookingForm({ ...bookingForm, additionalInfo: e.target.value })}
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {submitting ? 'Submitting...' : 'Submit Your Request'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Reviews</CardTitle>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">
                        {vendor.rating} Based On {vendor.reviews || reviews.length} Reviews
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">Write a Review</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Input
                      placeholder="Search review comment"
                      className="pl-10"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{review.name}</h4>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Verified Customer
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Similar Venues */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Venues You May Like</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="relative h-32 mb-3 rounded overflow-hidden">
                        <Image
                          src={vendor.images[0] || '/placeholder-image.jpg'}
                          alt={`Similar venue ${i}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <h4 className="font-semibold mb-1">{vendor.name}</h4>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, j) => (
                            <svg
                              key={j}
                              className={`w-3 h-3 ${
                                j < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">
                          {vendor.rating} ({vendor.reviews || 18})
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{vendor.city}</p>
                      <Link href={`/vendors/${vendor.id}`}>
                        <Button size="sm" variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}