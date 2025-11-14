import Header from '@/components/Header'
import Footer from '@/components/footer'
import Image from 'next/image'
import { Metadata } from 'next'
import BlogsContent from './blogs-content'

export const metadata: Metadata = {
  title: 'Wedding Blog - Tips, Ideas & Inspiration | Wedding & Events',
  description: 'Expert advice, tips, and inspiration for planning your perfect wedding day. Read our latest articles on venues, catering, photography, and more.',
  keywords: 'wedding blog, wedding tips, wedding planning, wedding ideas, wedding inspiration, Pakistan weddings',
}

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

        {/* Blog Content - Fetched from API */}
        <BlogsContent />

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

