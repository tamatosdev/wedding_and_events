'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/footer'
import { PartnerFormProvider, usePartnerForm } from '@/contexts/PartnerFormContext'
import OwnerBusinessDetails from '@/components/partner-onboarding/Decor/OwnerBusinessDetails'
import LocationBankDetails from '@/components/partner-onboarding/Decor/LocationBankDetails'
import DecorExperienceServices from '@/components/partner-onboarding/Decor/DecorExperienceServices'
import DecorReputationPricing from '@/components/partner-onboarding/Decor/DecorReputationPricing'
import DecorPoliciesAdditional from '@/components/partner-onboarding/Decor/DecorPoliciesAdditional'

// Venue Components
import VenueOwnerBusinessDetails from '@/components/partner-onboarding/Venue/VenueOwnerBusinessDetails'
import VenueLocationBankDetails from '@/components/partner-onboarding/Venue/VenueLocationBankDetails'
import VenueInformation from '@/components/partner-onboarding/Venue/VenueInformation'
import VenueFacilitiesAmenities from '@/components/partner-onboarding/Venue/VenueFacilitiesAmenities'
import VenuePoliciesServices from '@/components/partner-onboarding/Venue/VenuePoliciesServices'
import { useFormSteps } from '@/hooks/useFormSteps'
import { getStepsForBusinessType } from '@/lib/partner-onboarding/formConfig'
import { baseFormSchema } from '@/lib/partner-onboarding/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { motion } from 'framer-motion'

// Components
import ProgressBar from '@/components/partner-onboarding/ProgressBar'
import NavigationButtons from '@/components/partner-onboarding/NavigationButtons'
import StepWrapper from '@/components/partner-onboarding/StepWrapper'
import StepSelector from '@/components/partner-onboarding/StepSelector'

// Shared Components
import OwnerDetails from '@/components/partner-onboarding/Shared/OwnerDetails'
import ManagerDetails from '@/components/partner-onboarding/Shared/ManagerDetails'
import BusinessInfo from '@/components/partner-onboarding/Shared/BusinessInfo'
import BankDetails from '@/components/partner-onboarding/Shared/BankDetails'
import GeneralQuestions from '@/components/partner-onboarding/Shared/GeneralQuestions'
import UploadSummary from '@/components/partner-onboarding/Shared/UploadSummary'

// Wedding Components (renamed from Venue)
import VenueDetails from '@/components/partner-onboarding/Venue/VenueDetails'
import VenueFacilities from '@/components/partner-onboarding/Venue/VenueFacilities'
import VenuePolicies from '@/components/partner-onboarding/Venue/VenuePolicies'

// Boutiques Components
import BoutiqueDetails from '@/components/partner-onboarding/Boutique/BoutiqueDetails'
import BoutiqueProducts from '@/components/partner-onboarding/Boutique/BoutiqueProducts'
import BoutiquePolicies from '@/components/partner-onboarding/Boutique/BoutiquePolicies'

// Beauty Parlor Components (renamed from Salon)
import SalonDetails from '@/components/partner-onboarding/Salon/SalonDetails'
import SalonServices from '@/components/partner-onboarding/Salon/SalonServices'
import SalonPolicies from '@/components/partner-onboarding/Salon/SalonPolicies'

// Decor Components
import DecorDetails from '@/components/partner-onboarding/Decor/DecorDetails'
import DecorServices from '@/components/partner-onboarding/Decor/DecorServices'
import DecorPolicies from '@/components/partner-onboarding/Decor/DecorPolicies'

// Catering Components
import CateringDetails from '@/components/partner-onboarding/Catering/CateringDetails'
import CateringMenu from '@/components/partner-onboarding/Catering/CateringMenu'
import CateringPolicies from '@/components/partner-onboarding/Catering/CateringPolicies'

// Review Component
import ReviewSubmit from '@/components/partner-onboarding/ReviewSubmit'
import WhatsAppFloating from '@/components/whatsapp-floating'

