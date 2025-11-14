import { Suspense } from 'react'
import VenuesContent from './venues-content'
import { ChannelsSection } from '@/components/home/channels-section'
import Footer from '@/components/footer'

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-pulse text-gray-600">Loading...</div>
        </div>
      }>
        <VenuesContent />
        {/* Channels Section - Displaying 5 venue channels */}
        <ChannelsSection />
        <Footer />
      </Suspense>
    </div>
  )
}

