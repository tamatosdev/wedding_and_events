'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ImageUpload } from '@/components/ui/image-upload'
import Image from 'next/image'
import { canAccessAdmin } from '@/lib/auth-helpers-client'

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
}

export default function VendorDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    city: '',
    pricing: '',
    description: '',
    images: [] as string[],
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session?.user.role !== 'VENDOR') {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (session?.user.role === 'VENDOR') {
      fetchVendors()
    }
  }, [session])

  const fetchVendors = async () => {
    try {
      const response = await fetch('/api/vendor/vendors')
      if (response.ok) {
        const data = await response.json()
        setVendors(data)
      }
    } catch (error) {
      console.error('Error fetching vendors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingVendor 
        ? `/api/vendor/vendors/${editingVendor.id}`
        : '/api/vendor/vendors'
      
      const method = editingVendor ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowForm(false)
        setEditingVendor(null)
        setFormData({
          name: '',
          category: '',
          city: '',
          pricing: '',
          description: '',
          images: [],
        })
        fetchVendors()
      }
    } catch (error) {
      console.error('Error saving vendor:', error)
    }
  }

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor)
    setFormData({
      name: vendor.name,
      category: vendor.category,
      city: vendor.city,
      pricing: vendor.pricing,
      description: vendor.description,
      images: vendor.images,
    })
    setShowForm(true)
  }

  const handleDelete = async (vendorId: string) => {
    if (confirm('Are you sure you want to delete this vendor listing?')) {
      try {
        const response = await fetch(`/api/vendor/vendors/${vendorId}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchVendors()
        }
      } catch (error) {
        console.error('Error deleting vendor:', error)
      }
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
            <p className="text-gray-600">Manage your vendor listings</p>
          </div>
          <div className="flex space-x-2">
            {session && canAccessAdmin(session) && (
              <Link href="/admin">
                <Button variant="outline" className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600">
                  Admin Panel
                </Button>
              </Link>
            )}
            <Button onClick={() => setShowForm(true)}>
              Add New Listing
            </Button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingVendor ? 'Edit Vendor Listing' : 'Add New Vendor Listing'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Vendor Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Venue">Venue</option>
                      <option value="Catering">Catering</option>
                      <option value="Photography">Photography</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Decorations">Decorations</option>
                      <option value="Music">Music</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Transport">Transport</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <select
                      id="city"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                    >
                      <option value="">Select City</option>
                      <option value="Karachi">Karachi</option>
                      {/* Only Karachi is supported */}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="pricing">Pricing</Label>
                    <Input
                      id="pricing"
                      value={formData.pricing}
                      onChange={(e) =>
                        setFormData({ ...formData, pricing: e.target.value })
                      }
                      placeholder="e.g., PKR 50,000 - 100,000"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe your services..."
                    required
                  />
                </div>
                
                {/* Image Upload Section - TypeScript Error Fixed */}
                <div>
                  <Label>Images</Label>
                  <ImageUpload
                    images={formData.images}
                    onImagesChange={(images) => setFormData({ ...formData, images })}
                    maxImages={10}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit">
                    {editingVendor ? 'Update' : 'Create'} Listing
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingVendor(null)
                      setFormData({
                        name: '',
                        category: '',
                        city: '',
                        pricing: '',
                        description: '',
                        images: [],
                      })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Vendor Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="overflow-hidden">
              <div className="relative h-48">
                {vendor.images.length > 0 ? (
                  <Image
                    src={vendor.images[0]}
                    alt={vendor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      vendor.approved
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {vendor.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{vendor.name}</CardTitle>
                <p className="text-sm text-gray-600">
                  {vendor.category} • {vendor.city}
                </p>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {vendor.description}
                </p>
                <p className="text-sm font-semibold text-primary mb-4">
                  {vendor.pricing}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(vendor)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(vendor.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {vendors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No vendor listings yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first vendor listing to get started
            </p>
            <Button onClick={() => setShowForm(true)}>
              Add Your First Listing
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
