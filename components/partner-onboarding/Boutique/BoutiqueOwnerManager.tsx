'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, User, Phone } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

export default function BoutiqueOwnerManager() {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Users className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-3xl font-bold text-[#2E2E2E] mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Owner & Manager Details
        </h2>
        <p className="text-[#666666] text-lg max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Provide complete contact information for the boutique owner and manager/POC
        </p>
      </div>

      {/* Owner Details */}
      <Card className="border-[#DD374033] bg-gradient-to-br from-white to-[#F7E9DB]/20 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#F7E9DB] to-[#F7E9DB]/70 border-b border-[#DD374033]">
          <CardTitle className="text-xl font-semibold text-[#2E2E2E] flex items-center gap-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <div className="w-8 h-8 rounded-lg bg-[#D13F43] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            A) Owner Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="space-y-3">
            <Label htmlFor="ownerName" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
              Owner Name <span className="text-[#D13F43] ml-1">*</span>
            </Label>
            <Input
              id="ownerName"
              {...register('ownerName', { required: 'Owner name is required' })}
              placeholder="Enter owner's full name"
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
            />
            {typeof errors.ownerName?.message === 'string' && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.ownerName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="ownerMobile1" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Contact Number Mobile 1 <span className="text-[#D13F43] ml-1">*</span>
              </Label>
              <Input
                id="ownerMobile1"
                {...register('ownerMobile1', { required: 'Mobile number is required' })}
                placeholder="0300-1234567"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
              {typeof errors.ownerMobile1?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.ownerMobile1.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="ownerMobile2" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                Contact Number Mobile 2
              </Label>
              <Input
                id="ownerMobile2"
                {...register('ownerMobile2')}
                placeholder="0300-1234567 (Optional)"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="ownerLandline" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              PTCL Land Number
            </Label>
            <Input
              id="ownerLandline"
              {...register('ownerLandline')}
              placeholder="021-12345678 (Optional)"
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="ownerEmail" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
              Email Address <span className="text-[#D13F43] ml-1">*</span>
            </Label>
            <Input
              id="ownerEmail"
              {...register('ownerEmail', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              })}
              placeholder="owner@example.com"
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
            />
            {typeof errors.ownerEmail?.message === 'string' && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.ownerEmail.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Manager/POC Details */}
      <Card className="border-[#DD374033] bg-gradient-to-br from-white to-[#F7E9DB]/20 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#F7E9DB] to-[#F7E9DB]/70 border-b border-[#DD374033]">
          <CardTitle className="text-xl font-semibold text-[#2E2E2E] flex items-center gap-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <div className="w-8 h-8 rounded-lg bg-[#D13F43] flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            B) Manager/POC Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="space-y-3">
            <Label htmlFor="managerName" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
              Manager/POC Name <span className="text-[#D13F43] ml-1">*</span>
            </Label>
            <Input
              id="managerName"
              {...register('managerName', { required: 'Manager name is required' })}
              placeholder="Enter manager's full name"
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
            />
            {typeof errors.managerName?.message === 'string' && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.managerName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="managerMobile1" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Contact Number Mobile 1 <span className="text-[#D13F43] ml-1">*</span>
              </Label>
              <Input
                id="managerMobile1"
                {...register('managerMobile1', { required: 'Manager mobile is required' })}
                placeholder="0300-1234567"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
              {typeof errors.managerMobile1?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.managerMobile1.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="managerMobile2" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                Contact Number Mobile 2
              </Label>
              <Input
                id="managerMobile2"
                {...register('managerMobile2')}
                placeholder="0300-1234567 (Optional)"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="managerLandline" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              PTCL Land Number
            </Label>
            <Input
              id="managerLandline"
              {...register('managerLandline')}
              placeholder="021-12345678 (Optional)"
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="managerEmail" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
              Email Address <span className="text-[#D13F43] ml-1">*</span>
            </Label>
            <Input
              id="managerEmail"
              {...register('managerEmail', { 
                required: 'Manager email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              })}
              placeholder="manager@example.com"
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
            />
            {typeof errors.managerEmail?.message === 'string' && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.managerEmail.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}