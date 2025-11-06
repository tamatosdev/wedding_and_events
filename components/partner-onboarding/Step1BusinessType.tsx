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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Select Your Business Type
        </h2>
        <p className="text-gray-600 text-lg">
          Choose the category that best describes your business
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className={`cursor-pointer transition-all hover:shadow-xl ${
                  isSelected
                    ? `${type.bgColor} border-2 ${type.borderColor} ring-2 ring-offset-2 ring-rose-300`
                    : 'border-gray-200 hover:border-rose-300'
                }`}
                onClick={() => setValue('businessType', type.id as any)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 ${
                        isSelected ? 'ring-4 ring-rose-200' : ''
                      }`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {type.description}
                    </p>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center"
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
          className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-lg"
        >
          <p className="text-sm text-rose-800 text-center">
            <strong>Selected:</strong> {businessTypes.find(t => t.id === selectedType)?.title}
          </p>
        </motion.div>
      )}
    </div>
  )
}

