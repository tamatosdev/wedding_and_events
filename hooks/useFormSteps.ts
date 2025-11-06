/**
 * Custom hook for managing form step navigation
 */

import { useState, useCallback } from 'react'
import { usePartnerForm } from '@/contexts/PartnerFormContext'
import { getStepsForBusinessType, getTotalSteps } from '@/lib/partner-onboarding/formConfig'
import { validateStep } from '@/lib/partner-onboarding/validationSchemas'
import { BusinessType } from '@/lib/partner-onboarding/formConfig'

export function useFormSteps() {
  const {
    currentStep,
    businessType,
    formData,
    setCurrentStep,
    updateFormData,
  } = usePartnerForm()

  const steps = getStepsForBusinessType(businessType)
  const totalSteps = getTotalSteps(businessType)

  const canGoNext = useCallback(async (): Promise<boolean> => {
    if (currentStep >= totalSteps) return false
    
    const currentStepConfig = steps[currentStep - 1]
    if (!currentStepConfig) return false

    // Validate current step
    const validation = validateStep(currentStepConfig.id, formData)
    return validation.valid
  }, [currentStep, totalSteps, steps, formData])

  const canGoPrevious = useCallback((): boolean => {
    return currentStep > 1
  }, [currentStep])

  const goToNextStep = useCallback(async (): Promise<boolean> => {
    const canProceed = await canGoNext()
    if (canProceed && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }
    return false
  }, [canGoNext, currentStep, totalSteps, setCurrentStep])

  const goToPreviousStep = useCallback((): void => {
    if (canGoPrevious()) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [canGoPrevious, currentStep, setCurrentStep])

  const goToStep = useCallback((step: number): void => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [totalSteps, setCurrentStep])

  const getCurrentStepConfig = useCallback(() => {
    return steps[currentStep - 1]
  }, [currentStep, steps])

  const getProgress = useCallback((): number => {
    return (currentStep / totalSteps) * 100
  }, [currentStep, totalSteps])

  return {
    currentStep,
    totalSteps,
    steps,
    canGoNext,
    canGoPrevious,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    getCurrentStepConfig,
    getProgress,
  }
}

