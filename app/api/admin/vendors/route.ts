import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const vendors = await prisma.vendor.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(vendors)
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      name,
      category,
      city,
      pricing,
      description,
      images,
      capacity,
      type,
      rating,
      reviews,
      approved,
      userId,
      // Owner Details
      ownerName,
      ownerMobile1,
      ownerMobile2,
      ownerLandline,
      ownerEmail,
      // Manager Details
      managerName,
      managerMobile1,
      managerMobile2,
      managerLandline,
      managerEmail,
      // Business Details
      area,
      completeAddress,
      website,
      businessEmail,
      // Bank Details
      bankName,
      branchCity,
      accountNumber,
      ibanNumber,
      // Common Fields
      businessDuration,
      numberOfBranches,
      cancellationPolicy,
      fireInsurance,
      weArrangeInsurance,
      wheelchairAccessible,
      fileUrls,
      // Venue specific
      venueType,
      guestCapacity,
      venuePricingRange,
      cateringAvailable,
      outsideCateringAllowed,
      parkingCapacity,
      parkingType,
      amenities,
      bridalSuite,
      namazAreaMen,
      namazAreaLadies,
      // Boutique specific
      dressType,
      designOrResell,
      fabrics,
      priceRange,
      customization,
      rentalPolicy,
      delivery,
      // Salon specific
      servicesList,
      packages,
      operatingHours,
      brandsUsed,
      staffExpertise,
      bridalTrials,
      salonPricing,
      promotions,
      hygiene,
      // Décor specific
      decorType,
      decorStyle,
      eventTypes,
      decorPricingRange,
      setupTime,
      equipmentProvided,
      customDesign,
      themesAvailable,
      floralsIncluded,
      lightingServices,
      // Catering specific
      cuisineType,
      menuStyle,
      servingStyle,
      minimumGuests,
      maximumGuests,
      cateringPricingRange,
      halalCertified,
      vegetarianOptions,
      dietaryAccommodations,
      setupService,
      servingStaff,
      equipmentRental,
    } = body

    // Validate required fields
    if (!name || !category || !city || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, city, description' },
        { status: 400 }
      )
    }

    // If userId not provided, use admin's user ID or create a system user
    let vendorUserId = userId
    if (!vendorUserId) {
      // Find or create a system admin user for vendor management
      const adminUser = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
      })
      if (!adminUser) {
        return NextResponse.json(
          { error: 'No admin user found. Please provide userId.' },
          { status: 400 }
        )
      }
      vendorUserId = adminUser.id
    }

    // Check for duplicate (name + city must be unique)
    const existing = await prisma.vendor.findUnique({
      where: {
        name_city: {
          name,
          city,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A vendor with this name already exists in this city' },
        { status: 400 }
      )
    }

    // Create vendor
    const vendor = await prisma.vendor.create({
      data: {
        name,
        category,
        city,
        pricing: pricing || 'Contact for pricing',
        description,
        images: images || [],
        capacity: capacity || null,
        type: type || null,
        rating: rating || 0,
        reviews: reviews || 0,
        approved: approved !== undefined ? approved : true,
        userId: vendorUserId,
        // Owner Details
        ownerName: ownerName || null,
        ownerMobile1: ownerMobile1 || null,
        ownerMobile2: ownerMobile2 || null,
        ownerLandline: ownerLandline || null,
        ownerEmail: ownerEmail || null,
        // Manager Details
        managerName: managerName || null,
        managerMobile1: managerMobile1 || null,
        managerMobile2: managerMobile2 || null,
        managerLandline: managerLandline || null,
        managerEmail: managerEmail || null,
        // Business Details
        area: area || null,
        completeAddress: completeAddress || null,
        website: website || null,
        businessEmail: businessEmail || null,
        // Bank Details
        bankName: bankName || null,
        branchCity: branchCity || null,
        accountNumber: accountNumber || null,
        ibanNumber: ibanNumber || null,
        // Common Fields
        businessDuration: businessDuration || null,
        numberOfBranches: numberOfBranches || null,
        cancellationPolicy: cancellationPolicy || null,
        fireInsurance: fireInsurance || null,
        weArrangeInsurance: weArrangeInsurance || null,
        wheelchairAccessible: wheelchairAccessible || null,
        fileUrls: fileUrls || [],
        // Venue specific
        venueType: venueType || null,
        guestCapacity: guestCapacity || null,
        venuePricingRange: venuePricingRange || null,
        cateringAvailable: cateringAvailable || null,
        outsideCateringAllowed: outsideCateringAllowed || null,
        parkingCapacity: parkingCapacity || null,
        parkingType: parkingType || null,
        amenities: amenities || null,
        bridalSuite: bridalSuite || null,
        namazAreaMen: namazAreaMen || null,
        namazAreaLadies: namazAreaLadies || null,
        // Boutique specific
        dressType: dressType || null,
        designOrResell: designOrResell || null,
        fabrics: fabrics || null,
        priceRange: priceRange || null,
        customization: customization || null,
        rentalPolicy: rentalPolicy || null,
        delivery: delivery || null,
        // Salon specific
        servicesList: servicesList || null,
        packages: packages || null,
        operatingHours: operatingHours || null,
        brandsUsed: brandsUsed || null,
        staffExpertise: staffExpertise || null,
        bridalTrials: bridalTrials || null,
        salonPricing: salonPricing || null,
        promotions: promotions || null,
        hygiene: hygiene || null,
        // Décor specific
        decorType: decorType || null,
        decorStyle: decorStyle || null,
        eventTypes: eventTypes || null,
        decorPricingRange: decorPricingRange || null,
        setupTime: setupTime || null,
        equipmentProvided: equipmentProvided || null,
        customDesign: customDesign || null,
        themesAvailable: themesAvailable || null,
        floralsIncluded: floralsIncluded || null,
        lightingServices: lightingServices || null,
        // Catering specific
        cuisineType: cuisineType || null,
        menuStyle: menuStyle || null,
        servingStyle: servingStyle || null,
        minimumGuests: minimumGuests || null,
        maximumGuests: maximumGuests || null,
        cateringPricingRange: cateringPricingRange || null,
        halalCertified: halalCertified || null,
        vegetarianOptions: vegetarianOptions || null,
        dietaryAccommodations: dietaryAccommodations || null,
        setupService: setupService || null,
        servingStaff: servingStaff || null,
        equipmentRental: equipmentRental || null,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(vendor, { status: 201 })
  } catch (error: any) {
    console.error('Error creating vendor:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A vendor with this name already exists in this city' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to create vendor',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}