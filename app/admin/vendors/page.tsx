'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { canAccessAdmin } from '@/lib/auth-helpers-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ImageUpload } from '@/components/ui/image-upload'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import Image from 'next/image'

interface Vendor {
  id: string
  name: string
  category: string
  city: string
  pricing: string
  description: string
  images: string[]
  capacity?: string | null
  type?: string | null
  rating?: number | null
  reviews?: number | null
  approved: boolean
  createdAt: string
  user: {
    name: string | null
    email: string
  }
}

const CATEGORIES = [
  'Venue',
  'Boutiques',
  'Beauty Parlor',
  'Décor',
  'Catering',
  'Photography',
  'Makeup Artist',
  'DJ',
  'Florist',
  'Cake',
  'Other',
]

const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Sialkot',
]

const VENUE_TYPES = ['Hall', 'Outdoor', 'Marquee', 'Garden', 'Beach', 'Other']
const CAPACITY_RANGES = [
  '50-100',
  '100-300',
  '300-500',
  '500-1000',
  '1000-1500',
  '1500-2000',
  '2000+',
]

export default function AdminVendorsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    category: 'Venue',
    city: 'Karachi',
    pricing: '',
    description: '',
    images: [] as string[],
    capacity: '',
    type: '',
    rating: 0,
    reviews: 0,
    approved: true,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session && !canAccessAdmin(session)) {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (session && canAccessAdmin(session)) {
      fetchVendors()
    }
  }, [session])

  const fetchVendors = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/vendors')
      if (response.ok) {
        const data = await response.json()
        setVendors(data)
      }
    } catch (error) {
      console.error('Error fetching vendors:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleOpenDialog = (vendor?: Vendor) => {
    if (vendor) {
      setEditingVendor(vendor)
      setFormData({
        name: vendor.name,
        category: vendor.category,
        city: vendor.city,
        pricing: vendor.pricing,
        description: vendor.description,
        images: vendor.images || [],
        capacity: vendor.capacity || '',
        type: vendor.type || '',
        rating: vendor.rating || 0,
        reviews: vendor.reviews || 0,
        approved: vendor.approved,
      })
    } else {
      setEditingVendor(null)
      setFormData({
        name: '',
        category: 'Venue',
        city: 'Karachi',
        pricing: '',
        description: '',
        images: [],
        capacity: '',
        type: '',
        rating: 0,
        reviews: 0,
        approved: true,
      })
    }
    setError('')
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingVendor(null)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const payload = {
        ...formData,
        capacity: formData.capacity || null,
        type: formData.type || null,
        rating: formData.rating || 0,
        reviews: formData.reviews || 0,
      }

      let response
      if (editingVendor) {
        // Update existing vendor
        response = await fetch(`/api/admin/vendors/${editingVendor.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        // Create new vendor
        response = await fetch('/api/admin/vendors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to save vendor')
        return
      }

      handleCloseDialog()
      fetchVendors()
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Error saving vendor:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (vendorId: string) => {
    if (!confirm('Are you sure you want to delete this vendor? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/vendors/${vendorId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchVendors()
      } else {
        alert('Failed to delete vendor')
      }
    } catch (error) {
      console.error('Error deleting vendor:', error)
      alert('Failed to delete vendor')
    }
  }

  const filteredVendors = vendors.filter((vendor) => {
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter
    const matchesSearch =
      !searchQuery ||
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!session || !canAccessAdmin(session)) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Management</h1>
            <p className="text-gray-600">Add, edit, and manage vendors for all categories</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleOpenDialog()} className="bg-[#d13f43] hover:bg-[#b82f33]">
              + Add New Vendor
            </Button>
            <Link href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search vendors by name, city, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Vendors List */}
        <Card>
          <CardHeader>
            <CardTitle>
              Vendors ({filteredVendors.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredVendors.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {searchQuery || categoryFilter !== 'all'
                  ? 'No vendors match your filters'
                  : 'No vendors found. Click "Add New Vendor" to get started.'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                          <Badge variant={vendor.approved ? 'default' : 'secondary'}>
                            {vendor.approved ? 'Approved' : 'Pending'}
                          </Badge>
                          <Badge variant="outline">{vendor.category}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                          <div>
                            <span className="font-medium">City:</span> {vendor.city}
                          </div>
                          <div>
                            <span className="font-medium">Pricing:</span> {vendor.pricing}
                          </div>
                          {vendor.capacity && (
                            <div>
                              <span className="font-medium">Capacity:</span> {vendor.capacity}
                            </div>
                          )}
                          {vendor.type && (
                            <div>
                              <span className="font-medium">Type:</span> {vendor.type}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{vendor.description}</p>
                        {vendor.images && vendor.images.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {vendor.images.slice(0, 3).map((img, idx) => (
                              <div key={idx} className="w-16 h-16 relative rounded overflow-hidden">
                                <Image
                                  src={img}
                                  alt={`${vendor.name} ${idx + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                            {vendor.images.length > 3 && (
                              <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded text-xs text-gray-600">
                                +{vendor.images.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(vendor)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(vendor.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
              </DialogTitle>
              <DialogDescription>
                {editingVendor
                  ? 'Update vendor information and details'
                  : 'Create a new vendor listing with all details'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Vendor Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., Grand Wedding Hall"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) => setFormData({ ...formData, city: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="pricing">Pricing</Label>
                  <Input
                    id="pricing"
                    value={formData.pricing}
                    onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                    placeholder="e.g., Starting from Rs. 50,000"
                  />
                </div>
              </div>

              {formData.category === 'Venue' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Select
                      value={formData.capacity}
                      onValueChange={(value) => setFormData({ ...formData, capacity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select capacity range" />
                      </SelectTrigger>
                      <SelectContent>
                        {CAPACITY_RANGES.map((cap) => (
                          <SelectItem key={cap} value={cap}>
                            {cap} guests
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Venue Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select venue type" />
                      </SelectTrigger>
                      <SelectContent>
                        {VENUE_TYPES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  placeholder="Describe the vendor, services, features, etc."
                />
              </div>

              <div>
                <Label>Images</Label>
                <ImageUpload
                  images={formData.images || []}
                  onImagesChange={(images) => setFormData({ ...formData, images })}
                  maxImages={10}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="reviews">Number of Reviews</Label>
                  <Input
                    id="reviews"
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) =>
                      setFormData({ ...formData, reviews: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="approved"
                    checked={formData.approved}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, approved: checked })
                    }
                  />
                  <Label htmlFor="approved" className="cursor-pointer">
                    Approved
                  </Label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="bg-[#d13f43] hover:bg-[#b82f33]">
                  {saving ? 'Saving...' : editingVendor ? 'Update Vendor' : 'Create Vendor'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

