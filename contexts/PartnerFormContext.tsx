'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { FormData } from '@/lib/partner-onboarding/validationSchemas'
import { BusinessType } from '@/lib/partner-onboarding/formConfig'

interface PartnerFormContextType {
  formData: Partial<FormData>
  currentStep: number
  businessType: BusinessType | ''
  isSubmitting: boolean
  isSubmitted: boolean
  updateFormData: (data: Partial<FormData>) => void
  setCurrentStep: (step: number) => void
  setBusinessType: (type: BusinessType | '') => void
  setIsSubmitting: (value: boolean) => void
  setIsSubmitted: (value: boolean) => void
  resetForm: () => void
}

const PartnerFormContext = createContext<PartnerFormContextType | undefined>(undefined)

const STORAGE_KEY = 'partner-onboarding-form'

export function PartnerFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [businessType, setBusinessType] = useState<BusinessType | ''>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed.formData || {})
        setCurrentStep(parsed.currentStep || 1)
        setBusinessType(parsed.businessType || '')
      } catch (error) {
        console.error('Failed to load saved form data:', error)
      }
    }
  }, [])

  // Save form data to localStorage
  useEffect(() => {
    const dataToSave = {
      formData,
      currentStep,
      businessType,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  }, [formData, currentStep, businessType])

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const resetForm = () => {
    setFormData({})
    setCurrentStep(1)
    setBusinessType('')
    setIsSubmitting(false)
    setIsSubmitted(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <PartnerFormContext.Provider
      value={{
        formData,
        currentStep,
        businessType,
        isSubmitting,
        isSubmitted,
        updateFormData,
        setCurrentStep,
        setBusinessType,
        setIsSubmitting,
        setIsSubmitted,
        resetForm,
      }}
    >
      {children}
    </PartnerFormContext.Provider>
  )
}

export function usePartnerForm() {
  const context = useContext(PartnerFormContext)
  if (context === undefined) {
    throw new Error('usePartnerForm must be used within a PartnerFormProvider')
  }
  return context
}

