'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

const yesNoOptions = ['Yes', 'No']

export default function CateringMenu() {
  const { formData, updateFormData } = usePartnerForm()

  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as any)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-[#F7E9DB] space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-[#D13F43] mb-2 tracking-tight text-center" style={{fontFamily:'DM Sans, sans-serif'}}>Menu & Packages</h2>
        <p className="text-[#666666]">Describe your menu offerings, packages, and services</p>
      </div>

      <Card className="border-[#DD374033] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#2E2E2E]">Menu Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <Label htmlFor="dietaryAccommodations" className="text-[#2E2E2E]">
              Dietary Accommodations
            </Label>
            <Textarea
              id="dietaryAccommodations"
              name="dietaryAccommodations"
              value={formData.dietaryAccommodations || ''}
              onChange={(e) => handleChange('dietaryAccommodations', e.target.value)}
              placeholder="Describe dietary accommodations (e.g., Gluten-free, Vegan, Diabetic-friendly, Nut allergies, etc.)"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="setupService" className="text-[#2E2E2E]">
                Setup & Service Included?
              </Label>
              <select
                id="setupService"
                name="setupService"
                value={formData.setupService || ''}
                onChange={(e) => handleChange('setupService', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
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
              <Label htmlFor="servingStaff" className="text-[#2E2E2E]">
                Serving Staff Provided?
              </Label>
              <select
                id="servingStaff"
                name="servingStaff"
                value={formData.servingStaff || ''}
                onChange={(e) => handleChange('servingStaff', e.target.value)}
                className="mt-2 flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
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
            <Label htmlFor="equipmentRental" className="text-[#2E2E2E]">
              Equipment Rental Available?
            </Label>
            <Textarea
              id="equipmentRental"
              name="equipmentRental"
              value={formData.equipmentRental || ''}
              onChange={(e) => handleChange('equipmentRental', e.target.value)}
              placeholder="Describe equipment rental options (e.g., Tables, Chairs, Linens, Crockery, Cutlery, Serving dishes, etc.)"
              rows={3}
              className="mt-2 border-gray-300 focus:border-[#D13F43] focus:ring-[#D13F43]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

