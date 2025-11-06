# Venue Onboarding Backend Integration

## Overview

The venue partner onboarding form now saves submissions to the database and provides an admin panel for reviewing applications.

## What Was Created

### 1. Database Model
**File:** `prisma/schema.prisma`

Added `VenueOnboardingSubmission` model with:
- All form fields from 10 steps
- Status tracking (PENDING, UNDER_REVIEW, APPROVED, REJECTED, CONTACTED)
- Review tracking (reviewedBy, reviewedAt, adminNotes)
- Timestamps (createdAt, updatedAt)

**Status Enum:**
- `PENDING` - New submission
- `UNDER_REVIEW` - Being reviewed
- `APPROVED` - Approved for partnership
- `REJECTED` - Not approved
- `CONTACTED` - Contact has been made

### 2. API Endpoints

#### POST `/api/venue-onboarding`
- Creates new submission
- Validates required fields
- Returns submission ID

#### GET `/api/venue-onboarding`
- Lists all submissions with pagination
- Supports status filtering
- Query params: `status`, `page`, `limit`

#### GET `/api/venue-onboarding/[id]`
- Gets single submission details

#### PATCH `/api/venue-onboarding/[id]`
- Updates submission status
- Updates admin notes
- Tracks reviewer and review date

### 3. Admin Pages

#### `/admin/venue-submissions`
**File:** `app/admin/venue-submissions/page.tsx`

Features:
- List all submissions
- Search by name, email, business, city
- Filter by status
- Pagination
- View details button
- Status badges with colors

#### `/admin/venue-submissions/[id]`
**File:** `app/admin/venue-submissions/[id]/page.tsx`

Features:
- Full submission details
- Update status dropdown
- Add admin notes
- View all form data organized by sections:
  - Owner Details
  - Manager/POC Details
  - Business Details
  - Venue Information
  - Policies
  - Company Overview

### 4. Form Integration

**File:** `app/venue-onboarding/page.tsx`

Updated `onSubmit` function to:
- Submit data to `/api/venue-onboarding`
- Handle errors gracefully
- Clear localStorage on success
- Show success message

### 5. Admin Dashboard Link

**File:** `app/admin/page.tsx`

Added "Venue Submissions" button linking to `/admin/venue-submissions`

## Setup Instructions

### 1. Update Database Schema

Run Prisma migration to add the new model:

```bash
npm run db:push
```

Or create a migration:

```bash
npm run db:migrate
```

### 2. Generate Prisma Client

```bash
npm run db:generate
```

### 3. Access Admin Panel

1. Login as admin/manager/customer support
2. Go to Admin Dashboard
3. Click "Venue Submissions" button
4. View and manage submissions

## Access Control

The admin pages check for admin access using `canAccessAdmin()` which allows:
- `ADMIN` role
- `MANAGER` role  
- `CUSTOMER_SUPPORT` role

Users without these roles are redirected to homepage.

## Status Workflow

1. **PENDING** - Default status when submitted
2. **UNDER_REVIEW** - Admin is reviewing
3. **CONTACTED** - Initial contact made
4. **APPROVED** - Application approved
5. **REJECTED** - Application rejected

## Features

### Admin Panel Features:
- ✅ View all submissions
- ✅ Search submissions
- ✅ Filter by status
- ✅ Pagination
- ✅ View full submission details
- ✅ Update status
- ✅ Add admin notes
- ✅ Track review history

### Form Features:
- ✅ Auto-save to localStorage
- ✅ Submit to database
- ✅ Success confirmation
- ✅ Error handling

## File Structure

```
prisma/
  └── schema.prisma                    # Added VenueOnboardingSubmission model

app/
  ├── api/
  │   └── venue-onboarding/
  │       ├── route.ts                  # POST (create), GET (list)
  │       └── [id]/
  │           └── route.ts              # GET (detail), PATCH (update)
  │
  ├── admin/
  │   ├── page.tsx                      # Added link to submissions
  │   └── venue-submissions/
  │       ├── page.tsx                  # List page
  │       └── [id]/
  │           └── page.tsx              # Detail page
  │
  └── venue-onboarding/
      └── page.tsx                      # Updated to submit to API
```

## Usage

### For Admins/Managers/Customer Support:

1. **View Submissions:**
   - Navigate to Admin Dashboard
   - Click "Venue Submissions"
   - Browse, search, and filter submissions

2. **Review Submission:**
   - Click "View Details" on any submission
   - Review all information
   - Update status if needed
   - Add admin notes
   - Click "Update Status"

3. **Status Management:**
   - Change status to track progress
   - Add notes for internal reference
   - Status changes are tracked with timestamp

### For Form Submitters:

1. Fill out the form at `/venue-onboarding`
2. Form auto-saves progress
3. Submit when complete
4. Receive confirmation message
5. Admin will review and contact

## Next Steps (Optional Enhancements)

- [ ] Add email notifications on submission
- [ ] Add email notifications on status change
- [ ] Add file upload to cloud storage
- [ ] Add export to PDF/Excel
- [ ] Add bulk actions (approve/reject multiple)
- [ ] Add comments/notes history
- [ ] Add assignment to specific reviewer
- [ ] Add due dates/reminders

## Testing

1. **Test Form Submission:**
   - Fill out form at `/venue-onboarding`
   - Submit form
   - Check database for new record

2. **Test Admin Panel:**
   - Login as admin
   - Go to `/admin/venue-submissions`
   - View submission list
   - Click "View Details"
   - Update status and notes
   - Verify changes saved

3. **Test Search/Filter:**
   - Use search box
   - Filter by status
   - Verify results update

## Notes

- File uploads are currently stored as URLs in `fileUrls` array
- To implement file uploads, integrate with Cloudinary or similar service
- Admin notes are stored in `adminNotes` field
- Review tracking uses `reviewedBy` (user ID/email) and `reviewedAt` (timestamp)

