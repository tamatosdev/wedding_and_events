import { Suspense } from 'react'
import VenuesContent from './venues-content'

export default function VenuesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    }>
      <VenuesContent />
    </Suspense>
  )
}

