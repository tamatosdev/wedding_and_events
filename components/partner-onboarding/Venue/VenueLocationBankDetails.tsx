'use client'

import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function VenueLocationBankDetails() {
  const { formData, updateFormData } = usePartnerForm()
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }
  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Business Location & Bank Details</h2>
      <div className="space-y-8">
          <div>
            <Label>Business Name *</Label>
            <Input 
              value={formData.businessName || ''} 
              onChange={e => handleChange('businessName', e.target.value)} 
              placeholder="Business Name" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>City *</Label>
              <Input 
                value={formData.city || ''} 
                onChange={e => handleChange('city', e.target.value)} 
                placeholder="City" 
              />
            </div>
            <div>
              <Label>Area *</Label>
              <Input 
                value={formData.area || ''} 
                onChange={e => handleChange('area', e.target.value)} 
                placeholder="Area" 
              />
            </div>
          </div>
          <div>
            <Label>Mobile/Landline *</Label>
            <Input 
              value={formData.ownerMobile1 || ''} 
              onChange={e => handleChange('ownerMobile1', e.target.value)} 
              placeholder="Business Phone" 
            />
          </div>
          <div>
            <Label>Complete Address *</Label>
            <Input 
              value={formData.completeAddress || ''} 
              onChange={e => handleChange('completeAddress', e.target.value)} 
              placeholder="Complete Address" 
            />
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Online Bank Payment (preferably Islamic Bank)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Bank Name</Label>
                <Input 
                  value={formData.bankName || ''} 
                  onChange={e => handleChange('bankName', e.target.value)} 
                  placeholder="Bank Name" 
                />
              </div>
              <div>
                <Label>Branch & City</Label>
                <Input 
                  value={formData.branchCity || ''} 
                  onChange={e => handleChange('branchCity', e.target.value)} 
                  placeholder="Branch & City" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label>Account Number</Label>
                <Input 
                  value={formData.accountNumber || ''} 
                  onChange={e => handleChange('accountNumber', e.target.value)} 
                  placeholder="Account Number" 
                />
              </div>
              <div>
                <Label>IBAN Number</Label>
                <Input 
                  value={formData.ibanNumber || ''} 
                  onChange={e => handleChange('ibanNumber', e.target.value)} 
                  placeholder="IBAN Number" 
                />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}