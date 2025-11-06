import Header from '@/components/Header'
import Footer from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding Blog - Tips, Ideas & Inspiration | Wedding & Events',
  description: 'Expert advice, tips, and inspiration for planning your perfect wedding day. Read our latest articles on venues, catering, photography, and more.',
  keywords: 'wedding blog, wedding tips, wedding planning, wedding ideas, wedding inspiration, Pakistan weddings',
}

const blogPosts = [
  {
    id: 1,
    title: '10 Essential Tips for Planning Your Dream Wedding',
    excerpt: 'Planning a wedding can be overwhelming, but with these essential tips, you can create the perfect day without the stress.',
    author: 'Wedding Planning Team',
    date: 'March 15, 2024',
    category: 'Planning Tips',
    image: '/placeholder-image.jpg',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Top Wedding Venues in Karachi: A Complete Guide',
    excerpt: 'Discover the most beautiful and sought-after wedding venues in Karachi. From luxury hotels to traditional halls.',
    author: 'Venue Experts',
    date: 'March 10, 2024',
    category: 'Venues',
    image: '/placeholder-image.jpg',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'How to Choose the Perfect Catering Service',
    excerpt: 'Food is one of the most important aspects of any wedding. Learn how to select the perfect catering service for your big day.',
    author: 'Culinary Team',
    date: 'March 5, 2024',
    category: 'Catering',
    image: '/placeholder-image.jpg',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Wedding Photography Trends for 2024',
    excerpt: 'Stay ahead of the curve with the latest wedding photography trends. From drone shots to candid moments.',
    author: 'Photo Experts',
    date: 'February 28, 2024',
    category: 'Photography',
    image: '/placeholder-image.jpg',
    readTime: '4 min read'
  },
  {
    id: 5,
    title: 'Budget-Friendly Wedding Decoration Ideas',
    excerpt: 'Create stunning decorations without breaking the bank. Creative and affordable ideas for your wedding venue.',
    author: 'Design Team',
    date: 'February 20, 2024',
    category: 'Decoration',
    image: '/placeholder-image.jpg',
    readTime: '8 min read'
  },
  {
    id: 6,
    title: 'Bridal Fashion Trends: Traditional Meets Modern',
    excerpt: 'Explore the latest trends in bridal fashion, where traditional Pakistani designs meet contemporary styles.',
    author: 'Fashion Experts',
    date: 'February 15, 2024',
    category: 'Fashion',
    image: '/placeholder-image.jpg',
    readTime: '6 min read'
  }
]

export default function BlogsPage() {
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
        {/* Hero Section */}
        <section className="relative py-16">
          <div className="Left-Floral absolute left-0 top-0 z-0">
            <Image
              src="/uploads/Flower-1.png"
              alt="Left Floral"
              width={200}
              height={600}
            />
          </div>
          <div className="Right-Floral absolute right-0 top-0 z-0">
            <Image
              src="/uploads/Flower-2.png"
              alt="Right Floral"
              width={400}
              height={800}
            />
          </div>
          
          <div className="container-main mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
                Wedding Blog
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Expert advice, tips, and inspiration for planning your perfect wedding day
              </p>
            </div>
          </div>
        </section>

        {/* Featured Blog Post */}
        {blogPosts.length > 0 && (
          <section className="py-8 container-main mx-auto px-4">
            <div className="block">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full min-h-[400px]">
                    <Image
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <span className="text-[#d13f43] font-semibold text-sm mb-2">
                      {blogPosts[0].category}
                    </span>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>{blogPosts[0].author}</span>
                      <span className="mx-2">•</span>
                      <span>{blogPosts[0].date}</span>
                      <span className="mx-2">•</span>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <Button className="bg-[#d13f43] hover:bg-[#b82f33] text-white w-fit">
                      Read More
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Blog Posts Grid - Showing 3 demo blog cards */}
        <section className="py-12 container-main mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1, 4).map((post) => (
              <div key={post.id}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="text-[#d13f43] font-semibold text-xs mb-2 block">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="mt-4">
                      <Button variant="link" className="text-[#d13f43] p-0 h-auto">
                        Read More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section - Commented out until subscription is implemented */}
        {/* TODO: Re-enable newsletter section once subscription functionality is ready */}
        {/*
        <section className="py-16 bg-[#F7E9DB] mt-12">
          <div className="container-main mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest wedding tips, trends, and vendor updates delivered to your inbox
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex items-center rounded-full border-2 border-[#e2d2bc] bg-white p-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 flex-1 outline-none text-gray-700 placeholder-gray-400 rounded-full"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="bg-[#d13f43] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#b82f33] transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>
        */}
      </main>

      <Footer />
    </div>
  )
}

