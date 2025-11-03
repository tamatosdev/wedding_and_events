# 🔐 Fix 401 Unauthorized Authentication Error

## ❌ The Problem

```
POST /api/auth/callback/credentials 401 (Unauthorized)
```

**This means NextAuth authentication is failing.** Most likely causes:

---

## ✅ Common Causes & Fixes

### Cause 1: Missing NEXTAUTH_SECRET in Vercel ❌ MOST LIKELY

**NextAuth requires `NEXTAUTH_SECRET` to sign/verify JWTs.**

### Fix:

1. **Go to Vercel Dashboard:**
   - https://vercel.com
   - Project: `wedding-and-events-dqi5-ten`
   - **Settings** → **Environment Variables**

2. **Add NEXTAUTH_SECRET:**
   - **Key:** `NEXTAUTH_SECRET`
   - **Value:** `n+XtF9UO5GH5SsR2ObmDJoy+vpI5FHOienoSiq172YY=`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

3. **Redeploy** after adding

---

### Cause 2: Missing NEXTAUTH_URL in Vercel

**NextAuth needs to know your app URL for callbacks.**

### Fix:

1. **Add NEXTAUTH_URL to Vercel:**
   - **Key:** `NEXTAUTH_URL`
   - **Value:** `https://wedding-and-events-dqi5-ten.vercel.app`
   - **Environments:** ✅ Production, ✅ Preview
   - (Keep `http://localhost:3000` for Development)
   - Click **Save**

2. **Redeploy**

---

### Cause 3: Missing DATABASE_URL in Vercel

**NextAuth stores sessions in the database.**

### Fix:

Add `DATABASE_URL` to Vercel (same as before):
```
postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway
```

---

### Cause 4: User Doesn't Exist or Wrong Password

**The user you're trying to sign in with might not exist in the database.**

### Check:

After fixing DATABASE_URL, verify users exist:
- Admin: `admin@shadiportal.com` / `admin123`
- Vendor: `vendor@example.com` / `vendor123`

If these don't work, the database might need to be seeded again.

---

## 🎯 Complete Checklist for Vercel

Make sure ALL these are in Vercel Environment Variables:

```
✅ DATABASE_URL=postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway
✅ NEXTAUTH_SECRET=n+XtF9UO5GH5SsR2ObmDJoy+vpI5FHOienoSiq172YY=
✅ NEXTAUTH_URL=https://wedding-and-events-dqi5-ten.vercel.app
```

---

## 🔍 Verify NextAuth Configuration

### Check Vercel Logs:

1. Go to Vercel Dashboard → Your Project
2. **Functions** tab
3. Click on `/api/auth/[...nextauth]` function
4. Check **Logs** for authentication errors
5. Look for messages like:
   - "NEXTAUTH_SECRET is missing"
   - "Cannot read property 'sign' of undefined"
   - Database connection errors

---

## 🚀 Step-by-Step Fix

### Step 1: Add All Required Variables to Vercel

```
DATABASE_URL=postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway
NEXTAUTH_SECRET=n+XtF9UO5GH5SsR2ObmDJoy+vpI5FHOienoSiq172YY=
NEXTAUTH_URL=https://wedding-and-events-dqi5-ten.vercel.app
```

### Step 2: Redeploy

- **Deployments** → **Redeploy** latest

### Step 3: Test Sign In

- Go to: `https://wedding-and-events-dqi5-ten.vercel.app/auth/signin`
- Try: `admin@shadiportal.com` / `admin123`

---

## 💡 Why This Happens

**401 Unauthorized** in NextAuth usually means:

1. **Missing NEXTAUTH_SECRET** → Can't sign/verify tokens
2. **Wrong NEXTAUTH_URL** → Callbacks fail
3. **Database not connected** → Can't verify user credentials
4. **Wrong credentials** → User/password mismatch

---

## 🆘 Still Getting 401?

### Check Vercel Function Logs:

1. **Functions** → `/api/auth/[...nextauth]` → **Logs**
2. Look for specific error messages
3. Common errors:
   - `NEXTAUTH_SECRET environment variable is not set`
   - `Database connection failed`
   - `Invalid credentials` (wrong username/password)

### Test with Correct Credentials:

After DATABASE_URL is set, the seeded users should be:
- Email: `admin@shadiportal.com`
- Password: `admin123`

If this doesn't work, the database might need to be seeded again.

---

## ✅ Quick Fix Priority

**Add these 3 variables to Vercel (in this order):**

1. ✅ `DATABASE_URL` (already provided)
2. ✅ `NEXTAUTH_SECRET` (already generated: `n+XtF9UO5GH5SsR2ObmDJoy+vpI5FHOienoSiq172YY=`)
3. ✅ `NEXTAUTH_URL` (`https://wedding-and-events-dqi5-ten.vercel.app`)

**Then redeploy!**

---

**Most likely fix: Add NEXTAUTH_SECRET and NEXTAUTH_URL to Vercel!** 🔐

