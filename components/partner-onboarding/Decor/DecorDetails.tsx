'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

const decorTypes = ['Full Décor', 'Floral Only', 'Lighting Only', 'Stage Setup', 'Mixed Services', 'Other']
const decorStyles = ['Traditional', 'Modern', 'Contemporary', 'Vintage', 'Rustic', 'Luxury', 'Minimalist', 'Mix']

export default function DecorDetails() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Palette className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Décor & Event Styling Information
        </h2>
        <p className="text-[#666666]">Tell us about your décor services and styling capabilities</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Décor Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="decorType" className="text-[#2E2E2E]">
              Décor Type
            </Label>
            <select
              id="decorType"
              name="decorType"
              value={formData.decorType || ''}
              onChange={(e) => handleChange('decorType', e.target.value)}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
            >
              <option value="">Select Décor Type</option>
              {decorTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="decorStyle" className="text-[#2E2E2E]">
              Décor Style
            </Label>
            <select
              id="decorStyle"
              name="decorStyle"
              value={formData.decorStyle || ''}
              onChange={(e) => handleChange('decorStyle', e.target.value)}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
            >
              <option value="">Select Décor Style</option>
              {decorStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="decorPricingRange" className="text-[#2E2E2E]">
              Pricing Range
            </Label>
            <Input
              id="decorPricingRange"
              name="decorPricingRange"
              value={formData.decorPricingRange || ''}
              onChange={(e) => handleChange('decorPricingRange', e.target.value)}
              placeholder="e.g., PKR 50,000 - 500,000"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="setupTime" className="text-[#2E2E2E]">
              Setup Time Required
            </Label>
            <Input
              id="setupTime"
              name="setupTime"
              value={formData.setupTime || ''}
              onChange={(e) => handleChange('setupTime', e.target.value)}
              placeholder="e.g., 4-6 hours, 1 day before event"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

