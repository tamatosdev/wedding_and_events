import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DecorPoliciesAdditional() {
  const { formData, updateFormData } = usePartnerForm()
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Policies & Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label>Cancellation Policy *</label>
          <Textarea value={formData.cancellationPolicy || ''} onChange={e => handleChange('cancellationPolicy', e.target.value)} placeholder="Describe your cancellation policy, refund terms, setup charges, etc." />
          <label>Do you provide other services? (please mention)</label>
          <Input value={formData.otherServices || ''} onChange={e => handleChange('otherServices', e.target.value)} placeholder="Other services" />
          <label>Any additional information for your listing? (prohibited items or SOPs)</label>
          <Textarea value={formData.additionalInfo || ''} onChange={e => handleChange('additionalInfo', e.target.value)} placeholder="Add any extra info, prohibited items, or SOPs" />
        </CardContent>
      </Card>
    </div>
  )
}
