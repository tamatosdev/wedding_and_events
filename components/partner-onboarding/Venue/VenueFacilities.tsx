'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Accessibility } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

const parkingTypes = ['Valet', 'Self', 'Both']
const yesNoOptions = ['Yes', 'No']

export default function VenueFacilities() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Accessibility className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Venue Facilities & Accessibility</h2>
        <p className="text-[#666666]">Tell us about your venue's facilities and accessibility features</p>
      </div>

      {/* Form fields start here, previously inside CardContent */}
      <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="parkingCapacity" className="text-[#2E2E2E]">
                Parking Capacity
              </Label>
              <Input
                id="parkingCapacity"
                name="parkingCapacity"
                value={formData.parkingCapacity || ''}
                onChange={(e) => handleChange('parkingCapacity', e.target.value)}
                placeholder="e.g., 50-100 cars"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
            </div>

            <div>
              <Label htmlFor="parkingType" className="text-[#2E2E2E]">
                Parking Type
              </Label>
              <select
                id="parkingType"
                name="parkingType"
                value={formData.parkingType || ''}
                onChange={(e) => handleChange('parkingType', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                <option value="">Select Parking Type</option>
                {parkingTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="amenities" className="text-[#2E2E2E]">
              Amenities (Decor, Sound, Floral, etc.)
            </Label>
            <Textarea
              id="amenities"
              name="amenities"
              value={formData.amenities || ''}
              onChange={(e) => handleChange('amenities', e.target.value)}
              placeholder="List all available amenities and services..."
              rows={4}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="bridalSuite" className="text-[#2E2E2E]">
                Bridal Suite Available?
              </Label>
              <select
                id="bridalSuite"
                name="bridalSuite"
                value={formData.bridalSuite || ''}
                onChange={(e) => handleChange('bridalSuite', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                <option value="">Select Option</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="namazAreaMen" className="text-[#2E2E2E]">
                  Namaz Area (Men)
                </Label>
                <select
                  id="namazAreaMen"
                  name="namazAreaMen"
                  value={formData.namazAreaMen || ''}
                  onChange={(e) => handleChange('namazAreaMen', e.target.value)}
                  className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
                >
                  <option value="">Select</option>
                  {yesNoOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="namazAreaLadies" className="text-[#2E2E2E]">
                  Namaz Area (Ladies)
                </Label>
                <select
                  id="namazAreaLadies"
                  name="namazAreaLadies"
                  value={formData.namazAreaLadies || ''}
                  onChange={(e) => handleChange('namazAreaLadies', e.target.value)}
                  className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
                >
                  <option value="">Select</option>
                  {yesNoOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

