/**
 * Type definitions for Venue Onboarding Form
 * 
 * Note: The /venue-onboarding route has been deprecated and redirects to /partner-onboarding
 * These types are kept for backward compatibility with existing components
 */

export interface FormData {
  // Step 1: Owner Details
  ownerName: string
  ownerMobile1: string
  ownerMobile2?: string
  ownerLandline?: string
  ownerEmail: string
  businessName: string

  // Step 2: Manager/POC Details
  managerName: string
  managerMobile1: string
  managerMobile2?: string
  managerLandline?: string
  managerEmail: string

  // Step 3: Business Details
  businessName2: string
  city: string
  area: string
  completeAddress: string
  website?: string
  businessEmail?: string

  // Step 4: Bank Details
  bankName?: string
  branchCity?: string
  accountNumber?: string
  ibanNumber?: string

  // Step 5: Venue Information
  venueType?: string
  singleMultipleSites?: string
  guestCapacity?: string
  venuePricingRange: string
  cateringAvailable?: string
  outsideCateringAllowed?: string

  // Step 6: Facilities & Accessibility
  parkingCapacity?: string
  parkingType?: string
  wheelchairAccessible?: string
  wheelchairAvailable?: string
  namazAreaMen?: string
  namazAreaLadies?: string
  bridalSuite?: string

  // Step 7: Amenities
  amenities?: string
  airConditioning?: string
  heating?: string
  elevators?: string
  securityStaff?: string
  backupGenerator?: string
  dedicatedStaff?: string

  // Step 8: Policies
  cancellationPolicy: string
  fireInsurance?: string
  weArrangeInsurance?: string
  prohibitedItems?: string

  // Step 9: Upload & Summary
  companyOverview?: string
  undertakingName?: string
  undertakingDesignation?: string
  undertakingCNIC?: string
  undertakingCompany?: string
  undertakingMobile?: string
  undertakingEmail?: string
  undertakingSignature?: string
  undertakingDate?: string
  files?: File[]
}

