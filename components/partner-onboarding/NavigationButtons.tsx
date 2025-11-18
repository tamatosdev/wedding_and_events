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

  // Render buttons in a flex container: Back left, Next/Submit right
  return (
    <div className="flex justify-between items-center w-full mt-8 gap-4">
      <div className="flex-1 flex justify-start">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          disabled={!canGoPrevious()}
          className="flex items-center gap-3 px-7 py-3 rounded-full border-2 border-[#DD3740] text-[#2E2E2E] font-semibold text-lg bg-white shadow-md hover:bg-[#F7E9DB] hover:border-[#D13F43] focus:ring-2 focus:ring-[#D13F43] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em' }}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Button>
      </div>
      <div className="flex-1 flex justify-end">
        {isLastStep ? (
          <Button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-3 px-7 py-3 rounded-full bg-gradient-to-r from-[#D13F43] to-[#b82f33] text-white font-semibold text-lg shadow-lg hover:from-[#b82f33] hover:to-[#D13F43] focus:ring-2 focus:ring-[#D13F43] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em' }}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-3 px-7 py-3 rounded-full bg-gradient-to-r from-[#D13F43] to-[#b82f33] text-white font-semibold text-lg shadow-lg hover:from-[#b82f33] hover:to-[#D13F43] focus:ring-2 focus:ring-[#D13F43] transition-all duration-200"
            style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em' }}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
