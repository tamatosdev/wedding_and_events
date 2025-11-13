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

    const inquiries = await prisma.inquiry.findMany({
      include: {
        vendor: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    console.log(`Fetched ${inquiries.length} inquiries from database`)
    
    // Filter out inquiries with missing vendors (in case of deleted vendors)
    const validInquiries = inquiries.filter(inq => inq.vendor !== null)
    
    if (validInquiries.length !== inquiries.length) {
      console.warn(`Found ${inquiries.length - validInquiries.length} inquiries with missing vendors`)
    }
    
    return NextResponse.json(validInquiries)
  } catch (error: any) {
    console.error('Error fetching inquiries:', error)
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
    })
    return NextResponse.json(
      { 
        error: 'Failed to fetch inquiries',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}
