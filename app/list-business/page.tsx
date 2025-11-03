'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/footer'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const categories = [
  'Venue',
  'Catering',
  'Photography',
  'Fashion',
  'Decoration',
  'Beauty',
  'Music',
  'Transportation',
  'Other'
]

const cities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 
  'Faisalabad', 'Multan', 'Peshawar', 'Quetta',
  'Hyderabad', 'Sialkot', 'Gujranwala', 'Other'
]

const venueTypes = ['Hall', 'Outdoor', 'Marquee', 'Garden', 'Hotel', 'Other']
const capacityRanges = [
  '0-100', '100-300', '300-500', '500-1000', 
  '1000-1500', '1500-2000', '2000+'
]

export default function ListBusinessPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showSignInForm, setShowSignInForm] = useState(false)
  
  // Check if we're returning from sign-in and restore form data
  useEffect(() => {
    const savedFormData = localStorage.getItem('pendingBusinessForm')
    if (savedFormData && session) {
      try {
        const formData = JSON.parse(savedFormData)
        // Set form data but keep session info
        setFormData(prev => ({
          ...prev,
          businessName: formData.businessName || prev.businessName,
          category: formData.category || prev.category,
          city: formData.city || prev.city,
          pricing: formData.pricing || prev.pricing,
          description: formData.description || prev.description,
          capacity: formData.capacity || prev.capacity,
          type: formData.type || prev.type,
          phone: formData.phone || prev.phone,
          address: formData.address || prev.address,
          website: formData.website || prev.website,
        }))
        localStorage.removeItem('pendingBusinessForm')
      } catch (e) {
        console.error('Failed to restore form data:', e)
      }
    }
  }, [session])
  
  const [formData, setFormData] = useState({
    // User account info (if not logged in)
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Vendor business info
    businessName: '',
    category: '',
    city: '',
    pricing: '',
    description: '',
    capacity: '',
    type: '',
    phone: '',
    address: '',
    website: '',
    images: [] as File[],
  })

  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
      
      // Create preview URLs
      const previews = files.map(file => URL.createObjectURL(file))
      setPreviewImages(prev => [...prev, ...previews])
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'VENDOR'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create account')
        setLoading(false)
        return
      }

      // Auto sign in after signup
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Account created but failed to sign in. Please sign in manually.')
      } else {
        setShowSignInForm(false)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate required fields
    if (!session && (!formData.name || !formData.email || !formData.password)) {
      setError('Please create an account first or sign in')
      setLoading(false)
      return
    }

    if (!formData.businessName || !formData.category || !formData.city || !formData.pricing || !formData.description) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      // Upload images first if user is logged in (for better UX)
      let imageUrls: string[] = []
      
      if (session && formData.images.length > 0) {
        for (const image of formData.images) {
          const formDataImage = new FormData()
          formDataImage.append('file', image)

          const uploadResponse = await fetch('/api/upload-local', {
            method: 'POST',
            body: formDataImage,
            credentials: 'include',
          })

          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json()
            imageUrls.push(uploadData.url)
          }
        }
      }

      // If user is logged in, use the authenticated endpoint
      if (session) {
        // Verify session is still valid by checking with server
        const sessionCheck = await fetch('/api/auth/session', {
          credentials: 'include',
        })
        
        if (!sessionCheck.ok) {
          setError('Your session has expired. Please refresh the page and sign in again.')
          setLoading(false)
          return
        }

        // Upload remaining images if any
        if (formData.images.length > imageUrls.length) {
          for (let i = imageUrls.length; i < formData.images.length; i++) {
            const formDataImage = new FormData()
            formDataImage.append('file', formData.images[i])

            const uploadResponse = await fetch('/api/upload-local', {
              method: 'POST',
              body: formDataImage,
              credentials: 'include',
            })

            if (uploadResponse.ok) {
              const uploadData = await uploadResponse.json()
              imageUrls.push(uploadData.url)
            }
          }
        }

        const vendorData = {
          name: formData.businessName,
          category: formData.category,
          city: formData.city,
          pricing: formData.pricing,
          description: formData.description,
          images: imageUrls,
          capacity: formData.capacity || null,
          type: formData.type || null,
        }

        const vendorResponse = await fetch('/api/vendor/vendors', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vendorData),
          credentials: 'include',
        })

        if (!vendorResponse.ok) {
          const errorData = await vendorResponse.json().catch(() => ({ error: 'Request failed' }))
          setError(errorData.error || 'Failed to submit business listing')
          setLoading(false)
          return
        }
      } else {
        // User is not logged in - use public submission endpoint
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        // Submit everything at once (account + vendor) via public endpoint
        const submissionData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          businessName: formData.businessName,
          category: formData.category,
          city: formData.city,
          pricing: formData.pricing,
          description: formData.description,
          images: imageUrls, // Will be empty, images can be added later
          capacity: formData.capacity || null,
          type: formData.type || null,
        }

        const submitResponse = await fetch('/api/vendors/submit', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        })

        if (!submitResponse.ok) {
          const errorData = await submitResponse.json().catch(() => ({ error: 'Request failed' }))
          setError(errorData.error || 'Failed to submit business listing')
          setLoading(false)
          return
        }

        // Optionally sign in the user after successful submission
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })
      }

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        category: '',
        city: '',
        pricing: '',
        description: '',
        capacity: '',
        type: '',
        phone: '',
        address: '',
        website: '',
        images: [],
      })
      setPreviewImages([])
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white">
        <img
          src="/uploads/Border.png"
          alt="Left Border"
          className="site-border left"
        />
        <img
          src="/uploads/Border.png"
          alt="Right Border"
          className="site-border right"
        />
        <Header />
        
        <main className="container-main mx-auto px-4 py-20 mt-20">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">Submission Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for submitting your business listing. Our team will review your submission and get back to you soon.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                You will receive an email notification once your listing is approved.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/vendor/dashboard">
                  <Button className="bg-[#d13f43] hover:bg-[#b82f33] text-white">
                    View Dashboard
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Left Border */}
      <img
        src="/uploads/Border.png"
        alt="Left Border"
        className="site-border left"
      />
      {/* Right Border */}
      <img
        src="/uploads/Border.png"
        alt="Right Border"
        className="site-border right"
      />
      <Header />

      <main className="mt-20 py-12">
        {/* Hero Section */}
        <section className="relative py-12">
          <div className="Left-Floral absolute left-0 top-0 z-0">
            <Image
              src="/uploads/Flower-1.png"
              alt="Left Floral"
              width={200}
              height={600}
            />
          </div>
          <div className="Right-Floral absolute right-0 top-0 z-0">
            <Image
              src="/uploads/Flower-2.png"
              alt="Right Floral"
              width={400}
              height={800}
            />
          </div>
          
          <div className="container-main mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                List Your Business
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join our platform and showcase your wedding services to thousands of couples. Fill out the form below and we&apos;ll review your submission.
              </p>
              {!session && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={() => setShowSignInForm(!showSignInForm)}
                      className="text-[#d13f43] hover:underline font-semibold"
                    >
                      {showSignInForm ? 'Use sign up form' : 'Sign in instead'}
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="container-main mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              {!session && showSignInForm ? (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Sign In</h2>
                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    setLoading(true)
                    setError('')
                    
                    const result = await signIn('credentials', {
                      email: formData.email,
                      password: formData.password,
                      redirect: false,
                    })

                    if (result?.error) {
                      setError('Invalid email or password')
                    } else {
                      setShowSignInForm(false)
                    }
                    setLoading(false)
                  }} className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signin-password">Password</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-[#d13f43] hover:bg-[#b82f33] text-white">
                      Sign In
                    </Button>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Account Info (only if not logged in) */}
                  {!session && !showSignInForm && (
                    <div className="border-b pb-6">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900">Create Account</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Password *</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            minLength={6}
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password *</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Business Information */}
                  <div className="border-b pb-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Business Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          placeholder="e.g., Royal Wedding Hall"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d13f43] focus:border-[#d13f43]"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <select
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d13f43] focus:border-[#d13f43]"
                          required
                        >
                          <option value="">Select City</option>
                          {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="pricing">Pricing *</Label>
                        <Input
                          id="pricing"
                          name="pricing"
                          value={formData.pricing}
                          onChange={handleInputChange}
                          placeholder="e.g., PKR 150,000 - 300,000"
                          required
                        />
                      </div>
                      {formData.category === 'Venue' && (
                        <>
                          <div>
                            <Label htmlFor="capacity">Capacity</Label>
                            <select
                              id="capacity"
                              name="capacity"
                              value={formData.capacity}
                              onChange={handleInputChange}
                              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d13f43] focus:border-[#d13f43]"
                            >
                              <option value="">Select Capacity</option>
                              {capacityRanges.map(range => (
                                <option key={range} value={range}>{range}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="type">Venue Type</Label>
                            <select
                              id="type"
                              name="type"
                              value={formData.type}
                              onChange={handleInputChange}
                              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d13f43] focus:border-[#d13f43]"
                            >
                              <option value="">Select Type</option>
                              {venueTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}
                      <div className="md:col-span-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Describe your business, services, and what makes you unique..."
                          rows={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+92-XXX-XXXXXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          type="url"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Business address"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <Label htmlFor="images">Business Images</Label>
                    <p className="text-sm text-gray-500 mb-2">Upload images of your business (recommended: 3-5 images)</p>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="mb-4"
                    />
                    {previewImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {previewImages.map((preview, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              width={200}
                              height={150}
                              className="rounded-lg object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#d13f43] hover:bg-[#b82f33] text-white py-6 text-lg"
                    >
                      {loading ? 'Submitting...' : 'Submit for Review'}
                    </Button>
                    <p className="text-sm text-gray-500 text-center mt-4">
                      By submitting, you agree that your listing will be reviewed by our team before going live.
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Info Section */}
        <section className="container-main mx-auto px-4 mt-12 mb-12">
          <div className="bg-[#F7E9DB] rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Why List Your Business?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">Reach More Customers</h4>
                <p className="text-gray-600 text-sm">Connect with thousands of couples looking for wedding services</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">Free Listing</h4>
                <p className="text-gray-600 text-sm">List your business for free and start receiving inquiries</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">Verified Badge</h4>
                <p className="text-gray-600 text-sm">Get verified and build trust with potential customers</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

