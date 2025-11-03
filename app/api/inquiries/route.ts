import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendAdminInquiryNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { vendorId, name, email, message } = await request.json()

    if (!vendorId || !name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create inquiry
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

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}
