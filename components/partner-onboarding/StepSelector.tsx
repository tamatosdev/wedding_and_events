'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, Shirt, Sparkles, Palette, UtensilsCrossed } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { BusinessType } from '@/lib/partner-onboarding/formConfig'

const businessTypes = [
  {
    id: 'wedding' as BusinessType,
    title: 'Wedding Halls/Venues',
    description: 'Wedding halls, banquet facilities, marquees, and event spaces',
    icon: Building2,
    color: 'bg-[#D13F43]',
    bgColor: 'bg-[#F7E9DB]',
    borderColor: 'border-[#DD374033]',
  },
  {
    id: 'boutiques' as BusinessType,
    title: 'Boutiques',
    description: 'Bridal wear, designer dresses, and fashion boutiques',
    icon: Shirt,
    color: 'bg-[#D13F43]',
    bgColor: 'bg-[#F7E9DB]',
    borderColor: 'border-[#DD374033]',
  },
  {
    id: 'beauty-parlor' as BusinessType,
    title: 'Beauty Parlor',
    description: 'Bridal makeup, hair styling, and beauty services',
    icon: Sparkles,
    color: 'bg-[#D13F43]',
    bgColor: 'bg-[#F7E9DB]',
    borderColor: 'border-[#DD374033]',
  },
  {
    id: 'decor' as BusinessType,
    title: 'Decoration',
    description: 'Event decoration, floral arrangements, and styling services',
    icon: Palette,
    color: 'bg-[#D13F43]',
    bgColor: 'bg-[#F7E9DB]',
    borderColor: 'border-[#DD374033]',
  },
  {
    id: 'catering' as BusinessType,
    title: 'Catering',
    description: 'Food catering, beverages, and dining services for events',
    icon: UtensilsCrossed,
    color: 'bg-[#D13F43]',
    bgColor: 'bg-[#F7E9DB]',
    borderColor: 'border-[#DD374033]',
  },
]

export default function StepSelector() {
  const { businessType, setBusinessType, updateFormData } = usePartnerForm()

  const handleSelect = (type: BusinessType) => {
    setBusinessType(type)
    updateFormData({ businessType: type })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#2E2E2E] mb-3"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Select Your Business Type
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#666666] text-lg"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Choose the category that best describes your business
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessTypes.map((type, index) => {
          const Icon = type.icon
          const isSelected = businessType === type.id
          
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? `${type.bgColor} border-2 ${type.borderColor} ring-2 ring-offset-2 shadow-lg`
                    : 'border-[#DD374033] hover:border-[#D13F43] hover:shadow-md bg-white'
                }`}
                onClick={() => handleSelect(type.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className={`w-16 h-16 rounded-full ${type.color} flex items-center justify-center mb-4 ${
                        isSelected ? 'ring-4 ring-offset-2 ring-[#D13F43]' : ''
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {type.title}
                    </h3>
                    <p className="text-sm text-[#666666] mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {type.description}
                    </p>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-[#D13F43] flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {businessType && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-[#F7E9DB] border border-[#DD374033] rounded-lg"
        >
          <p className="text-sm text-[#2E2E2E] text-center" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <strong>Selected:</strong> {businessTypes.find(t => t.id === businessType)?.title}
          </p>
        </motion.div>
      )}
    </div>
  )
}
