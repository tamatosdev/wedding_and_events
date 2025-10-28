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

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'sections') {
      const sections = await prisma.homepageSection.findMany({
        orderBy: { order: 'asc' },
      })
      return NextResponse.json(sections)
    } else if (type === 'featuredVendors') {
      const featuredVendors = await prisma.featuredVendor.findMany({
        include: {
          vendor: {
            select: {
              id: true,
              name: true,
              category: true,
              city: true,
              images: true,
            },
          },
        },
        orderBy: { order: 'asc' },
      })
      return NextResponse.json(featuredVendors)
    } else if (type === 'siteSettings') {
      const settings = await prisma.siteSettings.findUnique({
        where: { id: 'main' },
      })
      return NextResponse.json(settings)
    }

    return NextResponse.json({ error: 'Invalid settings type' }, { status: 400 })
  } catch (error) {
    console.error('Error fetching admin settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const body = await request.json()

    if (type === 'featuredVendors') {
      const { vendorId } = body
      if (!vendorId) {
        return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 })
      }

      const existingFeatured = await prisma.featuredVendor.findUnique({
        where: { vendorId },
      })

      if (existingFeatured) {
        return NextResponse.json({ error: 'Vendor is already featured' }, { status: 409 })
      }

      const lastFeatured = await prisma.featuredVendor.findFirst({
        orderBy: { order: 'desc' },
      })
      const newOrder = lastFeatured ? lastFeatured.order + 1 : 0

      const featuredVendor = await prisma.featuredVendor.create({
        data: {
          vendorId,
          order: newOrder,
        },
      })
      return NextResponse.json(featuredVendor, { status: 201 })
    }

    return NextResponse.json({ error: 'Invalid settings type for POST' }, { status: 400 })
  } catch (error) {
    console.error('Error creating admin setting:', error)
    return NextResponse.json(
      { error: 'Failed to create admin setting' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const id = searchParams.get('id')
    const body = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    if (type === 'sections') {
      const { visible, order, title, subtitle, content } = body
      const updatedSection = await prisma.homepageSection.update({
        where: { id },
        data: {
          visible,
          order,
          title,
          subtitle,
          content,
        },
      })
      return NextResponse.json(updatedSection)
    } else if (type === 'featuredVendors') {
      const { order } = body
      const updatedFeatured = await prisma.featuredVendor.update({
        where: { id },
        data: { order },
      })
      return NextResponse.json(updatedFeatured)
    } else if (type === 'siteSettings') {
      const { homepageSettings, seoSettings } = body
      const updatedSettings = await prisma.siteSettings.upsert({
        where: { id: 'main' },
        update: { homepageSettings, seoSettings },
        create: { id: 'main', homepageSettings, seoSettings },
      })
      return NextResponse.json(updatedSettings)
    }

    return NextResponse.json({ error: 'Invalid settings type for PUT' }, { status: 400 })
  } catch (error) {
    console.error('Error updating admin setting:', error)
    return NextResponse.json(
      { error: 'Failed to update admin setting' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    if (type === 'featuredVendors') {
      await prisma.featuredVendor.delete({
        where: { id },
      })
      return NextResponse.json({ message: 'Featured vendor removed' }, { status: 200 })
    }

    return NextResponse.json({ error: 'Invalid settings type for DELETE' }, { status: 400 })
  } catch (error) {
    console.error('Error deleting admin setting:', error)
    return NextResponse.json(
      { error: 'Failed to delete admin setting' },
      { status: 500 }
    )
  }
}