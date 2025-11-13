'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Mail, Phone } from 'lucide-react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { BusinessType } from '@/lib/partner-onboarding/formConfig'

export default function ReviewSubmit() {
  const { formData, businessType } = usePartnerForm()

  const renderField = (label: string, value: any) => {
    if (!value || value === '') return null
    return (
      <div className="py-2 border-b border-gray-100">
        <span className="text-sm font-semibold text-gray-700">{label}:</span>
        <span className="ml-2 text-sm text-gray-600">{String(value)}</span>
      </div>
    )
  }

  const renderSection = (title: string, fields: Array<{ label: string; key: keyof typeof formData }>) => {
    const hasData = fields.some(field => formData[field.key])
    if (!hasData) return null

    return (
      <Card className="border-[#DD374033] bg-white shadow-sm mb-4">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {fields.map((field) => (
            <div key={field.key}>
              {renderField(field.label, formData[field.key])}
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#2E2E2E] mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Review Your Application
          </h2>
          <p className="text-[#666666]" style={{ fontFamily: 'DM Sans, sans-serif' }}>Please review all information before submitting</p>
        </motion.div>

      <div className="max-h-[600px] overflow-y-auto pr-2">
        {renderSection('Business Type', [
          { label: 'Business Type', key: 'businessType' },
        ])}

        {renderSection('Owner Details', [
          { label: 'Owner Name', key: 'ownerName' },
          { label: 'Mobile 1', key: 'ownerMobile1' },
          { label: 'Mobile 2', key: 'ownerMobile2' },
          { label: 'Landline', key: 'ownerLandline' },
          { label: 'Email', key: 'ownerEmail' },
        ])}

        {renderSection('Manager Details', [
          { label: 'Manager Name', key: 'managerName' },
          { label: 'Mobile 1', key: 'managerMobile1' },
          { label: 'Mobile 2', key: 'managerMobile2' },
          { label: 'Landline', key: 'managerLandline' },
          { label: 'Email', key: 'managerEmail' },
        ])}

        {renderSection('Business Information', [
          { label: 'Business Name', key: 'businessName' },
          { label: 'City', key: 'city' },
          { label: 'Area', key: 'area' },
          { label: 'Complete Address', key: 'completeAddress' },
          { label: 'Website', key: 'website' },
          { label: 'Business Email', key: 'businessEmail' },
        ])}

        {renderSection('Bank Details', [
          { label: 'Bank Name', key: 'bankName' },
          { label: 'Branch & City', key: 'branchCity' },
          { label: 'Account Number', key: 'accountNumber' },
          { label: 'IBAN', key: 'ibanNumber' },
        ])}

        {businessType === 'wedding' && renderSection('Wedding Venue Details', [
          { label: 'Venue Type', key: 'venueType' },
          { label: 'Guest Capacity', key: 'guestCapacity' },
          { label: 'Pricing Range', key: 'venuePricingRange' },
          { label: 'Catering Available', key: 'cateringAvailable' },
          { label: 'Outside Catering Allowed', key: 'outsideCateringAllowed' },
          { label: 'Parking Capacity', key: 'parkingCapacity' },
          { label: 'Parking Type', key: 'parkingType' },
          { label: 'Amenities', key: 'amenities' },
          { label: 'Bridal Suite', key: 'bridalSuite' },
          { label: 'Namaz Area (Men)', key: 'namazAreaMen' },
          { label: 'Namaz Area (Ladies)', key: 'namazAreaLadies' },
        ])}

        {businessType === 'boutiques' && renderSection('Boutique Details', [
          { label: 'Dress Type', key: 'dressType' },
          { label: 'Design or Resell', key: 'designOrResell' },
          { label: 'Fabrics', key: 'fabrics' },
          { label: 'Price Range', key: 'priceRange' },
          { label: 'Customization', key: 'customization' },
          { label: 'Rental Policy', key: 'rentalPolicy' },
          { label: 'Delivery', key: 'delivery' },
        ])}

        {businessType === 'beauty-parlor' && renderSection('Beauty Parlor Details', [
          { label: 'Services List', key: 'servicesList' },
          { label: 'Packages', key: 'packages' },
          { label: 'Operating Hours', key: 'operatingHours' },
          { label: 'Brands Used', key: 'brandsUsed' },
          { label: 'Staff Expertise', key: 'staffExpertise' },
          { label: 'Bridal Trials', key: 'bridalTrials' },
          { label: 'Pricing', key: 'salonPricing' },
          { label: 'Promotions', key: 'promotions' },
          { label: 'Hygiene', key: 'hygiene' },
        ])}

        {businessType === 'decor' && renderSection('Décor Details', [
          { label: 'Décor Type', key: 'decorType' },
          { label: 'Décor Style', key: 'decorStyle' },
          { label: 'Event Types', key: 'eventTypes' },
          { label: 'Pricing Range', key: 'decorPricingRange' },
          { label: 'Setup Time', key: 'setupTime' },
          { label: 'Equipment Provided', key: 'equipmentProvided' },
          { label: 'Custom Design', key: 'customDesign' },
          { label: 'Themes Available', key: 'themesAvailable' },
          { label: 'Florals Included', key: 'floralsIncluded' },
          { label: 'Lighting Services', key: 'lightingServices' },
        ])}

        {businessType === 'catering' && renderSection('Catering Details', [
          { label: 'Cuisine Type', key: 'cuisineType' },
          { label: 'Menu Style', key: 'menuStyle' },
          { label: 'Serving Style', key: 'servingStyle' },
          { label: 'Minimum Guests', key: 'minimumGuests' },
          { label: 'Maximum Guests', key: 'maximumGuests' },
          { label: 'Pricing Range', key: 'cateringPricingRange' },
          { label: 'Halal Certified', key: 'halalCertified' },
          { label: 'Vegetarian Options', key: 'vegetarianOptions' },
          { label: 'Dietary Accommodations', key: 'dietaryAccommodations' },
          { label: 'Setup Service', key: 'setupService' },
          { label: 'Serving Staff', key: 'servingStaff' },
          { label: 'Equipment Rental', key: 'equipmentRental' },
        ])}

        {renderSection('General Information', [
          { label: 'Business Duration', key: 'businessDuration' },
          { label: 'Number of Branches', key: 'numberOfBranches' },
          { label: 'Cancellation Policy', key: 'cancellationPolicy' },
          { label: 'Fire Insurance', key: 'fireInsurance' },
          { label: 'WE Arrange Insurance', key: 'weArrangeInsurance' },
          { label: 'Wheelchair Accessible', key: 'wheelchairAccessible' },
        ])}
      </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-[#F7E9DB] border border-[#DD374033] rounded-lg"
        >
          <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#D13F43]" />
              <a href="https://wa.me/923141113007" className="text-[#2E2E2E] hover:text-[#D13F43]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                WhatsApp: 03141113007
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#D13F43]" />
              <a href="mailto:info@theweddingandevent.com" className="text-[#2E2E2E] hover:text-[#D13F43]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                info@theweddingandevent.com
              </a>
            </div>
          </div>
        </motion.div>
    </div>
  )
}
