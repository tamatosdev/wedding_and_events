import { Suspense } from 'react'
import VendorsPage from './vendors-content'

export default function VendorsPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    }>
      <VendorsPage />
    </Suspense>
  )
}
