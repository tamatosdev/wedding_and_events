'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileText } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

const yesNoOptions = ['Yes', 'No']

export default function VenuePolicies() {
  const { formData, updateFormData } = usePartnerForm()
  const errors: Record<string, string> = {}

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <FileText className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Venue Policies</h2>
        <p className="text-[#666666]">Define your venue policies and restrictions</p>
      </div>

      {/* Form fields start here, previously inside CardContent */}
      <div className="space-y-8">
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
      </div>
    </div>
  )
}

