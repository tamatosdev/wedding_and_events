'use client'

import { useState, useEffect } from 'react'

interface HomepageSection {
  id: string
  name: string
  title: string
  subtitle?: string
  content?: any
  visible: boolean
  order: number
}

interface HomepageContent {
  id: string
  section: string
  title?: string
  subtitle?: string
  description?: string
  content?: any
  images: string[]
  visible: boolean
  order: number
}

interface HomepageCMSData {
  sections: HomepageSection[]
  content: Record<string, HomepageContent>
  featuredVendors: any[]
  siteSettings: any
}

export function useHomepageCMS() {
  const [data, setData] = useState<HomepageCMSData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCMSData() {
      try {
        const response = await fetch('/api/cms/homepage')
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.warn('CMS API returned error, using fallback defaults:', errorData)
          // Don't throw error - let components use fallback defaults
          setData(null)
          setError(null)
          return
        }
        const cmsData = await response.json()
        setData(cmsData)
        setError(null)
      } catch (err) {
        console.warn('Error fetching CMS data, using fallback defaults:', err)
        // Don't set error - let components use fallback defaults
        setData(null)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCMSData()
  }, [])

  return { data, loading, error }
}

