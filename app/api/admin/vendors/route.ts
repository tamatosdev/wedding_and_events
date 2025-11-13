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
        approved: approved !== undefined ? approved : true, // Default to approved for admin-created vendors
        userId: vendorUserId,
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