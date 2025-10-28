import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const [
      totalVendors,
      approvedVendors,
      pendingVendors,
      totalInquiries,
      vendorsByCategory,
      vendorsByCity,
    ] = await Promise.all([
      prisma.vendor.count(),
      prisma.vendor.count({ where: { approved: true } }),
      prisma.vendor.count({ where: { approved: false } }),
      prisma.inquiry.count(),
      prisma.vendor.groupBy({
        by: ['category'],
        _count: {
          category: true,
        },
      }),
      prisma.vendor.groupBy({
        by: ['city'],
        _count: {
          city: true,
        },
      }),
    ])

    const stats = {
      totalVendors,
      approvedVendors,
      pendingVendors,
      totalInquiries,
      vendorsByCategory: vendorsByCategory.map(item => ({
        category: item.category,
        count: item._count.category,
      })),
      vendorsByCity: vendorsByCity.map(item => ({
        city: item.city,
        count: item._count.city,
      })),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
