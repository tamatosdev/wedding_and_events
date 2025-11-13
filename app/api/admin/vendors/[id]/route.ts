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
    } = body

    // Build update data object
    const updateData: any = {}
    
    if (name !== undefined) updateData.name = name
    if (category !== undefined) updateData.category = category
    if (city !== undefined) updateData.city = city
    if (pricing !== undefined) updateData.pricing = pricing
    if (description !== undefined) updateData.description = description
    if (images !== undefined) {
      if (!Array.isArray(images)) {
        return NextResponse.json(
          { error: 'Images must be an array' },
          { status: 400 }
        )
      }
      updateData.images = images
    }
    if (capacity !== undefined) updateData.capacity = capacity
    if (type !== undefined) updateData.type = type
    if (rating !== undefined) updateData.rating = rating
    if (reviews !== undefined) updateData.reviews = reviews
    if (approved !== undefined) updateData.approved = approved

    // Check for duplicate if name or city is being changed
    if (name || city) {
      const currentVendor = await prisma.vendor.findUnique({
        where: { id: params.id },
      })
      
      const checkName = name || currentVendor?.name
      const checkCity = city || currentVendor?.city

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
