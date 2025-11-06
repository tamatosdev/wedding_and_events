'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/lib/partner-onboarding/validationSchemas'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

interface VenueFieldsProps {
  form: UseFormReturn<FormData>
}

const venueTypes = ['Banquet', 'Marquee', 'Lawn', 'Rooftop', 'Other']
const yesNoOptions = ['Yes', 'No']
const parkingTypes = ['Valet', 'Self', 'Both']

export default function VenueFields({ form }: VenueFieldsProps) {
  const { register } = form

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <MapPin className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Venue Information</h2>
        <p className="text-gray-600">Tell us about your venue capacity, pricing, and facilities</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Venue Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="venueType" className="text-gray-700">
              Venue Type
            </Label>
            <select
              id="venueType"
              {...register('venueType')}
              className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
            >
              <option value="">Select Venue Type</option>
              {venueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="guestCapacity" className="text-gray-700">
              Guest Capacity
            </Label>
            <Input
              id="guestCapacity"
              {...register('guestCapacity')}
              placeholder="e.g., 500-1000 guests"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div>
            <Label htmlFor="venuePricingRange" className="text-gray-700">
              Venue Pricing Range
            </Label>
            <Input
              id="venuePricingRange"
              {...register('venuePricingRange')}
              placeholder="e.g., PKR 150,000 - 300,000"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="cateringAvailable" className="text-gray-700">
                Catering Available?
              </Label>
              <select
                id="cateringAvailable"
                {...register('cateringAvailable')}
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
              <Label htmlFor="outsideCateringAllowed" className="text-gray-700">
                Outside Catering Allowed?
              </Label>
              <select
                id="outsideCateringAllowed"
                {...register('outsideCateringAllowed')}
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
          </div>

          <div>
            <Label htmlFor="amenities" className="text-gray-700">
              Amenities (Decor, Sound, Floral, etc.)
            </Label>
            <Textarea
              id="amenities"
              {...register('amenities')}
              placeholder="List all available amenities and services..."
              rows={4}
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="namazAreaMen" className="text-gray-700">
                  Namaz Area (Men)
                </Label>
                <select
                  id="namazAreaMen"
                  {...register('namazAreaMen')}
                  className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
                >
                  <option value="">Select</option>
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
                  <option value="">Select</option>
                  {yesNoOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

