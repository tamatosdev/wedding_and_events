import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get single query
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

    const query = await prisma.contactQuery.findUnique({
      where: { id: params.id },
    })

    if (!query) {
      return NextResponse.json(
        { error: 'Query not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(query)
  } catch (error) {
    console.error('Error fetching query:', error)
    return NextResponse.json(
      { error: 'Failed to fetch query' },
      { status: 500 }
    )
  }
}

// Update query (mark as responded, add notes, etc.)
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
      customerSupportResponded,
      managerResponded,
      ceoResponded,
      status,
      notes 
    } = body

    const query = await prisma.contactQuery.findUnique({
      where: { id: params.id },
    })

    if (!query) {
      return NextResponse.json(
        { error: 'Query not found' },
        { status: 404 }
      )
    }

    // Determine which response level to mark
    let updateData: any = {
      lastEscalationCheck: new Date(),
    }

    if (customerSupportResponded !== undefined) {
      updateData.customerSupportResponded = customerSupportResponded
      if (customerSupportResponded && !query.customerSupportResponded) {
        updateData.respondedAt = new Date()
        updateData.status = 'RESPONDED'
      }
    }

    if (managerResponded !== undefined) {
      updateData.managerResponded = managerResponded
      if (managerResponded && !query.managerResponded) {
        updateData.status = 'RESPONDED'
      }
    }

    if (ceoResponded !== undefined) {
      updateData.ceoResponded = ceoResponded
      if (ceoResponded && !query.ceoResponded) {
        updateData.status = 'RESPONDED'
      }
    }

    if (status) {
      updateData.status = status
      if (status === 'RESOLVED') {
        updateData.resolvedAt = new Date()
      }
    }

    if (notes !== undefined) {
      updateData.notes = notes
    }

    const updatedQuery = await prisma.contactQuery.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json(updatedQuery)
  } catch (error) {
    console.error('Error updating query:', error)
    return NextResponse.json(
      { error: 'Failed to update query' },
      { status: 500 }
    )
  }
}

