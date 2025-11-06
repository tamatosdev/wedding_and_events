'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function SalonPolicies() {
  const { formData, updateFormData } = usePartnerForm()
  const errors: Record<string, string> = {}

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <FileText className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Salon Policies
        </h2>
        <p className="text-[#666666]">Define your salon policies and terms</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Policy Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="cancellationPolicy" className="text-[#2E2E2E]">
              Cancellation Policy <span className="text-[#D13F43]">*</span>
            </Label>
            <Textarea
              id="cancellationPolicy"
              name="cancellationPolicy"
              value={formData.cancellationPolicy || ''}
              onChange={(e) => handleChange('cancellationPolicy', e.target.value)}
              placeholder="Describe your cancellation policy, refund terms, etc."
              rows={4}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
            {errors.cancellationPolicy && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.cancellationPolicy}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

