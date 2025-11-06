import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const submission = await prisma.venueOnboardingSubmission.findUnique({
      where: { id: params.id },
    })

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Error fetching venue onboarding submission:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, adminNotes, reviewedBy } = body

    const updateData: any = {}
    
    if (status) {
      updateData.status = status
    }
    
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes
    }
    
    if (reviewedBy) {
      updateData.reviewedBy = reviewedBy
      updateData.reviewedAt = new Date()
    }

    const submission = await prisma.venueOnboardingSubmission.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Error updating venue onboarding submission:', error)
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    )
  }
}

