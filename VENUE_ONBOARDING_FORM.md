# Venue Partner Onboarding Form

## Overview

A modern, multi-step venue partner onboarding form for "The Wedding & Event (WE)" built with Next.js 14, React Hook Form, Zod validation, and Tailwind CSS.

## Features

✅ **10-Step Wizard Form** with smooth transitions  
✅ **Progress Bar** showing current step and completion percentage  
✅ **Step Indicators** with visual progress tracking  
✅ **Form Validation** using Zod schema validation  
✅ **Auto-Save** to localStorage (progress persists between sessions)  
✅ **Responsive Design** - mobile-friendly  
✅ **Elegant UI** - wedding/event theme with rose/gold accents  
✅ **Error Handling** - scrolls to first error on validation failure  
✅ **File Upload** - support for photos and documents  
✅ **Success Page** - shows contact information after submission  

## File Structure

```
app/
  └── venue-onboarding/
      └── page.tsx                    # Main form page with stepper logic

components/
  └── venue-onboarding/
      ├── Step1OwnerDetails.tsx       # Step 1: Owner Details
      ├── Step2ManagerDetails.tsx     # Step 2: Manager/POC Details
      ├── Step3BusinessDetails.tsx    # Step 3: Business Details
      ├── Step4BankDetails.tsx        # Step 4: Bank Details
      ├── Step5VenueInfo.tsx          # Step 5: Venue Information
      ├── Step6Facilities.tsx         # Step 6: Facilities & Accessibility
      ├── Step7Amenities.tsx          # Step 7: Amenities
      ├── Step8Policies.tsx           # Step 8: Policies
      ├── Step9UploadSummary.tsx      # Step 9: Upload & Summary
      └── Step10Confirmation.tsx      # Step 10: Confirmation & Review
```

## Access the Form

Navigate to: **`/venue-onboarding`**

Example: `http://localhost:3000/venue-onboarding`

## Form Steps

### Step 1: Owner Details
- Owner Name (required)
- Contact Number Mobile 1 (required)
- Contact Number Mobile 2 (optional)
- PTCL Landline (optional)
- Email Address (required)
- Business Name (required)

### Step 2: Manager/POC Details
- Name (required)
- Mobile 1 (required)
- Mobile 2 (optional)
- Landline (optional)
- Email (required)

### Step 3: Business Details
- Business Name (required)
- City (required)
- Area (required)
- Complete Address (required)
- Website (optional)
- Email (optional)

### Step 4: Bank Details (All Optional)
- Bank Name
- Branch & City
- Account Number
- IBAN Number

### Step 5: Venue Information
- Venue Type (Banquet/Marquee/Lawn/Rooftop/Other)
- Single or Multiple Sites
- Guest Capacity
- Venue Pricing Range (required)
- Catering Available? (Yes/No)
- Outside Catering Allowed? (Yes/No)

### Step 6: Facilities & Accessibility
- Parking Capacity
- Parking Type (Valet/Self/Both)
- Wheelchair Accessible? (Yes/No)
- Wheelchair Available? (Yes/No)
- Namaz Area (Men Y/N, Ladies Y/N)
- Bridal Suite? (Yes/No)

### Step 7: Amenities
- Additional Amenities (textarea)
- Air Conditioning (Y/N)
- Heating (Y/N)
- Elevators (Y/N)
- Security Staff (Y/N)
- Backup Generator (Y/N)
- Dedicated Staff (Y/N)

### Step 8: Policies
- Cancellation Policy (required)
- Fire/Property Insurance (Y/N)
- Want WE to arrange insurance? (Y/N)
- Prohibited Items or SOPs (textarea)

### Step 9: Upload & Summary
- File Upload (photos, company profile)
- Company Overview / Summary (textarea)
- Undertaking Section:
  - Name
  - Designation
  - CNIC
  - Company
  - Mobile
  - Email
  - Signature
  - Date

### Step 10: Confirmation
- Summary of all responses
- Submit button
- Success message with contact info

## Technical Details

### Dependencies Used
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod integration
- `lucide-react` - Icons
- `tailwindcss` - Styling

### Form Validation
- Required fields are validated before moving to next step
- Email fields use email validation
- Errors are displayed inline below each field
- Form scrolls to first error on validation failure

### Auto-Save
- Form data is automatically saved to localStorage on every change
- Progress (current step) is also saved
- Data persists between browser sessions
- localStorage key: `venue-onboarding-form`

### Styling
- **Theme Colors**: Rose (#d13f43) and Gold/Amber accents
- **Background**: Gradient from rose-50 via white to amber-50
- **Cards**: White with rose borders and subtle shadows
- **Buttons**: Gradient buttons (rose to amber)
- **Animations**: Smooth fade-in transitions between steps

## API Integration

Currently, the form logs data to console on submission. To integrate with your API:

1. Update the `onSubmit` function in `app/venue-onboarding/page.tsx`
2. Replace the console.log with your API call:

```typescript
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true)
  try {
    const response = await fetch('/api/venue-onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) throw new Error('Submission failed')
    
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY)
    setIsSubmitted(true)
  } catch (error) {
    console.error('Submission error:', error)
    alert('Failed to submit form. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}
```

## Success Page

After successful submission, users see:
- Success message
- Contact information:
  - WhatsApp: 03141113007
  - Email: info@theweddingandevent.com
- Note about review timeline (2-3 business days)

## Customization

### Change Colors
Update Tailwind classes in components:
- Rose colors: `rose-*` (e.g., `rose-500`, `rose-600`)
- Gold/Amber colors: `amber-*` (e.g., `amber-500`)

### Add/Remove Steps
1. Add step component to `components/venue-onboarding/`
2. Import in `app/venue-onboarding/page.tsx`
3. Add to `steps` array
4. Update `formSchema` with new fields
5. Add validation in `getStepFields` function

### Modify Validation Rules
Update the Zod schema in `app/venue-onboarding/page.tsx`:

```typescript
const formSchema = z.object({
  // Add/modify fields here
  fieldName: z.string().min(1, 'Error message'),
})
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- File uploads are stored in component state (not persisted to localStorage)
- Large files may need server-side handling
- Form data is cleared from localStorage after successful submission
- TypeScript errors may appear initially but should resolve after TypeScript server refresh

## Future Enhancements

- [ ] Add API endpoint for form submission
- [ ] Add file upload to server/cloud storage
- [ ] Add email notification on submission
- [ ] Add admin dashboard to view submissions
- [ ] Add form analytics/tracking
- [ ] Add multi-language support
- [ ] Add PDF export of form data

