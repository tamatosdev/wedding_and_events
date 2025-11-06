'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { canAccessAdmin } from '@/lib/auth-helpers-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PartnerSubmission {
  id: string
  businessType: string
  businessName: string
  city: string
  area: string
  ownerName: string
  ownerEmail: string
  ownerMobile1: string
  managerName: string
  managerEmail: string
  status: string
  createdAt: string
  reviewedBy?: string
  reviewedAt?: string
}

export default function PartnersCMS() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submissions, setSubmissions] = useState<PartnerSubmission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<PartnerSubmission[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session && !canAccessAdmin(session)) {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (session && canAccessAdmin(session)) {
      fetchSubmissions()
    }
  }, [session])

  useEffect(() => {
    filterSubmissions()
  }, [submissions, searchQuery, statusFilter, typeFilter])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/partner-onboarding')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions || [])
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterSubmissions = () => {
    let filtered = [...submissions]

    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.area.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((s) => s.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((s) => s.businessType.toLowerCase() === typeFilter.toLowerCase())
    }

    setFilteredSubmissions(filtered)
  }

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      UNDER_REVIEW: 'bg-blue-100 text-blue-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      CONTACTED: 'bg-purple-100 text-purple-800',
    }
    return (
      <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
        {status.replace('_', ' ')}
      </Badge>
    )
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      WEDDING: 'Wedding Venue',
      BOUTIQUES: 'Boutiques',
      'BEAUTY-PARLOR': 'Beauty Parlor',
      DECOR: 'Decoration',
      CATERING: 'Catering',
    }
    return labels[type] || type
  }

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
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Partner Submissions CMS
            </h1>
            <p className="text-gray-600 mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Manage all partner onboarding submissions
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle style={{ fontFamily: 'DM Sans, sans-serif' }}>Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search by name, email, or area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="CONTACTED">Contacted</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="wedding">Wedding Venues</SelectItem>
                  <SelectItem value="boutiques">Boutiques</SelectItem>
                  <SelectItem value="beauty-parlor">Beauty Parlor</SelectItem>
                  <SelectItem value="decor">Decoration</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Showing <strong>{filteredSubmissions.length}</strong> of <strong>{submissions.length}</strong> submissions
          </p>
        </div>

        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'DM Sans, sans-serif' }}>Partner Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <Link
                  key={submission.id}
                  href={`/admin/partners/${submission.id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          {submission.businessName}
                        </h3>
                        {getStatusBadge(submission.status)}
                        <Badge variant="outline">{getTypeLabel(submission.businessType)}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Owner:</span> {submission.ownerName}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {submission.ownerEmail}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {submission.area}, {submission.city}
                        </div>
                        <div>
                          <span className="font-medium">Submitted:</span>{' '}
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="ml-4">
                      View Details →
                    </Button>
                  </div>
                </Link>
              ))}
              {filteredSubmissions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    No submissions found matching your filters.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

