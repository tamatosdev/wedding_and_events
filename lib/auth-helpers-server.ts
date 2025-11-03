/**
 * Server-side auth helper functions
 * For use in API routes and server components
 */

import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { prisma } from './prisma'
import { hasPermission } from './permissions'

/**
 * Get user with permissions from database
 */
export async function getUserWithPermissions(userId: string) {
  const user = await (prisma.user.findUnique as any)({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      permissions: true,
      isActive: true,
    },
  })
  return user
}

/**
 * Check if current user can access admin features
 */
export async function canAccessAdminServer(): Promise<boolean> {
  const session = await getServerSession(authOptions)
  if (!session?.user) return false
  
  // Admin and Manager roles always have access
  if (session.user.role === 'ADMIN' || session.user.role === 'MANAGER') return true
  
  // Get user with permissions from database
  const user = await getUserWithPermissions(session.user.id)
  if (!user || !user.isActive) return false
  
  // Customer Support can access query management
  if (user.role === 'CUSTOMER_SUPPORT') {
    const adminPermissions = ['manage_queries', 'respond_queries', 'view_queries']
    const userPermissions = (user.permissions as string[]) || []
    return adminPermissions.some(perm => 
      hasPermission(userPermissions, user.role, perm as any)
    )
  }
  
  // Check if user has admin permissions
  const adminPermissions = [
    'manage_users',
    'manage_vendors',
    'approve_vendors',
    'view_statistics',
    'manage_queries',
    'manage_cms',
  ]
  
  const userPermissions = (user.permissions as string[]) || []
  
  // If user has any admin permission, allow access
  return adminPermissions.some(perm => 
    hasPermission(userPermissions, user.role, perm as any)
  )
}

/**
 * Check if user has a specific permission (server-side)
 */
export async function userHasPermissionServer(permission: string): Promise<boolean> {
  const session = await getServerSession(authOptions)
  if (!session?.user) return false
  
  // Get user with permissions from database
  const user = await getUserWithPermissions(session.user.id)
  if (!user || !user.isActive) return false
  
  return hasPermission(
    (user.permissions as string[]) || null,
    user.role,
    permission as any
  )
}

