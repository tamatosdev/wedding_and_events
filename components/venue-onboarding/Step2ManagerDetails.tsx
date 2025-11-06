'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/app/venue-onboarding/page'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'

interface Step2ManagerDetailsProps {
  form: UseFormReturn<FormData>
}

export default function Step2ManagerDetails({ form }: Step2ManagerDetailsProps) {
  const { register, formState: { errors } } = form

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <Users className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manager / Point of Contact Details</h2>
        <p className="text-gray-600">Please provide the manager or primary contact person's information</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="managerName" className="text-gray-700">
              Name <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="managerName"
              {...register('managerName')}
              placeholder="Enter manager's full name"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
            {errors.managerName && (
              <p className="text-rose-500 text-sm mt-1">{errors.managerName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="managerMobile1" className="text-gray-700">
                Mobile 1 <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="managerMobile1"
                type="tel"
                {...register('managerMobile1')}
                placeholder="0300-1234567"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
              {errors.managerMobile1 && (
                <p className="text-rose-500 text-sm mt-1">{errors.managerMobile1.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="managerMobile2" className="text-gray-700">
                Mobile 2
              </Label>
              <Input
                id="managerMobile2"
                type="tel"
                {...register('managerMobile2')}
                placeholder="0300-1234567 (Optional)"
                className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="managerLandline" className="text-gray-700">
              Landline
            </Label>
            <Input
              id="managerLandline"
              type="tel"
              {...register('managerLandline')}
              placeholder="021-12345678 (Optional)"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div>
            <Label htmlFor="managerEmail" className="text-gray-700">
              Email <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="managerEmail"
              type="email"
              {...register('managerEmail')}
              placeholder="manager@example.com"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
            {errors.managerEmail && (
              <p className="text-rose-500 text-sm mt-1">{errors.managerEmail.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

