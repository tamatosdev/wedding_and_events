import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LocationBankDetails() {
  const { formData, updateFormData } = usePartnerForm()
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Location & Bank Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>City *</Label>
          <Input value={formData.city || ''} onChange={e => handleChange('city', e.target.value)} placeholder="City" />
          <Label>Area *</Label>
          <Input value={formData.area || ''} onChange={e => handleChange('area', e.target.value)} placeholder="Area" />
          <Label>Complete Address *</Label>
          <Input value={formData.completeAddress || ''} onChange={e => handleChange('completeAddress', e.target.value)} placeholder="Complete Address" />
          <Label>Bank Name</Label>
          <Input value={formData.bankName || ''} onChange={e => handleChange('bankName', e.target.value)} placeholder="Bank Name" />
          <Label>Branch & City</Label>
          <Input value={formData.branchCity || ''} onChange={e => handleChange('branchCity', e.target.value)} placeholder="Branch & City" />
          <Label>Account Number</Label>
          <Input value={formData.accountNumber || ''} onChange={e => handleChange('accountNumber', e.target.value)} placeholder="Account Number" />
          <Label>IBAN Number</Label>
          <Input value={formData.ibanNumber || ''} onChange={e => handleChange('ibanNumber', e.target.value)} placeholder="IBAN Number" />
        </CardContent>
      </Card>
    </div>
  )
}
