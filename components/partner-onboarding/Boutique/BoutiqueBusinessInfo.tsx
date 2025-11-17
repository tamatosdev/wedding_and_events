'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, CreditCard, MapPin } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { CITIES } from '@/lib/constants'

export default function BoutiqueBusinessInfo() {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Building2 className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-3xl font-bold text-[#2E2E2E] mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Business Info & Banking
        </h2>
        <p className="text-[#666666] text-lg max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Provide your business location details and banking information for customer payments
        </p>
      </div>

      {/* Business Information */}
      <Card className="border-[#DD374033] bg-gradient-to-br from-white to-[#F7E9DB]/20 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#F7E9DB] to-[#F7E9DB]/70 border-b border-[#DD374033]">
          <CardTitle className="text-xl font-semibold text-[#2E2E2E] flex items-center gap-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <div className="w-8 h-8 rounded-lg bg-[#D13F43] flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            C) Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="space-y-3">
            <Label htmlFor="businessName" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
              Business Name <span className="text-[#D13F43] ml-1">*</span>
            </Label>
            <Input
              id="businessName"
              {...register('businessName', { required: 'Business name is required' })}
              placeholder="Enter your boutique name"
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
            />
            {typeof errors.businessName?.message === 'string' && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.businessName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="city" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                City <span className="text-[#D13F43] ml-1">*</span>
              </Label>
              <select
                id="city"
                {...register('city', { required: 'City is required' })}
                className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              >
                <option value="">Select City</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {typeof errors.city?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="area" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Area <span className="text-[#D13F43] ml-1">*</span>
              </Label>
              <Input
                id="area"
                {...register('area', { required: 'Area is required' })}
                placeholder="Enter area/locality"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
              {typeof errors.area?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.area.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="businessPhone" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Mobile/Landline <span className="text-[#D13F43] ml-1">*</span>
              </Label>
              <Input
                id="businessPhone"
                {...register('businessPhone', { required: 'Business phone is required' })}
                placeholder="Business phone number"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
              {typeof errors.businessPhone?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.businessPhone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="completeAddress" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
              Complete Address of Your Business <span className="text-[#D13F43] ml-1">*</span>
            </Label>
            <Textarea
              id="completeAddress"
              {...register('completeAddress', { required: 'Complete address is required' })}
              placeholder="Enter complete address with landmarks"
              rows={3}
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300 placeholder:text-gray-400 resize-none"
            />
            {typeof errors.completeAddress?.message === 'string' && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.completeAddress.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="website" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                Website
              </Label>
              <Input
                id="website"
                {...register('website')}
                placeholder="https://www.yourboutique.com (Optional)"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="businessEmail" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                Email
              </Label>
              <Input
                id="businessEmail"
                {...register('businessEmail')}
                placeholder="business@yourboutique.com (Optional)"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banking Information */}
      <Card className="border-[#DD374033] bg-gradient-to-br from-white to-[#F7E9DB]/20 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#F7E9DB] to-[#F7E9DB]/70 border-b border-[#DD374033]">
          <CardTitle className="text-xl font-semibold text-[#2E2E2E] flex items-center gap-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <div className="w-8 h-8 rounded-lg bg-[#D13F43] flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            D) Online Bank Payment (for customers)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-800 text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <strong>Preferably:</strong> Meezan Islamic Bank or another Islamic Bank
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="bankName" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Bank Name
              </Label>
              <Input
                id="bankName"
                {...register('bankName')}
                placeholder="e.g., Meezan Islamic Bank"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="branchCity" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Branch & City
              </Label>
              <Input
                id="branchCity"
                {...register('branchCity')}
                placeholder="Branch name and city"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="accountNumber" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Account Number
              </Label>
              <Input
                id="accountNumber"
                {...register('accountNumber')}
                placeholder="Enter account number"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="iban" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                IBAN Number
              </Label>
              <Input
                id="iban"
                {...register('iban')}
                placeholder="PK36XXXXXXXXXXXXXXXXXXXX"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}