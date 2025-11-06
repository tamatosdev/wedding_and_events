import Header from '@/components/Header'
import Footer from '@/components/footer'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Assume Venue 2 - Wedding & Events',
  description: 'Explore Assume Venue 2 - a premium wedding venue option',
}

export default function AssumeVenue2Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-[#d13f43] to-[#bf383c] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/placeholder-image.jpg"
                alt="Assume Venue 2"
                fill
                className="object-cover"
                unoptimized
                // TODO: Replace placeholder venue photos with actual images
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-bold text-center">Assume Venue 2</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card className="rounded-2xl shadow-lg p-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">About Assume Venue 2</h2>
                  <p className="text-gray-600 mb-6 text-lg">
                    {/* TODO: Awaiting SEO-optimized content */}
                    Assume Venue 2 provides an elegant setting for your wedding celebration. Contact us for more details about availability, pricing, and amenities.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Capacity</h3>
                      <p className="text-gray-600">300-500 guests</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Type</h3>
                      <p className="text-gray-600">Outdoor</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                      <p className="text-gray-600">Karachi</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Rating</h3>
                      <p className="text-gray-600">4.8 ⭐</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="rounded-2xl shadow-lg p-6 sticky top-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact</h3>
                  <p className="text-gray-600 mb-6">
                    Interested in booking this venue? Get in touch with us today.
                  </p>
                  
                  <Link href="/contact">
                    <Button className="w-full bg-[#d13f43] hover:bg-[#bf383c] text-white mb-4">
                      Contact Us
                    </Button>
                  </Link>
                  
                  <Link href="/venues">
                    <Button variant="outline" className="w-full">
                      View All Venues
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

