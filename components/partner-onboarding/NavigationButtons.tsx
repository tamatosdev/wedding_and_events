'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFormSteps } from '@/hooks/useFormSteps'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

interface NavigationButtonsProps {
  onSubmit?: () => void
  isSubmitting?: boolean
  onNextStep?: () => void
}

export default function NavigationButtons({ onSubmit, isSubmitting = false, onNextStep }: NavigationButtonsProps) {
  const { currentStep, totalSteps, canGoPrevious, goToPreviousStep, goToNextStep: goToNextStepDefault } = useFormSteps();
  const { isSubmitting: contextSubmitting } = usePartnerForm();
  const submitting = isSubmitting || contextSubmitting;
  const isLastStep = currentStep === totalSteps;

  const handleNext = async () => {
    if (onNextStep) {
      await onNextStep();
    } else {
      await goToNextStepDefault();
    }
  };

  // Render buttons directly, no wrapping div
  return <>
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
        type="submit"
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
  </>;
}
