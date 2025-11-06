'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function SalonServices() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Services & Packages
        </h2>
        <p className="text-[#666666]">Tell us about your services, packages, and expertise</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Service Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="servicesList" className="text-[#2E2E2E]">
              Services Offered
            </Label>
            <Textarea
              id="servicesList"
              name="servicesList"
              value={formData.servicesList || ''}
              onChange={(e) => handleChange('servicesList', e.target.value)}
              placeholder="List all services (e.g., Bridal Makeup, Hair Styling, Mehndi, Nail Art, Facial, etc.)"
              rows={4}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="packages" className="text-[#2E2E2E]">
              Packages & Pricing
            </Label>
            <Textarea
              id="packages"
              name="packages"
              value={formData.packages || ''}
              onChange={(e) => handleChange('packages', e.target.value)}
              placeholder="Describe your packages (Bridal Package, Pre-Bridal, Party Makeup, etc.) and pricing"
              rows={4}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="brandsUsed" className="text-[#2E2E2E]">
              Brands & Products Used
            </Label>
            <Textarea
              id="brandsUsed"
              name="brandsUsed"
              value={formData.brandsUsed || ''}
              onChange={(e) => handleChange('brandsUsed', e.target.value)}
              placeholder="List brands and products you use (e.g., MAC, Sephora, L'Oreal, etc.)"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="staffExpertise" className="text-[#2E2E2E]">
              Staff Expertise & Experience
            </Label>
            <Textarea
              id="staffExpertise"
              name="staffExpertise"
              value={formData.staffExpertise || ''}
              onChange={(e) => handleChange('staffExpertise', e.target.value)}
              placeholder="Describe your team's expertise, certifications, and years of experience"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="bridalTrials" className="text-[#2E2E2E]">
              Bridal Trial Policy
            </Label>
            <Textarea
              id="bridalTrials"
              name="bridalTrials"
              value={formData.bridalTrials || ''}
              onChange={(e) => handleChange('bridalTrials', e.target.value)}
              placeholder="Describe your bridal trial process, pricing, and policies"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="promotions" className="text-[#2E2E2E]">
              Promotions & Offers
            </Label>
            <Textarea
              id="promotions"
              name="promotions"
              value={formData.promotions || ''}
              onChange={(e) => handleChange('promotions', e.target.value)}
              placeholder="Describe any ongoing promotions, seasonal offers, or special packages"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="hygiene" className="text-[#2E2E2E]">
              Hygiene & Safety Standards
            </Label>
            <Textarea
              id="hygiene"
              name="hygiene"
              value={formData.hygiene || ''}
              onChange={(e) => handleChange('hygiene', e.target.value)}
              placeholder="Describe your hygiene practices, sanitization procedures, and safety measures"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

