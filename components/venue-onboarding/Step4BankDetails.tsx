'use client'

import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/app/venue-onboarding/page'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'

interface Step4BankDetailsProps {
  form: UseFormReturn<FormData>
}

export default function Step4BankDetails({ form }: Step4BankDetailsProps) {
  const { register } = form

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <CreditCard className="w-8 h-8 text-rose-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bank Details</h2>
        <p className="text-gray-600">Provide banking information for payments (All fields optional)</p>
      </div>

      <Card className="border-rose-200 bg-white/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Banking Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="bankName" className="text-gray-700">
              Bank Name
            </Label>
            <Input
              id="bankName"
              {...register('bankName')}
              placeholder="e.g., HBL, UBL, MCB"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div>
            <Label htmlFor="branchCity" className="text-gray-700">
              Branch & City
            </Label>
            <Input
              id="branchCity"
              {...register('branchCity')}
              placeholder="e.g., Main Branch, Karachi"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div>
            <Label htmlFor="accountNumber" className="text-gray-700">
              Account Number
            </Label>
            <Input
              id="accountNumber"
              {...register('accountNumber')}
              placeholder="Enter account number"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div>
            <Label htmlFor="ibanNumber" className="text-gray-700">
              IBAN Number
            </Label>
            <Input
              id="ibanNumber"
              {...register('ibanNumber')}
              placeholder="PK00XXXX0000000000000000"
              className="mt-2 border-gray-300 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> All bank details are optional. You can provide this information later if needed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

