# 🚀 Vercel Blob Setup Guide - Complete Configuration

## ✅ Quick Setup Summary

For **Vercel Blob** to work, you only need **ONE environment variable**:
- `BLOB_READ_WRITE_TOKEN`

---

## 📋 Step-by-Step Setup

### Option 1: Automatic Setup (Recommended - Vercel Deployment)

**If you're deploying to Vercel:**

1. **Create Vercel Blob Storage:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to **Storage** tab
   - Click **"Create Database"** or **"Add Storage"**
   - Select **"Blob"**
   - Give it a name (e.g., "wedding-images")
   - Click **"Create"**

2. **Token is Auto-Provided:**
   - Vercel automatically sets `BLOB_READ_WRITE_TOKEN` for your project
   - **No manual configuration needed!**
   - Token is available in all environments (Production, Preview, Development)

3. **Verify:**
   - Go to **Settings** → **Environment Variables**
   - You should see `BLOB_READ_WRITE_TOKEN` (it's automatically added)
   - Value starts with `vercel_blob_rw_`

---

### Option 2: Manual Setup (For Local Development)

**If you want to test locally:**

1. **Get Token from Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to **Storage** → **Blob**
   - Click on your blob storage
   - Go to **Settings** tab
   - Copy the **"Read/Write Token"** (starts with `vercel_blob_rw_`)

2. **Add to Local Environment:**
   - Create/update `.env.local` in your project root:
   ```env
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxx
   ```

3. **Restart Dev Server:**
   ```bash
   npm run dev
   ```

---

## 🔧 Vercel Dashboard Configuration

### Step 1: Create Blob Storage

1. **Navigate to Storage:**
   ```
   Vercel Dashboard → Your Project → Storage Tab
   ```

2. **Create Blob:**
   - Click **"Create Database"** or **"Add Storage"**
   - Select **"Blob"**
   - Name: `wedding-images` (or any name)
   - Region: Choose closest to your users (optional)
   - Click **"Create"**

### Step 2: Verify Environment Variable

1. **Check Environment Variables:**
   ```
   Vercel Dashboard → Your Project → Settings → Environment Variables
   ```

2. **Look for:**
   - Variable: `BLOB_READ_WRITE_TOKEN`
   - Value: `vercel_blob_rw_xxxxx` (auto-generated)
   - Environments: ✅ Production, ✅ Preview, ✅ Development

3. **If Missing:**
   - Go back to **Storage** → **Blob**
   - Click on your blob storage
   - Go to **Settings**
   - Copy the token
   - Manually add to Environment Variables:
     - Key: `BLOB_READ_WRITE_TOKEN`
     - Value: `[paste token]`
     - Environments: All (Production, Preview, Development)

---

## 📝 Environment Variables Checklist

### ✅ Required (Auto-provided by Vercel):
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxx
```

### ❌ Not Needed (Removed):
```env
# These are no longer needed:
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## 🧪 Testing Your Setup

### Test 1: Check Environment Variable

**On Vercel:**
1. Go to **Settings** → **Environment Variables**
2. Verify `BLOB_READ_WRITE_TOKEN` exists
3. Value should start with `vercel_blob_rw_`

**Locally:**
1. Check `.env.local` file
2. Should contain: `BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...`

### Test 2: Upload an Image

1. **Go to Admin Panel:**
   - Navigate to `/admin/vendors`
   - Click **"Add New Vendor"**

2. **Upload Image:**
   - Click upload area
   - Select an image file
   - Wait for upload

3. **Check Result:**
   - Image should appear in preview
   - URL should be: `https://xxx.public.blob.vercel-storage.com/uploads/xxx.jpg`
   - Image should load successfully

### Test 3: Check Console/Network

**Browser Console:**
- No errors about `BLOB_READ_WRITE_TOKEN`
- Upload should succeed

**Network Tab:**
- `POST /api/upload` should return `200 OK`
- Response should contain: `{ "url": "https://..." }`

---

## 🔍 Troubleshooting

### Error: "BLOB_READ_WRITE_TOKEN is not defined"

**Solution:**
1. **On Vercel:**
   - Go to **Storage** → Create Blob if not exists
   - Go to **Settings** → **Environment Variables**
   - Verify `BLOB_READ_WRITE_TOKEN` exists
   - If missing, add it manually (see Option 2 above)
   - **Redeploy** your project

2. **Locally:**
   - Add to `.env.local`: `BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...`
   - Restart dev server: `npm run dev`

### Error: "Unauthorized" (401)

**Solution:**
- User must be logged in (NextAuth session required)
- Check that you're authenticated in the admin panel

### Error: "No image file provided" (400)

**Solution:**
- Make sure you're using field name `"image"` (not `"file"`)
- Check that file is actually selected

### Images Not Displaying

**Solution:**
1. Check URL format: Should be `https://xxx.public.blob.vercel-storage.com/...`
2. Verify image was uploaded: Check Network tab for successful upload
3. Check browser console for CORS/loading errors
4. Try opening URL directly in browser

### Upload Works Locally But Not on Vercel

**Solution:**
1. **Verify Environment Variable:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Ensure `BLOB_READ_WRITE_TOKEN` is set for **Production** environment
   - Check that value is correct

2. **Redeploy:**
   - Go to **Deployments** tab
   - Click **⋯** on latest deployment
   - Click **"Redeploy"**
   - Wait for deployment to complete

3. **Check Logs:**
   - Go to **Deployments** → Latest deployment → **Logs**
   - Look for errors about `BLOB_READ_WRITE_TOKEN`

---

## 📊 Current Implementation

### API Route (`app/api/upload/route.ts`)
- ✅ Uses `@vercel/blob` package
- ✅ Uses `put()` function
- ✅ Requires authentication (NextAuth session)
- ✅ Validates file type (images only)
- ✅ Validates file size (10MB max)
- ✅ Returns public URL

### Client Component (`components/ui/image-upload.tsx`)
- ✅ Sends file with field name `"image"`
- ✅ Handles upload progress
- ✅ Shows preview
- ✅ Handles errors

---

## 🎯 Quick Reference

### Required Environment Variable:
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxx
```

### Where to Set:
- **Vercel:** Settings → Environment Variables (auto-provided when Blob is created)
- **Local:** `.env.local` file

### How to Get Token:
1. Vercel Dashboard → Storage → Blob → Settings
2. Copy "Read/Write Token"

### Test Upload:
1. Go to `/admin/vendors`
2. Click "Add New Vendor"
3. Upload an image
4. Check URL format: `https://xxx.public.blob.vercel-storage.com/...`

---

## ✅ Setup Checklist

- [ ] Created Vercel Blob Storage in Vercel Dashboard
- [ ] Verified `BLOB_READ_WRITE_TOKEN` exists in Vercel Environment Variables
- [ ] Added `BLOB_READ_WRITE_TOKEN` to `.env.local` (for local dev)
- [ ] Tested image upload in admin panel
- [ ] Verified uploaded images display correctly
- [ ] Checked that URLs are Vercel Blob URLs

---

## 🔗 Resources

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [@vercel/blob Package](https://www.npmjs.com/package/@vercel/blob)
- [Vercel Blob Pricing](https://vercel.com/pricing)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 📝 Summary

**For Vercel Blob to work, you need:**

1. ✅ **Create Blob Storage** in Vercel Dashboard
2. ✅ **Verify `BLOB_READ_WRITE_TOKEN`** is set (auto-provided)
3. ✅ **For local dev:** Add token to `.env.local`
4. ✅ **Test upload** to verify it works

**That's it!** Vercel Blob is very simple to set up. 🎉

