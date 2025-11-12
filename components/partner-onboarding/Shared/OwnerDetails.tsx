'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function OwnerDetails() {
  const { formData, updateFormData } = usePartnerForm()
  const errors: Record<string, string> = {} // Will be handled by form validation
  
  // Local state for immediate UI updates
  const [localValues, setLocalValues] = useState({
    ownerName: formData.ownerName || '',
    ownerMobile1: formData.ownerMobile1 || '',
    ownerMobile2: formData.ownerMobile2 || '',
    ownerLandline: formData.ownerLandline || '',
    ownerEmail: formData.ownerEmail || ''
  })

  // Refs to track timeouts for debouncing
  const timeouts = useRef<Record<string, NodeJS.Timeout>>({})

  // Sync local state with form data when component mounts or formData changes externally
  useEffect(() => {
    setLocalValues({
      ownerName: formData.ownerName || '',
      ownerMobile1: formData.ownerMobile1 || '',
      ownerMobile2: formData.ownerMobile2 || '',
      ownerLandline: formData.ownerLandline || '',
      ownerEmail: formData.ownerEmail || ''
    })
  }, [formData.ownerName, formData.ownerMobile1, formData.ownerMobile2, formData.ownerLandline, formData.ownerEmail])

  // Debounced update to context
  const debouncedUpdate = useCallback((field: string, value: string) => {
    // Clear existing timeout for this field
    if (timeouts.current[field]) {
      clearTimeout(timeouts.current[field])
    }

    // Set new timeout
    timeouts.current[field] = setTimeout(() => {
      updateFormData({ [field]: value } as any)
    }, 300) // 300ms debounce
  }, [updateFormData])

  const handleChange = useCallback((field: string, value: string) => {
    // Update local state immediately for responsive UI
    setLocalValues(prev => ({ ...prev, [field]: value }))
    
    // Debounce context update
    debouncedUpdate(field, value)
  }, [debouncedUpdate])

  // Cleanup timeouts on unmount
  useEffect(() => {
    const currentTimeouts = timeouts.current
    return () => {
      Object.values(currentTimeouts).forEach(timeout => {
        if (timeout) clearTimeout(timeout)
      })
    }
  }, [])

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
              value={localValues.ownerName}
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
                value={localValues.ownerMobile1}
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
                value={localValues.ownerMobile2}
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
              value={localValues.ownerLandline}
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
              value={localValues.ownerEmail}
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

