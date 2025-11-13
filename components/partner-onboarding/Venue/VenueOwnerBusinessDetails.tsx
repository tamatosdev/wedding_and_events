import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function VenueOwnerBusinessDetails() {
  const { formData, updateFormData } = usePartnerForm()
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Owner & Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Owner Name *</Label>
            <Input 
              value={formData.ownerName || ''} 
              onChange={e => handleChange('ownerName', e.target.value)} 
              placeholder="Owner Name" 
            />
          </div>
          <div>
            <Label>Contact Number Mobile 1 *</Label>
            <Input 
              value={formData.ownerMobile1 || ''} 
              onChange={e => handleChange('ownerMobile1', e.target.value)} 
              placeholder="Mobile 1" 
            />
          </div>
          <div>
            <Label>Contact Number Mobile 2</Label>
            <Input 
              value={formData.ownerMobile2 || ''} 
              onChange={e => handleChange('ownerMobile2', e.target.value)} 
              placeholder="Mobile 2" 
            />
          </div>
          <div>
            <Label>PTCL Landline</Label>
            <Input 
              value={formData.ownerLandline || ''} 
              onChange={e => handleChange('ownerLandline', e.target.value)} 
              placeholder="Landline" 
            />
          </div>
          <div>
            <Label>Email Address *</Label>
            <Input 
              value={formData.ownerEmail || ''} 
              onChange={e => handleChange('ownerEmail', e.target.value)} 
              placeholder="Email" 
            />
          </div>
          <div>
            <Label>Business Name *</Label>
            <Input 
              value={formData.businessName || ''} 
              onChange={e => handleChange('businessName', e.target.value)} 
              placeholder="Business Name" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}