import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Get all queries (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const escalationLevel = searchParams.get('escalationLevel')

    const where: any = {}
    if (status) {
      where.status = status
    }
    if (escalationLevel) {
      where.escalationLevel = escalationLevel
    }

    // Fetch contact queries
    const contactQueries = await prisma.contactQuery.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Also fetch inquiries and convert them to contact query format
    // This ensures all user queries appear in the Contact Queries tab
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

    // Convert inquiries to contact query format
    const inquiryQueries = inquiries.map((inquiry) => ({
      id: `inquiry-${inquiry.id}`, // Prefix to distinguish from contact queries
      name: inquiry.name,
      email: inquiry.email,
      phone: null,
      subject: `Vendor Inquiry: ${inquiry.vendor?.name || 'Unknown Vendor'}`,
      message: `Vendor: ${inquiry.vendor?.name || 'Unknown Vendor'}\n\n${inquiry.message}`,
      status: 'PENDING' as const,
      escalationLevel: 'CUSTOMER_SUPPORT' as const,
      customerSupportResponded: false,
      managerResponded: false,
      ceoResponded: false,
      createdAt: inquiry.createdAt.toISOString(),
      respondedAt: null,
      escalatedToManagerAt: null,
      escalatedToCEOAt: null,
      notes: null,
      source: 'inquiry' as const, // Mark as inquiry source
      inquiryId: inquiry.id, // Keep original inquiry ID
      vendorName: inquiry.vendor?.name || 'Unknown Vendor',
    }))

    // Combine and sort by creation date
    const allQueries = [...contactQueries, ...inquiryQueries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json(allQueries)
  } catch (error) {
    console.error('Error fetching queries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch queries' },
      { status: 500 }
    )
  }
}

