# Venues Page Data Source - Complete Flow

## 📍 Data Flow Overview

```
Database (Vendor table)
    ↓
API Endpoint (GET /api/vendors)
    ↓
Frontend Component (VenuesContent)
    ↓
Displayed on /venues page
```

---

## 🗄️ **1. Database Source**

**Table**: `Vendor` (PostgreSQL)

**Location**: `prisma/schema.prisma`

**Key Fields**:
- `id`, `name`, `category`, `city`, `pricing`, `description`
- `images`, `rating`, `reviews`
- `capacity`, `type` (for venues: Hall, Outdoor, Marquee, etc.)
- `approved` (boolean - only approved vendors are shown)
- `user` (relationship to User table)

**Filter Applied**:
- Only vendors with `category` containing "Venue" (case-insensitive)
- Only vendors with `approved: true`

---

## 🔌 **2. API Endpoint**

**Endpoint**: `GET /api/vendors`

**File**: `app/api/vendors/route.ts`

**Query Parameters** (from `/venues` page):
- `category=Venue` (always applied)
- `page=1` (pagination)
- `limit=6` (items per page)
- `sort=newest` (sorting option)
- `city` (optional filter)
- `search` (optional search term)
- `capacity` (optional: 1000-1500, 1500-2000, etc.)
- `type` (optional: Hall, Outdoor, Marquee, Other)
- `rating` (optional: 2.5 Above, 3.5 Above, 4.5 Above)

**What the API Does**:
1. Builds Prisma query with filters
2. Fetches vendors from database: `prisma.vendor.findMany({ where, skip, take, orderBy })`
3. Adds mock data for missing fields (rating, reviews, capacity, type) if not in database
4. Returns paginated results

**Code**:
```typescript
const [vendors, total] = await Promise.all([
  prisma.vendor.findMany({
    where: {
      approved: true,
      category: { contains: 'Venue', mode: 'insensitive' },
      // ... other filters
    },
    skip,
    take: limit,
    orderBy,
  }),
  prisma.vendor.count({ where }),
])
```

---

## 🎨 **3. Frontend Component**

**Component**: `VenuesContent`

**File**: `app/venues/venues-content.tsx`

**What It Does**:
1. Fetches data from `/api/vendors?category=Venue&...`
2. Displays vendors in a grid
3. Handles filtering, sorting, pagination
4. Shows loading states

**Fetch Code**:
```typescript
const fetchVendors = useCallback(async () => {
  const params = new URLSearchParams({
    page: currentPage.toString(),
    limit: '6',
    sort: sortBy,
    category: 'Venue', // Always filter by Venue category
  })
  
  // Add filters...
  const response = await fetch(`/api/vendors?${params}`)
  const data = await response.json()
  setVendors(data?.vendors || [])
}, [currentPage, sortBy, filters])
```

---

## 📊 **4. Data Display**

**Page**: `http://localhost:3000/venues`

**File**: `app/venues/page.tsx`

**Components Used**:
- `VenuesContent` - Main vendor listing
- `ChannelsSection` - Additional venue channels section

---

## 🔍 **Summary**

### Where Data Comes From:

1. **Database**: `Vendor` table in PostgreSQL
   - Filtered by: `category` contains "Venue" AND `approved: true`

2. **API**: `GET /api/vendors?category=Venue&...`
   - Fetches from database
   - Applies filters and pagination
   - Adds mock data for missing fields

3. **Frontend**: `VenuesContent` component
   - Calls API on mount and filter changes
   - Displays vendors in cards/grid

### How to Add/Modify Venue Data:

**Option 1: Through Admin Panel**
- Login as admin: `/admin`
- Go to Vendors section
- Add/Edit vendors
- Set `category: "Venue"`
- Approve vendor (`approved: true`)

**Option 2: Direct Database**
- Use Prisma Studio: `npx prisma studio`
- Navigate to `Vendor` table
- Add/edit records
- Ensure `category` contains "Venue"
- Set `approved: true`

**Option 3: Partner Onboarding**
- Users submit via `/partner-onboarding`
- Admin reviews and approves
- If business type is "Wedding" (venue), it becomes a venue vendor

---

## 🎯 **Key Points**

✅ **Data Source**: PostgreSQL `Vendor` table  
✅ **Filter**: Only shows vendors with `category` containing "Venue"  
✅ **Approval**: Only `approved: true` vendors are shown  
✅ **API**: `/api/vendors` with `category=Venue` parameter  
✅ **Mock Data**: Rating, reviews, capacity, type are generated if missing  

---

## 🔧 **To See All Venues in Database**

```bash
# Using Prisma Studio
npx prisma studio

# Or check via API
curl "http://localhost:3000/api/vendors?category=Venue"
```

---

**The venues page shows all approved vendors from the database where the category contains "Venue".**

