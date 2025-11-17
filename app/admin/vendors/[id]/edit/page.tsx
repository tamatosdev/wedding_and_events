'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Header from '@/components/Header'
import { canAccessAdmin } from '@/lib/auth-helpers-client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VendorFormTabs } from '../../vendor-form-tabs'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Vendor {
  id: string
  name: string
  category: string
  city: string
  pricing: string
  description: string
  images: string[]
  capacity?: string | null
  type?: string | null
  rating?: number | null
  reviews?: number | null
  approved: boolean
  // All other fields from vendor-form-tabs
  [key: string]: any
}

export default function EditVendorPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const vendorId = params.id as string
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    if (session && canAccessAdmin(session) && vendorId) {
      fetchVendor()
    }
  }, [session, vendorId])

  const fetchVendor = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/vendors/${vendorId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch vendor')
      }
      const vendor: Vendor = await response.json()
      
      setFormData({
        name: vendor.name || '',
        category: vendor.category || '',
        city: vendor.city || '',
        pricing: vendor.pricing || '',
        description: vendor.description || '',
        images: vendor.images || [],
        capacity: vendor.capacity || '',
        type: vendor.type || '',
        rating: vendor.rating || 0,
        reviews: vendor.reviews || 0,
        approved: vendor.approved ?? true,
        ownerName: vendor.ownerName || '',
        ownerMobile1: vendor.ownerMobile1 || '',
        ownerMobile2: vendor.ownerMobile2 || '',
        ownerLandline: vendor.ownerLandline || '',
        ownerEmail: vendor.ownerEmail || '',
        managerName: vendor.managerName || '',
        managerMobile1: vendor.managerMobile1 || '',
        managerMobile2: vendor.managerMobile2 || '',
        managerLandline: vendor.managerLandline || '',
        managerEmail: vendor.managerEmail || '',
        area: vendor.area || '',
        completeAddress: vendor.completeAddress || '',
        website: vendor.website || '',
        businessEmail: vendor.businessEmail || '',
        bankName: vendor.bankName || '',
        branchCity: vendor.branchCity || '',
        accountNumber: vendor.accountNumber || '',
        ibanNumber: vendor.ibanNumber || '',
        businessDuration: vendor.businessDuration || '',
        numberOfBranches: vendor.numberOfBranches || '',
        cancellationPolicy: vendor.cancellationPolicy || '',
        fireInsurance: vendor.fireInsurance || '',
        weArrangeInsurance: vendor.weArrangeInsurance || '',
        wheelchairAccessible: vendor.wheelchairAccessible || '',
        fileUrls: vendor.fileUrls || [],
        venueType: vendor.venueType || '',
        guestCapacity: vendor.guestCapacity || '',
        venuePricingRange: vendor.venuePricingRange || '',
        cateringAvailable: vendor.cateringAvailable || '',
        outsideCateringAllowed: vendor.outsideCateringAllowed || '',
        parkingCapacity: vendor.parkingCapacity || '',
        parkingType: vendor.parkingType || '',
        amenities: vendor.amenities || '',
        bridalSuite: vendor.bridalSuite || '',
        namazAreaMen: vendor.namazAreaMen || '',
        namazAreaLadies: vendor.namazAreaLadies || '',
        dressType: vendor.dressType || '',
        designOrResell: vendor.designOrResell || '',
        fabrics: vendor.fabrics || '',
        priceRange: vendor.priceRange || '',
        customization: vendor.customization || '',
        rentalPolicy: vendor.rentalPolicy || '',
        delivery: vendor.delivery || '',
        servicesList: vendor.servicesList || '',
        packages: vendor.packages || '',
        operatingHours: vendor.operatingHours || '',
        brandsUsed: vendor.brandsUsed || '',
        staffExpertise: vendor.staffExpertise || '',
        bridalTrials: vendor.bridalTrials || '',
        salonPricing: vendor.salonPricing || '',
        promotions: vendor.promotions || '',
        hygiene: vendor.hygiene || '',
        decorType: vendor.decorType || '',
        decorStyle: vendor.decorStyle || '',
        eventTypes: vendor.eventTypes || '',
        decorPricingRange: vendor.decorPricingRange || '',
        setupTime: vendor.setupTime || '',
        equipmentProvided: vendor.equipmentProvided || '',
        customDesign: vendor.customDesign || '',
        themesAvailable: vendor.themesAvailable || '',
        floralsIncluded: vendor.floralsIncluded || '',
        lightingServices: vendor.lightingServices || '',
        cuisineType: vendor.cuisineType || '',
        menuStyle: vendor.menuStyle || '',
        servingStyle: vendor.servingStyle || '',
        minimumGuests: vendor.minimumGuests || '',
        maximumGuests: vendor.maximumGuests || '',
        cateringPricingRange: vendor.cateringPricingRange || '',
        halalCertified: vendor.halalCertified || '',
        vegetarianOptions: vendor.vegetarianOptions || '',
        dietaryAccommodations: vendor.dietaryAccommodations || '',
        setupService: vendor.setupService || '',
        servingStaff: vendor.servingStaff || '',
        equipmentRental: vendor.equipmentRental || '',
      })
    } catch (err) {
      console.error('Error fetching vendor:', err)
      setError('Failed to load vendor data')
    } finally {
      setLoading(false)
    }
  }

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

      const response = await fetch(`/api/admin/vendors/${vendorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to update vendor')
      }

      router.push('/admin/vendors')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update vendor')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Vendor</h1>
          <p className="text-gray-600 mt-2">Update vendor information and details</p>
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
                  {saving ? 'Updating...' : 'Update Vendor'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

