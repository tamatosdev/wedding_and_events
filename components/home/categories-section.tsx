'use client'

import Link from 'next/link'

const categories = [
  { name: 'Wedding Venues', icon: '🏛️', slug: 'venue' },
  { name: 'Catering', icon: '🍰', slug: 'catering' },
  { name: 'Makeup Artists', icon: '💄', slug: 'makeup' },
  { name: 'Bridal Wear', icon: '👗', slug: 'fashion' },
  { name: 'Decorators', icon: '🌸', slug: 'decorations' },
  { name: 'Photography', icon: '📸', slug: 'photography' },
  { name: 'Music & DJ', icon: '🎵', slug: 'music' },
  { name: 'Transport', icon: '🚗', slug: 'transport' },
  { name: 'Flowers', icon: '🌹', slug: 'flowers' },
  { name: 'Invitations', icon: '💌', slug: 'invitations' },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Every Vendor You Need
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/vendors?category=${category.slug}`}
              className="flex-shrink-0 group"
            >
              <div className="w-32 h-32 bg-white border-2 border-gray-100 rounded-xl flex flex-col items-center justify-center hover:border-red-500 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center px-2">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Advertisement Banner */}
        <div className="mt-16 bg-gray-100 rounded-xl p-8 text-center">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">ADS</span>
            </div>
            <div className="text-gray-600">
              <p className="text-lg font-medium">ADS GOES HERE</p>
              <p className="text-sm">Advertisement space for partners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
