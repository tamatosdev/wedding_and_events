/**
 * Project-wide constants
 */

// Only Karachi is supported
export const CITIES = ['Karachi'] as const

// Business types matching the project categories
export const BUSINESS_TYPES = {
  WEDDING: 'wedding', // Venue/Wedding Halls
  CATERING: 'catering',
  DECOR: 'decor',
  BEAUTY_PARLOR: 'beauty-parlor',
  BOUTIQUES: 'boutiques',
} as const

export type BusinessType = typeof BUSINESS_TYPES[keyof typeof BUSINESS_TYPES]

// Display names for business types
export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  [BUSINESS_TYPES.WEDDING]: 'Wedding Halls/Venues',
  [BUSINESS_TYPES.CATERING]: 'Catering',
  [BUSINESS_TYPES.DECOR]: 'Decoration',
  [BUSINESS_TYPES.BEAUTY_PARLOR]: 'Beauty Salon',
  [BUSINESS_TYPES.BOUTIQUES]: 'Boutiques',
}

// Theme colors
export const THEME_COLORS = {
  primary: '#D13F43',
  primaryHover: '#b82f33',
  primaryLight: '#F7E9DB',
  text: '#2E2E2E',
  textLight: '#666666',
  border: '#DD374033',
} as const

// Font families
export const FONTS = {
  heading: 'DM Sans, sans-serif',
  body: 'DM Sans, sans-serif',
} as const

