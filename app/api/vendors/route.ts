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

    if (search) {
      where.OR = [
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
      ]
    }

    // Price filtering (extract numbers from pricing string)
    if (minPrice || maxPrice) {
      where.pricing = {}
      if (minPrice) {
        where.pricing.gte = minPrice
      }
      if (maxPrice) {
        where.pricing.lte = maxPrice
      }
    }

    // Capacity filtering
    if (capacity) {
      const capacityRanges = capacity.split(',')
      where.OR = where.OR || []
      where.OR.push({
        capacity: {
          in: capacityRanges,
        },
      })
    }

    // Type filtering
    if (type) {
      const types = type.split(',')
      where.type = {
        in: types,
      }
    }

    // Rating filtering
    if (rating) {
      const ratings = rating.split(',')
      const ratingConditions = []
      
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
        where.OR = where.OR || []
        where.OR.push(...ratingConditions)
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

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
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
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    )
  }
}
