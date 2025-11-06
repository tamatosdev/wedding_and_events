import Header from '@/components/Header'
import Footer from '@/components/footer'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Channel Details - Wedding & Events',
  description: 'Explore our premium wedding venue channels',
}

// TODO: Replace with real channel data from API/database
const getChannelData = (id: string) => {
  const channels: Record<string, any> = {
    '1': {
      title: 'Channel 1',
      features: ['Feature A', 'Feature B', 'Feature C'],
      image: '/assets/channel1.jpg',
      description: 'Premium wedding venue channel with luxury facilities',
      partners: [
        { id: 1, name: 'Partner A', image: '/placeholder-image.jpg' },
        { id: 2, name: 'Partner B', image: '/placeholder-image.jpg' },
      ],
    },
    '2': {
      title: 'Channel 2',
      features: ['Feature A', 'Feature B', 'Feature C'],
      image: '/assets/channel2.jpg',
      description: 'Modern event spaces with state-of-the-art amenities',
      partners: [
        { id: 1, name: 'Partner A', image: '/placeholder-image.jpg' },
        { id: 2, name: 'Partner B', image: '/placeholder-image.jpg' },
      ],
    },
    '3': {
      title: 'Channel 3',
      features: ['Feature A', 'Feature B', 'Feature C'],
      image: '/assets/channel3.jpg',
      description: 'Traditional venues with classic elegance',
      partners: [
        { id: 1, name: 'Partner A', image: '/placeholder-image.jpg' },
        { id: 2, name: 'Partner B', image: '/placeholder-image.jpg' },
      ],
    },
    '4': {
      title: 'Channel 4',
      features: ['Feature A', 'Feature B', 'Feature C'],
      image: '/assets/channel4.jpg',
      description: 'Outdoor venues perfect for garden weddings',
      partners: [
        { id: 1, name: 'Partner A', image: '/placeholder-image.jpg' },
        { id: 2, name: 'Partner B', image: '/placeholder-image.jpg' },
      ],
    },
    '5': {
      title: 'Channel 5',
      features: ['Feature A', 'Feature B', 'Feature C'],
      image: '/assets/channel5.jpg',
      description: 'Exclusive venues for intimate celebrations',
      partners: [
        { id: 1, name: 'Partner A', image: '/placeholder-image.jpg' },
        { id: 2, name: 'Partner B', image: '/placeholder-image.jpg' },
      ],
    },
  }
  return channels[id] || channels['1']
}

export default async function ChannelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const channel = getChannelData(id)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-[#d13f43] to-[#bf383c] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={channel.image}
                alt={channel.title}
                fill
                className="object-cover"
                unoptimized
                // TODO: Replace placeholder venue photos with actual images
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-bold text-center">{channel.title}</h1>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Channel</h2>
                  <p className="text-gray-600 mb-6 text-lg">{channel.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-gray-600">
                      {/* TODO: Awaiting SEO-optimized content */}
                      This channel features premium wedding venues and services. Contact us to learn more about availability and pricing.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Features</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                    {channel.features.map((feature: string, idx: number) => (
                      <li key={idx} className="text-lg">{feature}</li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="rounded-2xl shadow-lg p-6 sticky top-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Partners</h3>
                  <div className="space-y-4">
                    {channel.partners.map((partner: any) => (
                      <div
                        key={partner.id}
                        className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                      >
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                          unoptimized
                        />
                        <span className="text-gray-900 font-medium">{partner.name}</span>
                      </div>
                    ))}
                  </div>
                  {/* TODO: Replace with real partner info */}
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link href="/contact">
                      <Button className="w-full bg-[#d13f43] hover:bg-[#bf383c] text-white">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
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

