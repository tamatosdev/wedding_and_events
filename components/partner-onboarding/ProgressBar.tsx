'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useFormSteps } from '@/hooks/useFormSteps'
import { getStepsForBusinessType } from '@/lib/partner-onboarding/formConfig'
import { usePartnerForm } from '@/contexts/PartnerFormContext'

export default function ProgressBar() {
  const { currentStep, totalSteps, getProgress } = useFormSteps()
  const { businessType } = usePartnerForm()
  const steps = getStepsForBusinessType(businessType)
  const progress = getProgress()

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
      <div className="flex justify-between items-center mt-4 overflow-x-auto pb-2">
        {steps.map((step, index) => {
          const stepNum = index + 1
          const isActive = stepNum === currentStep
          const isCompleted = stepNum < currentStep
          
          return (
            <div
              key={step.id}
              className={`flex flex-col items-center min-w-[80px] transition-colors ${
                isCompleted
                  ? 'text-green-600'
                  : isActive
                  ? 'text-[#D13F43]'
                  : 'text-gray-400'
              }`}
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  isCompleted
                    ? 'bg-green-100 text-green-600'
                    : isActive
                    ? 'bg-[#F7E9DB] text-[#D13F43] ring-2 ring-[#D13F43]'
                    : 'bg-gray-100 text-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  stepNum
                )}
              </motion.div>
              <span className="text-xs mt-1 text-center hidden md:block max-w-[80px] truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
