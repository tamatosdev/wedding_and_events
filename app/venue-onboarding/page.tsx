'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'

// Import step components
import Step1OwnerDetails from '@/components/venue-onboarding/Step1OwnerDetails'
import Step2ManagerDetails from '@/components/venue-onboarding/Step2ManagerDetails'
import Step3BusinessDetails from '@/components/venue-onboarding/Step3BusinessDetails'
import Step4BankDetails from '@/components/venue-onboarding/Step4BankDetails'
import Step5VenueInfo from '@/components/venue-onboarding/Step5VenueInfo'
import Step6Facilities from '@/components/venue-onboarding/Step6Facilities'
import Step7Amenities from '@/components/venue-onboarding/Step7Amenities'
import Step8Policies from '@/components/venue-onboarding/Step8Policies'
import Step9UploadSummary from '@/components/venue-onboarding/Step9UploadSummary'
import Step10Confirmation from '@/components/venue-onboarding/Step10Confirmation'

// Form schema
const formSchema = z.object({
  // Step 1: Owner Details
  ownerName: z.string().min(1, 'Owner name is required'),
  ownerMobile1: z.string().min(1, 'Mobile 1 is required'),
  ownerMobile2: z.string().optional(),
  ownerLandline: z.string().optional(),
  ownerEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  businessName: z.string().min(1, 'Business name is required'),

  // Step 2: Manager/POC Details
  managerName: z.string().min(1, 'Manager name is required'),
  managerMobile1: z.string().min(1, 'Mobile 1 is required'),
  managerMobile2: z.string().optional(),
  managerLandline: z.string().optional(),
  managerEmail: z.string().email('Invalid email address').min(1, 'Email is required'),

  // Step 3: Business Details
  businessName2: z.string().min(1, 'Business name is required'),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area is required'),
  completeAddress: z.string().min(1, 'Complete address is required'),
  website: z.string().optional(),
  businessEmail: z.string().email('Invalid email address').optional(),

  // Step 4: Bank Details
  bankName: z.string().optional(),
  branchCity: z.string().optional(),
  accountNumber: z.string().optional(),
  ibanNumber: z.string().optional(),

  // Step 5: Venue Information
  venueType: z.string().optional(),
  singleMultipleSites: z.string().optional(),
  guestCapacity: z.string().optional(),
  venuePricingRange: z.string().min(1, 'Venue pricing range is required'),
  cateringAvailable: z.string().optional(),
  outsideCateringAllowed: z.string().optional(),

  // Step 6: Facilities & Accessibility
  parkingCapacity: z.string().optional(),
  parkingType: z.string().optional(),
  wheelchairAccessible: z.string().optional(),
  wheelchairAvailable: z.string().optional(),
  namazAreaMen: z.string().optional(),
  namazAreaLadies: z.string().optional(),
  bridalSuite: z.string().optional(),

  // Step 7: Amenities
  amenities: z.string().optional(),
  airConditioning: z.string().optional(),
  heating: z.string().optional(),
  elevators: z.string().optional(),
  securityStaff: z.string().optional(),
  backupGenerator: z.string().optional(),
  dedicatedStaff: z.string().optional(),

  // Step 8: Policies
  cancellationPolicy: z.string().min(1, 'Cancellation policy is required'),
  fireInsurance: z.string().optional(),
  weArrangeInsurance: z.string().optional(),
  prohibitedItems: z.string().optional(),

  // Step 9: Upload & Summary
  files: z.array(z.instanceof(File)).optional(),
  companyOverview: z.string().optional(),
  undertakingName: z.string().optional(),
  undertakingDesignation: z.string().optional(),
  undertakingCNIC: z.string().optional(),
  undertakingCompany: z.string().optional(),
  undertakingMobile: z.string().optional(),
  undertakingEmail: z.string().optional(),
  undertakingSignature: z.string().optional(),
  undertakingDate: z.string().optional(),
})

export type FormData = z.infer<typeof formSchema>

const STORAGE_KEY = 'venue-onboarding-form'

const steps = [
  { id: 1, title: 'Owner Details', component: Step1OwnerDetails },
  { id: 2, title: 'Manager/POC', component: Step2ManagerDetails },
  { id: 3, title: 'Business Details', component: Step3BusinessDetails },
  { id: 4, title: 'Bank Details', component: Step4BankDetails },
  { id: 5, title: 'Venue Information', component: Step5VenueInfo },
  { id: 6, title: 'Facilities', component: Step6Facilities },
  { id: 7, title: 'Amenities', component: Step7Amenities },
  { id: 8, title: 'Policies', component: Step8Policies },
  { id: 9, title: 'Upload & Summary', component: Step9UploadSummary },
  { id: 10, title: 'Confirmation', component: Step10Confirmation },
]

