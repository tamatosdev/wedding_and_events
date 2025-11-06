'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function BankDetails() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <CreditCard className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Bank Details
        </h2>
        <p className="text-[#666666]">Provide banking information for payments (All fields optional)</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Banking Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="bankName" className="text-[#2E2E2E]">
              Bank Name
            </Label>
            <Input
              id="bankName"
              name="bankName"
              value={formData.bankName || ''}
              onChange={(e) => handleChange('bankName', e.target.value)}
              placeholder="e.g., HBL, UBL, MCB"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="branchCity" className="text-[#2E2E2E]">
              Branch & City
            </Label>
            <Input
              id="branchCity"
              name="branchCity"
              value={formData.branchCity || ''}
              onChange={(e) => handleChange('branchCity', e.target.value)}
              placeholder="e.g., Main Branch, Karachi"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="accountNumber" className="text-[#2E2E2E]">
              Account Number
            </Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber || ''}
              onChange={(e) => handleChange('accountNumber', e.target.value)}
              placeholder="Enter account number"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="ibanNumber" className="text-[#2E2E2E]">
              IBAN Number
            </Label>
            <Input
              id="ibanNumber"
              name="ibanNumber"
              value={formData.ibanNumber || ''}
              onChange={(e) => handleChange('ibanNumber', e.target.value)}
              placeholder="PK00XXXX0000000000000000"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div className="bg-[#F7E9DB] border border-[#DD374033] rounded-lg p-4 mt-6">
            <p className="text-sm text-[#2E2E2E]">
              <strong>Note:</strong> All bank details are optional. You can provide this information later if needed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

