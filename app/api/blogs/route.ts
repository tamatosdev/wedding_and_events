import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * Public API endpoint to fetch published blogs
 * No authentication required - this is public content
 * 
 * Query Parameters:
 * - limit: Number of blogs to return (default: 10)
 * - category: Filter by category
 * - search: Search in title, excerpt, or content
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const where: any = {
      published: true, // Only fetch published blogs
    }

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    const blogs = await prisma.blog.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc', // Show most recently published first
      },
      take: limit,
    })

    return NextResponse.json(blogs)
  } catch (error: any) {
    console.error('Error fetching published blogs:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch blogs',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

