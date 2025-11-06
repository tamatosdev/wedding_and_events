'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function SalonDetails() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Sparkles className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Beauty Parlour / Salon Information
        </h2>
        <p className="text-[#666666]">Tell us about your salon and services</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Salon Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="operatingHours" className="text-[#2E2E2E]">
              Operating Hours
            </Label>
            <Input
              id="operatingHours"
              name="operatingHours"
              value={formData.operatingHours || ''}
              onChange={(e) => handleChange('operatingHours', e.target.value)}
              placeholder="e.g., Monday-Saturday: 10 AM - 8 PM"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="salonPricing" className="text-[#2E2E2E]">
              General Pricing Information
            </Label>
            <Input
              id="salonPricing"
              name="salonPricing"
              value={formData.salonPricing || ''}
              onChange={(e) => handleChange('salonPricing', e.target.value)}
              placeholder="e.g., Starting from PKR 15,000 for bridal makeup"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

