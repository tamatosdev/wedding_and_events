'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/lib/venue-onboarding/types'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'

interface Step8PoliciesProps {
  form: UseFormReturn<FormData>
}

const yesNoOptions = ['Yes', 'No']

export default function Step8Policies({ form }: Step8PoliciesProps) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <FileText className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Policies</h2>
        <p className="text-gray-600">Define your venue policies and restrictions</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Policy Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="cancellationPolicy" className="text-gray-700">
              Cancellation Policy <span className="text-rose-500">*</span>
            </Label>
            <Textarea
              id="cancellationPolicy"
              {...register('cancellationPolicy')}
              placeholder="Describe your cancellation policy, refund terms, etc."
              rows={4}
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
            {errors.cancellationPolicy && (
              <p className="text-rose-500 text-sm mt-1">{errors.cancellationPolicy.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fireInsurance" className="text-gray-700">
                Fire/Property Insurance
              </Label>
              <select
                id="fireInsurance"
                {...register('fireInsurance')}
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
              <Label htmlFor="weArrangeInsurance" className="text-gray-700">
                Want WE to arrange insurance?
              </Label>
              <select
                id="weArrangeInsurance"
                {...register('weArrangeInsurance')}
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
            <Label htmlFor="prohibitedItems" className="text-gray-700">
              Prohibited Items or SOPs
            </Label>
            <Textarea
              id="prohibitedItems"
              {...register('prohibitedItems')}
              placeholder="e.g., no alcohol, no dance, no weapons, dress code requirements, etc."
              rows={4}
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
            <p className="text-sm text-gray-500 mt-1">
              List any prohibited items, restrictions, or standard operating procedures
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

