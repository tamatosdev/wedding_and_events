import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const specialties = [
  'Wedding',
  'Valima',
  'Mehdi & Dholki',
  'Qawali',
  'Birthday party',
  'Anniversary',
  'Corporate Events',
  'Other'
]

export default function DecorExperienceServices() {
  const { formData, updateFormData } = usePartnerForm()
  const handleChange = (field: string, value: any) => {
    updateFormData({ [field]: value } as any)
  }
  const handleCheckbox = (specialty: string) => {
    const arr = formData.specialties || []
    if (arr.includes(specialty)) {
      updateFormData({ specialties: arr.filter((s: string) => s !== specialty) })
    } else {
      updateFormData({ specialties: [...arr, specialty] })
    }
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Experience & Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Years of Experience</Label>
          <Input value={formData.experienceYears || ''} onChange={e => handleChange('experienceYears', e.target.value)} placeholder="Years of experience" />
          <Label>Specialties / Types of Decor *</Label>
          <div className="flex flex-wrap gap-3">
            {specialties.map(s => (
              <label key={s} className="flex items-center gap-1">
                <input type="checkbox" checked={formData.specialties?.includes(s)} onChange={() => handleCheckbox(s)} />
                {s}
              </label>
            ))}
          </div>
          <Label>Do you have safety equipment?</Label>
          <div className="flex flex-wrap gap-3">
            <label><input type="checkbox" checked={!!formData.fireExtinguisher} onChange={e => handleChange('fireExtinguisher', e.target.checked)} /> Fire extinguisher</label>
            <label><input type="checkbox" checked={!!formData.firstAid} onChange={e => handleChange('firstAid', e.target.checked)} /> First Aid</label>
            <label><input type="checkbox" checked={!!formData.waterHose} onChange={e => handleChange('waterHose', e.target.checked)} /> Water hose/pipe</label>
          </div>
          <Label>Do you have backup electrical generator?</Label>
          <input type="checkbox" checked={!!formData.generator} onChange={e => handleChange('generator', e.target.checked)} />
          <Label>Do you provide Security Services?</Label>
          <select value={formData.securityServices || ''} onChange={e => handleChange('securityServices', e.target.value)}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {formData.securityServices === 'Yes' && (
            <Input value={formData.securityDetails || ''} onChange={e => handleChange('securityDetails', e.target.value)} placeholder="Please elaborate" />
          )}
          <Label>Do you provide Groom Car decoration?</Label>
          <select value={formData.groomCarDecoration || ''} onChange={e => handleChange('groomCarDecoration', e.target.value)}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </CardContent>
      </Card>
    </div>
  )
}
