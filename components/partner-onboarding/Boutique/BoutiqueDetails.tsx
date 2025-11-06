'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shirt } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

const dressTypes = ['Bridal', 'Groom', 'Formal', 'Casual', 'Traditional', 'Western', 'Mix']
const designOrResellOptions = ['Design', 'Resell', 'Both']

export default function BoutiqueDetails() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Shirt className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Boutique Information
        </h2>
        <p className="text-[#666666]">Tell us about your boutique, designs, and services</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Boutique Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="dressType" className="text-[#2E2E2E]">
              Dress Types Available
            </Label>
            <select
              id="dressType"
              name="dressType"
              value={formData.dressType || ''}
              onChange={(e) => handleChange('dressType', e.target.value)}
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
            <Label htmlFor="designOrResell" className="text-[#2E2E2E]">
              Design or Resell?
            </Label>
            <select
              id="designOrResell"
              name="designOrResell"
              value={formData.designOrResell || ''}
              onChange={(e) => handleChange('designOrResell', e.target.value)}
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
            <Label htmlFor="priceRange" className="text-[#2E2E2E]">
              Price Range
            </Label>
            <Input
              id="priceRange"
              name="priceRange"
              value={formData.priceRange || ''}
              onChange={(e) => handleChange('priceRange', e.target.value)}
              placeholder="e.g., PKR 50,000 - 500,000"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

