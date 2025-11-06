'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Header from '@/components/Header'
import { canAccessAdmin } from '@/lib/auth-helpers-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, XCircle, Clock, Mail, Phone, MapPin, Building2 } from 'lucide-react'

interface VenueSubmission {
  id: string
  ownerName: string
  ownerMobile1: string
  ownerMobile2?: string
  ownerLandline?: string
  ownerEmail: string
  businessName: string
  managerName: string
  managerMobile1: string
  managerMobile2?: string
  managerLandline?: string
  managerEmail: string
  businessName2: string
  city: string
  area: string
  completeAddress: string
  website?: string
  businessEmail?: string
  bankName?: string
  branchCity?: string
  accountNumber?: string
  ibanNumber?: string
  venueType?: string
  singleMultipleSites?: string
  guestCapacity?: string
  venuePricingRange: string
  cateringAvailable?: string
  outsideCateringAllowed?: string
  parkingCapacity?: string
  parkingType?: string
  wheelchairAccessible?: string
  wheelchairAvailable?: string
  namazAreaMen?: string
  namazAreaLadies?: string
  bridalSuite?: string
  amenities?: string
  airConditioning?: string
  heating?: string
  elevators?: string
  securityStaff?: string
  backupGenerator?: string
  dedicatedStaff?: string
  cancellationPolicy: string
  fireInsurance?: string
  weArrangeInsurance?: string
  prohibitedItems?: string
  fileUrls: string[]
  companyOverview?: string
  undertakingName?: string
  undertakingDesignation?: string
  undertakingCNIC?: string
  undertakingCompany?: string
  undertakingMobile?: string
  undertakingEmail?: string
  undertakingSignature?: string
  undertakingDate?: string
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'CONTACTED'
  reviewedBy?: string
  reviewedAt?: string
  adminNotes?: string
  createdAt: string
  updatedAt: string
}

export default function VenueSubmissionDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [submission, setSubmission] = useState<VenueSubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [statusValue, setStatusValue] = useState<string>('')
  const [adminNotes, setAdminNotes] = useState('')

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
    if (session && canAccessAdmin(session) && params.id) {
      fetchSubmission()
    }
  }, [session, params.id])

  const fetchSubmission = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/venue-onboarding/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch submission')
      
      const data = await response.json()
      setSubmission(data)
      setStatusValue(data.status)
      setAdminNotes(data.adminNotes || '')
    } catch (error) {
      console.error('Error fetching submission:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async () => {
    try {
      setUpdating(true)
      const response = await fetch(`/api/venue-onboarding/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusValue,
          adminNotes: adminNotes,
          reviewedBy: session?.user?.id || session?.user?.email,
        }),
      })

      if (!response.ok) throw new Error('Failed to update submission')
      
      const updated = await response.json()
      setSubmission(updated)
      alert('Submission updated successfully!')
    } catch (error) {
      console.error('Error updating submission:', error)
      alert('Failed to update submission')
    } finally {
      setUpdating(false)
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
      <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${styles[status as keyof typeof styles] || styles.PENDING}`}>
        {status.replace('_', ' ')}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 text-lg">Submission not found</p>
              <Link href="/admin/venue-submissions">
                <Button className="mt-4">Back to Submissions</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/venue-submissions">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{submission.businessName}</h1>
              <p className="text-gray-600">Venue Partner Submission</p>
            </div>
          </div>
          {getStatusBadge(submission.status)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Owner Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Owner Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Owner Name</Label>
                    <p className="font-medium">{submission.ownerName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Email</Label>
                    <p className="font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {submission.ownerEmail}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Mobile 1</Label>
                    <p className="font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {submission.ownerMobile1}
                    </p>
                  </div>
                  {submission.ownerMobile2 && (
                    <div>
                      <Label className="text-gray-600">Mobile 2</Label>
                      <p className="font-medium">{submission.ownerMobile2}</p>
                    </div>
                  )}
                  {submission.ownerLandline && (
                    <div>
                      <Label className="text-gray-600">Landline</Label>
                      <p className="font-medium">{submission.ownerLandline}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Manager Details */}
            <Card>
              <CardHeader>
                <CardTitle>Manager / Point of Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Name</Label>
                    <p className="font-medium">{submission.managerName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Email</Label>
                    <p className="font-medium">{submission.managerEmail}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Mobile</Label>
                    <p className="font-medium">{submission.managerMobile1}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Business Name</Label>
                    <p className="font-medium">{submission.businessName2}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">City</Label>
                    <p className="font-medium">{submission.city}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Area</Label>
                    <p className="font-medium">{submission.area}</p>
                  </div>
                  {submission.website && (
                    <div>
                      <Label className="text-gray-600">Website</Label>
                      <p className="font-medium">
                        <a href={submission.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {submission.website}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-gray-600">Complete Address</Label>
                  <p className="font-medium">{submission.completeAddress}</p>
                </div>
              </CardContent>
            </Card>

            {/* Venue Information */}
            <Card>
              <CardHeader>
                <CardTitle>Venue Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {submission.venueType && (
                    <div>
                      <Label className="text-gray-600">Venue Type</Label>
                      <p className="font-medium">{submission.venueType}</p>
                    </div>
                  )}
                  {submission.guestCapacity && (
                    <div>
                      <Label className="text-gray-600">Guest Capacity</Label>
                      <p className="font-medium">{submission.guestCapacity}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-gray-600">Pricing Range</Label>
                    <p className="font-medium">{submission.venuePricingRange}</p>
                  </div>
                  {submission.cateringAvailable && (
                    <div>
                      <Label className="text-gray-600">Catering Available</Label>
                      <p className="font-medium">{submission.cateringAvailable}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Policies */}
            <Card>
              <CardHeader>
                <CardTitle>Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-gray-600">Cancellation Policy</Label>
                  <p className="font-medium mt-2 whitespace-pre-wrap">{submission.cancellationPolicy}</p>
                </div>
                {submission.prohibitedItems && (
                  <div className="mt-4">
                    <Label className="text-gray-600">Prohibited Items / SOPs</Label>
                    <p className="font-medium mt-2 whitespace-pre-wrap">{submission.prohibitedItems}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Company Overview */}
            {submission.companyOverview && (
              <Card>
                <CardHeader>
                  <CardTitle>Company Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{submission.companyOverview}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Status & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review & Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select value={statusValue} onValueChange={setStatusValue}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                      <SelectItem value="CONTACTED">Contacted</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Admin Notes</Label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about this submission..."
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <Button
                  onClick={handleUpdateStatus}
                  disabled={updating}
                  className="w-full bg-rose-600 hover:bg-rose-700"
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submission Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <Label className="text-gray-600">Submitted</Label>
                  <p className="font-medium">
                    {new Date(submission.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {submission.reviewedAt && (
                  <div>
                    <Label className="text-gray-600">Reviewed</Label>
                    <p className="font-medium">
                      {new Date(submission.reviewedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

