import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function VenuePoliciesServices() {
  const { formData, updateFormData } = usePartnerForm()
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Policies & Additional Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>What is your cancellation policy? *</Label>
            <Textarea 
              value={formData.cancellationPolicy || ''} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('cancellationPolicy', e.target.value)} 
              placeholder="Describe your cancellation policy, refund terms, etc." 
              rows={4}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Do you provide other services?</h3>
            <div className="space-y-3">
              <div>
                <Label>Catering:</Label>
                <Input 
                  value={formData.cateringServices || ''} 
                  onChange={e => handleChange('cateringServices', e.target.value)} 
                  placeholder="Describe catering services if provided" 
                />
              </div>
              <div>
                <Label>Decor:</Label>
                <Input 
                  value={formData.decorServices || ''} 
                  onChange={e => handleChange('decorServices', e.target.value)} 
                  placeholder="Describe decor services if provided" 
                />
              </div>
              <div>
                <Label>Other (please mention):</Label>
                <Input 
                  value={formData.otherServicesOffered || ''} 
                  onChange={e => handleChange('otherServicesOffered', e.target.value)} 
                  placeholder="Other services provided" 
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label>Any additional information you want to add in your listing? (prohibited items or SOPs) *</Label>
            <Textarea 
              value={formData.venueAdditionalInfo || ''} 
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('venueAdditionalInfo', e.target.value)} 
              placeholder="Add any additional information, prohibited items, standard operating procedures, etc." 
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}