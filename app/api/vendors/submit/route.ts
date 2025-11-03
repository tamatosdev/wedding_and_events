import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      // Account info
      name,
      email,
      password,
      // Vendor info
      businessName,
      category,
      city,
      pricing,
      description,
      images = [],
      capacity,
      type,
    } = body

    // Validate required fields
    if (!name || !email || !password || !businessName || !category || !city || !pricing || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    let user
    if (existingUser) {
      user = existingUser
    } else {
      // Create new user account
      const hashedPassword = await bcrypt.hash(password, 12)
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'VENDOR',
        },
      })
    }

    // Create vendor listing
    const vendor = await prisma.vendor.create({
      data: {
        name: businessName,
        category,
        city,
        pricing,
        description,
        images,
        capacity: capacity || null,
        type: type || null,
        userId: user.id,
        approved: false, // Pending admin approval
      },
    })

    return NextResponse.json({
      success: true,
      vendor,
      message: 'Business listing submitted successfully. It will be reviewed by our team.',
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error submitting vendor listing:', error)
    
    // Handle unique constraint errors (duplicate vendor name + city)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A vendor with this name already exists in this city' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit business listing' },
      { status: 500 }
    )
  }
}

