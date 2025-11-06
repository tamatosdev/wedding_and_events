# Partner Onboarding Form - Multi-Business Type

## Overview

A modern, responsive, multi-step partner onboarding form for "The Wedding & Event (WE)" that handles three business types:
1. **Venue / Banquet / Marquee**
2. **Boutique / Dress Designer**
3. **Beauty Parlour / Salon**

Built with Next.js 14, React Hook Form, Zod validation, Tailwind CSS, and Framer Motion animations.

## Features

✅ **8-Step Wizard Form** with smooth Framer Motion transitions  
✅ **Business Type Selection** - Choose from 3 business types  
✅ **Dynamic Form Fields** - Different fields based on selected type  
✅ **Progress Bar** with step indicators  
✅ **Form Validation** using Zod schema  
✅ **Auto-Save** to localStorage  
✅ **Responsive Design** - Mobile-friendly  
✅ **Premium Wedding Theme** - Rose/pink/gold accents  
✅ **File Upload** support  
✅ **Review & Submit** - Summary before submission  
✅ **Success Page** with contact information  

## File Structure

```
app/
  └── partner-onboarding/
      └── page.tsx                    # Main form page

components/
  └── partner-onboarding/
      ├── Step1BusinessType.tsx       # Business type selection
      ├── Step2OwnerDetails.tsx       # Owner details
      ├── Step3ManagerDetails.tsx     # Manager/POC details
      ├── Step4BusinessDetails.tsx    # Business details
      ├── Step5BankDetails.tsx        # Bank details
      ├── VenueFields.tsx             # Venue-specific fields
      ├── BoutiqueFields.tsx           # Boutique-specific fields
      ├── SalonFields.tsx              # Salon-specific fields
      ├── CommonFields.tsx             # Shared fields (policies, uploads)
      └── ReviewSubmit.tsx             # Review & confirmation

app/api/
  └── partner-onboarding/
      └── route.ts                    # API endpoint

prisma/
  └── schema.prisma                   # Database model
```

## Form Steps

### Step 1: Business Type Selection
- Select from 3 business types (Venue, Boutique, Salon)
- Visual cards with icons
- Required field

### Step 2: Owner Details
- Owner Name (required)
- Contact Number Mobile 1 (required)
- Contact Number Mobile 2 (optional)
- PTCL Landline (optional)
- Email Address (required)

### Step 3: Manager/POC Details
- Name (required)
- Mobile 1 (required)
- Mobile 2 (optional)
- Landline (optional)
- Email (required)

### Step 4: Business Details
- Business Name (required)
- City (required)
- Area (required)
- Complete Address (required)
- Website (optional)
- Email (optional)

### Step 5: Bank Details
- All fields optional
- Bank Name, Branch & City, Account Number, IBAN

### Step 6: Business-Specific Fields

#### Venue Fields:
- Venue Type (Banquet/Marquee/Lawn/Rooftop)
- Guest Capacity
- Venue Pricing Range
- Catering Available? (Yes/No)
- Outside Catering Allowed? (Yes/No)
- Parking Capacity & Type
- Amenities (textarea)
- Bridal Suite? (Yes/No)
- Namaz Area (Men/Ladies)

#### Boutique Fields:
- Dress Types Available
- Design or Resell? (Design/Resell/Both)
- Fabrics Used (textarea)
- Price Range
- Customization Services (textarea)
- Rental Policy (textarea)
- Delivery & Logistics (textarea)

#### Salon Fields:
- Services Offered (textarea)
- Packages & Pricing (textarea)
- Operating Hours
- Brands & Products Used (textarea)
- Staff Expertise & Experience (textarea)
- Bridal Trial Policy (textarea)
- General Pricing Information
- Promotions & Offers (textarea)
- Hygiene & Safety Standards (textarea)

### Step 7: Common Fields
- Business Duration
- Number of Branches
- Cancellation Policy (required)
- Fire/Property Insurance (Yes/No)
- Want WE to arrange insurance? (Yes/No)
- Wheelchair Accessible? (Yes/No)
- File Upload (photos, company profile)

