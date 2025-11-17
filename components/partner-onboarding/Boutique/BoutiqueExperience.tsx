'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Calendar, Clock, Users, Package } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

export default function BoutiqueExperience() {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Star className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-3xl font-bold text-[#2E2E2E] mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Business Experience
        </h2>
        <p className="text-[#666666] text-lg max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Tell us about your business operations and experience in the fashion industry
        </p>
      </div>

      {/* Business Experience */}
      <Card className="border-[#DD374033] bg-gradient-to-br from-white to-[#F7E9DB]/20 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#F7E9DB] to-[#F7E9DB]/70 border-b border-[#DD374033]">
          <CardTitle className="text-xl font-semibold text-[#2E2E2E] flex items-center gap-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <div className="w-8 h-8 rounded-lg bg-[#D13F43] flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            E) Business Operating Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="businessExperience" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Years in Business <span className="text-[#D13F43] ml-1">*</span>
              </Label>
              <select
                id="businessExperience"
                {...register('businessExperience', { required: 'Business experience is required' })}
                className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              >
                <option value="">Select Experience</option>
                <option value="New Business">New Business</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="6-10 years">6-10 years</option>
                <option value="More than 10 years">More than 10 years</option>
              </select>
              {typeof errors.businessExperience?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.businessExperience.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="businessSize" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Business Size <span className="text-[#D13F43] ml-1">*</span>
              </Label>
              <select
                id="businessSize"
                {...register('businessSize', { required: 'Business size is required' })}
                className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              >
                <option value="">Select Size</option>
                <option value="Small (1-10 employees)">Small (1-10 employees)</option>
                <option value="Medium (11-50 employees)">Medium (11-50 employees)</option>
                <option value="Large (50+ employees)">Large (50+ employees)</option>
                <option value="Home-based">Home-based</option>
                <option value="Online Only">Online Only</option>
              </select>
              {typeof errors.businessSize?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.businessSize.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="businessDescription" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
              Business Description <span className="text-[#D13F43] ml-1">*</span>
            </Label>
            <Textarea
              id="businessDescription"
              {...register('businessDescription', { required: 'Business description is required' })}
              placeholder="Tell us about your boutique, specialties, and what makes you unique"
              rows={4}
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300 placeholder:text-gray-400 resize-none"
            />
            {typeof errors.businessDescription?.message === 'string' && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.businessDescription.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card className="border-[#DD374033] bg-gradient-to-br from-white to-[#F7E9DB]/20 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#F7E9DB] to-[#F7E9DB]/70 border-b border-[#DD374033]">
          <CardTitle className="text-xl font-semibold text-[#2E2E2E] flex items-center gap-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <div className="w-8 h-8 rounded-lg bg-[#D13F43] flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            F) Business Hours & Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="operatingDays" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Operating Days <span className="text-[#D13F43] ml-1">*</span>
              </Label>
              <Input
                id="operatingDays"
                {...register('operatingDays', { required: 'Operating days is required' })}
                placeholder="e.g., Monday to Saturday"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
              {typeof errors.operatingDays?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.operatingDays.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="operatingHours" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Operating Hours <span className="text-[#D13F43] ml-1">*</span>
              </Label>
              <Input
                id="operatingHours"
                {...register('operatingHours', { required: 'Operating hours is required' })}
                placeholder="e.g., 10:00 AM - 8:00 PM"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
              {typeof errors.operatingHours?.message === 'string' && (
                <p className="text-[#D13F43] text-sm mt-1">{errors.operatingHours.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="specialHours" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Special Hours (Holidays, Events)
            </Label>
            <Textarea
              id="specialHours"
              {...register('specialHours')}
              placeholder="Any special hours during holidays, festivals, or events (Optional)"
              rows={3}
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300 placeholder:text-gray-400 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Team & Capacity */}
      <Card className="border-[#DD374033] bg-gradient-to-br from-white to-[#F7E9DB]/20 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#F7E9DB] to-[#F7E9DB]/70 border-b border-[#DD374033]">
          <CardTitle className="text-xl font-semibold text-[#2E2E2E] flex items-center gap-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <div className="w-8 h-8 rounded-lg bg-[#D13F43] flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            G) Team & Capacity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="totalStaff" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Total Staff
              </Label>
              <Input
                id="totalStaff"
                type="number"
                {...register('totalStaff')}
                placeholder="Number of staff members"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="designers" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Designers
              </Label>
              <Input
                id="designers"
                type="number"
                {...register('designers')}
                placeholder="Number of designers"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="tailors" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Tailors/Seamstresses
              </Label>
              <Input
                id="tailors"
                type="number"
                {...register('tailors')}
                placeholder="Number of tailors"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="monthlyCapacity" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Monthly Order Capacity
              </Label>
              <Input
                id="monthlyCapacity"
                type="number"
                {...register('monthlyCapacity')}
                placeholder="Orders you can handle per month"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="peakSeasonCapacity" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
                Peak Season Capacity
              </Label>
              <Input
                id="peakSeasonCapacity"
                type="number"
                {...register('peakSeasonCapacity')}
                placeholder="Wedding season capacity"
                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}