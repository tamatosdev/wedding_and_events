'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

const yesNoOptions = ['Yes', 'No']

export default function DecorServices() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Décor Services & Capabilities
        </h2>
        <p className="text-[#666666]">Describe your services, equipment, and design capabilities</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Service Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="eventTypes" className="text-[#2E2E2E]">
              Event Types You Decorate
            </Label>
            <Textarea
              id="eventTypes"
              name="eventTypes"
              value={formData.eventTypes || ''}
              onChange={(e) => handleChange('eventTypes', e.target.value)}
              placeholder="e.g., Weddings, Mehndi, Barat, Reception, Corporate Events, Birthday Parties, etc."
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="equipmentProvided" className="text-[#2E2E2E]">
              Equipment & Materials Provided
            </Label>
            <Textarea
              id="equipmentProvided"
              name="equipmentProvided"
              value={formData.equipmentProvided || ''}
              onChange={(e) => handleChange('equipmentProvided', e.target.value)}
              placeholder="List equipment and materials you provide (e.g., Stage, Backdrops, Drapery, Centerpieces, Props, etc.)"
              rows={4}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="themesAvailable" className="text-[#2E2E2E]">
              Available Themes & Styles
            </Label>
            <Textarea
              id="themesAvailable"
              name="themesAvailable"
              value={formData.themesAvailable || ''}
              onChange={(e) => handleChange('themesAvailable', e.target.value)}
              placeholder="List popular themes or styles you offer (e.g., Royal, Garden, Beach, Vintage, Modern, etc.)"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="customDesign" className="text-[#2E2E2E]">
                Custom Design Services Available?
              </Label>
              <select
                id="customDesign"
                name="customDesign"
                value={formData.customDesign || ''}
                onChange={(e) => handleChange('customDesign', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
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
              <Label htmlFor="floralsIncluded" className="text-[#2E2E2E]">
                Florals Included in Packages?
              </Label>
              <select
                id="floralsIncluded"
                name="floralsIncluded"
                value={formData.floralsIncluded || ''}
                onChange={(e) => handleChange('floralsIncluded', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
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

          <div>
            <Label htmlFor="lightingServices" className="text-[#2E2E2E]">
              Lighting Services
            </Label>
            <Textarea
              id="lightingServices"
              name="lightingServices"
              value={formData.lightingServices || ''}
              onChange={(e) => handleChange('lightingServices', e.target.value)}
              placeholder="Describe lighting services offered (e.g., Chandeliers, LED lights, Uplighting, String lights, etc.)"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

