'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/lib/partner-onboarding/validationSchemas'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, Shirt, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface Step1BusinessTypeProps {
  form: UseFormReturn<FormData>
}

const businessTypes = [
  {
    id: 'venue',
    title: 'Venue / Banquet / Marquee',
    description: 'Wedding halls, banquet facilities, marquees, and event spaces',
    icon: Building2,
    color: 'from-rose-400 to-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-300',
  },
  {
    id: 'boutique',
    title: 'Boutique / Dress Designer',
    description: 'Bridal wear, designer dresses, and fashion boutiques',
    icon: Shirt,
    color: 'from-pink-400 to-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-300',
  },
  {
    id: 'salon',
    title: 'Beauty Parlour / Salon',
    description: 'Bridal makeup, hair styling, and beauty services',
    icon: Sparkles,
    color: 'from-amber-400 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
  },
]

export default function Step1BusinessType({ form }: Step1BusinessTypeProps) {
  const { watch, setValue } = form
  const selectedType = watch('businessType')

  return (
    <div className="max-w-5xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#D13F43] mb-3 tracking-tight" style={{fontFamily:'DM Sans, sans-serif'}}>
          Select Your Business Type
        </h2>
        <p className="text-[#666666] text-lg">
          Choose the category that best describes your business
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {businessTypes.map((type, index) => {
          const Icon = type.icon
          const isSelected = selectedType === type.id
          
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-2xl ${
                  isSelected
                    ? `${type.bgColor} border-2 ${type.borderColor} ring-2 ring-offset-2 ring-[#D13F43]`
                    : 'border-gray-200 hover:border-[#D13F43]'
                }`}
                onClick={() => setValue('businessType', type.id as any)}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${type.color} flex items-center justify-center mb-5 ${
                        isSelected ? 'ring-4 ring-[#D13F43]/30' : ''
                      }`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2E2E2E] mb-3" style={{fontFamily:'DM Sans, sans-serif'}}>
                      {type.title}
                    </h3>
                    <p className="text-sm text-[#666666] mb-4">
                      {type.description}
                    </p>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-7 h-7 rounded-full bg-[#D13F43] flex items-center justify-center shadow-lg"
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

      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-5 bg-[#F7E9DB]/50 border border-[#D13F43]/30 rounded-xl"
        >
          <p className="text-sm text-[#D13F43] text-center font-semibold">
            <strong>Selected:</strong> {businessTypes.find(t => t.id === selectedType)?.title}
          </p>
        </motion.div>
      )}
    </div>
  )
}

