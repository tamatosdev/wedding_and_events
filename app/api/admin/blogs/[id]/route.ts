import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Get single blog (admin only)
export async function GET(
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

    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
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

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(blog)
  } catch (error: any) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

// Update blog (admin only)
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

    // Check if blog exists
    const existing = await prisma.blog.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Check for duplicate slug if slug is being changed
    if (slug && slug !== existing.slug) {
      const duplicate = await prisma.blog.findUnique({
        where: { slug },
      })

      if (duplicate) {
        return NextResponse.json(
          { error: 'A blog with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Build update data
    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (slug !== undefined) updateData.slug = slug
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (content !== undefined) updateData.content = content
    if (featuredImage !== undefined) updateData.featuredImage = featuredImage
    if (tags !== undefined) updateData.tags = tags
    if (category !== undefined) updateData.category = category
    if (seoTitle !== undefined) updateData.seoTitle = seoTitle
    if (seoDescription !== undefined) updateData.seoDescription = seoDescription

    // Handle published status
    if (published !== undefined) {
      updateData.published = published
      // Set publishedAt if publishing for the first time
      if (published === true && !existing.publishedAt) {
        updateData.publishedAt = new Date()
      }
      // Clear publishedAt if unpublishing
      if (published === false) {
        updateData.publishedAt = null
      }
    }

    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json(blog)
  } catch (error: any) {
    console.error('Error updating blog:', error)

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to update blog',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

// Delete blog (admin only)
export async function DELETE(
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

    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    await prisma.blog.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { 
        error: 'Failed to delete blog',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