### Step 8: Review & Submit
- Summary of all responses
- Organized by sections
- Submit button
- Success message with contact info

## Access

Navigate to: **`/partner-onboarding`**

Example: `http://localhost:3000/partner-onboarding`

## Database Model

**Model:** `PartnerOnboardingSubmission`

**Enums:**
- `PartnerBusinessType`: VENUE, BOUTIQUE, SALON
- `PartnerSubmissionStatus`: PENDING, UNDER_REVIEW, APPROVED, REJECTED, CONTACTED

**Fields:**
- All shared fields (Owner, Manager, Business, Bank, Common)
- Venue-specific fields (when businessType = VENUE)
- Boutique-specific fields (when businessType = BOUTIQUE)
- Salon-specific fields (when businessType = SALON)
- Status tracking (status, reviewedBy, reviewedAt, adminNotes)

## API Endpoints

### POST `/api/partner-onboarding`
- Creates new submission
- Validates required fields
- Maps business type to enum
- Returns submission ID

### GET `/api/partner-onboarding`
- Lists submissions with pagination
- Query params: `status`, `businessType`, `page`, `limit`

## Technical Details

### Dependencies
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod integration
- `framer-motion` - Smooth animations
- `lucide-react` - Icons
- `tailwindcss` - Styling

### Form Validation
- Required fields validated before moving to next step
- Email fields use email validation
- Errors displayed inline
- Scrolls to first error on validation failure

### Auto-Save
- Form data saved to localStorage on every change
- Progress (current step) also saved
- Data persists between sessions
- localStorage key: `partner-onboarding-form`

### Animations
- Framer Motion for smooth transitions
- Step content fades in/out
- Progress bar animates
- Business type cards animate on load

### Styling
- **Theme Colors**: Rose (#d13f43), Pink, Gold/Amber
- **Background**: Gradient from rose-50 via white to amber-50
- **Cards**: White with colored borders based on business type
- **Buttons**: Gradient buttons (rose to amber)
- **Icons**: Different icons for each business type

## Business Type Colors

- **Venue**: Rose (rose-400 to rose-600)
- **Boutique**: Pink (pink-400 to pink-600)
- **Salon**: Amber (amber-400 to amber-600)

## Success Page

After submission, users see:
- Success message
- Contact information:
  - WhatsApp: 03141113007
  - Email: info@theweddingandevent.com
- Review timeline (2-3 business days)

## Setup Instructions

### 1. Update Database Schema

```bash
npm run db:push
```

### 2. Generate Prisma Client

```bash
npm run db:generate
```

### 3. Test the Form

1. Navigate to `/partner-onboarding`
2. Select business type
3. Fill out all steps
4. Review and submit
5. Check database for submission

## Customization

### Add New Business Type

1. Add to `PartnerBusinessType` enum in schema
2. Add option in `Step1BusinessType.tsx`
3. Create new fields component
4. Add to `renderStepContent()` in main page
5. Update API endpoint mapping

### Modify Validation Rules

Update Zod schema in `app/partner-onboarding/page.tsx`:

```typescript
const baseSchema = z.object({
  // Add/modify fields
  fieldName: z.string().min(1, 'Error message'),
})
```

### Change Colors

Update Tailwind classes:
- Venue: `rose-*` colors
- Boutique: `pink-*` colors
- Salon: `amber-*` colors

## Notes

- File uploads stored in component state (not persisted to localStorage)
- Large files may need server-side handling
- Form data cleared from localStorage after successful submission
- Business type selection required before proceeding to step 6

## Future Enhancements

- [ ] Add API endpoint for form submission (✅ Done)
- [ ] Add admin panel to review submissions
- [ ] Add file upload to server/cloud storage
- [ ] Add email notification on submission
- [ ] Add multi-language support
- [ ] Add PDF export of form data

