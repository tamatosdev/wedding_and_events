# 🖼️ Fix Image Upload Error (500 Internal Server Error)

## ❌ Current Error

```
POST https://weddingandevents.vercel.app/api/upload 500 (Internal Server Error)
Error uploading images: Error: Upload failed
```

**The image upload is failing because Cloudinary environment variables are missing in Vercel.**

---

## ✅ Solution: Add Cloudinary Environment Variables to Vercel

The `/api/upload` endpoint uses Cloudinary to store uploaded images. You need to add Cloudinary credentials to Vercel.

### Step 1: Get Cloudinary Credentials

If you don't have a Cloudinary account:

1. **Sign up for free:** https://cloudinary.com/users/register/free
2. **Go to Dashboard:** https://cloudinary.com/console
3. **Copy your credentials:**
   - Cloud Name (shown at top of dashboard)
   - API Key (Settings → Security → API Keys)
   - API Secret (Settings → Security → API Keys)

### Step 2: Add to Vercel

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your project: `weddingandevents`
   - Go to **Settings** → **Environment Variables**

2. **Add these 3 Cloudinary variables:**

   **a) CLOUDINARY_CLOUD_NAME:**
   ```
   Key: CLOUDINARY_CLOUD_NAME
   Value: [Your Cloudinary cloud name]
   Environments: ✅ Production, ✅ Preview, ✅ Development
   ```

   **b) CLOUDINARY_API_KEY:**
   ```
   Key: CLOUDINARY_API_KEY
   Value: [Your Cloudinary API key]
   Environments: ✅ Production, ✅ Preview, ✅ Development
   ```

   **c) CLOUDINARY_API_SECRET:**
   ```
   Key: CLOUDINARY_API_SECRET
   Value: [Your Cloudinary API secret]
   Environments: ✅ Production, ✅ Preview, ✅ Development
   ```

3. **After adding variables:**
   - Click **"Save"** for each variable
   - Go to **Deployments** tab
   - Click **⋯** on latest deployment
   - Click **"Redeploy"**
   - Wait for deployment to complete

---

## 🔄 Alternative: Use Local Storage (Temporary Solution)

If you don't want to set up Cloudinary right now, you can temporarily use local file storage:

### Option 1: Modify ImageUpload Component

Change the upload endpoint in `components/ui/image-upload.tsx`:

```typescript
// Change this line (around line 46):
const response = await fetch('/api/upload', {

// To this:
const response = await fetch('/api/upload-local', {
```

**Note:** Local storage won't work on Vercel (serverless functions can't write to filesystem). This only works for local development.

### Option 2: Use Base64 Encoding (Not Recommended)

You could encode images as base64 and store in database, but this is not recommended for production due to database size limits.

---

## 📋 Complete Environment Variables Checklist

Make sure you have ALL these in Vercel:

### Critical (App Won't Work Without):
- [x] `DATABASE_URL`
- [x] `NEXTAUTH_SECRET`
- [x] `NEXTAUTH_URL`

### For Image Uploads:
- [ ] `CLOUDINARY_CLOUD_NAME` ⚠️ **MISSING - This is causing the 500 error**
- [ ] `CLOUDINARY_API_KEY` ⚠️ **MISSING**
- [ ] `CLOUDINARY_API_SECRET` ⚠️ **MISSING**

### Optional (For Email, WhatsApp, etc.):
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS`
- [ ] `ADMIN_EMAIL`
- [ ] `CUSTOMER_SUPPORT_EMAIL`
- [ ] `MANAGER_EMAIL`
- [ ] `CEO_EMAIL`
- [ ] `TWILIO_ACCOUNT_SID`
- [ ] `TWILIO_AUTH_TOKEN`
- [ ] `CRON_SECRET`

---

## 🧪 Test After Adding Cloudinary Variables

1. **Redeploy your app**
2. **Go to:** `https://weddingandevents.vercel.app/admin/vendors`
3. **Click "Add New Vendor"**
4. **Try uploading an image**
5. **Check browser console** - should see successful upload
6. **Check Vercel Function Logs** - should see no errors

---

## 🔍 Why This Error Occurs

The `/api/upload` endpoint:
1. Receives the image file
2. Tries to upload it to Cloudinary
3. **Fails because Cloudinary is not configured** (missing env vars)
4. Returns 500 error

**The error happens at this line in `app/api/upload/route.ts`:**
```typescript
const result = await new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream(...)
})
```

If Cloudinary credentials are missing, the `cloudinary` object is not properly initialized, causing the upload to fail.

---

## 🆘 Still Getting 500 Error After Adding Variables?

### Check Vercel Function Logs:

1. **Vercel Dashboard** → **Functions** tab
2. Click on `/api/upload` function
3. Check **Logs** for errors:
   - `CLOUDINARY_CLOUD_NAME is not defined`
   - `Invalid Cloudinary credentials`
   - `Cloudinary upload failed`

### Verify Variables Are Set:

1. **Settings** → **Environment Variables**
2. Make sure all 3 Cloudinary variables show:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### Test Cloudinary Connection:

You can test if Cloudinary is working by checking the Vercel function logs after attempting an upload. The logs will show the actual error message.

---

## ✅ Quick Fix Summary

**To fix the image upload error:**

1. ✅ Sign up for Cloudinary (free): https://cloudinary.com
2. ✅ Get your credentials from Cloudinary dashboard
3. ✅ Add to Vercel:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. ✅ Redeploy your app
5. ✅ Test image upload

**After this, image uploads will work!** 🎉

---

## 📝 Note About Logo Error

The logo 400 error (`/_next/image?url=%2Fassets%2Flogo-new.png`) is a separate issue:
- The file `/assets/logo-new.png` doesn't exist
- The code already has a fallback mechanism
- This is expected and won't break functionality
- To fix: Add the logo file to `/public/assets/logo-new.png`

