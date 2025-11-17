# 🚨 Fix Vercel Deployment Errors

## ❌ Current Errors

1. **401 Authentication Error** - `/api/auth/callback/credentials 401 (Unauthorized)`
2. **400 Image Error** - `/_next/image?url=%2Fassets%2Flogo-new.png&w=640&q=75`
3. **Accessibility Warning** - Missing `DialogDescription` for `DialogContent`
4. **Duplicate ID Warning** - Two elements with `id="email"`

---

## ✅ Fix 1: 401 Authentication Error (CRITICAL)

**This is the main issue - authentication is failing because environment variables are missing in Vercel.**

### Immediate Fix:

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select your project: `weddingandevents` (or your project name)
   - Go to **Settings** → **Environment Variables**

2. **Add these 3 CRITICAL variables:**

   **a) DATABASE_URL:**
   ```
   Key: DATABASE_URL
   Value: postgresql://postgres:OMiRXXxXqQJCsXgjNFNKGhFeGqqRODCW@metro.proxy.rlwy.net:43505/railway
   Environments: ✅ Production, ✅ Preview, ✅ Development
   ```

   **b) NEXTAUTH_SECRET:**
   ```
   Key: NEXTAUTH_SECRET
   Value: qU0NDONxIVJQvzG2cCCOQA32Z+L72jGSHnastCcFdms=
   Environments: ✅ Production, ✅ Preview, ✅ Development
   ```

   **c) NEXTAUTH_URL:**
   ```
   Key: NEXTAUTH_URL
   Value: https://weddingandevents.vercel.app
   Environments: ✅ Production, ✅ Preview
   ```

   **For Development environment:**
   ```
   Key: NEXTAUTH_URL
   Value: http://localhost:3000
   Environment: ✅ Development
   ```

3. **After adding variables:**
   - Click **"Save"** for each variable
   - Go to **Deployments** tab
   - Click **⋯** on latest deployment
   - Click **"Redeploy"**
   - Wait for deployment to complete (~3-5 minutes)

4. **Test after redeploy:**
   - Go to: `https://weddingandevents.vercel.app/auth/signin`
   - Try login with:
     - Email: `admin@shadiportal.com`
     - Password: `admin123`

---

## ✅ Fix 2: Image 400 Error

**The logo-new.png file doesn't exist, causing Next.js Image optimization to fail.**

### Solution:

The code already has a fallback mechanism. The error is expected until you add the logo file.

**Option A: Add the logo file (Recommended)**
1. Add `/public/assets/logo-new.png` to your project
2. Commit and push to trigger new deployment

**Option B: Use unoptimized image (Temporary)**
- The code has been updated to handle this gracefully
- The fallback logo will be used automatically

---

## ✅ Fix 3: Accessibility Warning

**DialogContent requires DialogDescription for screen readers.**

### Fixed:
- Added `DialogDescription` to `WelcomePopup.tsx`
- This warning will be resolved after redeploy

---

## ✅ Fix 4: Duplicate ID Warning

**Two elements with `id="email"` on the same page (signin form + welcome popup).**

### Fixed:
- Changed WelcomePopup email input ID to `welcome-email`
- This prevents ID conflicts
- Warning will be resolved after redeploy

---

## 📋 Complete Checklist

### Before Redeploying:

- [ ] Add `DATABASE_URL` to Vercel
- [ ] Add `NEXTAUTH_SECRET` to Vercel
- [ ] Add `NEXTAUTH_URL` to Vercel (with correct URL: `https://weddingandevents.vercel.app`)
- [ ] Verify all variables are saved
- [ ] Redeploy application

### After Redeploying:

- [ ] Test login: `https://weddingandevents.vercel.app/auth/signin`
- [ ] Verify no 401 errors in console
- [ ] Check that logo loads (or falls back gracefully)
- [ ] Verify no accessibility warnings
- [ ] Verify no duplicate ID warnings

---

## 🔍 Why Each Variable is Needed

### DATABASE_URL
- **Why:** NextAuth needs to query the database to verify user credentials
- **Without it:** Cannot look up users → 401 error

### NEXTAUTH_SECRET
- **Why:** NextAuth uses this to sign and verify JWT tokens
- **Without it:** Cannot create valid session tokens → 401 error
- **This is the #1 cause of 401 errors!**

### NEXTAUTH_URL
- **Why:** NextAuth needs to know your app URL for OAuth callbacks
- **Without it:** Callbacks may fail → 401 error
- **Important:** Must match your actual Vercel URL exactly!

---

## 🆘 Still Getting 401 After Adding Variables?

### Check Vercel Function Logs:

1. **Vercel Dashboard** → **Functions** tab
2. Click on `/api/auth/[...nextauth]` function
3. Check **Logs** for errors:
   - `NEXTAUTH_SECRET environment variable is not set`
   - `Database connection failed`
   - `Cannot read property 'sign' of undefined`

### Verify Variables Are Set:

1. **Settings** → **Environment Variables**
2. Make sure all 3 variables show:
   - ✅ Production
   - ✅ Preview
   - ✅ Development (for DATABASE_URL and NEXTAUTH_SECRET)

### Test Database Connection:

If DATABASE_URL is set but still getting 401:
- Database might not be seeded
- Users might not exist
- Check Railway dashboard to ensure database is running
- Verify database is accessible from external IPs

---

## ✅ Quick Copy-Paste for Vercel

Add these to Vercel → Settings → Environment Variables:

```
DATABASE_URL=postgresql://postgres:OMiRXXxXqQJCsXgjNFNKGhFeGqqRODCW@metro.proxy.rlwy.net:43505/railway
NEXTAUTH_SECRET=qU0NDONxIVJQvzG2cCCOQA32Z+L72jGSHnastCcFdms=
NEXTAUTH_URL=https://weddingandevents.vercel.app
```

**Then redeploy!** 🚀

---

## 📝 Summary

**Fixed in Code:**
- ✅ Added DialogDescription to WelcomePopup
- ✅ Fixed duplicate email ID conflict
- ✅ Improved image error handling

**Needs Action in Vercel:**
- ⚠️ Add DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
- ⚠️ Redeploy after adding variables

**After fixes, your app should work correctly!** ✅

