# Partner Onboarding System - Architecture & Structure

## 📁 Project Structure

```
app/
├── partner-onboarding/
│   └── page.tsx                    # Main form page (uses Context & Hooks)

components/
├── partner-onboarding/
│   ├── StepSelector.tsx            # Business type selection
│   ├── ProgressBar.tsx             # Visual progress indicator
│   ├── NavigationButtons.tsx       # Next/Back/Submit buttons
│   ├── StepWrapper.tsx              # Animated step container
│   ├── ReviewSubmit.tsx             # Final review & submission
│   │
│   ├── Shared/                      # Shared components for all business types
│   │   ├── OwnerDetails.tsx
│   │   ├── ManagerDetails.tsx
│   │   ├── BusinessInfo.tsx
│   │   ├── BankDetails.tsx
│   │   ├── GeneralQuestions.tsx
│   │   └── UploadSummary.tsx
│   │
│   ├── Venue/                       # Venue-specific components
│   │   ├── VenueDetails.tsx
│   │   ├── VenueFacilities.tsx
│   │   └── VenuePolicies.tsx
│   │
│   ├── Boutique/                    # Boutique-specific components
│   │   ├── BoutiqueDetails.tsx
│   │   ├── BoutiqueProducts.tsx
│   │   └── BoutiquePolicies.tsx
│   │
│   └── Salon/                       # Salon-specific components
│       ├── SalonDetails.tsx
│       ├── SalonServices.tsx
│       └── SalonPolicies.tsx

contexts/
└── PartnerFormContext.tsx          # Global form state management

hooks/
└── useFormSteps.ts                  # Step navigation logic

lib/
└── partner-onboarding/
    ├── formConfig.ts                # Step mapping configuration
    └── validationSchemas.ts         # Zod validation schemas

docs/
├── PARTNER_ONBOARDING_FLOW.md       # Visual flow diagram
└── PARTNER_ONBOARDING_STRUCTURE.md  # This file
```

## 🔄 Data Flow

```
User Input
    ↓
Component (e.g., OwnerDetails)
    ↓
updateFormData() → PartnerFormContext
    ↓
localStorage (auto-save)
    ↓
Form Validation (React Hook Form + Zod)
    ↓
API Submission (/api/partner-onboarding)
    ↓
Database (Prisma)
```

## 🎯 Key Features

### 1. **Context API for State Management**
- Centralized form state in `PartnerFormContext`
- Auto-saves to localStorage
- Shared across all components

### 2. **Custom Hook for Step Navigation**
- `useFormSteps` handles all step logic
- Validates before proceeding
- Manages progress calculation

### 3. **Dynamic Form Configuration**
- `formConfig.ts` defines steps for each business type
- Easy to add new business types or modify steps
- Type-safe with TypeScript

### 4. **Modular Component Structure**
- Shared components for common fields
- Business-specific components in separate folders
- Easy to maintain and extend

### 5. **Form Validation**
- Zod schemas for type-safe validation
- Step-specific validation rules
- Real-time error feedback

## 🚀 Usage

### Adding a New Business Type

1. **Update `formConfig.ts`**:
```typescript
export const formSteps: Record<BusinessType, StepConfig[]> = {
  // ... existing types
  newType: [
    { id: 'business-type', ... },
    { id: 'owner-details', ... },
    // ... add steps
  ],
}
```

2. **Create component folder**:
```
components/partner-onboarding/NewType/
├── NewTypeDetails.tsx
├── NewTypeServices.tsx
└── NewTypePolicies.tsx
```

3. **Update validation schema**:
```typescript
export const baseFormSchema = z.object({
  // ... existing fields
  // Add new type-specific fields
})
```

4. **Update main page**:
```typescript
case 'new-type-details':
  return <NewTypeDetails />
```

### Adding a New Step

1. **Add to `formConfig.ts`**:
```typescript
{ id: 'new-step', title: 'New Step', component: 'NewStep', required: true }
```

2. **Create component**:
```typescript
// components/partner-onboarding/Shared/NewStep.tsx
export default function NewStep() {
  const { formData, updateFormData } = usePartnerForm()
  // ... component logic
}
```

3. **Add to main page**:
```typescript
case 'new-step':
  return <NewStep />
```

## 🎨 Design System

### Colors
- **Primary**: Rose/Pink (`rose-400`, `rose-500`, `rose-600`)
- **Secondary**: Amber/Gold (`amber-400`, `amber-500`)
- **Success**: Green (`green-600`)
- **Background**: Gradient from `rose-50` via `white` to `amber-50`

### Typography
- **Headers**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Animations
- Framer Motion for smooth transitions
- Step changes: fade + slide
- Button hover: scale effects

## 📝 Form Steps by Business Type

### Venue (11 steps)
1. Business Type Selection
2. Owner Details
3. Manager Details
4. Business Info
5. Bank Details
6. Venue Details
7. Venue Facilities
8. Venue Policies
9. General Questions
10. Upload & Summary
11. Review & Submit

### Boutique (11 steps)
1. Business Type Selection
2. Owner Details
3. Manager Details
4. Business Info
5. Bank Details
6. Boutique Details
7. Products & Services
8. Boutique Policies
9. General Questions
10. Upload & Summary
11. Review & Submit

### Salon (11 steps)
1. Business Type Selection
2. Owner Details
3. Manager Details
4. Business Info
5. Bank Details
6. Salon Details
7. Services & Packages
8. Salon Policies
9. General Questions
10. Upload & Summary
11. Review & Submit

## 🔧 Technical Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React, Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Animations**: Framer Motion
- **State Management**: Context API
- **Storage**: localStorage (auto-save)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma

## 📦 Dependencies

```json
{
  "react": "^18.x",
  "next": "^14.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "@hookform/resolvers": "^3.x",
  "framer-motion": "^10.x",
  "tailwindcss": "^3.x"
}
```

## 🧪 Testing Checklist

- [ ] Form validation works for all fields
- [ ] Step navigation (Next/Back) works correctly
- [ ] Auto-save to localStorage functions properly
- [ ] Form submission sends correct data to API
- [ ] Success screen displays correctly
- [ ] Mobile responsiveness
- [ ] All business types render correct steps
- [ ] Progress bar updates accurately
- [ ] Error messages display properly

## 🐛 Common Issues & Solutions

### Issue: Form data not persisting
**Solution**: Check `PartnerFormContext` localStorage key matches

### Issue: Step validation failing
**Solution**: Verify `validationSchemas.ts` matches form fields

### Issue: Components not rendering
**Solution**: Check `formConfig.ts` step IDs match switch cases in main page

### Issue: TypeScript errors
**Solution**: Ensure all imports use correct paths from `lib/partner-onboarding`

## 📚 Additional Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Next.js Documentation](https://nextjs.org/docs)