import { useRef } from 'react'
import Step1OwnerBusiness from '@/components/partner-onboarding/BeautyParlour/Step1OwnerBusiness';
import Step2ManagerPOC from '@/components/partner-onboarding/BeautyParlour/Step2ManagerPOC';
import Step3BankPayment from '@/components/partner-onboarding/BeautyParlour/Step3BankPayment';
import Step4ProfileExperience from '@/components/partner-onboarding/BeautyParlour/Step4ProfileExperience';
import Step5ServicesStaff from '@/components/partner-onboarding/BeautyParlour/Step5ServicesStaff';
import Step6PortfolioMarketing from '@/components/partner-onboarding/BeautyParlour/Step6PortfolioMarketing';
import Step7PricingBooking from '@/components/partner-onboarding/BeautyParlour/Step7PricingBooking';
import Step8FinalDeclaration from '@/components/partner-onboarding/BeautyParlour/Step8FinalDeclaration';
import BoutiqueStep1OwnerBusiness from '@/components/partner-onboarding/Boutique/Step1OwnerBusiness';
import BoutiqueStep2ManagerPOC from '@/components/partner-onboarding/Boutique/Step2ManagerPOC';
import BoutiqueStep3BankPayment from '@/components/partner-onboarding/Boutique/Step3BankPayment';
import BoutiqueStep4ProfileProduct from '@/components/partner-onboarding/Boutique/Step4ProfileProduct';
import BoutiqueStep5ProductRentalLogistics from '@/components/partner-onboarding/Boutique/Step5ProductRentalLogistics';
import BoutiqueStep6CustomerPolicies from '@/components/partner-onboarding/Boutique/Step6CustomerPolicies';
import BoutiqueStep7MarketingPromotion from '@/components/partner-onboarding/Boutique/Step7MarketingPromotion';
import BoutiqueStep8FinalDeclaration from '@/components/partner-onboarding/Boutique/Step8FinalDeclaration';

