'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

const yesNoOptions = ['Yes', 'No']

export default function GeneralQuestions() {
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
          General Information
        </h2>
        <p className="text-[#666666]">Additional business information and policies</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="businessDuration" className="text-[#2E2E2E]">
                Business Duration
              </Label>
              <Input
                id="businessDuration"
                name="businessDuration"
                value={formData.businessDuration || ''}
                onChange={(e) => handleChange('businessDuration', e.target.value)}
                placeholder="e.g., 5 years, Since 2018"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
            </div>

            <div>
              <Label htmlFor="numberOfBranches" className="text-[#2E2E2E]">
                Number of Branches
              </Label>
              <Input
                id="numberOfBranches"
                name="numberOfBranches"
                value={formData.numberOfBranches || ''}
                onChange={(e) => handleChange('numberOfBranches', e.target.value)}
                placeholder="e.g., 1, 2, 3+"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
            </div>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fireInsurance" className="text-[#2E2E2E]">
                Fire/Property Insurance
              </Label>
              <select
                id="fireInsurance"
                name="fireInsurance"
                value={formData.fireInsurance || ''}
                onChange={(e) => handleChange('fireInsurance', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                <option value="">Select Option</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="weArrangeInsurance" className="text-[#2E2E2E]">
                Want WE to arrange insurance?
              </Label>
              <select
                id="weArrangeInsurance"
                name="weArrangeInsurance"
                value={formData.weArrangeInsurance || ''}
                onChange={(e) => handleChange('weArrangeInsurance', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                <option value="">Select Option</option>
                {yesNoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="wheelchairAccessible" className="text-[#2E2E2E]">
              Wheelchair Accessible?
            </Label>
            <select
              id="wheelchairAccessible"
              name="wheelchairAccessible"
              value={formData.wheelchairAccessible || ''}
              onChange={(e) => handleChange('wheelchairAccessible', e.target.value)}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
            >
              <option value="">Select Option</option>
              {yesNoOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

