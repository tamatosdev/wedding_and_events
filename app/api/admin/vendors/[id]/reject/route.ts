import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

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

    // Delete the vendor instead of just marking as rejected
    await prisma.vendor.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: 'Vendor rejected and removed' })
  } catch (error) {
    console.error('Error rejecting vendor:', error)
    return NextResponse.json(
      { error: 'Failed to reject vendor' },
      { status: 500 }
    )
  }
}
