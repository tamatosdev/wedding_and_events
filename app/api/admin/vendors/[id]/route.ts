import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const vendor = await prisma.vendor.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(vendor)
  } catch (error) {
    console.error('Error fetching vendor:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Build update data object - include all partner onboarding fields
    const updateData: any = {}
    
    // Basic fields
    if (body.name !== undefined) updateData.name = body.name
    if (body.category !== undefined) updateData.category = body.category
    if (body.city !== undefined) updateData.city = body.city
    if (body.pricing !== undefined) updateData.pricing = body.pricing
    if (body.description !== undefined) updateData.description = body.description
    if (body.images !== undefined) {
      if (!Array.isArray(body.images)) {
        return NextResponse.json(
          { error: 'Images must be an array' },
          { status: 400 }
        )
      }
      updateData.images = body.images
    }
    if (body.capacity !== undefined) updateData.capacity = body.capacity
    if (body.type !== undefined) updateData.type = body.type
    if (body.rating !== undefined) updateData.rating = body.rating
    if (body.reviews !== undefined) updateData.reviews = body.reviews
    if (body.approved !== undefined) updateData.approved = body.approved
    
    // Owner Details
    if (body.ownerName !== undefined) updateData.ownerName = body.ownerName || null
    if (body.ownerMobile1 !== undefined) updateData.ownerMobile1 = body.ownerMobile1 || null
    if (body.ownerMobile2 !== undefined) updateData.ownerMobile2 = body.ownerMobile2 || null
    if (body.ownerLandline !== undefined) updateData.ownerLandline = body.ownerLandline || null
    if (body.ownerEmail !== undefined) updateData.ownerEmail = body.ownerEmail || null
    
    // Manager Details
    if (body.managerName !== undefined) updateData.managerName = body.managerName || null
    if (body.managerMobile1 !== undefined) updateData.managerMobile1 = body.managerMobile1 || null
    if (body.managerMobile2 !== undefined) updateData.managerMobile2 = body.managerMobile2 || null
    if (body.managerLandline !== undefined) updateData.managerLandline = body.managerLandline || null
    if (body.managerEmail !== undefined) updateData.managerEmail = body.managerEmail || null
    
    // Business Details
    if (body.area !== undefined) updateData.area = body.area || null
    if (body.completeAddress !== undefined) updateData.completeAddress = body.completeAddress || null
    if (body.website !== undefined) updateData.website = body.website || null
    if (body.businessEmail !== undefined) updateData.businessEmail = body.businessEmail || null
    
    // Bank Details
    if (body.bankName !== undefined) updateData.bankName = body.bankName || null
    if (body.branchCity !== undefined) updateData.branchCity = body.branchCity || null
    if (body.accountNumber !== undefined) updateData.accountNumber = body.accountNumber || null
    if (body.ibanNumber !== undefined) updateData.ibanNumber = body.ibanNumber || null
    
    // Common Fields
    if (body.businessDuration !== undefined) updateData.businessDuration = body.businessDuration || null
    if (body.numberOfBranches !== undefined) updateData.numberOfBranches = body.numberOfBranches || null
    if (body.cancellationPolicy !== undefined) updateData.cancellationPolicy = body.cancellationPolicy || null
    if (body.fireInsurance !== undefined) updateData.fireInsurance = body.fireInsurance || null
    if (body.weArrangeInsurance !== undefined) updateData.weArrangeInsurance = body.weArrangeInsurance || null
    if (body.wheelchairAccessible !== undefined) updateData.wheelchairAccessible = body.wheelchairAccessible || null
    if (body.fileUrls !== undefined) updateData.fileUrls = body.fileUrls || []
    
    // Venue specific
    if (body.venueType !== undefined) updateData.venueType = body.venueType || null
    if (body.guestCapacity !== undefined) updateData.guestCapacity = body.guestCapacity || null
    if (body.venuePricingRange !== undefined) updateData.venuePricingRange = body.venuePricingRange || null
    if (body.cateringAvailable !== undefined) updateData.cateringAvailable = body.cateringAvailable || null
    if (body.outsideCateringAllowed !== undefined) updateData.outsideCateringAllowed = body.outsideCateringAllowed || null
    if (body.parkingCapacity !== undefined) updateData.parkingCapacity = body.parkingCapacity || null
    if (body.parkingType !== undefined) updateData.parkingType = body.parkingType || null
    if (body.amenities !== undefined) updateData.amenities = body.amenities || null
    if (body.bridalSuite !== undefined) updateData.bridalSuite = body.bridalSuite || null
    if (body.namazAreaMen !== undefined) updateData.namazAreaMen = body.namazAreaMen || null
    if (body.namazAreaLadies !== undefined) updateData.namazAreaLadies = body.namazAreaLadies || null
    
    // Boutique specific
    if (body.dressType !== undefined) updateData.dressType = body.dressType || null
    if (body.designOrResell !== undefined) updateData.designOrResell = body.designOrResell || null
    if (body.fabrics !== undefined) updateData.fabrics = body.fabrics || null
    if (body.priceRange !== undefined) updateData.priceRange = body.priceRange || null
    if (body.customization !== undefined) updateData.customization = body.customization || null
    if (body.rentalPolicy !== undefined) updateData.rentalPolicy = body.rentalPolicy || null
    if (body.delivery !== undefined) updateData.delivery = body.delivery || null
    
    // Salon specific
    if (body.servicesList !== undefined) updateData.servicesList = body.servicesList || null
    if (body.packages !== undefined) updateData.packages = body.packages || null
    if (body.operatingHours !== undefined) updateData.operatingHours = body.operatingHours || null
    if (body.brandsUsed !== undefined) updateData.brandsUsed = body.brandsUsed || null
    if (body.staffExpertise !== undefined) updateData.staffExpertise = body.staffExpertise || null
    if (body.bridalTrials !== undefined) updateData.bridalTrials = body.bridalTrials || null
    if (body.salonPricing !== undefined) updateData.salonPricing = body.salonPricing || null
    if (body.promotions !== undefined) updateData.promotions = body.promotions || null
    if (body.hygiene !== undefined) updateData.hygiene = body.hygiene || null
    
    // Décor specific
    if (body.decorType !== undefined) updateData.decorType = body.decorType || null
    if (body.decorStyle !== undefined) updateData.decorStyle = body.decorStyle || null
    if (body.eventTypes !== undefined) updateData.eventTypes = body.eventTypes || null
    if (body.decorPricingRange !== undefined) updateData.decorPricingRange = body.decorPricingRange || null
    if (body.setupTime !== undefined) updateData.setupTime = body.setupTime || null
    if (body.equipmentProvided !== undefined) updateData.equipmentProvided = body.equipmentProvided || null
    if (body.customDesign !== undefined) updateData.customDesign = body.customDesign || null
    if (body.themesAvailable !== undefined) updateData.themesAvailable = body.themesAvailable || null
    if (body.floralsIncluded !== undefined) updateData.floralsIncluded = body.floralsIncluded || null
    if (body.lightingServices !== undefined) updateData.lightingServices = body.lightingServices || null
    
    // Catering specific
    if (body.cuisineType !== undefined) updateData.cuisineType = body.cuisineType || null
    if (body.menuStyle !== undefined) updateData.menuStyle = body.menuStyle || null
    if (body.servingStyle !== undefined) updateData.servingStyle = body.servingStyle || null
    if (body.minimumGuests !== undefined) updateData.minimumGuests = body.minimumGuests || null
    if (body.maximumGuests !== undefined) updateData.maximumGuests = body.maximumGuests || null
    if (body.cateringPricingRange !== undefined) updateData.cateringPricingRange = body.cateringPricingRange || null
    if (body.halalCertified !== undefined) updateData.halalCertified = body.halalCertified || null
    if (body.vegetarianOptions !== undefined) updateData.vegetarianOptions = body.vegetarianOptions || null
    if (body.dietaryAccommodations !== undefined) updateData.dietaryAccommodations = body.dietaryAccommodations || null
    if (body.setupService !== undefined) updateData.setupService = body.setupService || null
    if (body.servingStaff !== undefined) updateData.servingStaff = body.servingStaff || null
    if (body.equipmentRental !== undefined) updateData.equipmentRental = body.equipmentRental || null

    // Check for duplicate if name or city is being changed
    if (body.name || body.city) {
      const currentVendor = await prisma.vendor.findUnique({
        where: { id: params.id },
      })
      
      const checkName = body.name || currentVendor?.name
      const checkCity = body.city || currentVendor?.city

      if (checkName && checkCity) {
        const existing = await prisma.vendor.findUnique({
          where: {
            name_city: {
              name: checkName,
              city: checkCity,
            },
          },
        })

        if (existing && existing.id !== params.id) {
          return NextResponse.json(
            { error: 'A vendor with this name already exists in this city' },
            { status: 400 }
          )
        }
      }
    }

    const vendor = await prisma.vendor.update({
      where: {
        id: params.id,
      },
      data: updateData,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(vendor)
  } catch (error: any) {
    console.error('Error updating vendor:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A vendor with this name already exists in this city' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to update vendor',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.vendor.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting vendor:', error)
    return NextResponse.json(
      { error: 'Failed to delete vendor' },
      { status: 500 }
    )
  }
}
