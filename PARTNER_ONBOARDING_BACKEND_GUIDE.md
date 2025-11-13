# Partner Onboarding - Backend Storage & Viewing Guide

## 📍 Where Submissions Are Saved

### 1. **API Endpoint** (Receives the Submission)
**Location**: `app/api/partner-onboarding/route.ts`

**Endpoint**: `POST /api/partner-onboarding`

**What it does**:
- Receives form data from frontend
- Validates required fields (`businessType`, `ownerName`, `ownerMobile1`, `ownerEmail`)
- Maps business type to database enum
- Saves to database
- Returns success response with submission ID

**Code snippet**:
```typescript
const submission = await prisma.partnerOnboardingSubmission.create({
  data: {
    businessType,
    ownerName: body.ownerName,
    ownerMobile1: body.ownerMobile1,
    // ... all other fields
    status: 'PENDING',
  },
})
```

---

### 2. **Database Table** (Where Data is Stored)
**Model**: `PartnerOnboardingSubmission`

**Location**: `prisma/schema.prisma` (lines 320-420+)

**Database Table**: `PartnerOnboardingSubmission`

**Key Fields Stored**:
- **Business Type**: WEDDING, BOUTIQUES, BEAUTY_PARLOR, DECOR, CATERING
- **Owner Details**: name, mobile, email, landline
- **Manager Details**: name, mobile, email, landline
- **Business Details**: name, city, area, address, website, email
- **Bank Details**: bank name, branch, account number, IBAN
- **Common Fields**: duration, branches, policies, insurance, accessibility
- **Business-Specific Fields**: 
  - Venue: type, capacity, pricing, amenities, parking, etc.
  - Boutique: dress type, fabrics, pricing, rental policy, etc.
  - Beauty Parlor: services, packages, brands, staff expertise, etc.
  - Décor: type, style, themes, pricing, equipment, etc.
  - Catering: cuisine, menu style, guest limits, dietary options, etc.
- **Status**: PENDING, UNDER_REVIEW, APPROVED, REJECTED, CONTACTED
- **Timestamps**: createdAt, updatedAt, reviewedAt

---

## 👀 Where Admins Can View Submissions

### 3. **Admin Panel - List View**
**Location**: `/admin/partners`

**File**: `app/admin/partners/page.tsx`

**Features**:
- ✅ View all partner submissions
- ✅ Filter by status (PENDING, UNDER_REVIEW, APPROVED, REJECTED, CONTACTED)
- ✅ Filter by business type (Wedding, Boutiques, Beauty Parlor, Décor, Catering)
- ✅ Search by business name, owner name, email, location
- ✅ See submission date
- ✅ Click to view full details

**How to Access**:
1. Login as admin: `admin@shadiportal.com` / `admin123`
2. Navigate to: `http://localhost:3000/admin/partners`
3. Or click "Partners" link in admin dashboard

**What You'll See**:
```
┌─────────────────────────────────────────────────┐
│ Partner Submissions                              │
├─────────────────────────────────────────────────┤
│ [Search] [Status Filter] [Type Filter]          │
├─────────────────────────────────────────────────┤
│ Business Name | Status | Type | Owner | Email   │
│ Location | Submitted Date | [View Details →]   │
└─────────────────────────────────────────────────┘
```

---

### 4. **Admin Panel - Detail View**
**Location**: `/admin/partners/[id]`

**File**: `app/admin/partners/[id]/page.tsx`

**Features**:
- ✅ View complete submission details
- ✅ All form fields displayed
- ✅ Update status (PENDING → UNDER_REVIEW → APPROVED/REJECTED)
- ✅ Add admin notes
- ✅ Track who reviewed it and when
- ✅ Business-type specific fields shown

**How to Access**:
1. From list view, click "View Details →" on any submission
2. Or directly: `http://localhost:3000/admin/partners/[submission-id]`

**What You'll See**:
- All owner details
- All manager details
- All business information
- Bank details
- Business-specific fields (venue/boutique/salon/decor/catering)
- Status management
- Admin notes section
- Review history

---

## 🔍 How to Check Submissions

### Method 1: Admin Panel (Recommended)
1. **Login**: Go to `/auth/signin`
2. **Credentials**: 
   - Email: `admin@shadiportal.com`
   - Password: `admin123`
3. **Navigate**: Click "Partners" in admin menu or go to `/admin/partners`
4. **View**: See all submissions with filters and search

### Method 2: API Endpoint
**GET** `/api/partner-onboarding`

**Query Parameters**:
- `status`: Filter by status (PENDING, UNDER_REVIEW, etc.)
- `businessType`: Filter by type (wedding, boutiques, etc.)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Example**:
```bash
# Get all pending submissions
GET /api/partner-onboarding?status=PENDING

# Get all wedding venue submissions
GET /api/partner-onboarding?businessType=wedding

# Get specific submission
GET /api/partner-onboarding/[id]
```

### Method 3: Database Direct Access
**Table**: `PartnerOnboardingSubmission`

**Using Prisma Studio**:
```bash
npx prisma studio
```
Then navigate to `PartnerOnboardingSubmission` table

**Using SQL**:
```sql
SELECT * FROM "PartnerOnboardingSubmission" 
WHERE status = 'PENDING' 
ORDER BY "createdAt" DESC;
```

---

## 📊 Submission Status Flow

```
PENDING (default)
    ↓
UNDER_REVIEW (admin starts reviewing)
    ↓
APPROVED or REJECTED (admin decision)
    ↓
CONTACTED (optional - if admin contacted them)
```

---

## 🎯 Quick Reference

| **Location** | **Purpose** | **Access** |
|-------------|------------|-----------|
| `POST /api/partner-onboarding` | Receives submissions | Frontend form |
| `GET /api/partner-onboarding` | List all submissions | Admin panel / API |
| `GET /api/partner-onboarding/[id]` | Get single submission | Admin panel / API |
| `PATCH /api/partner-onboarding/[id]` | Update status/notes | Admin panel |
| `/admin/partners` | View all submissions | Admin login required |
| `/admin/partners/[id]` | View/edit submission | Admin login required |
| `PartnerOnboardingSubmission` table | Database storage | Prisma Studio / SQL |

---

## ✅ Summary

**When a user submits the partner onboarding form:**

1. ✅ **Frontend** sends data to `POST /api/partner-onboarding`
2. ✅ **API** validates and saves to `PartnerOnboardingSubmission` table
3. ✅ **Database** stores all form data with status `PENDING`
4. ✅ **Admin** can view at `/admin/partners`
5. ✅ **Admin** can review and update status at `/admin/partners/[id]`

**All submissions are automatically saved and visible to admins!**

