# Partner Onboarding Flow - Visual Diagram

## Complete Partner Journey from Registration to Listing

```mermaid
flowchart TD
    A[Partner Selects Business Type] --> B[Completes Multi-Step Form]
    B --> C[Submits Application]
    C --> D[Form Data Sent to Admin Dashboard]
    D --> E[Account Manager Review]
    E --> F{Verification & Quality Check}
    F -->|Approved| G[Listing Approved & Published]
    F -->|Rejected| H[Partner Notified with Feedback]
    H --> I[Partner Updates Information]
    I --> E
    G --> J[Partner Receives Confirmation Email]
    J --> K[Visible on Website Channel Page]
    K --> L[Partner Can Manage Listings]
    
    style A fill:#f9a8d4,stroke:#ec4899
    style B fill:#fce7f3,stroke:#f472b6
    style C fill:#fef3c7,stroke:#f59e0b
    style D fill:#dbeafe,stroke:#3b82f6
    style E fill:#e0e7ff,stroke:#6366f1
    style F fill:#fef3c7,stroke:#f59e0b
    style G fill:#d1fae5,stroke:#10b981
    style H fill:#fee2e2,stroke:#ef4444
    style J fill:#d1fae5,stroke:#10b981
    style K fill:#d1fae5,stroke:#10b981
```

## Detailed Process Steps

### 1. Partner Registration
- Partner visits `/partner-onboarding`
- Selects business type (Venue, Boutique, or Salon)
- Completes multi-step form with:
  - Owner & Manager Details
  - Business Information
  - Bank Details
  - Business-specific fields
  - General Questions
  - File Uploads

### 2. Form Submission
- Data validated client-side
- Submitted to `/api/partner-onboarding`
- Stored in `PartnerOnboardingSubmission` table
- Status set to `PENDING`

### 3. Admin Review
- Admin accesses `/admin/partner-submissions`
- Views all pending submissions
- Can filter by:
  - Business Type
  - Status
  - Date Range
  - City

### 4. Verification Process
- Account Manager reviews submission
- Checks:
  - Business legitimacy
  - Contact information
  - Required documents
  - Quality standards

### 5. Approval/Rejection
- **If Approved:**
  - Status changed to `APPROVED`
  - Partner receives confirmation email
  - Business listing created
  - Visible on website channel page
  
- **If Rejected:**
  - Status changed to `REJECTED`
  - Admin notes added
  - Partner notified with feedback
  - Can resubmit after corrections

### 6. Listing Publication
- Approved partners appear on:
  - Venue listings page
  - Boutique listings page
  - Salon listings page
- Partners can manage their listings through vendor dashboard

## Status Flow

```mermaid
stateDiagram-v2
    [*] --> PENDING: Form Submitted
    PENDING --> UNDER_REVIEW: Admin Assigned
    UNDER_REVIEW --> APPROVED: Quality Check Passed
    UNDER_REVIEW --> REJECTED: Issues Found
    REJECTED --> PENDING: Partner Resubmits
    APPROVED --> PUBLISHED: Listing Created
    PUBLISHED --> [*]: Live on Website
```

## Key Features

1. **Multi-Step Form**: Dynamic form that adapts based on business type
2. **Auto-Save**: Progress saved to localStorage
3. **Validation**: Real-time validation with helpful error messages
4. **Admin Dashboard**: Complete review and management system
5. **Status Tracking**: Clear status indicators throughout the process
6. **Email Notifications**: Automated emails at key stages
7. **Partner Dashboard**: Partners can track their application status

## Technical Implementation

- **Frontend**: React, Next.js, Tailwind CSS, Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Context API
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: Cloudinary (for images/documents)

