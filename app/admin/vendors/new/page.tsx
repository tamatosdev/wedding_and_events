'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { canAccessAdmin } from '@/lib/auth-helpers-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VendorFormTabs } from '../vendor-form-tabs'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const CATEGORIES = [
  'Venue',
  'Boutiques',
  'Beauty Parlor',
  'Décor',
  'Catering',
  'Photography',
  'Makeup Artist',
  'DJ',
  'Florist',
  'Cake',
  'Other',
]

const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Sialkot',
]

export default function NewVendorPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    city: '',
    pricing: '',
    description: '',
    images: [] as string[],
    capacity: '',
    type: '',
    rating: 0,
    reviews: 0,
    approved: true,
    // Owner Details
    ownerName: '',
    ownerMobile1: '',
    ownerMobile2: '',
    ownerLandline: '',
    ownerEmail: '',
    // Manager Details
    managerName: '',
    managerMobile1: '',
    managerMobile2: '',
    managerLandline: '',
    managerEmail: '',
    // Business Details
    area: '',
    completeAddress: '',
    website: '',
    businessEmail: '',
    // Bank Details
    bankName: '',
    branchCity: '',
    accountNumber: '',
    ibanNumber: '',
    // Common Fields
    businessDuration: '',
    numberOfBranches: '',
    cancellationPolicy: '',
    fireInsurance: '',
    weArrangeInsurance: '',
    wheelchairAccessible: '',
    fileUrls: [] as string[],
    // Venue specific
    venueType: '',
    guestCapacity: '',
    venuePricingRange: '',
    cateringAvailable: '',
    outsideCateringAllowed: '',
    parkingCapacity: '',
    parkingType: '',
    amenities: '',
    bridalSuite: '',
    namazAreaMen: '',
    namazAreaLadies: '',
    // Boutique specific
    dressType: '',
    designOrResell: '',
    fabrics: '',
    priceRange: '',
    customization: '',
    rentalPolicy: '',
    delivery: '',
    // Salon specific
    servicesList: '',
    packages: '',
    operatingHours: '',
    brandsUsed: '',
    staffExpertise: '',
    bridalTrials: '',
    salonPricing: '',
    promotions: '',
    hygiene: '',
    // Décor specific
    decorType: '',
    decorStyle: '',
    eventTypes: '',
    decorPricingRange: '',
    setupTime: '',
    equipmentProvided: '',
    customDesign: '',
    themesAvailable: '',
    floralsIncluded: '',
    lightingServices: '',
    // Catering specific
    cuisineType: '',
    menuStyle: '',
    servingStyle: '',
    minimumGuests: '',
    maximumGuests: '',
    cateringPricingRange: '',
    halalCertified: '',
    vegetarianOptions: '',
    dietaryAccommodations: '',
    setupService: '',
    servingStaff: '',
    equipmentRental: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session && !canAccessAdmin(session)) {
      router.push('/')
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (!formData.name || !formData.category || !formData.city || !formData.description) {
        setError('Please fill in all required fields: Name, Category, City, Description')
        setSaving(false)
        return
      }

      const response = await fetch('/api/admin/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to create vendor')
      }

      router.push('/admin/vendors')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create vendor')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || !canAccessAdmin(session)) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/admin/vendors"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vendors
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add New Vendor</h1>
          <p className="text-gray-600 mt-2">Create a new vendor listing with all details</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                  {error}
                </div>
              )}

              <VendorFormTabs formData={formData} setFormData={setFormData} />

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Link href="/admin/vendors">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={saving} className="bg-[#d13f43] hover:bg-[#b82f33]">
                  {saving ? 'Creating...' : 'Create Vendor'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

