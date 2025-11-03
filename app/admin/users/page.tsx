'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { canAccessAdmin } from '@/lib/auth-helpers-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { PERMISSION_CATEGORIES, ALL_PERMISSIONS, getRolePermissions, type Permission } from '@/lib/permissions'

interface User {
  id: string
  name: string | null
  email: string
  role: string
  permissions: Permission[] | null
  isActive: boolean
  createdAt: string
  _count: {
    vendors: number
  }
}

export default function AdminUsersPage() {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [filterRole, setFilterRole] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'VENDOR' as 'ADMIN' | 'VENDOR' | 'CUSTOMER_SUPPORT' | 'MANAGER',
    isActive: true,
    permissions: [] as Permission[],
  })

  useEffect(() => {
    if (sessionStatus === 'loading') return
    
    if (sessionStatus === 'unauthenticated' || !canAccessAdmin(session)) {
      router.push('/auth/signin')
      return
    }
    
    fetchUsers()
  }, [session, sessionStatus, router, filterRole, searchTerm])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      let url = '/api/admin/users?'
      if (filterRole !== 'all') {
        url += `role=${filterRole}&`
      }
      if (searchTerm) {
        url += `search=${encodeURIComponent(searchTerm)}&`
      }

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name || '',
        email: user.email,
        password: '', // Don't pre-fill password
        role: user.role as 'ADMIN' | 'VENDOR',
        isActive: user.isActive,
        permissions: (user.permissions as Permission[]) || [],
      })
    } else {
      setEditingUser(null)
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'VENDOR',
        isActive: true,
        permissions: [],
      })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'VENDOR',
      isActive: true,
      permissions: [],
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingUser 
        ? `/api/admin/users/${editingUser.id}`
        : '/api/admin/users'
      
      const method = editingUser ? 'PUT' : 'POST'
      
      const payload: any = {
        name: formData.name || null,
        email: formData.email,
        role: formData.role,
        isActive: formData.isActive,
        permissions: formData.permissions.length > 0 ? formData.permissions : null,
      }
      
      // Only include password if provided (for updates) or if creating new user
      if (!editingUser || formData.password) {
        if (!formData.password && !editingUser) {
          alert('Password is required for new users')
          return
        }
        if (formData.password) {
          payload.password = formData.password
        }
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        fetchUsers()
        handleCloseDialog()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save user')
      }
    } catch (error) {
      console.error('Error saving user:', error)
      alert('Failed to save user')
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchUsers()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    }
  }

  const handlePermissionToggle = (permission: Permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission],
    }))
  }

  const handleSelectAllCategory = (categoryPermissions: Permission[]) => {
    const allSelected = categoryPermissions.every(p => formData.permissions.includes(p))
    
    if (allSelected) {
      // Deselect all
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => !categoryPermissions.includes(p)),
      }))
    } else {
      // Select all
      setFormData(prev => ({
        ...prev,
        permissions: Array.from(new Set([...prev.permissions, ...categoryPermissions])),
      }))
    }
  }

  const rolePermissions = getRolePermissions(formData.role)
  const customPermissions = formData.permissions.filter(p => !rolePermissions.includes(p))

  if (sessionStatus === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (sessionStatus === 'unauthenticated' || !canAccessAdmin(session)) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Create and manage users, assign roles and permissions</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleOpenDialog()} className="bg-[#d13f43] hover:bg-[#b82f33]">
              + Add New User
            </Button>
            <Button 
              variant="outline" 
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="MANAGER">Manager</SelectItem>
              <SelectItem value="CUSTOMER_SUPPORT">Customer Support</SelectItem>
              <SelectItem value="VENDOR">Vendor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Permissions</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Vendors</th>
                    <th className="text-left p-4">Created</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{user.name || '—'}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                        <Badge className={
                          user.role === 'ADMIN' ? 'bg-red-500' : 
                          user.role === 'MANAGER' ? 'bg-orange-500' :
                          user.role === 'CUSTOMER_SUPPORT' ? 'bg-green-500' :
                          'bg-blue-500'
                        }>
                          {user.role.replace('_', ' ')}
                        </Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-gray-600">
                            {user.permissions && Array.isArray(user.permissions) 
                              ? `${user.permissions.length} custom`
                              : 'Default'}
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge className={user.isActive ? 'bg-green-500' : 'bg-gray-400'}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="p-4">{user._count.vendors}</td>
                        <td className="p-4 text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDialog(user)}
                            >
                              Edit
                            </Button>
                            {session?.user.id !== user.id && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(user.id)}
                              >
                                Delete
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Create/Edit User Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Edit User' : 'Create New User'}</DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? 'Update user information, role, and permissions'
                  : 'Create a new user account with role and custom permissions'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">
                    Password {editingUser ? '(leave blank to keep current)' : '*'}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required={!editingUser}
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: 'ADMIN' | 'VENDOR' | 'CUSTOMER_SUPPORT' | 'MANAGER') => 
                      setFormData(prev => ({ ...prev, role: value, permissions: [] }))
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                      <SelectItem value="CUSTOMER_SUPPORT">Customer Support</SelectItem>
                      <SelectItem value="VENDOR">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, isActive: checked }))
                  }
                />
                <Label htmlFor="isActive">Active User</Label>
              </div>

              {/* Permissions Section */}
              <div className="border-t pt-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Custom Permissions (Duties)</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Default permissions for <strong>{formData.role}</strong> role are automatically included.
                    Select additional custom permissions below.
                  </p>
                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Default {formData.role} permissions:</strong>{' '}
                    {rolePermissions.length > 0 ? rolePermissions.join(', ') : 'None'}
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto border rounded-lg p-4">
                  {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
                    <div key={category} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{category}</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleSelectAllCategory(permissions)}
                        >
                          {permissions.every(p => formData.permissions.includes(p)) 
                            ? 'Deselect All' 
                            : 'Select All'}
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {permissions.map((permission) => {
                          const isDefault = rolePermissions.includes(permission)
                          const isSelected = formData.permissions.includes(permission)
                          
                          return (
                            <div key={permission} className="flex items-center space-x-2">
                              <Checkbox
                                id={permission}
                                checked={isSelected}
                                onCheckedChange={() => handlePermissionToggle(permission)}
                                disabled={isDefault}
                              />
                              <Label 
                                htmlFor={permission} 
                                className={`text-sm ${isDefault ? 'text-gray-400' : ''}`}
                              >
                                {permission.replace(/_/g, ' ')}
                                {isDefault && ' (default)'}
                              </Label>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {customPermissions.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">
                      Custom Permissions Selected: {customPermissions.length}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      {customPermissions.join(', ')}
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#d13f43] hover:bg-[#b82f33]">
                  {editingUser ? 'Update User' : 'Create User'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

