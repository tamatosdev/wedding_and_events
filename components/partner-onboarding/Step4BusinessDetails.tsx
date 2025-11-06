'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/lib/partner-onboarding/validationSchemas'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2 } from 'lucide-react'

interface Step4BusinessDetailsProps {
  form: UseFormReturn<FormData>
}

const cities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 
  'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Other'
]

export default function Step4BusinessDetails({ form }: Step4BusinessDetailsProps) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <Building2 className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Details</h2>
        <p className="text-gray-600">Provide your business location and contact information</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="city" className="text-gray-700">
                City <span className="text-rose-500">*</span>
              </Label>
              <select
                id="city"
                {...register('city')}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="text-rose-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="area" className="text-gray-700">
                Area <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="area"
                {...register('area')}
                placeholder="Enter area/locality"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
              {errors.area && (
                <p className="text-rose-500 text-sm mt-1">{errors.area.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="completeAddress" className="text-gray-700">
              Complete Address <span className="text-rose-500">*</span>
            </Label>
            <Textarea
              id="completeAddress"
              {...register('completeAddress')}
              placeholder="Enter complete address with landmarks"
              rows={4}
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
            {errors.completeAddress && (
              <p className="text-rose-500 text-sm mt-1">{errors.completeAddress.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="website" className="text-gray-700">
                Website
              </Label>
              <Input
                id="website"
                type="url"
                {...register('website')}
                placeholder="https://www.example.com (Optional)"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>

            <div>
              <Label htmlFor="businessEmail" className="text-gray-700">
                Email
              </Label>
              <Input
                id="businessEmail"
                type="email"
                {...register('businessEmail')}
                placeholder="business@example.com (Optional)"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
              {errors.businessEmail && (
                <p className="text-rose-500 text-sm mt-1">{errors.businessEmail.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

