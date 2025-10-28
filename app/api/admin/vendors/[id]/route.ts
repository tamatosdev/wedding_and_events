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
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { images } = await request.json()

    if (!Array.isArray(images)) {
      return NextResponse.json(
        { error: 'Images must be an array' },
        { status: 400 }
      )
    }

    const vendor = await prisma.vendor.update({
      where: {
        id: params.id,
      },
      data: {
        images,
      },
    })

    return NextResponse.json(vendor)
  } catch (error) {
    console.error('Error updating vendor images:', error)
    return NextResponse.json(
      { error: 'Failed to update vendor images' },
      { status: 500 }
    )
  }
}
