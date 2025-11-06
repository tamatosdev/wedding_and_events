'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// TODO: Replace with real channel data once provided
const channels = [
  {
    id: 1,
    title: 'Channel 1',
    features: ['Feature A', 'Feature B', 'Feature C'],
    image: '/assets/channel1.jpg',
    description: 'Premium wedding venue channel with luxury facilities',
    partners: [
      { id: 1, name: 'Partner A', image: '/placeholder-image.jpg' },
      { id: 2, name: 'Partner B', image: '/placeholder-image.jpg' },
    ],
  },
  {
    id: 2,
    title: 'Channel 2',
    features: ['Feature A', 'Feature B', 'Feature C'],
    image: '/assets/channel2.jpg',
    description: 'Modern event spaces with state-of-the-art amenities',
    partners: [
      { id: 1, name: 'Partner A', image: '/placeholder-image.jpg' },
      { id: 2, name: 'Partner B', image: '/placeholder-image.jpg' },
    ],
  },
  {
    id: 3,
    title: 'Channel 3',
    features: ['Feature A', 'Feature B', 'Feature C'],
    image: '/assets/channel3.jpg',
    description: 'Traditional venues with classic elegance',
    partners: [
      { id: 1, name: 'Partner A', image: '/placeholder-image.jpg' },
      { id: 2, name: 'Partner B', image: '/placeholder-image.jpg' },
    ],
  },
  {
    id: 4,
    title: 'Channel 4',
    features: ['Feature A', 'Feature B', 'Feature C'],
    image: '/assets/channel4.jpg',
    description: 'Outdoor venues perfect for garden weddings',
    partners: [
      { id: 1, name: 'Partner A', image: '/placeholder-image.jpg' },
      { id: 2, name: 'Partner B', image: '/placeholder-image.jpg' },
    ],
  },
  {
    id: 5,
    title: 'Channel 5',
    features: ['Feature A', 'Feature B', 'Feature C'],
    image: '/assets/channel5.jpg',
    description: 'Exclusive venues for intimate celebrations',
    partners: [
      { id: 1, name: 'Partner A', image: '/placeholder-image.jpg' },
      { id: 2, name: 'Partner B', image: '/placeholder-image.jpg' },
    ],
  },
]

export function ChannelsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our Wedding Venues
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {/* TODO: Awaiting SEO-optimized content */}
            Discover our curated selection of premium wedding venues
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {channels.map((channel) => (
            <Card
              key={channel.id}
              className="overflow-hidden hover:shadow-xl transition-shadow rounded-2xl shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={channel.image}
                  alt={channel.title}
                  fill
                  className="object-cover"
                  unoptimized
                  // TODO: Replace placeholder venue photos with actual images
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {channel.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Partners Section */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Partners:</h4>
                  <div className="flex gap-2">
                    {channel.partners.map((partner) => (
                      <div
                        key={partner.id}
                        className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg"
                      >
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                          unoptimized
                        />
                        <span className="text-sm text-gray-700">{partner.name}</span>
                      </div>
                    ))}
                  </div>
                  {/* TODO: Replace with real partner info */}
                </div>

                <Link href={`/channels/${channel.id}`}>
                  <Button className="w-full bg-[#d13f43] hover:bg-[#bf383c] text-white hover:scale-105 transition">
                    View Channel Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

