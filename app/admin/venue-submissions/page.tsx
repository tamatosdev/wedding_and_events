'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { canAccessAdmin } from '@/lib/auth-helpers-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Eye, Search, Filter } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface VenueSubmission {
  id: string
  ownerName: string
  ownerEmail: string
  businessName: string
  city: string
  venuePricingRange: string
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'CONTACTED'
  createdAt: string
}

export default function VenueSubmissionsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [submissions, setSubmissions] = useState<VenueSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }
    
    if (session && !canAccessAdmin(session)) {
      router.push('/')
      return
    }
  }, [session, status, router])

  useEffect(() => {
    if (session && canAccessAdmin(session)) {
      fetchSubmissions()
    }
  }, [session, currentPage, statusFilter])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      })
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }

      const response = await fetch(`/api/venue-onboarding?${params}`)
      if (!response.ok) throw new Error('Failed to fetch submissions')
      
      const data = await response.json()
      setSubmissions(data.submissions || [])
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      UNDER_REVIEW: 'bg-blue-100 text-blue-800 border-blue-300',
      APPROVED: 'bg-green-100 text-green-800 border-green-300',
      REJECTED: 'bg-red-100 text-red-800 border-red-300',
      CONTACTED: 'bg-purple-100 text-purple-800 border-purple-300',
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles] || styles.PENDING}`}>
        {status.replace('_', ' ')}
      </span>
    )
  }

  const filteredSubmissions = submissions.filter((submission) => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      submission.ownerName.toLowerCase().includes(search) ||
      submission.ownerEmail.toLowerCase().includes(search) ||
      submission.businessName.toLowerCase().includes(search) ||
      submission.city.toLowerCase().includes(search)
    )
  })

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated' || !canAccessAdmin(session)) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Venue Partner Submissions</h1>
            <p className="text-gray-600">Review and manage venue onboarding applications</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by name, email, business, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="CONTACTED">Contacted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions List */}
        {filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 text-lg">No submissions found</p>
              {searchTerm && (
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your search criteria
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {submission.businessName}
                          </h3>
                          {getStatusBadge(submission.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Owner:</span> {submission.ownerName}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {submission.ownerEmail}
                          </div>
                          <div>
                            <span className="font-medium">City:</span> {submission.city}
                          </div>
                          <div>
                            <span className="font-medium">Pricing:</span> {submission.venuePricingRange}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(submission.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="ml-4">
                        <Link href={`/admin/venue-submissions/${submission.id}`}>
                          <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {pagination.pages}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage === pagination.pages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

