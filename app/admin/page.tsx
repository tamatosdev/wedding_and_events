'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { canAccessAdmin, userHasPermission } from '@/lib/auth-helpers-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/ui/image-upload'
import Image from 'next/image'
import Link from 'next/link'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface Vendor {
  id: string
  name: string
  category: string
  city: string
  pricing: string
  description: string
  images: string[]
  approved: boolean
  createdAt: string
  user: {
    name: string | null
    email: string
  }
}

interface Inquiry {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
  vendor: {
    name: string
  }
}

interface Stats {
  totalVendors: number
  approvedVendors: number
  pendingVendors: number
  totalInquiries: number
  vendorsByCategory: Array<{ category: string; count: number }>
  vendorsByCity: Array<{ city: string; count: number }>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)

  useEffect(() => {
    // Wait for session to finish loading
    if (status === 'loading') {
      return
    }
    
    // Redirect to signin if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }
    
    // Redirect to homepage if user doesn't have admin access (by role or permissions)
    if (session && !canAccessAdmin(session)) {
      console.log('User without admin access attempted to access admin page:', {
        hasSession: !!session,
        role: session?.user?.role,
        permissions: session?.user?.permissions,
        email: session?.user?.email
      })
      router.push('/')
      return
    }
  }, [session, status, router])

  useEffect(() => {
    if (session && canAccessAdmin(session)) {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    try {
      const [vendorsRes, inquiriesRes, statsRes] = await Promise.all([
        fetch('/api/admin/vendors'),
        fetch('/api/admin/inquiries'),
        fetch('/api/admin/stats'),
      ])

      if (vendorsRes.ok) {
        const vendorsData = await vendorsRes.json()
        setVendors(vendorsData)
      }

      if (inquiriesRes.ok) {
        const inquiriesData = await inquiriesRes.json()
        setInquiries(inquiriesData)
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveVendor = async (vendorId: string) => {
    try {
      const response = await fetch(`/api/admin/vendors/${vendorId}/approve`, {
        method: 'PUT',
      })

      if (response.ok) {
        fetchData()
      }
    } catch (error) {
      console.error('Error approving vendor:', error)
    }
  }

  const handleRejectVendor = async (vendorId: string) => {
    if (confirm('Are you sure you want to reject this vendor?')) {
      try {
        const response = await fetch(`/api/admin/vendors/${vendorId}/reject`, {
          method: 'PUT',
        })

        if (response.ok) {
          fetchData()
        }
      } catch (error) {
        console.error('Error rejecting vendor:', error)
      }
    }
  }

  const handleUpdateVendorImages = async (vendorId: string, images: string[]) => {
    try {
      const response = await fetch(`/api/admin/vendors/${vendorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images }),
      })

      if (response.ok) {
        fetchData()
        setEditingVendor(null)
      }
    } catch (error) {
      console.error('Error updating vendor images:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated or doesn't have admin access (redirect will happen via useEffect)
  if (status === 'unauthenticated' || (session && !canAccessAdmin(session))) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage vendors and view analytics</p>
            </div>
            <div className="flex space-x-4">
              {userHasPermission(session, 'manage_users') && (
                <Link href="/admin/users">
                  <Button variant="outline" className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600">
                    User Management
                  </Button>
                </Link>
              )}
              <Link href="/admin/queries">
                <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white border-green-600">
                  Contact Queries
                </Button>
              </Link>
              {userHasPermission(session, 'manage_cms') && (
                <Link href="/admin/cms">
                  <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600">
                    Content Management
                  </Button>
                </Link>
              )}
              <Button 
                variant="outline" 
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
          
          {/* Admin Notification Banner */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  📧 New Inquiry System Active
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    <strong>All customer inquiries are now sent directly to you (admin) only.</strong> 
                    Vendors will no longer receive inquiry emails automatically. 
                    You can manually share inquiry details with vendors through the admin dashboard.
                  </p>
                  <p className="mt-1">
                    Admin Email: <code className="bg-blue-100 px-1 rounded">{process.env.ADMIN_EMAIL || 'admin@shadiportal.com'}</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Only visible to users with view_statistics permission */}
        {stats && userHasPermission(session, 'view_statistics') && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {(userHasPermission(session, 'view_vendors') || userHasPermission(session, 'manage_vendors')) && (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Total Vendors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalVendors}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Approved Vendors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {stats.approvedVendors}
                    </div>
                  </CardContent>
                </Card>

                {userHasPermission(session, 'approve_vendors') && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        Pending Vendors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">
                        {stats.pendingVendors}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {userHasPermission(session, 'view_inquiries') && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalInquiries}</div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Charts - Only visible to users with view_analytics permission */}
        {stats && userHasPermission(session, 'view_analytics') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Vendors by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.vendorsByCategory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendors by City</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.vendorsByCity}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ city, percent }) => `${city} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.vendorsByCity.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pending Vendors - Only visible to users with approve_vendors permission */}
        {(userHasPermission(session, 'approve_vendors') || userHasPermission(session, 'manage_vendors')) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Pending Vendor Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendors.filter(v => !v.approved).map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16">
                        {vendor.images.length > 0 ? (
                          <Image
                            src={vendor.images[0]}
                            alt={vendor.name}
                            fill
                            className="object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{vendor.name}</h3>
                        <p className="text-sm text-gray-600">
                          {vendor.category} • {vendor.city}
                        </p>
                        <p className="text-sm text-gray-500">
                          By: {vendor.user.name || vendor.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {userHasPermission(session, 'manage_vendors') && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingVendor(vendor)}
                        >
                          Manage Images
                        </Button>
                      )}
                      {userHasPermission(session, 'approve_vendors') && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApproveVendor(vendor.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectVendor(vendor.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {vendors.filter(v => !v.approved).length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No pending vendor approvals
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Inquiries - Only visible to users with view_inquiries permission */}
        {userHasPermission(session, 'view_inquiries') && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inquiries.slice(0, 10).map((inquiry) => (
                  <div key={inquiry.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{inquiry.name}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Vendor:</strong> {inquiry.vendor.name}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Email:</strong> {inquiry.email}
                    </p>
                    <p className="text-sm text-gray-700">
                      {inquiry.message}
                    </p>
                  </div>
                ))}
                {inquiries.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No inquiries yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Management Modal */}
        {editingVendor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Manage Images - {editingVendor.name}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setEditingVendor(null)}
                >
                  Close
                </Button>
              </div>
              
              <ImageUpload
                images={editingVendor.images}
                onImagesChange={(images) => {
                  setEditingVendor({ ...editingVendor, images })
                }}
                maxImages={15}
              />
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setEditingVendor(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleUpdateVendorImages(editingVendor.id, editingVendor.images)}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
