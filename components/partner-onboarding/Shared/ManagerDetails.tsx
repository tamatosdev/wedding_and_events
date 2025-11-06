'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function ManagerDetails() {
  const { formData, updateFormData } = usePartnerForm()
  const errors: Record<string, string> = {}

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Users className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Manager / Point of Contact Details
        </h2>
        <p className="text-[#666666]">Please provide the manager or primary contact person's information</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="managerName" className="text-[#2E2E2E]">
              Name <span className="text-[#D13F43]">*</span>
            </Label>
            <Input
              id="managerName"
              name="managerName"
              value={formData.managerName || ''}
              onChange={(e) => handleChange('managerName', e.target.value)}
              placeholder="Enter manager's full name"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
            {errors.managerName && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.managerName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="managerMobile1" className="text-[#2E2E2E]">
                Mobile 1 <span className="text-[#D13F43]">*</span>
              </Label>
              <Input
                id="managerMobile1"
                name="managerMobile1"
                type="tel"
                value={formData.managerMobile1 || ''}
                onChange={(e) => handleChange('managerMobile1', e.target.value)}
                placeholder="0300-1234567"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
              {errors.managerMobile1 && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.managerMobile1}</p>
              )}
            </div>

            <div>
              <Label htmlFor="managerMobile2" className="text-[#2E2E2E]">
                Mobile 2
              </Label>
              <Input
                id="managerMobile2"
                name="managerMobile2"
                type="tel"
                value={formData.managerMobile2 || ''}
                onChange={(e) => handleChange('managerMobile2', e.target.value)}
                placeholder="0300-1234567 (Optional)"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="managerLandline" className="text-[#2E2E2E]">
              Landline
            </Label>
            <Input
              id="managerLandline"
              name="managerLandline"
              type="tel"
              value={formData.managerLandline || ''}
              onChange={(e) => handleChange('managerLandline', e.target.value)}
              placeholder="021-12345678 (Optional)"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="managerEmail" className="text-[#2E2E2E]">
              Email <span className="text-[#D13F43]">*</span>
            </Label>
            <Input
              id="managerEmail"
              name="managerEmail"
              type="email"
              value={formData.managerEmail || ''}
              onChange={(e) => handleChange('managerEmail', e.target.value)}
              placeholder="manager@example.com"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
            {errors.managerEmail && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.managerEmail}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

