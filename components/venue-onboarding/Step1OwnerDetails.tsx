'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/app/venue-onboarding/page'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'

interface Step1OwnerDetailsProps {
  form: UseFormReturn<FormData>
}

export default function Step1OwnerDetails({ form }: Step1OwnerDetailsProps) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <User className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Owner Details</h2>
        <p className="text-gray-600">Please provide the owner's contact information</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="ownerName" className="text-gray-700">
              Owner Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="ownerName"
              {...register('ownerName')}
              placeholder="Enter owner's full name"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
            {errors.ownerName && (
              <p className="text-rose-500 text-sm mt-1">{errors.ownerName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="ownerMobile1" className="text-gray-700">
                Contact Number Mobile 1 <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="ownerMobile1"
                type="tel"
                {...register('ownerMobile1')}
                placeholder="0300-1234567"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
              {errors.ownerMobile1 && (
                <p className="text-rose-500 text-sm mt-1">{errors.ownerMobile1.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="ownerMobile2" className="text-gray-700">
                Contact Number Mobile 2
              </Label>
              <Input
                id="ownerMobile2"
                type="tel"
                {...register('ownerMobile2')}
                placeholder="0300-1234567 (Optional)"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ownerLandline" className="text-gray-700">
              PTCL Landline
            </Label>
            <Input
              id="ownerLandline"
              type="tel"
              {...register('ownerLandline')}
              placeholder="021-12345678 (Optional)"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div>
            <Label htmlFor="ownerEmail" className="text-gray-700">
              Email Address <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="ownerEmail"
              type="email"
              {...register('ownerEmail')}
              placeholder="owner@example.com"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
            {errors.ownerEmail && (
              <p className="text-rose-500 text-sm mt-1">{errors.ownerEmail.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="businessName" className="text-gray-700">
              Business Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="businessName"
              {...register('businessName')}
              placeholder="Enter business name"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
            {errors.businessName && (
              <p className="text-rose-500 text-sm mt-1">{errors.businessName.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