function PartnerOnboardingForm() {
  console.log('PartnerOnboardingForm rendered');
  const {
    formData,
    businessType,
    isSubmitting,
    isSubmitted,
    updateFormData,
    setBusinessType,
    setIsSubmitting,
    setIsSubmitted,
    resetForm,
  } = usePartnerForm()

  const [debug, setDebug] = useState('')
  const searchParams = useSearchParams()

  // Check for type parameter in URL (for redirects from /venue-onboarding)
  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam && !businessType) {
      // Map legacy 'venue' to 'wedding' if needed
      const mappedType = typeParam === 'venue' ? 'wedding' : typeParam
      if (['wedding', 'boutiques', 'beauty-parlour', 'decor', 'catering'].includes(mappedType)) {
        setBusinessType(mappedType as any)
      }
    }
  }, [searchParams, businessType, setBusinessType])

  const { currentStep, totalSteps, getCurrentStepConfig } = useFormSteps()
  const steps = getStepsForBusinessType(businessType)
  const currentStepConfig = getCurrentStepConfig()

  const form = useForm({
    resolver: zodResolver(baseFormSchema),
    defaultValues: formData,
    mode: 'onChange',
    shouldUnregister: false, // Keep all field values even when not visible
  })

  // Ref to expose form for NavigationButtons
  const formRef = useRef(form)

  // Only sync context to form on mount (for initial values)
  useEffect(() => {
    if (formData) {
      Object.keys(formData).forEach((key) => {
        form.setValue(key as any, formData[key as keyof typeof formData])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // On step change, sync form state to context (except initial mount)
  useEffect(() => {
    if (currentStep > 1) {
      updateFormData(form.getValues() as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  // Internal submit function that does the actual submission
  const performSubmission = async (submissionData: any) => {
    setIsSubmitting(true)
    try {
      // Ensure businessType is included in submission data
      const data = {
        ...submissionData,
        businessType: businessType || submissionData.businessType || '',
      }
      setDebug('Submitting data: ' + JSON.stringify(data))
      console.log('Submitting partner onboarding form:', data)
      
      const response = await fetch('/api/partner-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      setDebug('Response status: ' + response.status)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        setDebug('Error: ' + (errorData.error || 'Failed to submit application'))
        throw new Error(errorData.error || 'Failed to submit application')
      }

      const result = await response.json()
      setDebug('Success! Submission ID: ' + result.id)
      console.log('Submission successful:', result)
      setIsSubmitted(true)
      resetForm()
    } catch (error) {
      setDebug('Submission error: ' + (error instanceof Error ? error.message : 'Failed to submit form. Please try again.'))
      console.error('Submission error:', error)
      alert(error instanceof Error ? error.message : 'Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (formData: any) => {
    console.log('handleSubmit called', { formData, currentStep, totalSteps, businessType });
    setDebug('Submit button clicked - Form validated successfully')
    
    // Sync form state to context on submit (get latest values)
    const formValues = form.getValues()
    updateFormData(formValues as any)

    // Use formData from validation if available, otherwise use form values
    const submissionData = formData || formValues

    await performSubmission(submissionData)
  }

  // Handle form validation errors
  const handleSubmitError = (errors: any) => {
    console.error('Form validation errors:', errors)
    const errorMessages = Object.entries(errors)
      .map(([field, error]: [string, any]) => `${field}: ${error?.message || 'Invalid'}`)
      .join(', ')
    setDebug('Validation errors: ' + errorMessages)
    
    // On review step, try to submit anyway with available data
    if (currentStep === totalSteps) {
      console.warn('Validation failed on review step, attempting submission with available data')
      setDebug('Validation failed but attempting submission with available data')
      
      // Get all form values and context data
      const allFormValues = form.getValues()
      const contextData = formData || {}
      const combinedData = { ...contextData, ...allFormValues }
      
      // Sync to context
      updateFormData(combinedData as any)
      
      // Manually trigger submission
      performSubmission(combinedData).catch(err => {
        console.error('Manual submission failed:', err)
      })
    } else {
      alert('Please fill in all required fields. Check the form for errors.')
    }
  }

  // Custom next step handler that syncs form state to context before navigation
  const { goToNextStep: goToNextStepInternal, ...formStepsRest } = useFormSteps()
  const handleNextStep = async () => {
    updateFormData(form.getValues() as any)
    await new Promise((resolve) => setTimeout(resolve, 0))
    await goToNextStepInternal()
  }

  const renderStepContent = () => {
    if (!currentStepConfig) return null
    const stepId = currentStepConfig.id
    switch (stepId) {
      case 'business-type':
        return <StepSelector />
      // Beauty Parlour 8-step custom flow
      case 'beautyparlour-step1':
        return <Step1OwnerBusiness form={form} />;
      case 'beautyparlour-step2':
        return <Step2ManagerPOC form={form} />;
      case 'beautyparlour-step3':
        return <Step3BankPayment form={form} />;
      case 'beautyparlour-step4':
        return <Step4ProfileExperience form={form} />;
      case 'beautyparlour-step5':
        return <Step5ServicesStaff form={form} />;
      case 'beautyparlour-step6':
        return <Step6PortfolioMarketing form={form} />;
      case 'beautyparlour-step7':
        return <Step7PricingBooking form={form} />;
      case 'beautyparlour-step8':
        return <Step8FinalDeclaration form={form} />;
      // Boutique 8-step custom flow
      case 'boutique-step1':
        return <BoutiqueStep1OwnerBusiness form={form} />;
      case 'boutique-step2':
        return <BoutiqueStep2ManagerPOC form={form} />;
      case 'boutique-step3':
        return <BoutiqueStep3BankPayment form={form} />;
      case 'boutique-step4':
        return <BoutiqueStep4ProfileProduct form={form} />;
      case 'boutique-step5':
        return <BoutiqueStep5ProductRentalLogistics form={form} />;
      case 'boutique-step6':
        return <BoutiqueStep6CustomerPolicies form={form} />;
      case 'boutique-step7':
        return <BoutiqueStep7MarketingPromotion form={form} />;
      case 'boutique-step8':
        return <BoutiqueStep8FinalDeclaration form={form} />;
      // New Venue Steps
      case 'owner-business-details':
        if (businessType === 'wedding') return <VenueOwnerBusinessDetails />
        return <OwnerBusinessDetails />
      case 'manager-details':
        return <ManagerDetails />
      case 'location-bank-details':
        if (businessType === 'wedding') return <VenueLocationBankDetails />
        return <LocationBankDetails />
      case 'venue-information':
        return <VenueInformation />
      case 'facilities-amenities':
        return <VenueFacilitiesAmenities />
      case 'policies-additional-services':
        return <VenuePoliciesServices />
      // Decor Steps
      case 'experience-services':
        return <DecorExperienceServices />
      case 'reputation-pricing-description':
        return <DecorReputationPricing />
      case 'policies-additional':
        return <DecorPoliciesAdditional />
      case 'review-submit':
        return <ReviewSubmit />
      // fallback to old steps for other business types
      case 'owner-details':
        return <OwnerDetails />
      case 'business-info':
        return <BusinessInfo />
      case 'bank-details':
        return <BankDetails />
      case 'wedding-details':
        return <VenueDetails />
      case 'wedding-facilities':
        return <VenueFacilities />
      case 'wedding-policies':
        return <VenuePolicies />
      case 'boutiques-details':
        return <BoutiqueDetails />
      case 'boutiques-products':
        return <BoutiqueProducts />
      case 'boutiques-policies':
        return <BoutiquePolicies />
      case 'beauty-parlour-details':
        return <SalonDetails />
      case 'beauty-parlour-services':
        return <SalonServices />
      case 'beauty-parlour-policies':
        return <SalonPolicies />
      case 'decor-details':
        return <DecorDetails />
      case 'decor-services':
        return <DecorServices />
      case 'decor-policies':
        return <DecorPolicies />
      case 'catering-details':
        return <CateringDetails />
      case 'catering-menu':
        return <CateringMenu />
      case 'catering-policies':
        return <CateringPolicies />
      case 'general-questions':
        return <GeneralQuestions />
      case 'upload-summary':
        return <UploadSummary />
      default:
        return null
    }
  }

  if (isSubmitted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white py-6 sm:py-8 lg:py-12 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-green-100 mb-4 sm:mb-6">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="font-bold text-[#2E2E2E] mb-3 sm:mb-4" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(24px, 5vw, 32px)' }}>
                Thank You!
              </h1>
              <p className="text-[#666666] mb-6 sm:mb-8" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(16px, 3vw, 20px)' }}>
                Thank you for partnering with The Wedding & Event (WE)! Our team will contact you soon.
              </p>
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 space-y-3 sm:space-y-4 border border-[#DD374033]">
                <h2 className="font-semibold text-[#2E2E2E] mb-3 sm:mb-4" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(16px, 3vw, 18px)' }}>Contact Information</h2>
                <div className="space-y-2 sm:space-y-3">
                  <a
                    href="https://wa.me/923141113007"
                    className="flex items-center justify-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="text-green-700 font-medium" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>WhatsApp: 03141113007</span>
                  </a>
                  <a
                    href="mailto:info@theweddingandevent.com"
                    className="flex items-center justify-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-[#F7E9DB] hover:bg-[#F7E9DB]/80 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#D13F43]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[#2E2E2E] font-medium" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>info@theweddingandevent.com</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
        <WhatsAppFloating />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <ProgressBar />

          <StepWrapper stepKey={currentStep}>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit, handleSubmitError)} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 border border-[#DD374033]" style={{fontSize: '16px'}}>
                {debug && (
                  <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800">
                    Debug: {debug}
                  </div>
                )}
                {renderStepContent()}
                <NavigationButtons
                  isSubmitting={isSubmitting}
                  onNextStep={handleNextStep}
                  {...formStepsRest}
                />
              </form>
            </FormProvider>
          </StepWrapper>
        </div>
      </div>
      <Footer />
      <WhatsAppFloating />
    </>
  )
}

export default function PartnerOnboardingPage() {
  return (
    <PartnerFormProvider>
      <PartnerOnboardingForm />
    </PartnerFormProvider>
  )
}
