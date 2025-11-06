'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar, X } from 'lucide-react'
import { Button } from './button'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  placeholder?: string
  minDate?: string
  maxDate?: string
  required?: boolean
  id?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  minDate,
  maxDate,
  required = false,
  id,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  )
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate || new Date()
  )
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value))
      setCurrentMonth(new Date(value))
    } else {
      setSelectedDate(null)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const formatDate = (date: Date | null): string => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDisplayDate = (date: Date | null): string => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateDisabled = (date: Date): boolean => {
    if (minDate) {
      const min = new Date(minDate)
      min.setHours(0, 0, 0, 0)
      if (date < min) return true
    }
    if (maxDate) {
      const max = new Date(maxDate)
      max.setHours(23, 59, 59, 999)
      if (date > max) return true
    }
    // Disable past dates
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return true
    return false
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    )
    if (!isDateDisabled(newDate)) {
      setSelectedDate(newDate)
      onChange(formatDate(newDate))
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    setSelectedDate(null)
    onChange('')
    setIsOpen(false)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const days = []
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    )
    days.push({
      day,
      date,
      disabled: isDateDisabled(date),
      isSelected:
        selectedDate &&
        date.toDateString() === selectedDate.toDateString(),
      isToday:
        date.toDateString() === new Date().toDateString(),
    })
  }

  return (
    <div ref={pickerRef} className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D13F43] focus-visible:ring-offset-2 cursor-pointer hover:border-[#D13F43] transition-colors"
      >
        <div className="flex items-center gap-2 flex-1">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span
            className={`${
              selectedDate ? 'text-[#2E2E2E]' : 'text-gray-400'
            }`}
          >
            {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
          </span>
        </div>
        {selectedDate && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleClear()
            }}
            className="text-gray-400 hover:text-[#D13F43]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg p-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth('prev')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h3 className="font-semibold text-[#2E2E2E]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {monthName}
            </h3>
            <button
              type="button"
              onClick={() => navigateMonth('next')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
              (day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-2"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {day}
                </div>
              )
            )}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((dayData, index) => {
              if (dayData === null) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }

              const { day, date, disabled, isSelected, isToday } = dayData

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  disabled={disabled}
                  className={`aspect-square rounded-md text-sm transition-colors ${
                    disabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#D13F43] text-white font-semibold'
                      : isToday
                      ? 'bg-[#F7E9DB] text-[#D13F43] font-semibold'
                      : 'hover:bg-gray-100 text-[#2E2E2E]'
                  }`}
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date()
                setSelectedDate(today)
                onChange(formatDate(today))
                setIsOpen(false)
              }}
              className="flex-1 text-xs"
            >
              Today
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                setSelectedDate(tomorrow)
                onChange(formatDate(tomorrow))
                setIsOpen(false)
              }}
              className="flex-1 text-xs"
            >
              Tomorrow
            </Button>
          </div>
        </div>
      )}

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        id={id}
        value={value}
        required={required}
      />
    </div>
  )
}

