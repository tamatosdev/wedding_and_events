'use client'

/**
 * LEGACY ROUTE - Redirected to Partner Onboarding
 * 
 * This route has been consolidated into /partner-onboarding
 * Old venue submissions are still accessible via /admin/venue-submissions
 * 
 * @deprecated Use /partner-onboarding?type=wedding instead
 */

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VenueOnboardingPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to new partner onboarding with wedding type pre-selected
    router.replace('/partner-onboarding?type=wedding')
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600 mb-4">Redirecting to Partner Onboarding...</p>
        <a href="/partner-onboarding?type=wedding" className="text-[#D13F43] hover:underline">
          Click here if you are not redirected automatically
        </a>
      </div>
    </div>
  )
}
