'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Megaphone, CheckCircle, FileText, Shield } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

export default function BoutiqueMarketing() {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F7E9DB] mb-4">
          <Megaphone className="w-8 h-8 text-[#D13F43]" />
        </div>
        <h2 className="text-3xl font-bold text-[#2E2E2E] mb-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Marketing & Legal
        </h2>
        <p className="text-[#666666] text-lg max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Complete your registration with marketing preferences and legal undertakings
        </p>
      </div>

      {/* Marketing Preferences */}
      <Card className="border-[#DD374033] bg-gradient-to-br from-white to-[#F7E9DB]/20 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#F7E9DB] to-[#F7E9DB]/70 border-b border-[#DD374033]">
          <CardTitle className="text-xl font-semibold text-[#2E2E2E] flex items-center gap-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <div className="w-8 h-8 rounded-lg bg-[#D13F43] flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-white" />
            </div>
            Marketing & Promotion Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="space-y-4">
            <Label className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-[#D13F43]"></span>
              Marketing Channels (Select all that apply)
            </Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-[#D13F43] transition-all duration-200 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('marketingChannels')}
                  value="Social Media Promotion"
                  className="w-5 h-5 text-[#D13F43] bg-gray-100 border-gray-300 rounded focus:ring-[#D13F43] focus:ring-2"
                />
                <span className="text-sm font-medium text-[#2E2E2E] group-hover:text-[#D13F43]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Social Media Promotion
                </span>
              </label>

              <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-[#D13F43] transition-all duration-200 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('marketingChannels')}
                  value="Featured Listings"
                  className="w-5 h-5 text-[#D13F43] bg-gray-100 border-gray-300 rounded focus:ring-[#D13F43] focus:ring-2"
                />
                <span className="text-sm font-medium text-[#2E2E2E] group-hover:text-[#D13F43]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Featured Listings
                </span>
              </label>

              <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-[#D13F43] transition-all duration-200 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('marketingChannels')}
                  value="Email Marketing"
                  className="w-5 h-5 text-[#D13F43] bg-gray-100 border-gray-300 rounded focus:ring-[#D13F43] focus:ring-2"
                />
                <span className="text-sm font-medium text-[#2E2E2E] group-hover:text-[#D13F43]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Email Marketing
                </span>
              </label>

              <label className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-[#D13F43] transition-all duration-200 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('marketingChannels')}
                  value="Blog Features"
                  className="w-5 h-5 text-[#D13F43] bg-gray-100 border-gray-300 rounded focus:ring-[#D13F43] focus:ring-2"
                />
                <span className="text-sm font-medium text-[#2E2E2E] group-hover:text-[#D13F43]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Blog Features
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="marketingBudget" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Monthly Marketing Budget (Optional)
            </Label>
            <select
              id="marketingBudget"
              {...register('marketingBudget')}
              className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300"
            >
              <option value="">Select Budget Range</option>
              <option value="PKR 5,000 - 15,000">PKR 5,000 - 15,000</option>
              <option value="PKR 15,000 - 30,000">PKR 15,000 - 30,000</option>
              <option value="PKR 30,000 - 50,000">PKR 30,000 - 50,000</option>
              <option value="PKR 50,000+">PKR 50,000+</option>
              <option value="Not interested">Not interested in paid marketing</option>
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="specialPromotions" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Special Promotions or Offers
            </Label>
            <Textarea
              id="specialPromotions"
              {...register('specialPromotions')}
              placeholder="Any special offers, discounts, or seasonal promotions you'd like to highlight"
              rows={3}
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300 placeholder:text-gray-400 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Legal Undertaking */}
      <Card className="border-[#DD374033] bg-gradient-to-br from-white to-[#F7E9DB]/20 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#F7E9DB] to-[#F7E9DB]/70 border-b border-[#DD374033]">
          <CardTitle className="text-xl font-semibold text-[#2E2E2E] flex items-center gap-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <div className="w-8 h-8 rounded-lg bg-[#D13F43] flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            Legal Undertaking & Agreement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Terms & Conditions
                </h3>
                <div className="text-blue-800 text-sm space-y-3" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  <p><strong>1. Quality Assurance:</strong> I undertake to maintain the highest standards of quality in all products and services offered through this platform.</p>
                  <p><strong>2. Timely Delivery:</strong> I commit to delivering all orders within the agreed timeframe and will communicate any delays promptly to customers.</p>
                  <p><strong>3. Professional Conduct:</strong> I will maintain professional behavior and courteous communication with all customers and platform representatives.</p>
                  <p><strong>4. Accurate Information:</strong> All information provided about my business, products, and services is accurate and up-to-date.</p>
                  <p><strong>5. Platform Policies:</strong> I agree to comply with all platform policies, guidelines, and terms of service.</p>
                  <p><strong>6. Dispute Resolution:</strong> I will work collaboratively to resolve any customer disputes in a fair and timely manner.</p>
                  <p><strong>7. Payment Terms:</strong> I understand and agree to the platform's commission structure and payment terms.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-[#D13F43] transition-all duration-200 cursor-pointer group">
              <input
                type="checkbox"
                {...register('agreeTerms', { required: 'You must agree to the terms and conditions' })}
                className="w-5 h-5 text-[#D13F43] bg-gray-100 border-gray-300 rounded focus:ring-[#D13F43] focus:ring-2 mt-1"
              />
              <div>
                <span className="text-sm font-medium text-[#2E2E2E] group-hover:text-[#D13F43]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  I agree to all terms and conditions listed above <span className="text-[#D13F43] ml-1">*</span>
                </span>
                <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  By checking this box, I confirm that I have read, understood, and agree to comply with all the terms and conditions.
                </p>
              </div>
            </label>
            {typeof errors.agreeTerms?.message === 'string' && (
              <p className="text-[#D13F43] text-sm mt-1">{errors.agreeTerms.message}</p>
            )}

            <label className="flex items-start space-x-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-[#D13F43] transition-all duration-200 cursor-pointer group">
              <input
                type="checkbox"
                {...register('consentMarketing')}
                className="w-5 h-5 text-[#D13F43] bg-gray-100 border-gray-300 rounded focus:ring-[#D13F43] focus:ring-2 mt-1"
              />
              <div>
                <span className="text-sm font-medium text-[#2E2E2E] group-hover:text-[#D13F43]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  I consent to receive marketing communications
                </span>
                <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  This includes promotional emails, SMS notifications about platform updates, and marketing materials (Optional).
                </p>
              </div>
            </label>
          </div>

          <div className="space-y-3">
            <Label htmlFor="additionalNotes" className="text-[#2E2E2E] font-semibold text-sm flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Additional Notes or Comments
            </Label>
            <Textarea
              id="additionalNotes"
              {...register('additionalNotes')}
              placeholder="Any additional information, special requests, or comments you'd like to share"
              rows={4}
              className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D13F43]/20 focus:border-[#D13F43] hover:border-gray-300 placeholder:text-gray-400 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      <div className="text-center space-y-4 p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Almost Complete!
        </h3>
        <p className="text-green-800 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Click "Submit Application" to complete your boutique registration. Our team will review your application and contact you within 2-3 business days.
        </p>
      </div>
    </div>
  )
}