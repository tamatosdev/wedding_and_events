# 🔗 How to Find and Set NEXTAUTH_URL

## 📍 Step 1: Find Your Vercel URL

### Option A: If You Haven't Deployed Yet

1. **Go to Vercel:** https://vercel.com
2. **Sign in** with your GitHub account
3. **Import your repository:**
   - Click **"Add New"** → **"Project"**
   - Select your `wedding_and_events` repository
   - Click **"Import"**
4. **Deploy:**
   - Vercel will auto-detect Next.js
   - Click **"Deploy"**
   - Wait for deployment to complete (2-5 minutes)
5. **Get your URL:**
   - After deployment, Vercel will show your URL
   - It will look like: `https://wedding-and-events-xxxxx.vercel.app`
   - Or if you have a custom domain: `https://yourdomain.com`

### Option B: If Already Deployed

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Find your project** (e.g., `wedding_and_events` or `harmonious-serenity`)
3. **Click on the project**
4. **Your URL is shown at the top:**
   - Look for: `https://your-project-name.vercel.app`
   - Or check the **"Domains"** tab for custom domains

---

## 🔧 Step 2: Add NEXTAUTH_URL to Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to your project in Vercel Dashboard**
2. **Click on "Settings"** (top navigation)
3. **Click on "Environment Variables"** (left sidebar)
4. **Click "Add New"** button
5. **Fill in the form:**
   ```
   Key: NEXTAUTH_URL
   Value: https://your-actual-vercel-url.vercel.app
   ```
6. **Select Environments:**
   - ✅ **Production** (for live site)
   - ✅ **Preview** (for pull request previews)
   - ❌ **Development** (leave unchecked - use localhost for dev)
7. **Click "Save"**

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Set environment variable
vercel env add NEXTAUTH_URL production
# When prompted, enter: https://your-app.vercel.app
```

---

## 🚂 Step 3: Add NEXTAUTH_URL to Railway (If Deploying There)

### Via Railway Dashboard:

1. **Go to Railway Dashboard:** https://railway.app
2. **Open your project:** `harmonious-serenity`
3. **Select your Next.js service** (not the Postgres service)
4. **Click "Variables" tab**
5. **Click "+ New Variable"**
6. **Add:**
   ```
   Key: NEXTAUTH_URL
   Value: https://your-railway-app.railway.app
   ```
7. **Click "Add"**

### Via Railway CLI:

```bash
# Select your Next.js service (not Postgres)
railway service

# Set NEXTAUTH_URL
railway variables set NEXTAUTH_URL="https://your-app.railway.app"
```

---

## 📋 Complete Environment Variables Checklist

### For Vercel:

Add these in **Settings → Environment Variables**:

| Variable | Value | Environments |
|----------|-------|---------------|
| `DATABASE_URL` | `postgresql://postgres:OMiRXXxXqQJCsXgjNFNKGhFeGqqRODCW@metro.proxy.rlwy.net:43505/railway` | ✅ Production, ✅ Preview, ✅ Development |
| `NEXTAUTH_SECRET` | `qU0NDONxIVJQvzG2cCCOQA32Z+L72jGSHnastCcFdms=` | ✅ Production, ✅ Preview, ✅ Development |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | ✅ Production, ✅ Preview |

### For Railway:

Railway automatically provides `DATABASE_URL` to services. You need to add:

| Variable | Value | How to Add |
|----------|-------|------------|
| `NEXTAUTH_SECRET` | `qU0NDONxIVJQvzG2cCCOQA32Z+L72jGSHnastCcFdms=` | Via dashboard or CLI |
| `NEXTAUTH_URL` | `https://your-app.railway.app` | Via dashboard or CLI |

---

## 🔍 How to Check Your Current Vercel URL

### Method 1: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Look at the top of the page - your URL is displayed there
4. Or go to **Settings → Domains** to see all domains

### Method 2: Check Deployment
1. Go to **Deployments** tab
2. Click on the latest deployment
3. The URL is shown in the deployment details

### Method 3: Check Domain Settings
1. Go to **Settings → Domains**
2. Your default Vercel domain is listed there
3. Format: `https://project-name-xxxxx.vercel.app`

---

## ⚠️ Important Notes

1. **NEXTAUTH_URL must match your actual deployment URL**
   - ❌ Wrong: `https://example.com` (if your actual URL is different)
   - ✅ Correct: Use the exact URL Vercel/Railway gives you

2. **Different URLs for different environments:**
   - **Production:** `https://your-app.vercel.app`
   - **Preview:** `https://your-app-git-branch.vercel.app`
   - **Development:** `http://localhost:3000` (local only)

3. **After adding NEXTAUTH_URL:**
   - **Redeploy** your application
   - Go to **Deployments** → Click **⋯** → **Redeploy**

4. **If you change your domain:**
   - Update `NEXTAUTH_URL` in environment variables
   - Redeploy the application

---

## 🧪 Verify It's Working

After setting `NEXTAUTH_URL` and redeploying:

1. **Visit your app:** `https://your-app.vercel.app`
2. **Try to sign in:** Go to `/auth/signin`
3. **Check browser console** for any auth errors
4. **Check Vercel Function Logs:**
   - Go to **Functions** tab
   - Click on `/api/auth/[...nextauth]`
   - Check for errors related to `NEXTAUTH_URL`

---

## 🆘 Troubleshooting

### Problem: "NEXTAUTH_URL is not set"
**Solution:** Make sure you added it to Vercel and redeployed

### Problem: "Invalid callback URL"
**Solution:** Check that `NEXTAUTH_URL` matches your actual deployment URL exactly

### Problem: "Can't find my Vercel URL"
**Solution:** 
1. Check if project is deployed
2. Go to Deployments tab - URL is shown there
3. Or check Settings → Domains

### Problem: "Auth works locally but not on Vercel"
**Solution:**
1. Verify `NEXTAUTH_URL` is set in Vercel (not just local `.env`)
2. Make sure you redeployed after adding the variable
3. Check that the URL matches your actual Vercel deployment URL

---

## 📸 Visual Guide

### Finding URL in Vercel Dashboard:
```
Vercel Dashboard
  └── Your Project
      └── [URL shown at top: https://project-name.vercel.app]
      └── Settings
          └── Environment Variables
              └── Add New
                  └── Key: NEXTAUTH_URL
                  └── Value: [paste your URL here]
                  └── Environments: ✅ Production, ✅ Preview
```

---

**Quick Summary:**
1. ✅ Deploy to Vercel (if not done)
2. ✅ Copy your Vercel URL from dashboard
3. ✅ Go to Settings → Environment Variables
4. ✅ Add `NEXTAUTH_URL` with your URL
5. ✅ Select Production + Preview environments
6. ✅ Save and Redeploy

**Your NEXTAUTH_URL is ready!** 🎉

