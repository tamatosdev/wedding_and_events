import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function OwnerBusinessDetails() {
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
          <Label>Owner Name *</Label>
          <Input value={formData.ownerName || ''} onChange={e => handleChange('ownerName', e.target.value)} placeholder="Owner Name" />
          <Label>Contact Number Mobile 1 *</Label>
          <Input value={formData.ownerMobile1 || ''} onChange={e => handleChange('ownerMobile1', e.target.value)} placeholder="Mobile 1" />
          <Label>Contact Number Mobile 2</Label>
          <Input value={formData.ownerMobile2 || ''} onChange={e => handleChange('ownerMobile2', e.target.value)} placeholder="Mobile 2" />
          <Label>PTCL Landline</Label>
          <Input value={formData.ownerLandline || ''} onChange={e => handleChange('ownerLandline', e.target.value)} placeholder="Landline" />
          <Label>Email Address *</Label>
          <Input value={formData.ownerEmail || ''} onChange={e => handleChange('ownerEmail', e.target.value)} placeholder="Email" />
          <Label>Business Name *</Label>
          <Input value={formData.businessName || ''} onChange={e => handleChange('businessName', e.target.value)} placeholder="Business Name" />
        </CardContent>
      </Card>
    </div>
  )
}
