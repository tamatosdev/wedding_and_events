'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, Shirt, Sparkles, Palette, UtensilsCrossed } from 'lucide-react'
import { demoPartners, getPartnersByType, DemoPartner } from '@/lib/data/demoPartners'
import PartnerCard from './PartnerCard'

const businessTypes = [
  { id: 'all' as const, label: 'All Partners', icon: null },
  { id: 'wedding' as const, label: 'Wedding Venues', icon: Building2 },
  { id: 'boutiques' as const, label: 'Boutiques', icon: Shirt },
  { id: 'beauty-parlor' as const, label: 'Beauty Parlors', icon: Sparkles },
  { id: 'decor' as const, label: 'Decoration', icon: Palette },
  { id: 'catering' as const, label: 'Catering', icon: UtensilsCrossed },
] as const

type FilterType = typeof businessTypes[number]['id']

export default function PartnerShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get filter from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const typeParam = params.get('type')
    if (typeParam && businessTypes.some(bt => bt.id === typeParam)) {
      setSelectedFilter(typeParam as FilterType)
    }
  }, [])

  const filteredPartners = demoPartners.filter(partner => {
    const matchesFilter = selectedFilter === 'all' || partner.businessType === selectedFilter
    const matchesSearch = 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#2E2E2E] mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Our Partner Showcase
          </h1>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Discover trusted partners for your special day. Browse through our curated selection of venues, boutiques, beauty parlours, décor, and catering services in Karachi.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by name, area, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-[#DD374033] focus:border-[#D13F43] focus:ring-2 focus:ring-[#D13F43] outline-none transition-all"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {businessTypes.map((type) => {
            const Icon = type.icon
            const isActive = selectedFilter === type.id
            
            return (
              <button
                key={type.id}
                onClick={() => setSelectedFilter(type.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  isActive
                    ? 'bg-[#D13F43] text-white shadow-lg hover:bg-[#b82f33]'
                    : 'bg-white text-[#2E2E2E] hover:bg-[#F7E9DB] border-2 border-[#DD374033]'
                }`}
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{type.label}</span>
                {type.id !== 'all' && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    isActive ? 'bg-white/20' : 'bg-[#F7E9DB]'
                  }`}>
                    {getPartnersByType(type.id).length}
                  </span>
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Showing <span className="font-semibold text-[#2E2E2E]">{filteredPartners.length}</span> partner{filteredPartners.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Partner Grid */}
        {filteredPartners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-[#666666] text-lg" style={{ fontFamily: 'DM Sans, sans-serif' }}>No partners found matching your search.</p>
          </motion.div>
        )}

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 bg-[#F7E9DB] border-2 border-[#DD374033] rounded-lg"
        >
          <p className="text-center text-[#2E2E2E]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <strong>Note:</strong> These are demo partners for showcase purposes. 
            <a href="/partner-onboarding" className="text-[#D13F43] hover:text-[#b82f33] font-semibold ml-1">
              Become a partner →
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
