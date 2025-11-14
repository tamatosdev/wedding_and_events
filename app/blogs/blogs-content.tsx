'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  published: boolean
  publishedAt: string | null
  tags: string[]
  category: string | null
  createdAt: string
  author: {
    id: string
    name: string | null
    email: string
  }
}

/**
 * Client component to fetch and display published blogs
 * Fetches blogs from /api/blogs endpoint
 */
export default function BlogsContent() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true)
        const response = await fetch('/api/blogs?limit=20')
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }
        
        const data = await response.json()
        setBlogs(data || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching blogs:', err)
        setError('Failed to load blogs. Please try again later.')
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Calculate read time (rough estimate: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min read`
  }

  if (loading) {
    return (
      <div className="py-12 container-main mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12 container-main mx-auto px-4">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="py-12 container-main mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
        </div>
      </div>
    )
  }

  const featuredBlog = blogs[0]
  const otherBlogs = blogs.slice(1)

  return (
    <>
      {/* Featured Blog Post */}
      {featuredBlog && (
        <section className="py-8 container-main mx-auto px-4">
          <div className="block">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full min-h-[400px]">
                  {featuredBlog.featuredImage ? (
                    <Image
                      src={featuredBlog.featuredImage}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  {featuredBlog.category && (
                    <span className="text-[#d13f43] font-semibold text-sm mb-2">
                      {featuredBlog.category}
                    </span>
                  )}
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    {featuredBlog.title}
                  </h2>
                  {featuredBlog.excerpt && (
                    <p className="text-gray-600 mb-4">{featuredBlog.excerpt}</p>
                  )}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{featuredBlog.author.name || featuredBlog.author.email}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(featuredBlog.publishedAt || featuredBlog.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <span>{calculateReadTime(featuredBlog.content)}</span>
                  </div>
                  <Link href={`/blogs/${featuredBlog.slug}`}>
                    <Button className="bg-[#d13f43] hover:bg-[#b82f33] text-white w-fit">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      {otherBlogs.length > 0 && (
        <section className="py-12 container-main mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherBlogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
                  <div className="relative h-48">
                    {blog.featuredImage ? (
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    {blog.category && (
                      <span className="text-[#d13f43] font-semibold text-xs mb-2 block">
                        {blog.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{blog.author.name || blog.author.email}</span>
                      <span>{calculateReadTime(blog.content)}</span>
                    </div>
                    <div className="mt-4">
                      <Button variant="link" className="text-[#d13f43] p-0 h-auto">
                        Read More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

