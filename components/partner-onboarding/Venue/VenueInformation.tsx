import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const venueTypes = ['Banquet', 'Marquee', 'Lawn', 'Roof top', 'Other']
const yesNoOptions = ['Yes', 'No']

export default function VenueInformation() {
  const { formData, updateFormData } = usePartnerForm()
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Venue Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>
    </div>
  )
}