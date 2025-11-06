'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MessageCircle, MapPin, Star } from 'lucide-react'
import { DemoPartner } from '@/lib/data/demoPartners'

interface PartnerCardProps {
  partner: DemoPartner
  index?: number
}

const businessTypeColors = {
  wedding: 'border-[#DD374033] bg-[#F7E9DB]',
  boutiques: 'border-[#DD374033] bg-[#F7E9DB]',
  'beauty-parlor': 'border-[#DD374033] bg-[#F7E9DB]',
  decor: 'border-[#DD374033] bg-[#F7E9DB]',
  catering: 'border-[#DD374033] bg-[#F7E9DB]',
}

const businessTypeBadges = {
  wedding: 'Wedding Venue',
  boutiques: 'Boutique',
  'beauty-parlor': 'Beauty',
  decor: 'Décor',
  catering: 'Catering',
}

export default function PartnerCard({ partner, index = 0 }: PartnerCardProps) {
  const handleWhatsApp = () => {
    const phone = partner.contact.whatsapp || partner.contact.phone.replace(/\D/g, '')
    window.open(`https://wa.me/${phone}`, '_blank')
  }

  const handleCall = () => {
    window.location.href = `tel:${partner.contact.phone}`
  }

  const handleEmail = () => {
    if (partner.contact.email) {
      window.location.href = `mailto:${partner.contact.email}`
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className={`h-full flex flex-col border-2 ${businessTypeColors[partner.businessType]} hover:shadow-lg transition-all duration-300`}>
        {/* Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-[#F7E9DB] to-[#F7E9DB]/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[#D13F43] text-4xl font-bold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {partner.name.charAt(0)}
            </div>
          </div>
          {/* Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#D13F43]">
              {businessTypeBadges[partner.businessType]}
            </span>
          </div>
          {/* Demo Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#2E2E2E]">
              Demo
            </span>
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Name & Rating */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-[#2E2E2E] mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {partner.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-[#666666]">
              <MapPin className="w-4 h-4" />
              <span>{partner.area}, {partner.city}</span>
            </div>
            {partner.rating && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium text-[#2E2E2E]">{partner.rating}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-[#666666] mb-4 flex-1 line-clamp-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {partner.description}
          </p>

          {/* Pricing */}
          {partner.pricing && (
            <div className="mb-4">
              <span className="text-sm font-semibold text-[#2E2E2E]" style={{ fontFamily: 'DM Sans, sans-serif' }}>Pricing: </span>
              <span className="text-sm text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{partner.pricing}</span>
            </div>
          )}

          {/* Contact Buttons */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#DD374033]">
            <button
              onClick={handleCall}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-[#F7E9DB] rounded-lg transition-colors text-sm font-medium text-[#2E2E2E] border border-[#DD374033]"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <Phone className="w-4 h-4" />
              Call
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors text-sm font-medium text-green-700"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            {partner.contact.email && (
              <button
                onClick={handleEmail}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#F7E9DB] hover:bg-[#F7E9DB]/80 rounded-lg transition-colors text-sm font-medium text-[#D13F43]"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
