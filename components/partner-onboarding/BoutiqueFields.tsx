'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/lib/partner-onboarding/validationSchemas'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shirt } from 'lucide-react'

interface BoutiqueFieldsProps {
  form: UseFormReturn<FormData>
}

const dressTypes = ['Bridal', 'Groom', 'Formal', 'Casual', 'Traditional', 'Western', 'Mix']
const yesNoOptions = ['Yes', 'No']
const designOrResellOptions = ['Design', 'Resell', 'Both']

export default function BoutiqueFields({ form }: BoutiqueFieldsProps) {
  const { register } = form

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
          <Shirt className="w-8 h-8 text-pink-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Boutique Information</h2>
        <p className="text-gray-600">Tell us about your boutique, designs, and services</p>
      </div>

      <Card className="border-pink-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Boutique Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="dressType" className="text-gray-700">
              Dress Types Available
            </Label>
            <select
              id="dressType"
              {...register('dressType')}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
            >
              <option value="">Select Dress Type</option>
              {dressTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="designOrResell" className="text-gray-700">
              Design or Resell?
            </Label>
            <select
              id="designOrResell"
              {...register('designOrResell')}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
            >
              <option value="">Select Option</option>
              {designOrResellOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="fabrics" className="text-gray-700">
              Fabrics Used
            </Label>
            <Textarea
              id="fabrics"
              {...register('fabrics')}
              placeholder="List types of fabrics you work with (e.g., Silk, Chiffon, Organza, etc.)"
              rows={3}
              className="mt-2 border-gray-300 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="priceRange" className="text-gray-700">
              Price Range
            </Label>
            <Input
              id="priceRange"
              {...register('priceRange')}
              placeholder="e.g., PKR 50,000 - 500,000"
              className="mt-2 border-gray-300 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="customization" className="text-gray-700">
              Customization Services
            </Label>
            <Textarea
              id="customization"
              {...register('customization')}
              placeholder="Describe customization options (alterations, design changes, etc.)"
              rows={3}
              className="mt-2 border-gray-300 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="rentalPolicy" className="text-gray-700">
              Rental Policy
            </Label>
            <Textarea
              id="rentalPolicy"
              {...register('rentalPolicy')}
              placeholder="Describe your rental policy, terms, and conditions"
              rows={3}
              className="mt-2 border-gray-300 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div>
            <Label htmlFor="delivery" className="text-gray-700">
              Delivery & Logistics
            </Label>
            <Textarea
              id="delivery"
              {...register('delivery')}
              placeholder="Describe delivery options, timelines, and logistics"
              rows={3}
              className="mt-2 border-gray-300 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <p className="text-sm text-pink-800">
              <strong>Note:</strong> You can upload photos of your designs and portfolio in the next step.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

