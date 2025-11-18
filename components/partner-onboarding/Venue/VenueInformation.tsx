'use client'

import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const venueTypes = ['Banquet', 'Marquee', 'Lawn', 'Roof top', 'Other']
const yesNoOptions = ['Yes', 'No']

export default function VenueInformation() {
  const { formData, updateFormData } = usePartnerForm()
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Venue Information</h2>
      <div className="space-y-8">
          <div>
            <Label>What is your venue type? *</Label>
            <select 
              value={formData.venueType || ''} 
              onChange={e => handleChange('venueType', e.target.value)}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
            >
              <option value="">Select Venue Type</option>
              {venueTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {formData.venueType === 'Other' && (
              <Input 
                className="mt-2"
                value={formData.otherVenueType || ''} 
                onChange={e => handleChange('otherVenueType', e.target.value)} 
                placeholder="Please specify other venue type" 
              />
            )}
          </div>
          
          <div>
            <Label>Single venue or Multiple site/lawns/halls (Qty)</Label>
            <Input 
              value={formData.singleOrMultiple || ''} 
              onChange={e => handleChange('singleOrMultiple', e.target.value)} 
              placeholder="e.g., Single venue or Multiple (specify quantity)" 
            />
          </div>
          
          <div>
            <Label>Guest Capacity (Qty)</Label>
            <Input 
              value={formData.guestCapacity || ''} 
              onChange={e => handleChange('guestCapacity', e.target.value)} 
              placeholder="e.g., 500 guests" 
            />
          </div>
          
          <div>
            <Label>What is your Venue pricing range? For Example: Rs 200,000-500,000. *</Label>
            <Input 
              value={formData.venuePricingRange || ''} 
              onChange={e => handleChange('venuePricingRange', e.target.value)} 
              placeholder="e.g., Rs 200,000-500,000" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Do you have catering options available? *</Label>
              <select 
                value={formData.cateringAvailable || ''} 
                onChange={e => handleChange('cateringAvailable', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
              >
                <option value="">Select</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label>Is outside catering allowed?</Label>
              <select 
                value={formData.outsideCateringAllowed || ''} 
                onChange={e => handleChange('outsideCateringAllowed', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
              >
                <option value="">Select</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <Label>Write a description of your venue. *</Label>
            <Textarea 
              value={formData.venueDescription || ''} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('venueDescription', e.target.value)} 
              placeholder="Describe your venue features, ambiance, and unique selling points" 
              rows={4}
            />
          </div>
      </div>
    </div>
  )
}