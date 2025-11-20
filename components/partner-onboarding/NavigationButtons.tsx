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
    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center w-full mt-6 sm:mt-8 gap-3 sm:gap-4">
      <div className="flex-1 flex justify-start order-2 sm:order-1">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          disabled={!canGoPrevious()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border-2 border-[#DD3740] text-[#2E2E2E] font-semibold text-base sm:text-lg bg-white shadow-md hover:bg-[#F7E9DB] hover:border-[#D13F43] focus:ring-2 focus:ring-[#D13F43] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em', fontSize: 'clamp(14px, 2.5vw, 18px)' }}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </Button>
      </div>
      <div className="flex-1 flex justify-end order-1 sm:order-2">
        {isLastStep ? (
          <Button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#D13F43] to-[#b82f33] text-white font-semibold shadow-lg hover:from-[#b82f33] hover:to-[#D13F43] focus:ring-2 focus:ring-[#D13F43] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em', fontSize: 'clamp(14px, 2.5vw, 18px)' }}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleNext}
            className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#D13F43] to-[#b82f33] text-white font-semibold shadow-lg hover:from-[#b82f33] hover:to-[#D13F43] focus:ring-2 focus:ring-[#D13F43] transition-all duration-200"
            style={{ fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.02em', fontSize: 'clamp(14px, 2.5vw, 18px)' }}
          >
            Next
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
