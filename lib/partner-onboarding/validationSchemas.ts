/**
 * Validation Schemas for Partner Onboarding Form
 * Using Zod for type-safe validation
 */

import { z } from 'zod'

  // Base schema with all possible fields
export const baseFormSchema = z.object({
  // Business Type
  businessType: z.enum(['wedding', 'boutiques', 'beauty-parlor', 'decor', 'catering'], {
    required_error: 'Please select a business type',
  }),
  
  // Owner Details
  ownerName: z.string().min(1, 'Owner name is required'),
  ownerMobile1: z.string().min(1, 'Mobile 1 is required'),
  ownerMobile2: z.string().optional(),
  ownerLandline: z.string().optional(),
  ownerEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  
  // Manager Details
  managerName: z.string().min(1, 'Manager name is required'),
  managerMobile1: z.string().min(1, 'Mobile 1 is required'),
  managerMobile2: z.string().optional(),
  managerLandline: z.string().optional(),
  managerEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  
  // Business Details
  businessName: z.string().min(1, 'Business name is required'),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area is required'),
  completeAddress: z.string().min(1, 'Complete address is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  businessEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  
  // Bank Details
  bankName: z.string().optional(),
  branchCity: z.string().optional(),
  accountNumber: z.string().optional(),
  ibanNumber: z.string().optional(),
  
  // Common Fields
  businessDuration: z.string().optional(),
  numberOfBranches: z.string().optional(),
  cancellationPolicy: z.string().min(1, 'Cancellation policy is required'),
  fireInsurance: z.string().optional(),
  weArrangeInsurance: z.string().optional(),
  wheelchairAccessible: z.string().optional(),
  fileUrls: z.array(z.string()).optional(),
  
  // Venue specific fields
  venueType: z.string().optional(),
  guestCapacity: z.string().optional(),
  venuePricingRange: z.string().optional(),
  cateringAvailable: z.string().optional(),
  outsideCateringAllowed: z.string().optional(),
  parkingCapacity: z.string().optional(),
  parkingType: z.string().optional(),
  amenities: z.string().optional(),
  bridalSuite: z.string().optional(),
  namazAreaMen: z.string().optional(),
  namazAreaLadies: z.string().optional(),
  
  // Boutique specific fields
  dressType: z.string().optional(),
  designOrResell: z.string().optional(),
  fabrics: z.string().optional(),
  priceRange: z.string().optional(),
  customization: z.string().optional(),
  rentalPolicy: z.string().optional(),
  delivery: z.string().optional(),
  
  // Salon specific fields
  servicesList: z.string().optional(),
  packages: z.string().optional(),
  operatingHours: z.string().optional(),
  brandsUsed: z.string().optional(),
  staffExpertise: z.string().optional(),
  bridalTrials: z.string().optional(),
  salonPricing: z.string().optional(),
  promotions: z.string().optional(),
  hygiene: z.string().optional(),
  
  // Décor specific fields
  decorType: z.string().optional(),
  decorStyle: z.string().optional(),
  eventTypes: z.string().optional(),
  decorPricingRange: z.string().optional(),
  setupTime: z.string().optional(),
  equipmentProvided: z.string().optional(),
  customDesign: z.string().optional(),
  themesAvailable: z.string().optional(),
  floralsIncluded: z.string().optional(),
  lightingServices: z.string().optional(),
  
  // Catering specific fields
  cuisineType: z.string().optional(),
  menuStyle: z.string().optional(),
  servingStyle: z.string().optional(),
  minimumGuests: z.string().optional(),
  maximumGuests: z.string().optional(),
  cateringPricingRange: z.string().optional(),
  halalCertified: z.string().optional(),
  vegetarianOptions: z.string().optional(),
  dietaryAccommodations: z.string().optional(),
  setupService: z.string().optional(),
  servingStaff: z.string().optional(),
  equipmentRental: z.string().optional(),
})

export type FormData = z.infer<typeof baseFormSchema>

// Step-specific validation schemas
export const stepSchemas = {
  'business-type': z.object({
    businessType: z.enum(['wedding', 'boutiques', 'beauty-parlor', 'decor', 'catering'], {
      required_error: 'Please select a business type',
    }),
  }),
  
  'owner-details': z.object({
    ownerName: z.string().min(1, 'Owner name is required'),
    ownerMobile1: z.string().min(1, 'Mobile 1 is required'),
    ownerEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  }),
  
  'manager-details': z.object({
    managerName: z.string().min(1, 'Manager name is required'),
    managerMobile1: z.string().min(1, 'Mobile 1 is required'),
    managerEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  }),
  
  'business-info': z.object({
    businessName: z.string().min(1, 'Business name is required'),
    city: z.string().min(1, 'City is required'),
    area: z.string().min(1, 'Area is required'),
    completeAddress: z.string().min(1, 'Complete address is required'),
  }),
  
  'bank-details': z.object({}), // All optional
  
  'wedding-details': z.object({}), // Optional fields
  'wedding-facilities': z.object({}), // Optional fields
  'wedding-policies': z.object({
    cancellationPolicy: z.string().min(1, 'Cancellation policy is required'),
  }),
  
  'boutiques-details': z.object({}), // Optional fields
  'boutiques-products': z.object({}), // Optional fields
  'boutiques-policies': z.object({
    cancellationPolicy: z.string().min(1, 'Cancellation policy is required'),
  }),
  
  'beauty-parlor-details': z.object({}), // Optional fields
  'beauty-parlor-services': z.object({}), // Optional fields
  'beauty-parlor-policies': z.object({
    cancellationPolicy: z.string().min(1, 'Cancellation policy is required'),
  }),
  
  'decor-details': z.object({}), // Optional fields
  'decor-services': z.object({}), // Optional fields
  'decor-policies': z.object({
    cancellationPolicy: z.string().min(1, 'Cancellation policy is required'),
  }),
  
  'catering-details': z.object({}), // Optional fields
  'catering-menu': z.object({}), // Optional fields
  'catering-policies': z.object({
    cancellationPolicy: z.string().min(1, 'Cancellation policy is required'),
  }),
  
  'general-questions': z.object({}), // Optional fields
  'upload-summary': z.object({}), // Optional fields
  'review-submit': z.object({}), // No validation needed
}

export const validateStep = (stepId: string, data: Partial<FormData>): { valid: boolean; errors: Record<string, string> } => {
  const schema = stepSchemas[stepId as keyof typeof stepSchemas]
  if (!schema) {
    return { valid: true, errors: {} }
  }
  
  try {
    schema.parse(data)
    return { valid: true, errors: {} }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message
        }
      })
      return { valid: false, errors }
    }
    return { valid: false, errors: {} }
  }
}

