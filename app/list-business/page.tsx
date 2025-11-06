'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ListBusinessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new partner onboarding page
    router.replace('/partner-onboarding')
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600 mb-4">Redirecting to Partner Onboarding...</p>
        <a href="/partner-onboarding" className="text-[#D13F43] hover:underline">
          Click here if you are not redirected automatically
        </a>
      </div>
    </div>
  )
}
