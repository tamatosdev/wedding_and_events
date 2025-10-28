'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (selectedCategory) params.append('category', selectedCategory)
    if (selectedCity) params.append('city', selectedCity)
    
    window.location.href = `/vendors?${params.toString()}`
  }

  const featuredVenues = [
    {
      id: 1,
      name: 'Royal Banquet Hall',
      image: '/placeholder-image.jpg',
      price: 'PKR 150,000 - 300,000'
    },
    {
      id: 2,
      name: 'Garden Venue',
      image: '/placeholder-image.jpg',
      price: 'PKR 100,000 - 200,000'
    },
    {
      id: 3,
      name: 'Luxury Hotel',
      image: '/placeholder-image.jpg',
      price: 'PKR 200,000 - 500,000'
    },
    {
      id: 4,
      name: 'Traditional Hall',
      image: '/placeholder-image.jpg',
      price: 'PKR 80,000 - 150,000'
    }
  ]

  return (
    <section className="relative bg-gradient-to-b from-amber-50 to-white py-16">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-100 rounded-full opacity-20"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-100 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Your Perfect <span className="text-red-600">Event</span> Starts Here!
          </h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <select
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Venue">Wedding Venues</option>
                  <option value="Catering">Catering</option>
                  <option value="Photography">Photography</option>
                  <option value="Fashion">Bridal Wear</option>
                  <option value="Decorations">Decorators</option>
                  <option value="Makeup">Makeup Artists</option>
                </select>
              </div>
              
              <div>
                <select
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                </select>
              </div>
              
              <div>
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <div>
                <Button 
                  onClick={handleSearch}
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Venues Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {featuredVenues.map((venue) => (
            <div key={venue.id} className="group cursor-pointer">
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-sm mb-1">{venue.name}</h3>
                  <p className="text-xs opacity-90">{venue.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
