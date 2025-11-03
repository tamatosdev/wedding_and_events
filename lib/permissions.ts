/**
 * Permissions and Duties Management System
 * Similar to WordPress roles and capabilities
 */

export type Permission = string

export interface RoleCapabilities {
  [role: string]: Permission[]
}

// Default capabilities for each role
export const DEFAULT_ROLE_CAPABILITIES: RoleCapabilities = {
  ADMIN: [
    'manage_users',
    'edit_users',
    'delete_users',
    'create_users',
    'manage_vendors',
    'approve_vendors',
    'reject_vendors',
    'edit_vendors',
    'delete_vendors',
    'manage_inquiries',
    'view_inquiries',
    'manage_queries',
    'respond_queries',
    'escalate_queries',
    'manage_cms',
    'view_statistics',
    'view_analytics',
    'manage_settings',
  ],
  VENDOR: [
    'create_vendors',
    'edit_own_vendors',
    'delete_own_vendors',
    'view_own_vendors',
    'upload_images',
  ],
  CUSTOMER_SUPPORT: [
    'view_queries',
    'respond_queries',
    'manage_queries',
    'view_inquiries',
    'respond_inquiries',
    'view_vendors',
    'view_statistics',
    'edit_own_profile',
  ],
  MANAGER: [
    'manage_vendors',
    'approve_vendors',
    'reject_vendors',
    'view_vendors',
    'edit_vendors',
    'delete_vendors',
    'manage_queries',
    'view_queries',
    'respond_queries',
    'escalate_queries',
    'view_inquiries',
    'respond_inquiries',
    'manage_inquiries',
    'view_statistics',
    'view_analytics',
    'manage_users',
    'edit_users',
    'create_users',
    'edit_own_profile',
  ],
}

// All available permissions in the system
export const ALL_PERMISSIONS: Permission[] = [
  // User Management
  'manage_users',
  'create_users',
  'edit_users',
  'delete_users',
  'edit_own_profile',
  
  // Vendor Management
  'manage_vendors',
  'create_vendors',
  'edit_vendors',
  'delete_vendors',
  'approve_vendors',
  'reject_vendors',
  'edit_own_vendors',
  'delete_own_vendors',
  'view_own_vendors',
  
  // Inquiry Management
  'manage_inquiries',
  'view_inquiries',
  'respond_inquiries',
  
  // Query Management
  'manage_queries',
  'view_queries',
  'respond_queries',
  'escalate_queries',
  
  // Content Management
  'manage_cms',
  'edit_homepage',
  'manage_settings',
  
  // Statistics
  'view_statistics',
  'view_analytics',
  
  // Media
  'upload_images',
  'delete_images',
]

// Permission categories for UI organization
export const PERMISSION_CATEGORIES = {
  'User Management': [
    'manage_users',
    'create_users',
    'edit_users',
    'delete_users',
    'edit_own_profile',
  ],
  'Vendor Management': [
    'manage_vendors',
    'create_vendors',
    'edit_vendors',
    'delete_vendors',
    'approve_vendors',
    'reject_vendors',
    'edit_own_vendors',
    'delete_own_vendors',
    'view_own_vendors',
  ],
  'Inquiry Management': [
    'manage_inquiries',
    'view_inquiries',
    'respond_inquiries',
  ],
  'Query Management': [
    'manage_queries',
    'view_queries',
    'respond_queries',
    'escalate_queries',
  ],
  'Content Management': [
    'manage_cms',
    'edit_homepage',
    'manage_settings',
  ],
  'Statistics & Analytics': [
    'view_statistics',
    'view_analytics',
  ],
  'Media Management': [
    'upload_images',
    'delete_images',
  ],
}

/**
 * Check if a user has a specific permission
 */
export function hasPermission(
  userPermissions: Permission[] | null | undefined,
  role: string,
  permission: Permission
): boolean {
  // If user has explicit permissions, check those first
  if (userPermissions && userPermissions.includes(permission)) {
    return true
  }
  
  // Check role default capabilities
  const roleCapabilities = DEFAULT_ROLE_CAPABILITIES[role] || []
  return roleCapabilities.includes(permission)
}

/**
 * Get all permissions for a user (combines role permissions + custom permissions)
 */
export function getUserPermissions(
  userPermissions: Permission[] | null | undefined,
  role: string
): Permission[] {
  const roleCapabilities = DEFAULT_ROLE_CAPABILITIES[role] || []
  const customPermissions = userPermissions || []
  
  // Combine and deduplicate
  const combined = [...roleCapabilities, ...customPermissions]
  return Array.from(new Set(combined))
}

/**
 * Get permissions for a role
 */
export function getRolePermissions(role: string): Permission[] {
  return DEFAULT_ROLE_CAPABILITIES[role] || []
}

/**
 * Validate permissions array
 */
export function validatePermissions(permissions: Permission[]): Permission[] {
  return permissions.filter(p => ALL_PERMISSIONS.includes(p))
}

