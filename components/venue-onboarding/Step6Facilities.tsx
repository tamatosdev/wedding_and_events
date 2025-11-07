'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/lib/venue-onboarding/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accessibility } from 'lucide-react'

interface Step6FacilitiesProps {
  form: UseFormReturn<FormData>
}

const parkingTypes = ['Valet', 'Self', 'Both']
const yesNoOptions = ['Yes', 'No']

export default function Step6Facilities({ form }: Step6FacilitiesProps) {
  const { register } = form

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <Accessibility className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Facilities & Accessibility</h2>
        <p className="text-gray-600">Tell us about your venue's facilities and accessibility features</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Facilities Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="parkingCapacity" className="text-gray-700">
              Parking Capacity
            </Label>
            <Input
              id="parkingCapacity"
              {...register('parkingCapacity')}
              placeholder="e.g., 50-100 cars"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div>
            <Label htmlFor="parkingType" className="text-gray-700">
              Parking Type
            </Label>
            <select
              id="parkingType"
              {...register('parkingType')}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
            >
              <option value="">Select Parking Type</option>
              {parkingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="wheelchairAccessible" className="text-gray-700">
                Wheelchair Accessible?
              </Label>
              <select
                id="wheelchairAccessible"
                {...register('wheelchairAccessible')}
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
              <Label htmlFor="wheelchairAvailable" className="text-gray-700">
                Wheelchair Available?
              </Label>
              <select
                id="wheelchairAvailable"
                {...register('wheelchairAvailable')}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="namazAreaMen" className="text-gray-700">
                Namaz Area (Men)
              </Label>
              <select
                id="namazAreaMen"
                {...register('namazAreaMen')}
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
              <Label htmlFor="namazAreaLadies" className="text-gray-700">
                Namaz Area (Ladies)
              </Label>
              <select
                id="namazAreaLadies"
                {...register('namazAreaLadies')}
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
            <Label htmlFor="bridalSuite" className="text-gray-700">
              Bridal Suite Available?
            </Label>
            <select
              id="bridalSuite"
              {...register('bridalSuite')}
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

