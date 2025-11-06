'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/app/venue-onboarding/page'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

interface Step7AmenitiesProps {
  form: UseFormReturn<FormData>
}

const yesNoOptions = ['Yes', 'No']

export default function Step7Amenities({ form }: Step7AmenitiesProps) {
  const { register } = form

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <Sparkles className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Amenities</h2>
        <p className="text-gray-600">List all available amenities and services</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Amenities & Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="amenities" className="text-gray-700">
              Additional Amenities (Decor, Sound, Floral, Catering, etc.)
            </Label>
            <Textarea
              id="amenities"
              {...register('amenities')}
              placeholder="List all available amenities and services..."
              rows={6}
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="airConditioning" className="text-gray-700">
                Air Conditioning
              </Label>
              <select
                id="airConditioning"
                {...register('airConditioning')}
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
              <Label htmlFor="heating" className="text-gray-700">
                Heating
              </Label>
              <select
                id="heating"
                {...register('heating')}
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
              <Label htmlFor="elevators" className="text-gray-700">
                Elevators
              </Label>
              <select
                id="elevators"
                {...register('elevators')}
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
              <Label htmlFor="securityStaff" className="text-gray-700">
                Security Staff
              </Label>
              <select
                id="securityStaff"
                {...register('securityStaff')}
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
              <Label htmlFor="backupGenerator" className="text-gray-700">
                Backup Generator
              </Label>
              <select
                id="backupGenerator"
                {...register('backupGenerator')}
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
              <Label htmlFor="dedicatedStaff" className="text-gray-700">
                Dedicated Staff
              </Label>
              <select
                id="dedicatedStaff"
                {...register('dedicatedStaff')}
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
        </CardContent>
      </Card>
    </div>
  )
}

