import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Received partner onboarding submission:', {
      businessType: body.businessType,
      hasOwnerName: !!body.ownerName,
      hasOwnerMobile1: !!body.ownerMobile1,
      hasOwnerEmail: !!body.ownerEmail,
      allKeys: Object.keys(body),
    })

    // Validate required fields
    if (!body.businessType || !body.ownerName || !body.ownerMobile1 || !body.ownerEmail) {
      console.error('Missing required fields:', {
        businessType: body.businessType,
        ownerName: body.ownerName,
        ownerMobile1: body.ownerMobile1,
        ownerEmail: body.ownerEmail,
      })
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          details: {
            businessType: !body.businessType,
            ownerName: !body.ownerName,
            ownerMobile1: !body.ownerMobile1,
            ownerEmail: !body.ownerEmail,
          }
        },
        { status: 400 }
      )
    }

    // Map business type to enum
    const businessTypeMap: Record<string, 'WEDDING' | 'BOUTIQUES' | 'BEAUTY_PARLOR' | 'DECOR' | 'CATERING'> = {
      wedding: 'WEDDING',
      boutiques: 'BOUTIQUES',
      'beauty-parlour': 'BEAUTY_PARLOUR',
      decor: 'DECOR',
      catering: 'CATERING',
    }

    const businessType = businessTypeMap[body.businessType]
    if (!businessType) {
      return NextResponse.json(
        { error: 'Invalid business type' },
        { status: 400 }
      )
    }

    // Create submission
    const submission = await prisma.partnerOnboardingSubmission.create({
      data: {
        businessType,
        
        // Owner Details
        ownerName: body.ownerName,
        ownerMobile1: body.ownerMobile1,
        ownerMobile2: body.ownerMobile2 || null,
        ownerLandline: body.ownerLandline || null,
        ownerEmail: body.ownerEmail,

        // Manager Details
        managerName: body.managerName,
        managerMobile1: body.managerMobile1,
        managerMobile2: body.managerMobile2 || null,
        managerLandline: body.managerLandline || null,
        managerEmail: body.managerEmail,

        // Business Details
        businessName: body.businessName,
        city: body.city || 'Karachi', // Default to Karachi
        area: body.area,
        completeAddress: body.completeAddress,
        website: body.website || null,
        businessEmail: body.businessEmail || null,

        // Bank Details
        bankName: body.bankName || null,
        branchCity: body.branchCity || null,
        accountNumber: body.accountNumber || null,
        ibanNumber: body.ibanNumber || null,

        // Common Fields
        businessDuration: body.businessDuration || null,
        numberOfBranches: body.numberOfBranches || null,
        cancellationPolicy: body.cancellationPolicy,
        fireInsurance: body.fireInsurance || null,
        weArrangeInsurance: body.weArrangeInsurance || null,
        wheelchairAccessible: body.wheelchairAccessible || null,
        fileUrls: body.fileUrls || [],

        // Venue specific
        venueType: body.venueType || null,
        guestCapacity: body.guestCapacity || null,
        venuePricingRange: body.venuePricingRange || null,
        cateringAvailable: body.cateringAvailable || null,
        outsideCateringAllowed: body.outsideCateringAllowed || null,
        parkingCapacity: body.parkingCapacity || null,
        parkingType: body.parkingType || null,
        amenities: body.amenities || null,
        bridalSuite: body.bridalSuite || null,
        namazAreaMen: body.namazAreaMen || null,
        namazAreaLadies: body.namazAreaLadies || null,

        // Boutique specific
        dressType: body.dressType || null,
        designOrResell: body.designOrResell || null,
        fabrics: body.fabrics || null,
        priceRange: body.priceRange || null,
        customization: body.customization || null,
        rentalPolicy: body.rentalPolicy || null,
        delivery: body.delivery || null,

        // Salon specific
        servicesList: body.servicesList || null,
        packages: body.packages || null,
        operatingHours: body.operatingHours || null,
        brandsUsed: body.brandsUsed || null,
        staffExpertise: body.staffExpertise || null,
        bridalTrials: body.bridalTrials || null,
        salonPricing: body.salonPricing || null,
        promotions: body.promotions || null,
        hygiene: body.hygiene || null,

        // Décor specific fields
        decorType: body.decorType || null,
        decorStyle: body.decorStyle || null,
        eventTypes: body.eventTypes || null,
        decorPricingRange: body.decorPricingRange || null,
        setupTime: body.setupTime || null,
        equipmentProvided: body.equipmentProvided || null,
        customDesign: body.customDesign || null,
        themesAvailable: body.themesAvailable || null,
        floralsIncluded: body.floralsIncluded || null,
        lightingServices: body.lightingServices || null,

        // Catering specific fields
        cuisineType: body.cuisineType || null,
        menuStyle: body.menuStyle || null,
        servingStyle: body.servingStyle || null,
        minimumGuests: body.minimumGuests || null,
        maximumGuests: body.maximumGuests || null,
        cateringPricingRange: body.cateringPricingRange || null,
        halalCertified: body.halalCertified || null,
        vegetarianOptions: body.vegetarianOptions || null,
        dietaryAccommodations: body.dietaryAccommodations || null,
        setupService: body.setupService || null,
        servingStaff: body.servingStaff || null,
        equipmentRental: body.equipmentRental || null,

        // Status
        status: 'PENDING',
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        id: submission.id,
        message: 'Submission received successfully' 
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating partner onboarding submission:', error)
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
    })
    return NextResponse.json(
      { 
        error: 'Failed to submit application',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const businessType = searchParams.get('businessType')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: any = {}
    if (status && status !== 'all') {
      where.status = status
    }
    if (businessType && businessType !== 'all') {
      const typeMap: Record<string, 'WEDDING' | 'BOUTIQUES' | 'BEAUTY_PARLOR' | 'DECOR' | 'CATERING'> = {
        wedding: 'WEDDING',
        boutiques: 'BOUTIQUES',
        'beauty-parlour': 'BEAUTY_PARLOUR',
        decor: 'DECOR',
        catering: 'CATERING',
      }
      where.businessType = typeMap[businessType]
    }

    const [submissions, total] = await Promise.all([
      prisma.partnerOnboardingSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.partnerOnboardingSubmission.count({ where }),
    ])

    return NextResponse.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching partner onboarding submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

