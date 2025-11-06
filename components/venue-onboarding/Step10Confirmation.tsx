'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/app/venue-onboarding/page'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

interface Step10ConfirmationProps {
  form: UseFormReturn<FormData>
}

export default function Step10Confirmation({ form }: Step10ConfirmationProps) {
  const formData = form.getValues()

  const formatValue = (value: any): string => {
    if (!value || value === '') return 'Not provided'
    if (Array.isArray(value)) return value.length > 0 ? `${value.length} file(s)` : 'None'
    return String(value)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Application</h2>
        <p className="text-gray-600">Please review all information before submitting</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Application Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Owner Details */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Owner Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{formatValue(formData.ownerName)}</span>
              </div>
              <div>
                <span className="text-gray-600">Mobile 1:</span>
                <span className="ml-2 font-medium">{formatValue(formData.ownerMobile1)}</span>
              </div>
              <div>
                <span className="text-gray-600">Mobile 2:</span>
                <span className="ml-2 font-medium">{formatValue(formData.ownerMobile2)}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{formatValue(formData.ownerEmail)}</span>
              </div>
              <div>
                <span className="text-gray-600">Business Name:</span>
                <span className="ml-2 font-medium">{formatValue(formData.businessName)}</span>
              </div>
            </div>
          </div>

          {/* Manager Details */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Manager/POC Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{formatValue(formData.managerName)}</span>
              </div>
              <div>
                <span className="text-gray-600">Mobile 1:</span>
                <span className="ml-2 font-medium">{formatValue(formData.managerMobile1)}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{formatValue(formData.managerEmail)}</span>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Business Name:</span>
                <span className="ml-2 font-medium">{formatValue(formData.businessName2)}</span>
              </div>
              <div>
                <span className="text-gray-600">City:</span>
                <span className="ml-2 font-medium">{formatValue(formData.city)}</span>
              </div>
              <div>
                <span className="text-gray-600">Area:</span>
                <span className="ml-2 font-medium">{formatValue(formData.area)}</span>
              </div>
              <div>
                <span className="text-gray-600">Address:</span>
                <span className="ml-2 font-medium">{formatValue(formData.completeAddress)}</span>
              </div>
            </div>
          </div>

          {/* Venue Information */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Venue Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Venue Type:</span>
                <span className="ml-2 font-medium">{formatValue(formData.venueType)}</span>
              </div>
              <div>
                <span className="text-gray-600">Guest Capacity:</span>
                <span className="ml-2 font-medium">{formatValue(formData.guestCapacity)}</span>
              </div>
              <div>
                <span className="text-gray-600">Pricing Range:</span>
                <span className="ml-2 font-medium">{formatValue(formData.venuePricingRange)}</span>
              </div>
              <div>
                <span className="text-gray-600">Catering Available:</span>
                <span className="ml-2 font-medium">{formatValue(formData.cateringAvailable)}</span>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Policies</h3>
            <div className="text-sm">
              <div className="mb-2">
                <span className="text-gray-600">Cancellation Policy:</span>
                <p className="ml-2 font-medium mt-1">{formatValue(formData.cancellationPolicy)}</p>
              </div>
            </div>
          </div>

          {/* Files */}
          {formData.files && formData.files.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Uploaded Files</h3>
              <p className="text-sm text-gray-600">
                {formData.files.length} file(s) uploaded
              </p>
            </div>
          )}

          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-rose-800">
              <strong>Note:</strong> By clicking "Submit Application", you confirm that all information provided is accurate and complete.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

