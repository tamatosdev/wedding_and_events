/**
 * Form Configuration - Step mapping for each business type
 * Defines which steps are shown for each partner type
 */

export type BusinessType = 'wedding' | 'boutiques' | 'beauty-parlour' | 'decor' | 'catering'

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
    { id: 'boutique-step1', title: 'Owner & Business Details', component: 'Boutique/Step1OwnerBusiness', required: true },
    { id: 'boutique-step2', title: 'Manager/POC Details', component: 'Boutique/Step2ManagerPOC', required: true },
    { id: 'boutique-step3', title: 'Bank & Payment Information', component: 'Boutique/Step3BankPayment', required: false },
    { id: 'boutique-step4', title: 'Business Profile & Product Range', component: 'Boutique/Step4ProfileProduct', required: false },
    { id: 'boutique-step5', title: 'Product, Rental & Logistics', component: 'Boutique/Step5ProductRentalLogistics', required: false },
    { id: 'boutique-step6', title: 'Customer Service & Policies', component: 'Boutique/Step6CustomerPolicies', required: false },
    { id: 'boutique-step7', title: 'Marketing & Promotion', component: 'Boutique/Step7MarketingPromotion', required: false },
    { id: 'boutique-step8', title: 'Final Declarations & Submission', component: 'Boutique/Step8FinalDeclaration', required: false },
  ],
  'beauty-parlour': [
    { id: 'business-type', title: 'Business Type', component: 'StepSelector', required: true, validationFields: ['businessType'] },
    { id: 'beautyparlour-step1', title: 'Owner & Business Details', component: 'BeautyParlour/Step1OwnerBusiness', required: true },
    { id: 'beautyparlour-step2', title: 'Manager/POC Details', component: 'BeautyParlour/Step2ManagerPOC', required: true },
    { id: 'beautyparlour-step3', title: 'Bank & Payment Information', component: 'BeautyParlour/Step3BankPayment', required: false },
    { id: 'beautyparlour-step4', title: 'Business Profile & Experience', component: 'BeautyParlour/Step4ProfileExperience', required: false },
    { id: 'beautyparlour-step5', title: 'Services & Staff', component: 'BeautyParlour/Step5ServicesStaff', required: false },
    { id: 'beautyparlour-step6', title: 'Portfolio & Marketing', component: 'BeautyParlour/Step6PortfolioMarketing', required: false },
    { id: 'beautyparlour-step7', title: 'Pricing, Booking & Policies', component: 'BeautyParlour/Step7PricingBooking', required: false },
    { id: 'beautyparlour-step8', title: 'Final Declarations & Submission', component: 'BeautyParlour/Step8FinalDeclaration', required: false },
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

