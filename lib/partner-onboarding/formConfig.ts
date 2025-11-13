/**
 * Form Configuration - Step mapping for each business type
 * Defines which steps are shown for each partner type
 */

export type BusinessType = 'wedding' | 'boutiques' | 'beauty-parlor' | 'decor' | 'catering'

export interface StepConfig {
  id: string
  title: string
  component: string
  required: boolean
  validationFields?: string[]
}

export const formSteps: Record<BusinessType, StepConfig[]> = {
  wedding: [
    { id: 'business-type', title: 'Business Type', component: 'StepSelector', required: true, validationFields: ['businessType'] },
    { id: 'owner-business-details', title: 'Owner & Business Details', component: 'VenueOwnerBusinessDetails', required: true },
    { id: 'manager-details', title: 'Manager/POC Details', component: 'ManagerDetails', required: true },
    { id: 'location-bank-details', title: 'Business Location & Bank', component: 'VenueLocationBankDetails', required: true },
    { id: 'venue-information', title: 'Venue Information', component: 'VenueInformation', required: true },
    { id: 'facilities-amenities', title: 'Facilities & Amenities', component: 'VenueFacilitiesAmenities', required: true },
    { id: 'policies-additional-services', title: 'Policies & Additional Services', component: 'VenuePoliciesServices', required: true },
    { id: 'review-submit', title: 'Review & Submit', component: 'ReviewSubmit', required: false },
  ],
  boutiques: [
    { id: 'business-type', title: 'Business Type', component: 'StepSelector', required: true, validationFields: ['businessType'] },
    { id: 'owner-details', title: 'Owner Details', component: 'OwnerDetails', required: true, validationFields: ['ownerName', 'ownerMobile1', 'ownerEmail'] },
    { id: 'manager-details', title: 'Manager Details', component: 'ManagerDetails', required: true, validationFields: ['managerName', 'managerMobile1', 'managerEmail'] },
    { id: 'business-info', title: 'Business Info', component: 'BusinessInfo', required: true, validationFields: ['businessName', 'city', 'area', 'completeAddress'] },
    { id: 'bank-details', title: 'Bank Details', component: 'BankDetails', required: false },
    { id: 'boutiques-details', title: 'Boutique Details', component: 'BoutiquesDetails', required: false },
    { id: 'boutiques-products', title: 'Products & Services', component: 'BoutiquesProducts', required: false },
    { id: 'boutiques-policies', title: 'Boutique Policies', component: 'BoutiquesPolicies', required: true, validationFields: ['cancellationPolicy'] },
    { id: 'general-questions', title: 'General Questions', component: 'GeneralQuestions', required: false },
    { id: 'upload-summary', title: 'Upload & Summary', component: 'UploadSummary', required: false },
    { id: 'review-submit', title: 'Review & Submit', component: 'ReviewSubmit', required: false },
  ],
  'beauty-parlor': [
    { id: 'business-type', title: 'Business Type', component: 'StepSelector', required: true, validationFields: ['businessType'] },
    { id: 'owner-details', title: 'Owner Details', component: 'OwnerDetails', required: true, validationFields: ['ownerName', 'ownerMobile1', 'ownerEmail'] },
    { id: 'manager-details', title: 'Manager Details', component: 'ManagerDetails', required: true, validationFields: ['managerName', 'managerMobile1', 'managerEmail'] },
    { id: 'business-info', title: 'Business Info', component: 'BusinessInfo', required: true, validationFields: ['businessName', 'city', 'area', 'completeAddress'] },
    { id: 'bank-details', title: 'Bank Details', component: 'BankDetails', required: false },
    { id: 'beauty-parlor-details', title: 'Beauty Parlor Details', component: 'BeautyParlorDetails', required: false },
    { id: 'beauty-parlor-services', title: 'Services & Packages', component: 'BeautyParlorServices', required: false },
    { id: 'beauty-parlor-policies', title: 'Beauty Parlor Policies', component: 'BeautyParlorPolicies', required: true, validationFields: ['cancellationPolicy'] },
    { id: 'general-questions', title: 'General Questions', component: 'GeneralQuestions', required: false },
    { id: 'upload-summary', title: 'Upload & Summary', component: 'UploadSummary', required: false },
    { id: 'review-submit', title: 'Review & Submit', component: 'ReviewSubmit', required: false },
  ],
  decor: [
    { id: 'business-type', title: 'Business Type', component: 'StepSelector', required: true, validationFields: ['businessType'] },
    { id: 'owner-business-details', title: 'Owner & Business Details', component: 'OwnerBusinessDetails', required: true },
    { id: 'manager-details', title: 'Manager/POC Details', component: 'ManagerDetails', required: true },
    { id: 'location-bank-details', title: 'Business Location & Bank', component: 'LocationBankDetails', required: true },
    { id: 'experience-services', title: 'Experience & Services', component: 'DecorExperienceServices', required: true },
    { id: 'reputation-pricing-description', title: 'Reputation, Pricing & Description', component: 'DecorReputationPricing', required: true },
    { id: 'policies-additional', title: 'Policies & Additional Info', component: 'DecorPoliciesAdditional', required: true },
    { id: 'review-submit', title: 'Review & Submit', component: 'ReviewSubmit', required: false },
  ],
  catering: [
    { id: 'business-type', title: 'Business Type', component: 'StepSelector', required: true, validationFields: ['businessType'] },
    { id: 'owner-details', title: 'Owner Details', component: 'OwnerDetails', required: true, validationFields: ['ownerName', 'ownerMobile1', 'ownerEmail'] },
    { id: 'manager-details', title: 'Manager / POC Details', component: 'ManagerDetails', required: true, validationFields: ['managerName', 'managerMobile1', 'managerEmail'] },
    { id: 'business-info', title: 'Business Location', component: 'BusinessInfo', required: true, validationFields: ['businessName', 'city', 'area', 'completeAddress'] },
    { id: 'bank-details', title: 'Bank & Experience', component: 'BankDetails', required: false },
    { id: 'catering-details', title: 'Services & Facilities', component: 'CateringDetails', required: false },
    { id: 'catering-menu', title: 'Menu & Packages', component: 'CateringMenu', required: false },
    { id: 'catering-policies', title: 'Description & Policies', component: 'CateringPolicies', required: true, validationFields: ['cancellationPolicy'] },
    { id: 'review-submit', title: 'Review & Submit', component: 'ReviewSubmit', required: false },
  ],
}

export const getStepsForBusinessType = (businessType: BusinessType | ''): StepConfig[] => {
  if (!businessType || !formSteps[businessType]) {
    return [formSteps.wedding[0]] // Just the business type selector
  }
  return formSteps[businessType]
}

export const getStepIndex = (businessType: BusinessType | '', stepId: string): number => {
  const steps = getStepsForBusinessType(businessType)
  return steps.findIndex(step => step.id === stepId)
}

export const getTotalSteps = (businessType: BusinessType | ''): number => {
  return getStepsForBusinessType(businessType).length
}

