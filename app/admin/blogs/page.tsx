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
  const [publishedFilter, setPublishedFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [searchQuery, setSearchQuery] = useState('')

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

  // Dialog handlers removed - now using separate pages

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
            <Link href="/admin/blogs/new">
              <Button className="bg-[#d13f43] hover:bg-[#b82f33]">
                + Add New Blog
              </Button>
            </Link>
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
                    onClick={() => router.push(`/admin/blogs/${blog.id}/edit`)}
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
                onClick={() => router.push('/admin/blogs/new')}
                className="mt-4 bg-[#d13f43] hover:bg-[#b82f33]"
              >
                Create Your First Blog
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}

