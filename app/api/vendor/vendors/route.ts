import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'VENDOR') {
      console.log('GET /api/vendor/vendors - Unauthorized:', {
        hasSession: !!session,
        role: session?.user?.role
      })
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const vendors = await prisma.vendor.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(vendors)
  } catch (error) {
    console.error('Error fetching vendor listings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendor listings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'VENDOR') {
      console.log('POST /api/vendor/vendors - Unauthorized:', {
        hasSession: !!session,
        role: session?.user?.role,
        cookies: request.headers.get('cookie')?.substring(0, 50) || 'none'
      })
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!session.user.email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      )
    }

    // Get the user from database to ensure we have the correct ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const { name, category, city, pricing, description, images = [], capacity, type } = await request.json()

    if (!name || !category || !city || !pricing || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create vendor with approved=false (pending admin approval)
    const vendor = await prisma.vendor.create({
      data: {
        name,
        category,
        city,
        pricing,
        description,
        images,
        capacity: capacity || null,
        type: type || null,
        userId: user.id,
        approved: false, // Explicitly set to false for admin approval
      },
    })

    return NextResponse.json(vendor, { status: 201 })
  } catch (error) {
    console.error('Error creating vendor listing:', error)
    return NextResponse.json(
      { error: 'Failed to create vendor listing' },
      { status: 500 }
    )
  }
}
