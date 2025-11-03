/**
 * Client-side auth helper functions
 * For use in client components
 */

import { hasPermission } from './permissions'
import type { Session } from 'next-auth'

/**
 * Check if user can access admin features
 * Returns true if user is ADMIN/MANAGER role OR has admin permissions
 */
export function canAccessAdmin(session: Session | null): boolean {
  if (!session?.user) return false
  
  // Admin and Manager roles always have access
  if (session.user.role === 'ADMIN' || session.user.role === 'MANAGER') return true
  
  // Customer Support can access query management
  if (session.user.role === 'CUSTOMER_SUPPORT') {
    const adminPermissions = ['manage_queries', 'respond_queries', 'view_queries']
    const userPermissions = session.user.permissions || []
    return adminPermissions.some(perm => 
      hasPermission(userPermissions, session.user.role, perm as any)
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
  
  const userPermissions = session.user.permissions || []
  
  // If user has any admin permission, allow access
  return adminPermissions.some(perm => 
    hasPermission(userPermissions, session.user.role, perm as any)
  )
}

/**
 * Check if user has a specific permission
 */
export function userHasPermission(
  session: Session | null,
  permission: string
): boolean {
  if (!session?.user) return false
  
  return hasPermission(
    session.user.permissions || null,
    session.user.role,
    permission as any
  )
}

