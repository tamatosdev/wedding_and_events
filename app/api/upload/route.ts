import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

/**
 * Image Upload API Route using Vercel Blob Storage
 * 
 * This endpoint handles image uploads and stores them in Vercel Blob Storage.
 * 
 * Requirements:
 * - User must be authenticated (session required)
 * - Accepts multipart/form-data
 * - Expects a field named "image" containing the file
 * - Returns JSON with the public URL: { url: "<blob-url>" }
 * 
 * Example usage:
 * ```typescript
 * const formData = new FormData()
 * formData.append('image', file)
 * const response = await fetch('/api/upload', { method: 'POST', body: formData })
 * const { url } = await response.json()
 * ```
 * 
 * Environment Variables Required:
 * - BLOB_READ_WRITE_TOKEN (automatically provided by Vercel, or set manually)
 * 
 * Note: Using nodejs runtime instead of edge because NextAuth's getServerSession
 * requires Node.js runtime. Vercel Blob works perfectly with nodejs runtime.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse multipart/form-data
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided. Expected field name: "image"' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop() || 'jpg'
    const fileName = `uploads/${timestamp}-${randomString}.${fileExtension}`

    // Upload to Vercel Blob Storage
    const blob = await put(fileName, file, {
      access: 'public',
      contentType: file.type,
    })

    // Return the public URL
    return NextResponse.json({ 
      url: blob.url 
    })
  } catch (error: any) {
    console.error('Error uploading file to Vercel Blob:', error)
    return NextResponse.json(
      { 
        error: 'Failed to upload file',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}
