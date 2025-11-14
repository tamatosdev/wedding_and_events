import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * Public API endpoint to fetch homepage CMS content
 * No authentication required - this is public content
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch all visible homepage sections
    const sections = await prisma.homepageSection.findMany({
      where: { visible: true },
      orderBy: { order: 'asc' },
    }).catch(() => [])

    // Fetch all homepage content blocks
    // Handle case where HomepageContent model might not exist in Prisma client yet
    let content: any[] = []
    try {
      content = await prisma.homepageContent.findMany({
        where: { visible: true },
        orderBy: { order: 'asc' },
      })
    } catch (contentError: any) {
      // If model doesn't exist, return empty array
      console.warn('HomepageContent model not available yet:', contentError?.message)
      content = []
    }

    // Fetch featured vendors
    const featuredVendors = await prisma.featuredVendor.findMany({
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
            category: true,
            city: true,
            pricing: true,
            description: true,
            images: true,
            rating: true,
            reviews: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    }).catch(() => [])

    // Fetch site settings
    const siteSettings = await prisma.siteSettings.findUnique({
      where: { id: 'main' },
    }).catch(() => null)

    return NextResponse.json({
      sections: sections || [],
      content: content.reduce((acc, item) => {
        acc[item.section] = item
        return acc
      }, {} as Record<string, any>),
      featuredVendors: featuredVendors.map(fv => fv.vendor) || [],
      siteSettings: siteSettings || null,
    })
  } catch (error: any) {
    console.error('Error fetching homepage CMS data:', error)
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      name: error?.name,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
    })
    return NextResponse.json(
      { 
        error: 'Failed to fetch homepage content',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined,
        hint: 'Make sure Prisma client is regenerated (run: npx prisma generate)'
      },
      { status: 500 }
    )
  }
}

