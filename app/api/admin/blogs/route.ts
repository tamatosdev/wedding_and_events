import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Get all blogs (admin only)
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
    const published = searchParams.get('published')
    const search = searchParams.get('search')

    const where: any = {}
    if (published !== null) {
      where.published = published === 'true'
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
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
        createdAt: 'desc',
      },
    })

    return NextResponse.json(blogs)
  } catch (error: any) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch blogs',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

// Create new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      published,
      tags,
      category,
      seoTitle,
      seoDescription,
    } = body

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existing = await prisma.blog.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 400 }
      )
    }

    // Create blog
    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        featuredImage: featuredImage || null,
        authorId: session.user.id,
        published: published === true,
        publishedAt: published === true ? new Date() : null,
        tags: tags || [],
        category: category || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error: any) {
    console.error('Error creating blog:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to create blog',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

