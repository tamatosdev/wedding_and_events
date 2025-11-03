# 🚨 URGENT: Fix 401 Authentication Error

## ❌ Current Error

```
POST /api/auth/callback/credentials 401 (Unauthorized)
```

**NextAuth cannot authenticate users because required environment variables are missing in Vercel.**

---

## ✅ IMMEDIATE FIX - Add 3 Environment Variables to Vercel

### Go to Vercel Dashboard NOW:

1. **Open:** https://vercel.com/dashboard
2. **Select Project:** `wedding-and-events-dqi5-ten`
3. **Go to:** **Settings** → **Environment Variables**
4. **Add these 3 variables:**

---

### Variable 1: DATABASE_URL ⚠️ CRITICAL

```
Key: DATABASE_URL
Value: postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway
Environments: ✅ Production, ✅ Preview, ✅ Development
```

---

### Variable 2: NEXTAUTH_SECRET ⚠️ CRITICAL

```
Key: NEXTAUTH_SECRET
Value: n+XtF9UO5GH5SsR2ObmDJoy+vpI5FHOienoSiq172YY=
Environments: ✅ Production, ✅ Preview, ✅ Development
```

**This is REQUIRED for NextAuth to work!** Without it, authentication will always fail with 401.

---

### Variable 3: NEXTAUTH_URL ⚠️ CRITICAL

```
Key: NEXTAUTH_URL
Value: https://wedding-and-events-dqi5-ten.vercel.app
Environments: ✅ Production, ✅ Preview
```

**For Development, use:** `http://localhost:3000`

---

## 🔄 After Adding Variables:

1. **Save all variables**
2. **Go to Deployments tab**
3. **Click ⋯ on latest deployment**
4. **Click "Redeploy"**
5. **Wait for deployment to complete**

---

## 🧪 Test After Redeploy:

1. Go to: `https://wedding-and-events-dqi5-ten.vercel.app/auth/signin`
2. Try login with:
   - **Email:** `admin@shadiportal.com`
   - **Password:** `admin123`

---

## 📋 Complete Checklist:

Make sure you have ALL 3 variables in Vercel:

```
✅ DATABASE_URL (Railway PostgreSQL connection string)
✅ NEXTAUTH_SECRET (JWT signing secret)
✅ NEXTAUTH_URL (Your Vercel app URL)
```

---

## 🔍 Why Each Variable is Needed:

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

---

## ✅ Quick Copy-Paste Checklist:

```
DATABASE_URL = postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway
NEXTAUTH_SECRET = n+XtF9UO5GH5SsR2ObmDJoy+vpI5FHOienoSiq172YY=
NEXTAUTH_URL = https://wedding-and-events-dqi5-ten.vercel.app
```

**Add these to Vercel → Redeploy → Test!** 🚀

---

**Most likely fix: Add NEXTAUTH_SECRET to Vercel! This is required for authentication to work.** 🔐

