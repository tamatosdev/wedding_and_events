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
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ImageUpload } from '@/components/ui/image-upload'
import Link from 'next/link'
import Image from 'next/image'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  published: boolean
  publishedAt: string | null
  views: number
  tags: string[]
  category: string | null
  seoTitle: string | null
  seoDescription: string | null
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string | null
    email: string
  }
}

const BLOG_CATEGORIES = [
  'Wedding Tips',
  'Event Planning',
  'Vendor Spotlight',
  'Trends & Inspiration',
  'Real Weddings',
  'DIY Ideas',
  'Venue Reviews',
  'Other',
]

export default function AdminBlogsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [publishedFilter, setPublishedFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    published: false,
    tags: [] as string[],
    category: '',
    seoTitle: '',
    seoDescription: '',
  })

  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session && !canAccessAdmin(session)) {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (session && canAccessAdmin(session)) {
      fetchBlogs()
    }
  }, [session])

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true)
      let url = '/api/admin/blogs?'
      if (publishedFilter === 'published') {
        url += 'published=true'
      } else if (publishedFilter === 'draft') {
        url += 'published=false'
      }
      if (searchQuery) {
        url += (url.includes('published') ? '&' : '') + `search=${encodeURIComponent(searchQuery)}`
      }

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setBlogs(data)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }, [publishedFilter, searchQuery])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleOpenDialog = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog)
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt || '',
        content: blog.content,
        featuredImage: blog.featuredImage || '',
        published: blog.published,
        tags: blog.tags || [],
        category: blog.category || '',
        seoTitle: blog.seoTitle || '',
        seoDescription: blog.seoDescription || '',
      })
    } else {
      setEditingBlog(null)
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        published: false,
        tags: [],
        category: '',
        seoTitle: '',
        seoDescription: '',
      })
    }
    setError('')
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingBlog(null)
    setError('')
    setTagInput('')
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) })
  }

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.content) {
      setError('Please fill in all required fields (title, slug, content)')
      return
    }

    setSaving(true)
    setError('')

    try {
      const payload = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
      }

      let response
      if (editingBlog) {
        response = await fetch(`/api/admin/blogs/${editingBlog.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        response = await fetch('/api/admin/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to save blog')
        return
      }

      handleCloseDialog()
      fetchBlogs()
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Error saving blog:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchBlogs()
      } else {
        alert('Failed to delete blog')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Failed to delete blog')
    }
  }

  const filteredBlogs = blogs.filter((blog) => {
    const matchesPublished =
      publishedFilter === 'all' ||
      (publishedFilter === 'published' && blog.published) ||
      (publishedFilter === 'draft' && !blog.published)
    const matchesSearch =
      !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesPublished && matchesSearch
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Management</h1>
            <p className="text-gray-600">Create, edit, and manage blog posts</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleOpenDialog()} className="bg-[#d13f43] hover:bg-[#b82f33]">
              + Add New Blog
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
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={publishedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setPublishedFilter('all')}
            >
              All
            </Button>
            <Button
              variant={publishedFilter === 'published' ? 'default' : 'outline'}
              onClick={() => setPublishedFilter('published')}
            >
              Published
            </Button>
            <Button
              variant={publishedFilter === 'draft' ? 'default' : 'outline'}
              onClick={() => setPublishedFilter('draft')}
            >
              Drafts
            </Button>
          </div>
        </div>

        {/* Blogs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                  <div className="flex gap-2">
                    {blog.published ? (
                      <Badge className="bg-green-500">Published</Badge>
                    ) : (
                      <Badge className="bg-gray-500">Draft</Badge>
                    )}
                  </div>
                </div>
                {blog.featuredImage && (
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {blog.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3">{blog.excerpt}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span>{blog.views} views</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(blog)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlogs.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 text-lg">No blogs found</p>
              <Button
                onClick={() => handleOpenDialog()}
                className="mt-4 bg-[#d13f43] hover:bg-[#b82f33]"
              >
                Create Your First Blog
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Blog Form Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</DialogTitle>
              <DialogDescription>
                {editingBlog ? 'Update blog post details' : 'Fill in the details to create a new blog post'}
              </DialogDescription>
            </DialogHeader>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value })
                    if (!editingBlog && !formData.slug) {
                      setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }))
                    }
                  }}
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="blog-post-url-slug"
                />
                <p className="text-xs text-gray-500 mt-1">URL-friendly version of the title</p>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short description of the blog post"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here..."
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>

              <div>
                <Label>Featured Image</Label>
                <ImageUpload
                  images={formData.featuredImage ? [formData.featuredImage] : []}
                  onImagesChange={(images) => setFormData({ ...formData, featuredImage: images[0] || '' })}
                  maxImages={1}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select Category</option>
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Published</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <span className="text-sm text-gray-600">
                      {formData.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                    placeholder="Add a tag and press Enter"
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="SEO optimized title"
                />
              </div>

              <div>
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="SEO meta description"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving} className="bg-[#d13f43] hover:bg-[#b82f33]">
                {saving ? 'Saving...' : editingBlog ? 'Update Blog' : 'Create Blog'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

