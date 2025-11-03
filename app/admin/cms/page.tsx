'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { canAccessAdmin } from '@/lib/auth-helpers-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import Link from 'next/link'

interface HomepageSection {
  id: string
  name: string
  title: string
  subtitle?: string
  content?: any
  visible: boolean
  order: number
}

interface FeaturedVendor {
  id: string
  vendorId: string
  order: number
  vendor: {
    id: string
    name: string
    category: string
    city: string
    images: string[]
  }
}

interface Vendor {
  id: string
  name: string
  category: string
  city: string
  images: string[]
}

interface SiteSettings {
  id: string
  homepageSettings: any
  seoSettings: any
}

export default function AdminCMSPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [featuredVendors, setFeaturedVendors] = useState<FeaturedVendor[]>([])
  const [allVendors, setAllVendors] = useState<Vendor[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [newFeaturedVendorId, setNewFeaturedVendorId] = useState<string>('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session && !canAccessAdmin(session)) {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (session && canAccessAdmin(session)) {
      fetchCMSData()
    }
  }, [session])

  const fetchCMSData = async () => {
    try {
      const [sectionsRes, featuredRes, vendorsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/settings?type=sections'),
        fetch('/api/admin/settings?type=featuredVendors'),
        fetch('/api/admin/vendors'),
        fetch('/api/admin/settings?type=siteSettings')
      ])

      if (sectionsRes.ok) {
        const data = await sectionsRes.json()
        setSections(data.sort((a: HomepageSection, b: HomepageSection) => a.order - b.order))
      }
      if (featuredRes.ok) {
        const data = await featuredRes.json()
        setFeaturedVendors(data.sort((a: FeaturedVendor, b: FeaturedVendor) => a.order - b.order))
      }
      if (vendorsRes.ok) {
        const data = await vendorsRes.json()
        setAllVendors(data)
      }
      if (settingsRes.ok) {
        const data = await settingsRes.json()
        setSiteSettings(data)
      }
    } catch (error) {
      console.error('Error fetching CMS data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSectionUpdate = async (id: string, updates: Partial<HomepageSection>) => {
    try {
      const response = await fetch(`/api/admin/settings?type=sections&id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (response.ok) {
        fetchCMSData()
      }
    } catch (error) {
      console.error('Error updating section:', error)
    }
  }

  const handleAddFeaturedVendor = async () => {
    if (!newFeaturedVendorId) return
    try {
      const response = await fetch('/api/admin/settings?type=featuredVendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId: newFeaturedVendorId }),
      })
      if (response.ok) {
        setNewFeaturedVendorId('')
        fetchCMSData()
      }
    } catch (error) {
      console.error('Error adding featured vendor:', error)
    }
  }

  const handleRemoveFeaturedVendor = async (id: string) => {
    if (!confirm('Are you sure you want to remove this featured vendor?')) return
    try {
      const response = await fetch(`/api/admin/settings?type=featuredVendors&id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchCMSData()
      }
    } catch (error) {
      console.error('Error removing featured vendor:', error)
    }
  }

  const handleReorderSections = async (draggedId: string, droppedId: string) => {
    const newSections = [...sections]
    const draggedIndex = newSections.findIndex(s => s.id === draggedId)
    const droppedIndex = newSections.findIndex(s => s.id === droppedId)

    if (draggedIndex === -1 || droppedIndex === -1) return

    const [draggedItem] = newSections.splice(draggedIndex, 1)
    newSections.splice(droppedIndex, 0, draggedItem)

    // Update order numbers
    const updatedSections = newSections.map((s, index) => ({ ...s, order: index }))
    setSections(updatedSections)

    // Send updates to API
    for (const section of updatedSections) {
      await handleSectionUpdate(section.id, { order: section.order })
    }
  }

  const handleReorderFeaturedVendors = async (draggedId: string, droppedId: string) => {
    const newFeatured = [...featuredVendors]
    const draggedIndex = newFeatured.findIndex(fv => fv.id === draggedId)
    const droppedIndex = newFeatured.findIndex(fv => fv.id === droppedId)

    if (draggedIndex === -1 || droppedIndex === -1) return

    const [draggedItem] = newFeatured.splice(draggedIndex, 1)
    newFeatured.splice(droppedIndex, 0, draggedItem)

    // Update order numbers
    const updatedFeatured = newFeatured.map((fv, index) => ({ ...fv, order: index }))
    setFeaturedVendors(updatedFeatured)

    // Send updates to API
    for (const featured of updatedFeatured) {
      try {
        await fetch(`/api/admin/settings?type=featuredVendors&id=${featured.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: featured.order }),
        })
      } catch (error) {
        console.error('Error updating featured vendor order:', error)
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
            <div className="grid grid-cols-1 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated' || !canAccessAdmin(session)) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Management System</h1>
            <p className="text-gray-600">Manage homepage sections and featured vendors</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/admin">
              <Button variant="outline">Back to Admin Dashboard</Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Homepage Sections Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Homepage Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-white"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('sectionId', section.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleReorderSections(e.dataTransfer.getData('sectionId'), section.id)}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{section.title}</h3>
                    <p className="text-sm text-gray-600">{section.name}</p>
                    {section.subtitle && (
                      <p className="text-sm text-gray-500 mt-1">{section.subtitle}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`visible-${section.id}`}>Visible</Label>
                      <Switch
                        id={`visible-${section.id}`}
                        checked={section.visible}
                        onCheckedChange={(checked) => handleSectionUpdate(section.id, { visible: checked })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label>Title:</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => handleSectionUpdate(section.id, { title: e.target.value })}
                        className="w-48"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label>Subtitle:</Label>
                      <Input
                        value={section.subtitle || ''}
                        onChange={(e) => handleSectionUpdate(section.id, { subtitle: e.target.value })}
                        className="w-48"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Vendors Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Featured Vendors on Homepage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex space-x-2">
              <Select
                onValueChange={setNewFeaturedVendorId}
                value={newFeaturedVendorId}
              >
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder="Select a vendor to feature" />
                </SelectTrigger>
                <SelectContent>
                  {allVendors.filter(v => !featuredVendors.some(fv => fv.vendorId === v.id)).map(vendor => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name} ({vendor.city})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddFeaturedVendor} disabled={!newFeaturedVendorId}>
                Add Featured Vendor
              </Button>
            </div>

            <div className="space-y-4">
              {featuredVendors.map((fv) => (
                <div
                  key={fv.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-white"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('featuredVendorId', fv.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleReorderFeaturedVendors(e.dataTransfer.getData('featuredVendorId'), fv.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      {fv.vendor.images && fv.vendor.images.length > 0 ? (
                        <Image
                          src={fv.vendor.images[0]}
                          alt={fv.vendor.name}
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
                      <h3 className="font-semibold">{fv.vendor.name}</h3>
                      <p className="text-sm text-gray-600">
                        {fv.vendor.category} • {fv.vendor.city}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveFeaturedVendor(fv.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              {featuredVendors.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No featured vendors yet. Add some above!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Site Settings */}
        {siteSettings && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Site Title</Label>
                  <Input
                    value={siteSettings.homepageSettings?.siteTitle || ''}
                    onChange={(e) => {
                      const newSettings = {
                        ...siteSettings,
                        homepageSettings: {
                          ...siteSettings.homepageSettings,
                          siteTitle: e.target.value
                        }
                      }
                      setSiteSettings(newSettings)
                    }}
                  />
                </div>
                <div>
                  <Label>Site Description</Label>
                  <Textarea
                    value={siteSettings.homepageSettings?.siteDescription || ''}
                    onChange={(e) => {
                      const newSettings = {
                        ...siteSettings,
                        homepageSettings: {
                          ...siteSettings.homepageSettings,
                          siteDescription: e.target.value
                        }
                      }
                      setSiteSettings(newSettings)
                    }}
                  />
                </div>
                <div>
                  <Label>Keywords</Label>
                  <Input
                    value={siteSettings.homepageSettings?.siteKeywords || ''}
                    onChange={(e) => {
                      const newSettings = {
                        ...siteSettings,
                        homepageSettings: {
                          ...siteSettings.homepageSettings,
                          siteKeywords: e.target.value
                        }
                      }
                      setSiteSettings(newSettings)
                    }}
                  />
                </div>
                <Button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/admin/settings?type=siteSettings', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(siteSettings),
                      })
                      if (response.ok) {
                        alert('Site settings saved successfully!')
                      }
                    } catch (error) {
                      console.error('Error saving site settings:', error)
                      alert('Failed to save site settings')
                    }
                  }}
                >
                  Save Site Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}