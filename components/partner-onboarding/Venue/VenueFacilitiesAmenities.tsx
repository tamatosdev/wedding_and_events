'use client'

import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const yesNoOptions = ['Yes', 'No']
const valetOptions = ['Valet Service', 'Self', 'Both']

export default function VenueFacilitiesAmenities() {
  const { formData, updateFormData } = usePartnerForm()
  const handleChange = (field: string, value: any) => {
    updateFormData({ [field]: value } as any)
  }
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Facilities & Amenities</h2>
      <div className="space-y-8">
          <div>
            <Label>Available Parking Space. (For Example, 200 Cars) *</Label>
            <Input 
              value={formData.parkingCapacity || ''} 
              onChange={e => handleChange('parkingCapacity', e.target.value)} 
              placeholder="e.g., 200 Cars" 
            />
          </div>
          
          <div>
            <Label>Valet Service</Label>
            <select 
              value={formData.parkingType || ''} 
              onChange={e => handleChange('parkingType', e.target.value)}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              {valetOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Is your venue wheelchair accessible? *</Label>
              <select 
                value={formData.venueWheelchairAccessible || ''} 
                onChange={e => handleChange('venueWheelchairAccessible', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
              >
                <option value="">Select</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label>Is Wheel Chair available</Label>
              <select 
                value={formData.wheelchairAvailable || ''} 
                onChange={e => handleChange('wheelchairAvailable', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
              >
                <option value="">Select</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Namaz Area for Men</Label>
              <select 
                value={formData.namazAreaMen || ''} 
                onChange={e => handleChange('namazAreaMen', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
              >
                <option value="">Select</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label>Namaz Area for Ladies</Label>
              <select 
                value={formData.namazAreaLadies || ''} 
                onChange={e => handleChange('namazAreaLadies', e.target.value)}
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
            <h3 className="text-lg font-semibold mb-3">What kind of amenities do you offer? *</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.decorationAmbience} 
                  onChange={e => handleChange('decorationAmbience', e.target.checked)} 
                />
                Decoration & Ambience
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.soundSystem} 
                  onChange={e => handleChange('soundSystem', e.target.checked)} 
                />
                Sound system/Microphones & Speakers
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.hallDecor} 
                  onChange={e => handleChange('hallDecor', e.target.checked)} 
                />
                Hall Decor
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.stageDecor} 
                  onChange={e => handleChange('stageDecor', e.target.checked)} 
                />
                Stage Decor
              </label>
            </div>
          </div>
          
          <div>
            <Label>Bridal Suite/Room *</Label>
            <select 
              value={formData.bridalSuite || ''} 
              onChange={e => handleChange('bridalSuite', e.target.value)}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              {yesNoOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Additional Facilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.airConditioning} 
                  onChange={e => handleChange('airConditioning', e.target.checked)} 
                />
                Air Conditioning
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.heating} 
                  onChange={e => handleChange('heating', e.target.checked)} 
                />
                Heating
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.elevators} 
                  onChange={e => handleChange('elevators', e.target.checked)} 
                />
                Elevators
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.securityStaff} 
                  onChange={e => handleChange('securityStaff', e.target.checked)} 
                />
                Security Staff
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.venueGenerator} 
                  onChange={e => handleChange('venueGenerator', e.target.checked)} 
                />
                Generator / Backup Power Supply
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.dedicatedStaff} 
                  onChange={e => handleChange('dedicatedStaff', e.target.checked)} 
                />
                Dedicated staff service
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={!!formData.executiveLounge} 
                  onChange={e => handleChange('executiveLounge', e.target.checked)} 
                />
                Executive Sofa Lounge
              </label>
            </div>
          </div>
      </div>
    </div>
  )
}