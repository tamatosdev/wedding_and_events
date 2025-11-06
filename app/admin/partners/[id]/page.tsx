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
  completeAddress: string
  ownerName: string
  ownerEmail: string
  ownerMobile1: string
  ownerMobile2?: string
  managerName: string
  managerEmail: string
  managerMobile1: string
  status: string
  createdAt: string
  reviewedBy?: string
  reviewedAt?: string
  adminNotes?: string
  [key: string]: any
}

export default function PartnerDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [submission, setSubmission] = useState<PartnerSubmission | null>(null)
  const [statusUpdate, setStatusUpdate] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session && !canAccessAdmin(session)) {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (session && canAccessAdmin(session) && params.id) {
      fetchSubmission()
    }
  }, [session, params.id])

  const fetchSubmission = async () => {
    try {
      const response = await fetch(`/api/partner-onboarding/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setSubmission(data)
        setStatusUpdate(data.status)
        setAdminNotes(data.adminNotes || '')
      }
    } catch (error) {
      console.error('Error fetching submission:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async () => {
    if (!submission) return
    setSaving(true)
    try {
      const response = await fetch(`/api/partner-onboarding/${submission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusUpdate,
          adminNotes,
          reviewedBy: session?.user?.email || 'Admin',
        }),
      })
      if (response.ok) {
        alert('Status updated successfully!')
        fetchSubmission()
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    } finally {
      setSaving(false)
    }
  }

  const renderField = (label: string, value: any) => {
    if (!value || value === '') return null
    return (
      <div className="py-2 border-b border-gray-100">
        <span className="text-sm font-semibold text-gray-700">{label}:</span>
        <span className="ml-2 text-sm text-gray-600">{String(value)}</span>
      </div>
    )
  }

  if (status === 'loading' || loading) {
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
          <p className="text-gray-500">Submission not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/admin/partners" className="text-[#D13F43] hover:text-[#b82f33] mb-2 inline-block">
              ← Back to Submissions
            </Link>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {submission.businessName}
            </h1>
            <p className="text-gray-600 mt-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Partner Submission Details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Owner Details */}
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'DM Sans, sans-serif' }}>Owner Details</CardTitle>
              </CardHeader>
              <CardContent>
                {renderField('Name', submission.ownerName)}
                {renderField('Email', submission.ownerEmail)}
                {renderField('Mobile 1', submission.ownerMobile1)}
                {renderField('Mobile 2', submission.ownerMobile2)}
                {renderField('Landline', submission.ownerLandline)}
              </CardContent>
            </Card>

            {/* Manager Details */}
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'DM Sans, sans-serif' }}>Manager Details</CardTitle>
              </CardHeader>
              <CardContent>
                {renderField('Name', submission.managerName)}
                {renderField('Email', submission.managerEmail)}
                {renderField('Mobile 1', submission.managerMobile1)}
                {renderField('Mobile 2', submission.managerMobile2)}
                {renderField('Landline', submission.managerLandline)}
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'DM Sans, sans-serif' }}>Business Details</CardTitle>
              </CardHeader>
              <CardContent>
                {renderField('Business Name', submission.businessName)}
                {renderField('Business Type', submission.businessType)}
                {renderField('City', submission.city)}
                {renderField('Area', submission.area)}
                {renderField('Complete Address', submission.completeAddress)}
                {renderField('Website', submission.website)}
                {renderField('Business Email', submission.businessEmail)}
              </CardContent>
            </Card>

            {/* Business-Specific Fields */}
            {submission.businessType === 'WEDDING' && (
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontFamily: 'DM Sans, sans-serif' }}>Wedding Venue Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderField('Venue Type', submission.venueType)}
                  {renderField('Guest Capacity', submission.guestCapacity)}
                  {renderField('Pricing Range', submission.venuePricingRange)}
                  {renderField('Catering Available', submission.cateringAvailable)}
                  {renderField('Parking Capacity', submission.parkingCapacity)}
                  {renderField('Amenities', submission.amenities)}
                </CardContent>
              </Card>
            )}

            {/* Add similar blocks for other business types */}
          </div>

          {/* Sidebar - Status Management */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'DM Sans, sans-serif' }}>Status Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Status</Label>
                  <div className="mt-2">
                    <Badge className={
                      submission.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      submission.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      submission.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      {submission.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label>Update Status</Label>
                  <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                      <SelectItem value="CONTACTED">Contacted</SelectItem>
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
                  disabled={saving}
                  className="w-full bg-[#D13F43] hover:bg-[#b82f33] text-white"
                >
                  {saving ? 'Saving...' : 'Update Status'}
                </Button>

                {submission.reviewedBy && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      Reviewed by: {submission.reviewedBy}
                    </p>
                    {submission.reviewedAt && (
                      <p className="text-sm text-gray-600">
                        On: {new Date(submission.reviewedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: 'DM Sans, sans-serif' }}>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href={`mailto:${submission.ownerEmail}`}>
                    Email Owner
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`tel:${submission.ownerMobile1}`}>
                    Call Owner
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`https://wa.me/${submission.ownerMobile1.replace(/\D/g, '')}`} target="_blank">
                    WhatsApp Owner
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

