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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Content Editor Component
function ContentEditor({ content, onSave, onCancel }: { content: HomepageContent; onSave: (data: HomepageContent) => void; onCancel: () => void }) {
  const [editedContent, setEditedContent] = useState<HomepageContent>({ ...content })

  const updateField = (field: keyof HomepageContent, value: any) => {
    setEditedContent(prev => ({ ...prev, [field]: value }))
  }

  const updateContentField = (field: string, value: any) => {
    setEditedContent(prev => ({
      ...prev,
      content: { ...prev.content, [field]: value }
    }))
  }

  const addImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      setEditedContent(prev => ({
        ...prev,
        images: [...(prev.images || []), url]
      }))
    }
  }

  const removeImage = (index: number) => {
    setEditedContent(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const renderEditor = () => {
    switch (content.section) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Textarea
                value={editedContent.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Use \n for line breaks"
              />
            </div>
            <div>
              <Label>Categories (comma-separated)</Label>
              <Input
                value={editedContent.content?.categories?.join(', ') || ''}
                onChange={(e) => updateContentField('categories', e.target.value.split(',').map(s => s.trim()))}
              />
            </div>
            <div>
              <Label>Cities (comma-separated)</Label>
              <Input
                value={editedContent.content?.cities?.join(', ') || ''}
                onChange={(e) => updateContentField('cities', e.target.value.split(',').map(s => s.trim()))}
              />
            </div>
            <div>
              <Label>Hero Images</Label>
              <div className="space-y-2">
                {editedContent.images?.map((img, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Input value={img} onChange={(e) => {
                      const newImages = [...editedContent.images]
                      newImages[i] = e.target.value
                      updateField('images', newImages)
                    }} />
                    <Button size="sm" variant="destructive" onClick={() => removeImage(i)}>Remove</Button>
                  </div>
                ))}
                <Button size="sm" onClick={addImage}>Add Image</Button>
              </div>
            </div>
          </div>
        )

      case 'categories':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Textarea
                value={editedContent.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Use \n for line breaks"
              />
            </div>
            <div>
              <Label>Category Items</Label>
              <div className="space-y-4">
                {(editedContent.content?.items || []).map((item: any, i: number) => (
                  <Card key={i} className="p-4">
                    <div className="space-y-2">
                      <Input placeholder="Name" value={item.name || ''} onChange={(e) => {
                        const items = [...(editedContent.content?.items || [])]
                        items[i] = { ...items[i], name: e.target.value }
                        updateContentField('items', items)
                      }} />
                      <Input placeholder="Category" value={item.category || ''} onChange={(e) => {
                        const items = [...(editedContent.content?.items || [])]
                        items[i] = { ...items[i], category: e.target.value }
                        updateContentField('items', items)
                      }} />
                      <Input placeholder="Image URL" value={item.image || ''} onChange={(e) => {
                        const items = [...(editedContent.content?.items || [])]
                        items[i] = { ...items[i], image: e.target.value }
                        updateContentField('items', items)
                      }} />
                      <Input placeholder="Link" value={item.link || ''} onChange={(e) => {
                        const items = [...(editedContent.content?.items || [])]
                        items[i] = { ...items[i], link: e.target.value }
                        updateContentField('items', items)
                      }} />
                    </div>
                  </Card>
                ))}
                <Button size="sm" onClick={() => {
                  const items = [...(editedContent.content?.items || []), { name: '', category: '', image: '', link: '' }]
                  updateContentField('items', items)
                }}>Add Category</Button>
              </div>
            </div>
            <div>
              <Label>Floral Images</Label>
              <div className="space-y-2">
                {[0, 1].map(i => (
                  <Input
                    key={i}
                    value={editedContent.images?.[i] || ''}
                    onChange={(e) => {
                      const newImages = [...(editedContent.images || [])]
                      newImages[i] = e.target.value
                      while (newImages.length < 2) newImages.push('')
                      updateField('images', newImages)
                    }}
                    placeholder={`Floral image ${i + 1} URL`}
                  />
                ))}
              </div>
            </div>
          </div>
        )

      case 'banner':
        return (
          <div className="space-y-4">
            <Label>Banner Items</Label>
            <div className="space-y-4">
              {(editedContent.content?.items || []).map((item: any, i: number) => (
                <Card key={i} className="p-4">
                  <div className="space-y-2">
                    <Input placeholder="Image URL" value={item.image || ''} onChange={(e) => {
                      const items = [...(editedContent.content?.items || [])]
                      items[i] = { ...items[i], image: e.target.value }
                      updateContentField('items', items)
                    }} />
                    <Input placeholder="Alt Text" value={item.alt || ''} onChange={(e) => {
                      const items = [...(editedContent.content?.items || [])]
                      items[i] = { ...items[i], alt: e.target.value }
                      updateContentField('items', items)
                    }} />
                    <Input placeholder="Link URL" value={item.link || ''} onChange={(e) => {
                      const items = [...(editedContent.content?.items || [])]
                      items[i] = { ...items[i], link: e.target.value }
                      updateContentField('items', items)
                    }} />
                  </div>
                </Card>
              ))}
              <Button size="sm" onClick={() => {
                const items = [...(editedContent.content?.items || []), { id: Date.now(), image: '', alt: '', link: '' }]
                updateContentField('items', items)
              }}>Add Banner</Button>
            </div>
          </div>
        )

      case 'testimonials':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editedContent.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
              />
            </div>
            <div>
              <Label>Testimonials</Label>
              <div className="space-y-4">
                {(editedContent.content?.items || []).map((item: any, i: number) => (
                  <Card key={i} className="p-4">
                    <div className="space-y-2">
                      <Textarea placeholder="Quote" value={item.quote || ''} onChange={(e) => {
                        const items = [...(editedContent.content?.items || [])]
                        items[i] = { ...items[i], quote: e.target.value }
                        updateContentField('items', items)
                      }} />
                      <Input placeholder="Author" value={item.author || ''} onChange={(e) => {
                        const items = [...(editedContent.content?.items || [])]
                        items[i] = { ...items[i], author: e.target.value }
                        updateContentField('items', items)
                      }} />
                      <Input placeholder="Image URL" value={item.image || ''} onChange={(e) => {
                        const items = [...(editedContent.content?.items || [])]
                        items[i] = { ...items[i], image: e.target.value }
                        updateContentField('items', items)
                      }} />
                    </div>
                  </Card>
                ))}
                <Button size="sm" onClick={() => {
                  const items = [...(editedContent.content?.items || []), { id: Date.now(), quote: '', author: '', image: '' }]
                  updateContentField('items', items)
                }}>Add Testimonial</Button>
              </div>
            </div>
          </div>
        )

      case 'faq':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editedContent.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={editedContent.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
              />
            </div>
            <div>
              <Label>FAQ Items</Label>
              <div className="space-y-4">
                {(editedContent.content?.items || []).map((item: any, i: number) => (
                  <Card key={i} className="p-4">
                    <div className="space-y-2">
                      <Input placeholder="Question" value={item.question || ''} onChange={(e) => {
                        const items = [...(editedContent.content?.items || [])]
                        items[i] = { ...items[i], question: e.target.value }
                        updateContentField('items', items)
                      }} />
                      <Textarea placeholder="Answer" value={item.answer || ''} onChange={(e) => {
                        const items = [...(editedContent.content?.items || [])]
                        items[i] = { ...items[i], answer: e.target.value }
                        updateContentField('items', items)
                      }} />
                    </div>
                  </Card>
                ))}
                <Button size="sm" onClick={() => {
                  const items = [...(editedContent.content?.items || []), { id: Date.now(), question: '', answer: '' }]
                  updateContentField('items', items)
                }}>Add FAQ</Button>
              </div>
            </div>
          </div>
        )

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Textarea
                value={editedContent.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Use \n for line breaks"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editedContent.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>
            <div>
              <Label>Buttons</Label>
              <div className="space-y-4">
                {(editedContent.content?.buttons || []).map((button: any, i: number) => (
                  <Card key={i} className="p-4">
                    <div className="space-y-2">
                      <Input placeholder="Button Text" value={button.text || ''} onChange={(e) => {
                        const buttons = [...(editedContent.content?.buttons || [])]
                        buttons[i] = { ...buttons[i], text: e.target.value }
                        updateContentField('buttons', buttons)
                      }} />
                      <Input placeholder="Link URL" value={button.link || ''} onChange={(e) => {
                        const buttons = [...(editedContent.content?.buttons || [])]
                        buttons[i] = { ...buttons[i], link: e.target.value }
                        updateContentField('buttons', buttons)
                      }} />
                      <Select value={button.variant || 'primary'} onValueChange={(value) => {
                        const buttons = [...(editedContent.content?.buttons || [])]
                        buttons[i] = { ...buttons[i], variant: value }
                        updateContentField('buttons', buttons)
                      }}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </Card>
                ))}
                <Button size="sm" onClick={() => {
                  const buttons = [...(editedContent.content?.buttons || []), { text: '', link: '', variant: 'primary' }]
                  updateContentField('buttons', buttons)
                }}>Add Button</Button>
              </div>
            </div>
            <div>
              <Label>Floral Images</Label>
              <div className="space-y-2">
                {[0, 1].map(i => (
                  <Input
                    key={i}
                    value={editedContent.images?.[i] || ''}
                    onChange={(e) => {
                      const newImages = [...(editedContent.images || [])]
                      newImages[i] = e.target.value
                      while (newImages.length < 2) newImages.push('')
                      updateField('images', newImages)
                    }}
                    placeholder={`Floral image ${i + 1} URL`}
                  />
                ))}
              </div>
            </div>
          </div>
        )

      case 'process':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editedContent.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
              />
            </div>
            <div>
              <Label>Steps</Label>
              <div className="space-y-4">
                {(editedContent.content?.steps || []).map((step: any, i: number) => (
                  <Card key={i} className="p-4">
                    <div className="space-y-2">
                      <Input placeholder="Step Number (e.g., STEP 01)" value={step.step || ''} onChange={(e) => {
                        const steps = [...(editedContent.content?.steps || [])]
                        steps[i] = { ...steps[i], step: e.target.value }
                        updateContentField('steps', steps)
                      }} />
                      <Input placeholder="Title" value={step.title || ''} onChange={(e) => {
                        const steps = [...(editedContent.content?.steps || [])]
                        steps[i] = { ...steps[i], title: e.target.value }
                        updateContentField('steps', steps)
                      }} />
                      <Textarea placeholder="Description" value={step.description || ''} onChange={(e) => {
                        const steps = [...(editedContent.content?.steps || [])]
                        steps[i] = { ...steps[i], description: e.target.value }
                        updateContentField('steps', steps)
                      }} />
                    </div>
                  </Card>
                ))}
                <Button size="sm" onClick={() => {
                  const steps = [...(editedContent.content?.steps || []), { step: '', title: '', description: '' }]
                  updateContentField('steps', steps)
                }}>Add Step</Button>
              </div>
            </div>
            <div>
              <Label>Floral Images</Label>
              <div className="space-y-2">
                {[0, 1].map(i => (
                  <Input
                    key={i}
                    value={editedContent.images?.[i] || ''}
                    onChange={(e) => {
                      const newImages = [...(editedContent.images || [])]
                      newImages[i] = e.target.value
                      while (newImages.length < 2) newImages.push('')
                      updateField('images', newImages)
                    }}
                    placeholder={`Floral image ${i + 1} URL`}
                  />
                ))}
              </div>
            </div>
          </div>
        )

      case 'planning':
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editedContent.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
              />
            </div>
            <div>
              <Label>Paragraphs</Label>
              <div className="space-y-2">
                {(editedContent.content?.paragraphs || []).map((para: string, i: number) => (
                  <Textarea
                    key={i}
                    value={para}
                    onChange={(e) => {
                      const paragraphs = [...(editedContent.content?.paragraphs || [])]
                      paragraphs[i] = e.target.value
                      updateContentField('paragraphs', paragraphs)
                    }}
                    placeholder={`Paragraph ${i + 1}`}
                  />
                ))}
                <Button size="sm" onClick={() => {
                  const paragraphs = [...(editedContent.content?.paragraphs || []), '']
                  updateContentField('paragraphs', paragraphs)
                }}>Add Paragraph</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Button Text</Label>
                <Input
                  value={editedContent.content?.buttonText || ''}
                  onChange={(e) => updateContentField('buttonText', e.target.value)}
                />
              </div>
              <div>
                <Label>Button Link</Label>
                <Input
                  value={editedContent.content?.buttonLink || ''}
                  onChange={(e) => updateContentField('buttonLink', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Images (Main, Left Floral, Right Floral)</Label>
              <div className="space-y-2">
                {[0, 1, 2].map(i => (
                  <Input
                    key={i}
                    value={editedContent.images?.[i] || ''}
                    onChange={(e) => {
                      const newImages = [...(editedContent.images || [])]
                      newImages[i] = e.target.value
                      while (newImages.length < 3) newImages.push('')
                      updateField('images', newImages)
                    }}
                    placeholder={i === 0 ? 'Main image URL' : `Floral image ${i} URL`}
                  />
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editedContent.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={editedContent.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editedContent.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>
            <div>
              <Label>Content (JSON)</Label>
              <Textarea
                value={JSON.stringify(editedContent.content || {}, null, 2)}
                onChange={(e) => {
                  try {
                    updateField('content', JSON.parse(e.target.value))
                  } catch {}
                }}
                className="font-mono text-sm"
                rows={10}
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="space-y-4">
          {renderEditor()}
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <div>
            <Label>Visible</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Switch
                checked={editedContent.visible}
                onCheckedChange={(checked) => updateField('visible', checked)}
              />
              <span className="text-sm text-gray-600">{editedContent.visible ? 'Visible on homepage' : 'Hidden'}</span>
            </div>
          </div>
          <div>
            <Label>Order</Label>
            <Input
              type="number"
              value={editedContent.order}
              onChange={(e) => updateField('order', parseInt(e.target.value) || 0)}
            />
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(editedContent)}>Save Changes</Button>
      </div>
    </div>
  )
}

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

interface HomepageContent {
  id: string
  section: string
  title?: string
  subtitle?: string
  description?: string
  content?: any
  images: string[]
  visible: boolean
  order: number
}

export default function AdminCMSPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [contentBlocks, setContentBlocks] = useState<HomepageContent[]>([])
  const [editingContent, setEditingContent] = useState<HomepageContent | null>(null)
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
      const [sectionsRes, contentRes, featuredRes, vendorsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/settings?type=sections'),
        fetch('/api/admin/settings?type=content'),
        fetch('/api/admin/settings?type=featuredVendors'),
        fetch('/api/admin/vendors'),
        fetch('/api/admin/settings?type=siteSettings')
      ])

      if (sectionsRes.ok) {
        const data = await sectionsRes.json()
        setSections(data.sort((a: HomepageSection, b: HomepageSection) => a.order - b.order))
      }
      if (contentRes.ok) {
        const data = await contentRes.json()
        setContentBlocks(data.sort((a: HomepageContent, b: HomepageContent) => a.order - b.order))
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

  const handleContentUpdate = async (contentData: HomepageContent) => {
    try {
      const response = await fetch('/api/admin/settings?type=content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentData),
      })
      if (response.ok) {
        setEditingContent(null)
        fetchCMSData()
        alert('Content updated successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to update: ${error.error}`)
      }
    } catch (error) {
      console.error('Error updating content:', error)
      alert('Failed to update content')
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

        {/* Homepage Content Blocks Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Homepage Content Blocks</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Edit all homepage content including hero, categories, banners, testimonials, FAQ, and more
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentBlocks.map((content) => (
                <div
                  key={content.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg capitalize">{content.section}</h3>
                    {content.title && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{content.title}</p>
                    )}
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${content.visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {content.visible ? 'Visible' : 'Hidden'}
                      </span>
                      <span className="text-xs text-gray-500">Order: {content.order}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setEditingContent(content)}
                    variant="outline"
                  >
                    Edit Content
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Editor Modal */}
        {editingContent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold capitalize">Edit {editingContent.section} Content</h2>
                <Button variant="outline" onClick={() => setEditingContent(null)}>Close</Button>
              </div>
              <div className="p-6">
                <ContentEditor
                  content={editingContent}
                  onSave={handleContentUpdate}
                  onCancel={() => setEditingContent(null)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Homepage Sections Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Homepage Sections (Legacy)</CardTitle>
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