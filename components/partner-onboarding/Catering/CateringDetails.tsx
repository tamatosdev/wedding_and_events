'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UtensilsCrossed } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

const cuisineTypes = ['Pakistani', 'Chinese', 'Continental', 'BBQ', 'Fast Food', 'Desserts', 'Mix', 'Other']
const menuStyles = ['Buffet', 'Plated', 'Family Style', 'Stations', 'Mix']
const servingStyles = ['Self-Service', 'Served', 'Both']
const yesNoOptions = ['Yes', 'No']

export default function CateringDetails() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <UtensilsCrossed className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Catering & Food Services Information</h2>
        <p className="text-[#666666]">Tell us about your catering services and capabilities</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Catering Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <Label htmlFor="cuisineType" className="text-[#2E2E2E]">
              Cuisine Type
            </Label>
            <select
              id="cuisineType"
              name="cuisineType"
              value={formData.cuisineType || ''}
              onChange={(e) => handleChange('cuisineType', e.target.value)}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            >
              <option value="">Select Cuisine Type</option>
              {cuisineTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="menuStyle" className="text-[#2E2E2E]">
                Menu Style
              </Label>
              <select
                id="menuStyle"
                name="menuStyle"
                value={formData.menuStyle || ''}
                onChange={(e) => handleChange('menuStyle', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
              >
                <option value="">Select Menu Style</option>
                {menuStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="servingStyle" className="text-[#2E2E2E]">
                Serving Style
              </Label>
              <select
                id="servingStyle"
                name="servingStyle"
                value={formData.servingStyle || ''}
                onChange={(e) => handleChange('servingStyle', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
              >
                <option value="">Select Serving Style</option>
                {servingStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="minimumGuests" className="text-[#2E2E2E]">
                Minimum Guests
              </Label>
              <Input
                id="minimumGuests"
                name="minimumGuests"
                value={formData.minimumGuests || ''}
                onChange={(e) => handleChange('minimumGuests', e.target.value)}
                placeholder="e.g., 50 guests"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
            </div>

            <div>
              <Label htmlFor="maximumGuests" className="text-[#2E2E2E]">
                Maximum Guests
              </Label>
              <Input
                id="maximumGuests"
                name="maximumGuests"
                value={formData.maximumGuests || ''}
                onChange={(e) => handleChange('maximumGuests', e.target.value)}
                placeholder="e.g., 1000 guests"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="cateringPricingRange" className="text-[#2E2E2E]">
              Pricing Range (per person)
            </Label>
            <Input
              id="cateringPricingRange"
              name="cateringPricingRange"
              value={formData.cateringPricingRange || ''}
              onChange={(e) => handleChange('cateringPricingRange', e.target.value)}
              placeholder="e.g., PKR 1,500 - 5,000 per person"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="halalCertified" className="text-[#2E2E2E]">
                Halal Certified?
              </Label>
              <select
                id="halalCertified"
                name="halalCertified"
                value={formData.halalCertified || ''}
                onChange={(e) => handleChange('halalCertified', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
              >
                <option value="">Select Option</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="vegetarianOptions" className="text-[#2E2E2E]">
                Vegetarian Options Available?
              </Label>
              <select
                id="vegetarianOptions"
                name="vegetarianOptions"
                value={formData.vegetarianOptions || ''}
                onChange={(e) => handleChange('vegetarianOptions', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
              >
                <option value="">Select Option</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

