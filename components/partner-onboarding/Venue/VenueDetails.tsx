'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

const venueTypes = ['Banquet', 'Marquee', 'Lawn', 'Rooftop', 'Other']
const yesNoOptions = ['Yes', 'No']

export default function VenueDetails() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <MapPin className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Venue Information</h2>
        <p className="text-[#666666]">Tell us about your venue capacity, pricing, and facilities</p>
      </div>

      {/* Form fields start here, previously inside CardContent */}
      <div className="space-y-8">
          <div>
            <Label htmlFor="venueType" className="text-[#2E2E2E]">
              Venue Type
            </Label>
            <select
              id="venueType"
              name="venueType"
              value={formData.venueType || ''}
              onChange={(e) => handleChange('venueType', e.target.value)}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
            >
              <option value="">Select Venue Type</option>
              {venueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="guestCapacity" className="text-[#2E2E2E]">
              Guest Capacity
            </Label>
            <Input
              id="guestCapacity"
              name="guestCapacity"
              value={formData.guestCapacity || ''}
              onChange={(e) => handleChange('guestCapacity', e.target.value)}
              placeholder="e.g., 500-1000 guests"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="venuePricingRange" className="text-[#2E2E2E]">
              Venue Pricing Range
            </Label>
            <Input
              id="venuePricingRange"
              name="venuePricingRange"
              value={formData.venuePricingRange || ''}
              onChange={(e) => handleChange('venuePricingRange', e.target.value)}
              placeholder="e.g., PKR 150,000 - 300,000"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="cateringAvailable" className="text-[#2E2E2E]">
                Catering Available?
              </Label>
              <select
                id="cateringAvailable"
                name="cateringAvailable"
                value={formData.cateringAvailable || ''}
                onChange={(e) => handleChange('cateringAvailable', e.target.value)}
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

            <div>
              <Label htmlFor="outsideCateringAllowed" className="text-[#2E2E2E]">
                Outside Catering Allowed?
              </Label>
              <select
                id="outsideCateringAllowed"
                name="outsideCateringAllowed"
                value={formData.outsideCateringAllowed || ''}
                onChange={(e) => handleChange('outsideCateringAllowed', e.target.value)}
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
          </div>
        </div>
      {/* End of form fields */}
    </div>
  );
}

