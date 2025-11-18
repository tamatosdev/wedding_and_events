'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useFormSteps } from '@/hooks/useFormSteps'
import { getStepsForBusinessType } from '@/lib/partner-onboarding/formConfig'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function ProgressBar() {
  const { currentStep, totalSteps, getProgress, goToStep } = useFormSteps();
  const { businessType } = usePartnerForm();
  const steps = getStepsForBusinessType(businessType);
  const progress = getProgress();

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-[#2E2E2E]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Partner Onboarding
          </h1>
          <span className="text-sm font-medium text-[#D13F43]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-[#D13F43] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center mt-8 overflow-x-auto scrollbar-hide pb-4 relative min-h-[90px]" style={{ WebkitOverflowScrolling: 'touch', overflowY: 'visible' }}>
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;
          const handleClick = () => {
            if (stepNum !== currentStep) {
              goToStep(stepNum);
            }
          };
          return (
            <div key={step.id} className="relative flex-1 flex flex-col items-center min-w-[80px]" style={{paddingTop: '8px', paddingBottom: '8px'}}>
              {/* Connecting line (except last step) */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 left-full w-full h-1 -translate-y-1/2 z-0 pointer-events-none">
                  <div className="h-full w-full bg-gradient-to-r from-[#F7E9DB] to-[#D13F43] opacity-40 rounded-full"></div>
                </div>
              )}
              <button
                type="button"
                onClick={handleClick}
                className={`relative z-10 flex flex-col items-center focus:outline-none group ${
                  isCompleted
                    ? 'text-green-600 cursor-pointer'
                    : isActive
                    ? 'text-[#D13F43] cursor-pointer'
                    : 'text-gray-400 cursor-pointer'
                }`}
                tabIndex={0}
                aria-current={isActive ? 'step' : undefined}
                style={{marginTop: '0', marginBottom: '0'}}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all border-2 border-transparent shadow-sm group-focus:border-[#D13F43] group-hover:border-[#D13F43] group-hover:shadow-lg ${
                    isCompleted
                      ? 'bg-green-100 text-green-600 border-green-200'
                      : isActive
                      ? 'bg-gradient-to-br from-[#F7E9DB] to-[#D13F43] text-[#D13F43] ring-4 ring-[#D13F43]/30 border-[#D13F43] shadow-lg'
                      : 'bg-gray-100 text-gray-400 border-gray-200'
                  }`}
                  whileHover={{ scale: 1.13 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  style={{boxShadow: isActive ? '0 4px 16px 0 #D13F4340' : undefined}}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    stepNum
                  )}
                </motion.div>
                <span className="text-xs mt-3 text-center hidden md:block max-w-[100px] truncate font-medium tracking-wide" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {step.title}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  )
}
