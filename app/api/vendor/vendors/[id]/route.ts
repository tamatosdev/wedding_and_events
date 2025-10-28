import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'VENDOR') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name, category, city, pricing, description, images = [] } = await request.json()

    if (!name || !category || !city || !pricing || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if vendor belongs to the user
    const existingVendor = await prisma.vendor.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!existingVendor) {
      return NextResponse.json(
        { error: 'Vendor not found or unauthorized' },
        { status: 404 }
      )
    }

    const vendor = await prisma.vendor.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        category,
        city,
        pricing,
        description,
        images,
      },
    })

    return NextResponse.json(vendor)
  } catch (error) {
    console.error('Error updating vendor listing:', error)
    return NextResponse.json(
      { error: 'Failed to update vendor listing' },
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
    
    if (!session || session.user.role !== 'VENDOR') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if vendor belongs to the user
    const existingVendor = await prisma.vendor.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!existingVendor) {
      return NextResponse.json(
        { error: 'Vendor not found or unauthorized' },
        { status: 404 }
      )
    }

    await prisma.vendor.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: 'Vendor listing deleted successfully' })
  } catch (error) {
    console.error('Error deleting vendor listing:', error)
    return NextResponse.json(
      { error: 'Failed to delete vendor listing' },
      { status: 500 }
    )
  }
}
