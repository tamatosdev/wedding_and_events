import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.ownerName || !body.ownerMobile1 || !body.ownerEmail || !body.businessName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create submission
    const submission = await prisma.venueOnboardingSubmission.create({
      data: {
        // Step 1: Owner Details
        ownerName: body.ownerName,
        ownerMobile1: body.ownerMobile1,
        ownerMobile2: body.ownerMobile2 || null,
        ownerLandline: body.ownerLandline || null,
        ownerEmail: body.ownerEmail,
        businessName: body.businessName,

        // Step 2: Manager/POC Details
        managerName: body.managerName,
        managerMobile1: body.managerMobile1,
        managerMobile2: body.managerMobile2 || null,
        managerLandline: body.managerLandline || null,
        managerEmail: body.managerEmail,

        // Step 3: Business Details
        businessName2: body.businessName2,
        city: body.city,
        area: body.area,
        completeAddress: body.completeAddress,
        website: body.website || null,
        businessEmail: body.businessEmail || null,

        // Step 4: Bank Details
        bankName: body.bankName || null,
        branchCity: body.branchCity || null,
        accountNumber: body.accountNumber || null,
        ibanNumber: body.ibanNumber || null,

        // Step 5: Venue Information
        venueType: body.venueType || null,
        singleMultipleSites: body.singleMultipleSites || null,
        guestCapacity: body.guestCapacity || null,
        venuePricingRange: body.venuePricingRange,
        cateringAvailable: body.cateringAvailable || null,
        outsideCateringAllowed: body.outsideCateringAllowed || null,

        // Step 6: Facilities & Accessibility
        parkingCapacity: body.parkingCapacity || null,
        parkingType: body.parkingType || null,
        wheelchairAccessible: body.wheelchairAccessible || null,
        wheelchairAvailable: body.wheelchairAvailable || null,
        namazAreaMen: body.namazAreaMen || null,
        namazAreaLadies: body.namazAreaLadies || null,
        bridalSuite: body.bridalSuite || null,

        // Step 7: Amenities
        amenities: body.amenities || null,
        airConditioning: body.airConditioning || null,
        heating: body.heating || null,
        elevators: body.elevators || null,
        securityStaff: body.securityStaff || null,
        backupGenerator: body.backupGenerator || null,
        dedicatedStaff: body.dedicatedStaff || null,

        // Step 8: Policies
        cancellationPolicy: body.cancellationPolicy,
        fireInsurance: body.fireInsurance || null,
        weArrangeInsurance: body.weArrangeInsurance || null,
        prohibitedItems: body.prohibitedItems || null,

        // Step 9: Upload & Summary
        fileUrls: body.fileUrls || [],
        companyOverview: body.companyOverview || null,
        undertakingName: body.undertakingName || null,
        undertakingDesignation: body.undertakingDesignation || null,
        undertakingCNIC: body.undertakingCNIC || null,
        undertakingCompany: body.undertakingCompany || null,
        undertakingMobile: body.undertakingMobile || null,
        undertakingEmail: body.undertakingEmail || null,
        undertakingSignature: body.undertakingSignature || null,
        undertakingDate: body.undertakingDate || null,

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
  } catch (error) {
    console.error('Error creating venue onboarding submission:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: any = {}
    if (status && status !== 'all') {
      where.status = status
    }

    const [submissions, total] = await Promise.all([
      prisma.venueOnboardingSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.venueOnboardingSubmission.count({ where }),
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
    console.error('Error fetching venue onboarding submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

