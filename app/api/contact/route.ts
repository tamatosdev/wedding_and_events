import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendInitialNotification } from '@/lib/escalation'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Create contact query in database
    const query = await prisma.contactQuery.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
      },
    })

    // Send initial notifications to customer support (email + WhatsApp)
    try {
      await sendInitialNotification(query)
    } catch (notificationError) {
      console.error('Error sending initial notifications:', notificationError)
      // Don't fail the request if notifications fail, but log it
      // Query is still saved in database
    }

    return NextResponse.json({
      success: true,
      queryId: query.id,
      message: 'Thank you for contacting us! We will get back to you soon.',
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

