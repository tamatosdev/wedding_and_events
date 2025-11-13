import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DecorReputationPricing() {
  const { formData, updateFormData } = usePartnerForm()
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reputation, Pricing & Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Reputation & Reliability</Label>
          <Textarea value={formData.reputation || ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('reputation', e.target.value)} placeholder="Describe your reputation, reliability, and experience" />
          <Label>Past reviews & testimonials (share online ratings)</Label>
          <Textarea value={formData.reviews || ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('reviews', e.target.value)} placeholder="Paste links or text" />
          <Label>Portfolio (photos/videos of previous events)</Label>
          <Textarea value={formData.portfolio || ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('portfolio', e.target.value)} placeholder="Paste links or text" />
          <Label>Punctuality (track record for timely delivery and setup)</Label>
          <Textarea value={formData.punctuality || ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('punctuality', e.target.value)} placeholder="Describe punctuality" />
          <Label>Experience (specialization in event type)</Label>
          <Textarea value={formData.experienceType || ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('experienceType', e.target.value)} placeholder="Describe experience" />
          <Label>Pricing per head range</Label>
          <Input value={formData.pricingPerHead || ''} onChange={e => handleChange('pricingPerHead', e.target.value)} placeholder="e.g. 1000-5000" />
          <Label>Staff</Label>
          <select value={formData.staffType || ''} onChange={e => handleChange('staffType', e.target.value)}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Both">Both</option>
          </select>
          <Label>Description of your services *</Label>
          <Textarea value={formData.serviceDescription || ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('serviceDescription', e.target.value)} placeholder="Describe your services" />
        </CardContent>
      </Card>
    </div>
  )
}
