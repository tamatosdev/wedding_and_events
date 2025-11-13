'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function OwnerDetails() {
  const { formData, updateFormData } = usePartnerForm()
  const errors: Record<string, string> = {} // Will be handled by form validation
  
  // Directly update context on input change
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <User className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Owner Details
        </h2>
        <p className="text-[#666666]">Please provide the owner's contact information</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="ownerName" className="text-[#2E2E2E]">
              Owner Name <span className="text-[#D13F43]">*</span>
            </Label>
            <Input
              id="ownerName"
              name="ownerName"
              value={formData.ownerName || ''}
              onChange={(e) => handleChange('ownerName', e.target.value)}
              placeholder="Enter owner's full name"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
            {errors.ownerName && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.ownerName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="ownerMobile1" className="text-[#2E2E2E]">
                Contact Number Mobile 1 <span className="text-[#D13F43]">*</span>
              </Label>
              <Input
                id="ownerMobile1"
                name="ownerMobile1"
                type="tel"
                value={formData.ownerMobile1 || ''}
                onChange={(e) => handleChange('ownerMobile1', e.target.value)}
                placeholder="0300-1234567"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
              {errors.ownerMobile1 && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.ownerMobile1}</p>
              )}
            </div>

            <div>
              <Label htmlFor="ownerMobile2" className="text-[#2E2E2E]">
                Contact Number Mobile 2
              </Label>
              <Input
                id="ownerMobile2"
                name="ownerMobile2"
                type="tel"
                value={formData.ownerMobile2 || ''}
                onChange={(e) => handleChange('ownerMobile2', e.target.value)}
                placeholder="0300-1234567 (Optional)"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ownerLandline" className="text-[#2E2E2E]">
              PTCL Landline
            </Label>
            <Input
              id="ownerLandline"
              name="ownerLandline"
              type="tel"
              value={formData.ownerLandline || ''}
              onChange={(e) => handleChange('ownerLandline', e.target.value)}
              placeholder="021-12345678 (Optional)"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div>
            <Label htmlFor="ownerEmail" className="text-[#2E2E2E]">
              Email Address <span className="text-[#D13F43]">*</span>
            </Label>
            <Input
              id="ownerEmail"
              name="ownerEmail"
              type="email"
              value={formData.ownerEmail || ''}
              onChange={(e) => handleChange('ownerEmail', e.target.value)}
              placeholder="owner@example.com"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
            {errors.ownerEmail && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.ownerEmail}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