export default function VenueOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      ownerName: '',
      ownerMobile1: '',
      ownerMobile2: '',
      ownerLandline: '',
      ownerEmail: '',
      businessName: '',
      managerName: '',
      managerMobile1: '',
      managerMobile2: '',
      managerLandline: '',
      managerEmail: '',
      businessName2: '',
      city: '',
      area: '',
      completeAddress: '',
      website: '',
      businessEmail: '',
      bankName: '',
      branchCity: '',
      accountNumber: '',
      ibanNumber: '',
      venueType: '',
      singleMultipleSites: '',
      guestCapacity: '',
      venuePricingRange: '',
      cateringAvailable: '',
      outsideCateringAllowed: '',
      parkingCapacity: '',
      parkingType: '',
      wheelchairAccessible: '',
      wheelchairAvailable: '',
      namazAreaMen: '',
      namazAreaLadies: '',
      bridalSuite: '',
      amenities: '',
      airConditioning: '',
      heating: '',
      elevators: '',
      securityStaff: '',
      backupGenerator: '',
      dedicatedStaff: '',
      cancellationPolicy: '',
      fireInsurance: '',
      weArrangeInsurance: '',
      prohibitedItems: '',
      files: [],
      companyOverview: '',
      undertakingName: '',
      undertakingDesignation: '',
      undertakingCNIC: '',
      undertakingCompany: '',
      undertakingMobile: '',
      undertakingEmail: '',
      undertakingSignature: '',
      undertakingDate: '',
    },
  })

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        // Restore form data (excluding files)
        Object.keys(parsed).forEach((key) => {
          if (key !== 'files' && parsed[key] !== undefined) {
            form.setValue(key as keyof FormData, parsed[key])
          }
        })
        // Restore step if valid
        if (parsed.currentStep && parsed.currentStep >= 1 && parsed.currentStep <= 10) {
          setCurrentStep(parsed.currentStep)
        }
      } catch (error) {
        console.error('Failed to load saved form data:', error)
      }
    }
  }, [form])

  // Save form data to localStorage on change
  useEffect(() => {
    const subscription = form.watch((data) => {
      const dataToSave = {
        ...data,
        currentStep,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    })
    return () => subscription.unsubscribe()
  }, [form, currentStep])

  const nextStep = async () => {
    const fields = getStepFields(currentStep)
    const isValid = await form.trigger(fields as any)
    
    if (isValid) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
        // Save current step
        const dataToSave = {
          ...form.getValues(),
          currentStep: currentStep + 1,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      // Scroll to first error
      const firstError = Object.keys(form.formState.errors)[0]
      if (firstError) {
        const element = document.querySelector(`[name="${firstError}"]`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          ;(element as HTMLElement).focus()
        }
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      // Save current step
      const dataToSave = {
        ...form.getValues(),
        currentStep: currentStep - 1,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Prepare data for API (exclude files array, handle separately if needed)
      const submissionData = {
        ...data,
        fileUrls: [], // Files would be uploaded separately and URLs added here
      }

      const response = await fetch('/api/venue-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to submit application')
      }

      const result = await response.json()
      
      // Clear localStorage
      localStorage.removeItem(STORAGE_KEY)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      alert(error instanceof Error ? error.message : 'Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepFields = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ['ownerName', 'ownerMobile1', 'ownerEmail', 'businessName']
      case 2:
        return ['managerName', 'managerMobile1', 'managerEmail']
      case 3:
        return ['businessName2', 'city', 'area', 'completeAddress']
      case 4:
        return []
      case 5:
        return ['venuePricingRange']
      case 6:
        return []
      case 7:
        return []
      case 8:
        return ['cancellationPolicy']
      case 9:
        return []
      case 10:
        return []
      default:
        return []
    }
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  const progress = (currentStep / steps.length) * 100

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <div className="mb-6">
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Application Submitted Successfully!
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for your interest in becoming a venue partner with The Wedding & Event (WE).
                We have received your application and will review it shortly.
              </p>
            </div>
            <div className="bg-rose-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-700">WhatsApp:</span>
                  <a 
                    href="https://wa.me/923141113007" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-rose-600 hover:text-rose-700 font-semibold"
                  >
                    03141113007
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-700">Email:</span>
                  <a 
                    href="mailto:info@theweddingandevent.com"
                    className="text-rose-600 hover:text-rose-700 font-semibold"
                  >
                    info@theweddingandevent.com
                  </a>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Our team will contact you within 2-3 business days.
            </p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress Bar */}
        <Card className="mb-8 p-6 bg-white/80 backdrop-blur-sm border-rose-200">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Venue Partner Onboarding
              </h1>
              <span className="text-sm font-medium text-rose-600">
                Step {currentStep} of {steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 via-rose-500 to-amber-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between items-center mt-4 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center min-w-[80px] ${
                  index < currentStep - 1
                    ? 'text-green-600'
                    : index === currentStep - 1
                    ? 'text-rose-600'
                    : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    index < currentStep - 1
                      ? 'bg-green-100 text-green-600'
                      : index === currentStep - 1
                      ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-300'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {index < currentStep - 1 ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="text-xs mt-1 text-center hidden md:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Form Content */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm border-rose-200 shadow-lg">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="min-h-[400px]">
              <CurrentStepComponent form={form} />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 border-rose-300 text-rose-700 hover:bg-rose-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-lg"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

