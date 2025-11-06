'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function BoutiqueProducts() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Products & Services
        </h2>
        <p className="text-[#666666]">Tell us about your products, fabrics, and services</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="fabrics" className="text-[#2E2E2E]">
              Fabrics Used
            </Label>
            <Textarea
              id="fabrics"
              name="fabrics"
              value={formData.fabrics || ''}
              onChange={(e) => handleChange('fabrics', e.target.value)}
              placeholder="List types of fabrics you work with (e.g., Silk, Chiffon, Organza, etc.)"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="customization" className="text-[#2E2E2E]">
              Customization Services
            </Label>
            <Textarea
              id="customization"
              name="customization"
              value={formData.customization || ''}
              onChange={(e) => handleChange('customization', e.target.value)}
              placeholder="Describe customization options (alterations, design changes, etc.)"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="rentalPolicy" className="text-[#2E2E2E]">
              Rental Policy
            </Label>
            <Textarea
              id="rentalPolicy"
              name="rentalPolicy"
              value={formData.rentalPolicy || ''}
              onChange={(e) => handleChange('rentalPolicy', e.target.value)}
              placeholder="Describe your rental policy, terms, and conditions"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="delivery" className="text-[#2E2E2E]">
              Delivery & Logistics
            </Label>
            <Textarea
              id="delivery"
              name="delivery"
              value={formData.delivery || ''}
              onChange={(e) => handleChange('delivery', e.target.value)}
              placeholder="Describe delivery options, timelines, and logistics"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

