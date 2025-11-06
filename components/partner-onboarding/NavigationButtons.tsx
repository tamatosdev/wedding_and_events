'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFormSteps } from '@/hooks/useFormSteps'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

interface NavigationButtonsProps {
  onSubmit?: () => void
  isSubmitting?: boolean
}

export default function NavigationButtons({ onSubmit, isSubmitting = false }: NavigationButtonsProps) {
  const { currentStep, totalSteps, canGoPrevious, goToPreviousStep, goToNextStep } = useFormSteps()
  const { isSubmitting: contextSubmitting } = usePartnerForm()
  
  const submitting = isSubmitting || contextSubmitting
  const isLastStep = currentStep === totalSteps

  const handleNext = async () => {
    await goToNextStep()
  }

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit()
    }
  }

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#DD374033]">
      <Button
        type="button"
        variant="outline"
        onClick={goToPreviousStep}
        disabled={!canGoPrevious()}
        className="flex items-center gap-2 border-[#DD374033] text-[#2E2E2E] hover:bg-[#F7E9DB] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>

      {isLastStep ? (
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-2 bg-[#D13F43] hover:bg-[#b82f33] text-white shadow-lg disabled:opacity-50"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-2 bg-[#D13F43] hover:bg-[#b82f33] text-white shadow-lg"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
