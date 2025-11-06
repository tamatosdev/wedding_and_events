'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface StepWrapperProps {
  children: ReactNode
  stepKey: string | number
}

export default function StepWrapper({ children, stepKey }: StepWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

