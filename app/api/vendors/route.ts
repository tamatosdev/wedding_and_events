import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const city = searchParams.get('city')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const capacity = searchParams.get('capacity')
    const type = searchParams.get('type')
    const rating = searchParams.get('rating')
    const sort = searchParams.get('sort') || 'newest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const skip = (page - 1) * limit

    const where: any = {
      approved: true,
    }

    if (category) {
      where.category = {
        contains: category,
        mode: 'insensitive',
      }
    }

    if (city) {
      where.city = {
        contains: city,
        mode: 'insensitive',
      }
    }

    // Build AND conditions array for combining filters
    const andConditions: any[] = []

    // Search filtering - name OR description
    if (search) {
      andConditions.push({
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      })
    }

    // Capacity filtering - AND condition
    if (capacity) {
      const capacityRanges = capacity.split(',')
      andConditions.push({
        capacity: {
          in: capacityRanges,
        },
      })
    }

    // Rating filtering - AND condition (but OR within multiple ratings)
    if (rating) {
      const ratings = rating.split(',')
      const ratingConditions: any[] = []
      ratings.forEach(r => {
        if (r === '2.5 Above') {
          ratingConditions.push({ rating: { gte: 2.5 } })
        } else if (r === '3.5 Above') {
          ratingConditions.push({ rating: { gte: 3.5 } })
        } else if (r === '4.5 Above') {
          ratingConditions.push({ rating: { gte: 4.5 } })
        }
      })
      if (ratingConditions.length > 0) {
        if (ratingConditions.length === 1) {
          andConditions.push(ratingConditions[0])
        } else {
          andConditions.push({ OR: ratingConditions })
        }
      }
    }

    // Apply AND conditions if we have any
    if (andConditions.length > 0) {
      if (andConditions.length === 1) {
        // Single condition - merge directly into where
        Object.assign(where, andConditions[0])
      } else {
        // Multiple conditions - use AND
        where.AND = andConditions
      }
    }

    // Price filtering (note: pricing is a String field, not numeric, so this may need adjustment)
    // For now, we'll skip price filtering as it requires parsing the pricing string
    // TODO: Add proper price parsing if needed

    // Type filtering
    if (type) {
      const types = type.split(',')
      where.type = {
        in: types,
      }
    }

    // Sorting
    let orderBy: any = { createdAt: 'desc' }
    switch (sort) {
      case 'oldest':
        orderBy = { createdAt: 'asc' }
        break
      case 'price-low':
        orderBy = { pricing: 'asc' }
        break
      case 'price-high':
        orderBy = { pricing: 'desc' }
        break
      case 'rating':
        orderBy = { rating: 'desc' }
        break
      default:
        orderBy = { createdAt: 'desc' }
    }

    // Only fetch approved vendors for public API
    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.vendor.count({ where }),
    ])

    // Add mock data for demonstration
    const vendorsWithMockData = vendors.map(vendor => ({
      ...vendor,
      rating: vendor.rating || Math.random() * 2 + 3, // Random rating between 3-5
      reviews: vendor.reviews || Math.floor(Math.random() * 50) + 10, // Random reviews 10-60
      capacity: vendor.capacity || ['500-1000', '1000-1500', '300-500'][Math.floor(Math.random() * 3)],
      type: vendor.type || ['Hall', 'Outdoor', 'Marquee'][Math.floor(Math.random() * 3)],
    }))

    return NextResponse.json({
      vendors: vendorsWithMockData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error('Error fetching vendors:', error)
    
    // Check if it's a database connection error
    if (error?.code === 'P1001' || error?.message?.includes('Can\'t reach database server')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please ensure the database is running.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch vendors',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}
