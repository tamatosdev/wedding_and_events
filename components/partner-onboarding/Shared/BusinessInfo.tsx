'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { CITIES } from '@/lib/constants'

const cities = CITIES


export default function BusinessInfo() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Building2 className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Business Details
        </h2>
        <p className="text-[#666666]">Provide your business location and contact information</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]" style={{ fontFamily: 'DM Sans, sans-serif' }}>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="businessName" className="text-[#2E2E2E]">
              Business Name <span className="text-[#D13F43]">*</span>
            </Label>
            <Input
              id="businessName"
              {...register('businessName')}
              placeholder="Enter business name"
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
            {typeof errors.businessName?.message === 'string' && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.businessName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="city" className="text-[#2E2E2E]">
                City <span className="text-[#D13F43]">*</span>
              </Label>
              <select
                id="city"
                {...register('city')}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D13F43] focus-visible:ring-offset-2"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {typeof errors.city?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="area" className="text-[#2E2E2E]">
                Area <span className="text-[#D13F43]">*</span>
              </Label>
              <Input
                id="area"
                {...register('area')}
                placeholder="Enter area/locality"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
              {typeof errors.area?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.area.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="completeAddress" className="text-[#2E2E2E]">
              Complete Address <span className="text-[#D13F43]">*</span>
            </Label>
            <Textarea
              id="completeAddress"
              {...register('completeAddress')}
              placeholder="Enter complete address with landmarks"
              rows={4}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
            {typeof errors.completeAddress?.message === 'string' && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.completeAddress.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="website" className="text-[#2E2E2E]">
                Website
              </Label>
              <Input
                id="website"
                type="url"
                {...register('website')}
                placeholder="https://www.example.com (Optional)"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
            </div>

            <div>
              <Label htmlFor="businessEmail" className="text-[#2E2E2E]">
                Email
              </Label>
              <Input
                id="businessEmail"
                type="email"
                {...register('businessEmail')}
                placeholder="business@example.com (Optional)"
                className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
              />
              {typeof errors.businessEmail?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.businessEmail.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

