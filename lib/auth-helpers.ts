import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

/**
 * Get session from request in Next.js App Router API routes
 * Uses cookies() helper which works properly in App Router
 */
export async function getSessionFromRequest(request: NextRequest) {
  try {
    // In Next.js App Router, use getServerSession which automatically reads from cookies()
    // This is the recommended approach for API routes in App Router
    const session = await getServerSession(authOptions)
    
    if (!session) {
      console.log('No session found')
      return null
    }

    return session
  } catch (error) {
    console.error('Error getting session from request:', error)
    return null
  }
}

