# Project Theme Alignment & Updates

## Current Status
The partner onboarding pages (`/partners` and `/partner-onboarding`) were using a different theme (rose/pink/amber) that doesn't match the main project theme.

## Main Project Theme
- **Primary Color**: `#D13F43` (red/crimson)
- **Primary Hover**: `#b82f33`
- **Font**: DM Sans (sans-serif)
- **Background**: White with borders
- **Text Color**: `#2E2E2E`
- **Border Color**: `#DD374033`

## Required Changes

### 1. Business Types Update
**Old**: `venue`, `boutique`, `salon`, `decor`, `catering`
**New**: `wedding`, `boutiques`, `beauty-parlour`, `decor`, `catering`

### 2. City Selection
**Change**: All city selections should only show "Karachi"

### 3. Theme Colors
**Change**: Replace all rose/pink/amber colors with `#D13F43` (primary red)

### 4. Fonts
**Change**: Replace Playfair Display with DM Sans

### 5. Component Updates Needed
- [ ] Update `StepSelector.tsx` - business types and colors
- [ ] Update all form components - theme colors
- [ ] Update `PartnerShowcase.tsx` - theme colors
- [ ] Update `PartnerCard.tsx` - theme colors
- [ ] Update `BusinessInfo.tsx` - city selection
- [ ] Update validation schemas
- [ ] Update Prisma schema
- [ ] Update API routes
- [ ] Create comprehensive CMS backend

## Files to Update

### Configuration Files
- `lib/partner-onboarding/formConfig.ts` ✅ (Updated)
- `lib/partner-onboarding/validationSchemas.ts` (Needs update)
- `lib/constants.ts` ✅ (Created)

### Components
- `components/partner-onboarding/StepSelector.tsx`
- `components/partner-onboarding/Shared/BusinessInfo.tsx`
- `components/partner-onboarding/Shared/*.tsx` (all shared components)
- `components/partner-onboarding/Venue/*.tsx` (rename to Wedding)
- `components/partner-onboarding/Boutique/*.tsx` (rename to Boutiques)
- `components/partner-onboarding/Salon/*.tsx` (rename to BeautyParlor)
- `components/partner-showcase/*.tsx`

### Database
- `prisma/schema.prisma` (update enum)

### API
- `app/api/partner-onboarding/route.ts`

### Pages
- `app/partner-onboarding/page.tsx`
- `app/partners/page.tsx`

## CMS Backend Requirements
Create a comprehensive CMS at `/admin/partners` with:
- List all partner submissions
- Filter by business type, status, date
- View full submission details
- Approve/Reject submissions
- Edit partner information
- Manage partner listings
- Bulk actions
- Export functionality

