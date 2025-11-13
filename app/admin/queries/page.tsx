'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { canAccessAdmin } from '@/lib/auth-helpers-client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'

interface ContactQuery {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: string
  escalationLevel: string
  customerSupportResponded: boolean
  managerResponded: boolean
  ceoResponded: boolean
  createdAt: string
  respondedAt: string | null
  escalatedToManagerAt: string | null
  escalatedToCEOAt: string | null
  notes: string | null
  source?: 'inquiry' | 'contact' // Track source of query
  inquiryId?: string // Original inquiry ID if from vendor inquiry
  vendorName?: string // Vendor name if from inquiry
}

export default function AdminQueriesPage() {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const [queries, setQueries] = useState<ContactQuery[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null)
  const [notes, setNotes] = useState('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'responded' | 'escalated'>('all')

  const fetchQueries = useCallback(async () => {
    try {
      setLoading(true)
      let url = '/api/queries?'
      if (filter === 'pending') {
        url += 'status=PENDING'
      } else if (filter === 'responded') {
        url += 'status=RESPONDED'
      } else if (filter === 'escalated') {
        url += 'status=ESCALATED_LEVEL2,ESCALATED_LEVEL3'
      }

      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setQueries(data)
      } else {
        console.error('Failed to fetch queries')
      }
    } catch (error) {
      console.error('Error fetching queries:', error)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    if (sessionStatus === 'loading') return
    
    if (sessionStatus === 'unauthenticated' || !canAccessAdmin(session)) {
      router.push('/auth/signin')
      return
    }
    
    fetchQueries()
  }, [session, sessionStatus, router, fetchQueries])

  const handleMarkResponded = async (queryId: string, level: 'customerSupport' | 'manager' | 'ceo') => {
    try {
      // Check if this is an inquiry-based query (prefixed with 'inquiry-')
      const isInquiryQuery = queryId.startsWith('inquiry-')
      
      if (isInquiryQuery) {
        // For inquiry-based queries, we can't update them directly
        // They need to be converted to ContactQuery first, or we just show a message
        alert('This is a vendor inquiry. New inquiries are automatically added to Contact Queries. Please respond via the contact query system.')
        return
      }

      const updateData: any = {}
      if (level === 'customerSupport') {
        updateData.customerSupportResponded = true
      } else if (level === 'manager') {
        updateData.managerResponded = true
      } else if (level === 'ceo') {
        updateData.ceoResponded = true
      }

      const response = await fetch(`/api/queries/${queryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        fetchQueries()
        if (selectedQuery?.id === queryId) {
          setSelectedQuery(null)
        }
      }
    } catch (error) {
      console.error('Error updating query:', error)
    }
  }

  const handleSaveNotes = async () => {
    if (!selectedQuery) return

    // Check if this is an inquiry-based query
    if (selectedQuery.id.startsWith('inquiry-')) {
      alert('Notes cannot be saved for vendor inquiries. New inquiries are automatically added to Contact Queries where you can add notes.')
      return
    }

    try {
      const response = await fetch(`/api/queries/${selectedQuery.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })

      if (response.ok) {
        fetchQueries()
        const updated = queries.find(q => q.id === selectedQuery.id)
        if (updated) {
          setSelectedQuery({ ...updated, notes })
        }
      }
    } catch (error) {
      console.error('Error saving notes:', error)
    }
  }

  const getStatusBadge = (query: ContactQuery) => {
    if (query.status === 'RESOLVED') {
      return <Badge className="bg-green-500">Resolved</Badge>
    }
    if (query.status === 'ESCALATED_LEVEL3') {
      return <Badge className="bg-red-500">Escalated to CEO</Badge>
    }
    if (query.status === 'ESCALATED_LEVEL2') {
      return <Badge className="bg-orange-500">Escalated to Manager</Badge>
    }
    if (query.status === 'RESPONDED') {
      return <Badge className="bg-blue-500">Responded</Badge>
    }
    return <Badge className="bg-yellow-500">Pending</Badge>
  }

  const getTimeSince = (date: string) => {
    const now = new Date()
    const diffMs = now.getTime() - new Date(date).getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    
    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  }

  if (sessionStatus === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (sessionStatus === 'unauthenticated' || !canAccessAdmin(session)) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Queries</h1>
            <p className="text-gray-600">Manage and respond to customer contact queries</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            className="border-red-500 text-red-600 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'responded' ? 'default' : 'outline'}
            onClick={() => setFilter('responded')}
          >
            Responded
          </Button>
          <Button
            variant={filter === 'escalated' ? 'default' : 'outline'}
            onClick={() => setFilter('escalated')}
          >
            Escalated
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Queries List */}
          <div className="lg:col-span-2 space-y-4">
            {queries.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No queries found
                </CardContent>
              </Card>
            ) : (
              queries.map((query) => (
                <Card
                  key={query.id}
                  className={`cursor-pointer hover:shadow-lg transition-shadow ${
                    selectedQuery?.id === query.id ? 'ring-2 ring-[#d13f43]' : ''
                  }`}
                  onClick={() => {
                    setSelectedQuery(query)
                    setNotes(query.notes || '')
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{query.name}</h3>
                        <p className="text-sm text-gray-600">{query.email}</p>
                        {query.phone && (
                          <p className="text-sm text-gray-600">{query.phone}</p>
                        )}
                      </div>
                      {getStatusBadge(query)}
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-700">
                          {query.subject || 'General Inquiry'}
                        </p>
                        {query.source === 'inquiry' && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Vendor Inquiry
                          </span>
                        )}
                      </div>
                      {query.vendorName && (
                        <p className="text-xs text-gray-500 mb-1">
                          Vendor: <strong>{query.vendorName}</strong>
                        </p>
                      )}
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {query.message}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{getTimeSince(query.createdAt)}</span>
                      <span className="capitalize">{query.escalationLevel.replace('_', ' ').toLowerCase()}</span>
                    </div>

                    {query.escalatedToManagerAt && (
                      <div className="mt-2 text-xs text-orange-600">
                        Escalated to Manager: {getTimeSince(query.escalatedToManagerAt)}
                      </div>
                    )}
                    {query.escalatedToCEOAt && (
                      <div className="mt-2 text-xs text-red-600">
                        Escalated to CEO: {getTimeSince(query.escalatedToCEOAt)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Query Details */}
          <div className="lg:col-span-1">
            {selectedQuery ? (
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Query Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Name</p>
                    <p className="text-gray-900">{selectedQuery.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <a href={`mailto:${selectedQuery.email}`} className="text-[#d13f43] hover:underline">
                      {selectedQuery.email}
                    </a>
                  </div>

                  {selectedQuery.phone && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <a href={`tel:${selectedQuery.phone}`} className="text-[#d13f43] hover:underline">
                        {selectedQuery.phone}
                      </a>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-700">Subject</p>
                      {selectedQuery.source === 'inquiry' && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Vendor Inquiry
                        </span>
                      )}
                    </div>
                    <p className="text-gray-900">{selectedQuery.subject || 'General Inquiry'}</p>
                    {selectedQuery.vendorName && (
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Vendor:</strong> {selectedQuery.vendorName}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Message</p>
                    <p className="text-gray-900 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
                      {selectedQuery.message}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Notes</p>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add internal notes..."
                      rows={4}
                      className="mb-2"
                    />
                    <Button onClick={handleSaveNotes} size="sm" className="w-full">
                      Save Notes
                    </Button>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <p className="text-sm font-medium text-gray-700">Response Status</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Customer Support</span>
                        {selectedQuery.customerSupportResponded ? (
                          <Badge className="bg-green-500">Responded</Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkResponded(selectedQuery.id, 'customerSupport')}
                          >
                            Mark Responded
                          </Button>
                        )}
                      </div>

                      {selectedQuery.escalationLevel === 'MANAGER' && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Manager</span>
                          {selectedQuery.managerResponded ? (
                            <Badge className="bg-green-500">Responded</Badge>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkResponded(selectedQuery.id, 'manager')}
                            >
                              Mark Responded
                            </Button>
                          )}
                        </div>
                      )}

                      {selectedQuery.escalationLevel === 'CEO' && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">CEO</span>
                          {selectedQuery.ceoResponded ? (
                            <Badge className="bg-green-500">Responded</Badge>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkResponded(selectedQuery.id, 'ceo')}
                            >
                              Mark Responded
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    {selectedQuery.id.startsWith('inquiry-') ? (
                      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                        <p className="font-medium mb-1">Vendor Inquiry</p>
                        <p>This is a vendor inquiry. New inquiries are automatically added to Contact Queries where you can manage them fully.</p>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          const response = fetch(`/api/queries/${selectedQuery.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: 'RESOLVED' }),
                          })
                          response.then(() => fetchQueries())
                        }}
                      >
                        Mark as Resolved
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  Select a query to view details
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

