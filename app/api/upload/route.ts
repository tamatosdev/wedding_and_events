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

// Increase body size limit to 10MB for file uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export async function POST(request: NextRequest) {
  try {
    console.log('Upload request received')
    
    // Check authentication
    const session = await getServerSession(authOptions)
    console.log('Session check:', { hasSession: !!session, userId: session?.user?.id })
    
    if (!session) {
      console.error('Unauthorized: No session found')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if BLOB_READ_WRITE_TOKEN exists
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN
    if (!blobToken) {
      console.error('BLOB_READ_WRITE_TOKEN is not set')
      return NextResponse.json(
        { 
          error: 'Blob storage not configured',
          details: 'BLOB_READ_WRITE_TOKEN environment variable is missing'
        },
        { status: 500 }
      )
    }
    console.log('Blob token exists:', !!blobToken)

    // Parse multipart/form-data
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      console.error('No file provided in form data')
      const formDataKeys = Array.from(formData.keys())
      console.error('Form data keys:', formDataKeys)
      return NextResponse.json(
        { error: 'No image file provided. Expected field name: "image"' },
        { status: 400 }
      )
    }

    console.log('File received:', { 
      name: file.name, 
      type: file.type, 
      size: file.size 
    })

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type:', file.type)
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      console.error('File too large:', file.size)
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
    console.log('Uploading to blob:', fileName)

    // Upload to Vercel Blob Storage
    try {
      const blob = await put(fileName, file, {
        access: 'public',
        contentType: file.type,
      })
      console.log('Upload successful:', blob.url)

      // Return the public URL
      return NextResponse.json({ 
        url: blob.url 
      })
    } catch (blobError: any) {
      console.error('Vercel Blob upload error:', blobError)
      console.error('Error details:', {
        message: blobError?.message,
        code: blobError?.code,
        name: blobError?.name,
      })
      return NextResponse.json(
        { 
          error: 'Failed to upload to blob storage',
          details: process.env.NODE_ENV === 'development' ? blobError?.message : 'Check server logs'
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Error uploading file to Vercel Blob:', error)
    console.error('Error stack:', error?.stack)
    return NextResponse.json(
      { 
        error: 'Failed to upload file',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}
