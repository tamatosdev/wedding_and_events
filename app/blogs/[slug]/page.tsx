import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/footer'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import BlogContent from './blog-content'

export const dynamic = 'force-dynamic'

interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await prisma.blog.findUnique({
    where: { 
      slug: slug,
      published: true, // Only published blogs
    },
    select: {
      title: true,
      excerpt: true,
      seoTitle: true,
      seoDescription: true,
      featuredImage: true,
    },
  })

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription || blog.excerpt || undefined,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || undefined,
      images: blog.featuredImage ? [blog.featuredImage] : undefined,
    },
  }
}

/**
 * Blog Detail Page
 * Fetches blog by slug and displays full content
 */
export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = await prisma.blog.findUnique({
    where: { 
      slug: slug,
      published: true, // Only show published blogs
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  if (!blog) {
    notFound()
  }

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Calculate read time
  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min read`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Left Border */}
      <img
        src="/uploads/Border.png"
        alt="Left Border"
        className="site-border left"
      />
      {/* Right Border */}
      <img
        src="/uploads/Border.png"
        alt="Right Border"
        className="site-border right"
      />
      <Header />

      <main className="mt-20">
        <article className="container-main mx-auto px-4 py-12 max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <a
              href="/blogs"
              className="text-[#d13f43] hover:underline flex items-center gap-2"
            >
              ← Back to Blogs
            </a>
          </div>

          {/* Blog Header */}
          <header className="mb-8">
            {blog.category && (
              <span className="text-[#d13f43] font-semibold text-sm mb-4 block">
                {blog.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="text-xl text-gray-600 mb-6">
                {blog.excerpt}
              </p>
            )}
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span>{blog.author.name || blog.author.email}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              <span className="mx-2">•</span>
              <span>{calculateReadTime(blog.content)}</span>
            </div>
          </header>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          )}

          {/* Blog Content */}
          <BlogContent content={blog.content} />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  )
}

