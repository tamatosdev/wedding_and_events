import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendAdminInquiryNotification } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { vendorId, name, email, message } = body

    console.log('Received inquiry submission:', {
      vendorId,
      hasName: !!name,
      hasEmail: !!email,
      hasMessage: !!message,
      allKeys: Object.keys(body),
    })

    if (!vendorId || !name || !email || !message) {
      console.error('Missing required fields:', {
        vendorId: !!vendorId,
        name: !!name,
        email: !!email,
        message: !!message,
      })
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          details: {
            vendorId: !vendorId,
            name: !name,
            email: !email,
            message: !message,
          }
        },
        { status: 400 }
      )
    }

    // Get vendor info for the contact query
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { name: true },
    })

    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Create inquiry (for backward compatibility and vendor tracking)
    const inquiry = await prisma.inquiry.create({
      data: {
        vendorId,
        name,
        email,
        message,
      },
      include: {
        vendor: {
          include: {
            user: true,
          },
        },
      },
    })

    // Also create a ContactQuery so it appears in the Contact Queries tab
    // This allows representatives to respond/chat with customers
    const contactQuery = await prisma.contactQuery.create({
      data: {
        name,
        email,
        phone: null, // Phone not collected in inquiry form
        subject: `Vendor Inquiry: ${vendor.name}`,
        message: `Vendor: ${vendor.name}\n\n${message}`,
        status: 'PENDING',
        escalationLevel: 'CUSTOMER_SUPPORT',
      },
    })

    // Send email notification to ADMIN only (not vendor)
    try {
      await sendAdminInquiryNotification({
        name: inquiry.name,
        email: inquiry.email,
        message: inquiry.message,
        vendorName: inquiry.vendor.name,
        vendorEmail: inquiry.vendor.user.email,
      })
    } catch (emailError) {
      console.error('Error sending admin notification email:', emailError)
      // Don't fail the request if email fails
    }

    // Send initial notifications for contact query (escalation system)
    try {
      const { sendInitialNotification } = await import('@/lib/escalation')
      await sendInitialNotification(contactQuery)
    } catch (notificationError) {
      console.error('Error sending contact query notifications:', notificationError)
      // Don't fail the request if notifications fail
    }

    console.log('Inquiry and ContactQuery created successfully:', {
      inquiryId: inquiry.id,
      contactQueryId: contactQuery.id,
    })
    return NextResponse.json(inquiry, { status: 201 })
  } catch (error: any) {
    console.error('Error creating inquiry:', error)
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
    })
    return NextResponse.json(
      { 
        error: 'Failed to create inquiry',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}
