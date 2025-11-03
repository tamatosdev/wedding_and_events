import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { validatePermissions } from '@/lib/permissions'
import { canAccessAdminServer } from '@/lib/auth-helpers-server'

// Get all users (admin only)
export async function GET(request: NextRequest) {
  try {
    const hasAccess = await canAccessAdminServer()
    
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const search = searchParams.get('search')

    const where: any = {}
    if (role) {
      where.role = role
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    const users = await (prisma.user.findMany as any)({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            vendors: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// Create new user (admin only)
export async function POST(request: NextRequest) {
  try {
    const hasAccess = await canAccessAdminServer()
    
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name, email, password, role, permissions, isActive } = await request.json()

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, password, and role are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate role
    if (!['ADMIN', 'VENDOR', 'CUSTOMER_SUPPORT', 'MANAGER'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Validate and sanitize permissions
    const validatedPermissions = permissions && Array.isArray(permissions) && permissions.length > 0
      ? validatePermissions(permissions)
      : null

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Build user data object - use Prisma.JsonNull if permissions are null to avoid type issues
    const userData: any = {
      name: name || null,
      email,
      password: hashedPassword,
      role,
      isActive: isActive !== undefined ? isActive : true,
    }

    // Handle permissions - Prisma JSON fields need explicit null or value
    if (validatedPermissions && validatedPermissions.length > 0) {
      userData.permissions = validatedPermissions
    } else {
      // Explicitly set to null for JSON fields
      userData.permissions = null
    }

    // Create user - using direct Prisma client call with type assertion
    const user = await (prisma.user.create as any)({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        isActive: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    console.error('Error creating user:', error)
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
    })
    return NextResponse.json(
      { 
        error: 'Failed to create user',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

