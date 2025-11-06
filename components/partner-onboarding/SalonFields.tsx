'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/lib/partner-onboarding/validationSchemas'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

interface SalonFieldsProps {
  form: UseFormReturn<FormData>
}

const yesNoOptions = ['Yes', 'No']

export default function SalonFields({ form }: SalonFieldsProps) {
  const { register } = form

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
          <Sparkles className="w-8 h-8 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Beauty Parlour / Salon Information</h2>
        <p className="text-gray-600">Tell us about your services, packages, and expertise</p>
      </div>

      <Card className="border-amber-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Salon Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="servicesList" className="text-gray-700">
              Services Offered
            </Label>
            <Textarea
              id="servicesList"
              {...register('servicesList')}
              placeholder="List all services (e.g., Bridal Makeup, Hair Styling, Mehndi, Nail Art, Facial, etc.)"
              rows={4}
              className="mt-2 border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          <div>
            <Label htmlFor="packages" className="text-gray-700">
              Packages & Pricing
            </Label>
            <Textarea
              id="packages"
              {...register('packages')}
              placeholder="Describe your packages (Bridal Package, Pre-Bridal, Party Makeup, etc.) and pricing"
              rows={4}
              className="mt-2 border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          <div>
            <Label htmlFor="operatingHours" className="text-gray-700">
              Operating Hours
            </Label>
            <Input
              id="operatingHours"
              {...register('operatingHours')}
              placeholder="e.g., Monday-Saturday: 10 AM - 8 PM"
              className="mt-2 border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          <div>
            <Label htmlFor="brandsUsed" className="text-gray-700">
              Brands & Products Used
            </Label>
            <Textarea
              id="brandsUsed"
              {...register('brandsUsed')}
              placeholder="List brands and products you use (e.g., MAC, Sephora, L'Oreal, etc.)"
              rows={3}
              className="mt-2 border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          <div>
            <Label htmlFor="staffExpertise" className="text-gray-700">
              Staff Expertise & Experience
            </Label>
            <Textarea
              id="staffExpertise"
              {...register('staffExpertise')}
              placeholder="Describe your team's expertise, certifications, and years of experience"
              rows={3}
              className="mt-2 border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          <div>
            <Label htmlFor="bridalTrials" className="text-gray-700">
              Bridal Trial Policy
            </Label>
            <Textarea
              id="bridalTrials"
              {...register('bridalTrials')}
              placeholder="Describe your bridal trial process, pricing, and policies"
              rows={3}
              className="mt-2 border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          <div>
            <Label htmlFor="salonPricing" className="text-gray-700">
              General Pricing Information
            </Label>
            <Input
              id="salonPricing"
              {...register('salonPricing')}
              placeholder="e.g., Starting from PKR 15,000 for bridal makeup"
              className="mt-2 border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          <div>
            <Label htmlFor="promotions" className="text-gray-700">
              Promotions & Offers
            </Label>
            <Textarea
              id="promotions"
              {...register('promotions')}
              placeholder="Describe any ongoing promotions, seasonal offers, or special packages"
              rows={3}
              className="mt-2 border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          <div>
            <Label htmlFor="hygiene" className="text-gray-700">
              Hygiene & Safety Standards
            </Label>
            <Textarea
              id="hygiene"
              {...register('hygiene')}
              placeholder="Describe your hygiene practices, sanitization procedures, and safety measures"
              rows={3}
              className="mt-2 border-gray-300 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

