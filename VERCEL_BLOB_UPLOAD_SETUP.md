# 🚀 Vercel Blob Image Upload Setup

## ✅ Refactoring Complete

All image uploads have been migrated from Cloudinary/local filesystem to **Vercel Blob Storage**.

---

## 📋 What Changed

### 1. API Route (`app/api/upload/route.ts`)
- ✅ Now uses `@vercel/blob` package
- ✅ Uses `put()` function to upload to Vercel Blob
- ✅ Accepts `multipart/form-data` with field name `"image"`
- ✅ Returns JSON: `{ url: "<blob-url>" }`
- ✅ Uses `nodejs` runtime (required for NextAuth session check)
- ✅ Full authentication and validation

### 2. Client Components
- ✅ `components/ui/image-upload.tsx` - Updated to use `"image"` field name
- ✅ All admin/vendor forms now use Vercel Blob
- ✅ Image previews show Vercel Blob URLs

### 3. Removed Code
- ❌ Cloudinary implementation removed
- ❌ Local filesystem upload (`/api/upload-local`) deprecated
- ❌ `lib/cloudinary.ts` can be removed (optional)

---

## 🔧 Setup Instructions

### Step 1: Install Package (Already Done)
```bash
npm install @vercel/blob
```

### Step 2: Configure Vercel Blob

#### Option A: Automatic (Recommended for Vercel)
Vercel automatically provides `BLOB_READ_WRITE_TOKEN` when you deploy to Vercel. No manual setup needed!

#### Option B: Manual Setup (For Local Development)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to **Storage** → **Create Database/Storage** → **Blob**
3. Copy the `BLOB_READ_WRITE_TOKEN`
4. Add to your `.env.local`:
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
   ```

---

## 📝 API Usage

### Client-Side Upload Example

```typescript
const formData = new FormData()
formData.append('image', file) // Field name must be "image"

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
})

if (!response.ok) {
  const error = await response.json()
  throw new Error(error.error)
}

const { url } = await response.json()
// url: "https://project-id.public.blob.vercel-storage.com/uploads/12345-file.png"
```

### Using ImageUpload Component

```tsx
import { ImageUpload } from '@/components/ui/image-upload'

<ImageUpload
  images={formData.images || []}
  onImagesChange={(urls) => setFormData({ ...formData, images: urls })}
  maxImages={10}
/>
```

---

## 🔐 Authentication

The upload endpoint requires authentication:
- User must be logged in (NextAuth session)
- Unauthenticated requests return `401 Unauthorized`

---

## ✅ Validation

The API validates:
- ✅ File type: Only images (`image/*`)
- ✅ File size: Max 10MB
- ✅ Field name: Must be `"image"`

---

## 📦 Environment Variables

### Required (Auto-provided by Vercel):
- `BLOB_READ_WRITE_TOKEN` - Automatically set when deployed to Vercel

### For Local Development:
Add to `.env.local`:
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
```

### No Longer Needed:
- ❌ `CLOUDINARY_CLOUD_NAME`
- ❌ `CLOUDINARY_API_KEY`
- ❌ `CLOUDINARY_API_SECRET`

---

## 🗑️ Cleanup (Optional)

### Remove Cloudinary Package:
```bash
npm uninstall cloudinary
```

### Delete Unused Files:
- `lib/cloudinary.ts` (optional - can keep for reference)
- `app/api/upload-local/route.ts` (deprecated)
- `components/ui/image-upload-local.tsx` (deprecated)

### Remove from Vercel Environment Variables:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

---

## 🧪 Testing

### Test Upload:
1. Go to `/admin/vendors`
2. Click "Add New Vendor"
3. Upload an image
4. Check the returned URL - should be a Vercel Blob URL:
   ```
   https://xxx.public.blob.vercel-storage.com/uploads/xxx.jpg
   ```

### Verify Image Display:
- Image should display in preview
- Image URL should be saved to database
- Image should load from Vercel Blob CDN

---

## 📊 Benefits of Vercel Blob

1. **✅ Persistent Storage** - Files persist across deployments
2. **✅ CDN Delivery** - Fast global image delivery
3. **✅ Automatic Scaling** - Handles traffic spikes
4. **✅ No Configuration** - Works out of the box on Vercel
5. **✅ Free Tier** - Generous free tier available
6. **✅ Edge Optimized** - Served from edge locations

---

## 🔍 Troubleshooting

### Error: "BLOB_READ_WRITE_TOKEN is not defined"
**Solution:** 
- For Vercel: Token is auto-provided, just redeploy
- For local: Add token to `.env.local`

### Error: "No image file provided"
**Solution:** Make sure you're using field name `"image"` (not `"file"`)

### Error: "Unauthorized"
**Solution:** User must be logged in. Check NextAuth session.

### Images Not Displaying
**Solution:** 
- Check that URL is a valid Vercel Blob URL
- Verify image was uploaded successfully
- Check browser console for CORS/loading errors

---

## 📝 Summary

✅ **Migrated to Vercel Blob**  
✅ **Updated all upload components**  
✅ **Removed Cloudinary/local storage**  
✅ **Added comprehensive documentation**  

**Your image uploads now use Vercel Blob Storage!** 🎉

---

## 🔗 Resources

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [@vercel/blob Package](https://www.npmjs.com/package/@vercel/blob)
- [Vercel Blob Pricing](https://vercel.com/pricing)

