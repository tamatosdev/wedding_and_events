# 🔧 Fix Railway Database Connection Error

## ❌ The Problem

```
Error: P1001: Can't reach database server at `postgres.railway.internal:5432`
```

**This happens because you're using Railway's internal URL**, which only works from within Railway's network, not from your local machine.

---

## ✅ The Solution

You need to use Railway's **public connection string** instead of the internal one.

---

## Step 1: Get the Correct DATABASE_URL

### In Railway Dashboard:

1. **Go to Railway Dashboard:**
   - https://railway.app
   - Open your project

2. **Click on PostgreSQL service**

3. **Go to "Variables" tab** (NOT "Connect" or other tabs)

4. **Find `DATABASE_URL`** in the list

5. **Click "Reveal"** if it's hidden

6. **Copy the FULL connection string**

### What to Look For:

✅ **CORRECT (Public URL):**
```
postgresql://postgres:password@monorail.proxy.rlwy.net:5432/railway
```

❌ **WRONG (Internal URL - won't work locally):**
```
postgresql://postgres:password@postgres.railway.internal:5432/railway
```

---

## Step 2: Alternative - Get from "Connect" Tab

If Variables tab doesn't show the right URL:

1. Click on PostgreSQL service
2. Go to **"Connect"** or **"Data"** tab
3. Look for **"Public Network"** or **"Connection String"**
4. Copy the connection string that uses:
   - `monorail.proxy.rlwy.net` OR
   - `monorail.proxy.rlwy.app` OR  
   - Any public hostname (NOT `.railway.internal`)

---

## Step 3: Set the Correct DATABASE_URL

### Windows PowerShell:

```powershell
# Replace with YOUR actual Railway public URL
$env:DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@monorail.proxy.rlwy.net:5432/railway"
```

### Check Current DATABASE_URL:

```powershell
# See what's currently set
$env:DATABASE_URL
```

---

## Step 4: Test Connection

```powershell
# Test if connection works
npx prisma db pull
```

If this succeeds, you're connected! If not, double-check your DATABASE_URL.

---

## Step 5: Run Database Setup

Once connected:

```powershell
# Generate Prisma Client
npx prisma generate

# Push schema
npx prisma db push

# Seed database
npm run db:seed
```

---

## 🔍 How to Identify the Correct URL

### Internal URL (❌ Won't work from local):
- Contains: `postgres.railway.internal`
- Contains: `.railway.internal`
- Contains: `internal`
- Only works inside Railway network

### Public URL (✅ Works from local):
- Contains: `monorail.proxy.rlwy.net`
- Contains: `monorail.proxy.rlwy.app`
- Contains: `*.rlwy.net` or `*.rlwy.app`
- Works from anywhere on the internet

---

## 🆘 If You Still Can't Find Public URL

### Option 1: Check Railway "Public Network" Settings

1. Click PostgreSQL service
2. Go to **Settings** tab
3. Look for **"Public Networking"** or **"Public Connection"**
4. Enable it if disabled
5. Railway will generate a public URL

### Option 2: Use Railway Private Network (Requires Railway CLI)

If public networking isn't available:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Use Railway CLI to run commands (automatically uses internal URL)
railway run npx prisma db push
railway run npx prisma db seed
```

---

## 🎯 Quick Fix Checklist

- [ ] Opened Railway Dashboard
- [ ] Clicked PostgreSQL service
- [ ] Went to Variables tab
- [ ] Found DATABASE_URL
- [ ] Verified it contains `rlwy.net` or `rlwy.app` (NOT `.railway.internal`)
- [ ] Copied the full connection string
- [ ] Set it in PowerShell: `$env:DATABASE_URL="..."`
- [ ] Tested connection: `npx prisma db pull`
- [ ] Ran setup: `npx prisma db push`

---

## 💡 Pro Tip

**Keep your DATABASE_URL secure!**
- Never commit it to Git (it's already in .gitignore)
- Use different URLs for local dev vs production
- Railway public URLs are safe to use from anywhere

---

**Once you have the correct public URL, set it and retry!** 🚀

