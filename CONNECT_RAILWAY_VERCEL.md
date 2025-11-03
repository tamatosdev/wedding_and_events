# 🔗 Connect Railway Database to Vercel

## Step 1: Get Database URL from Railway

1. **Go to Railway Dashboard:**
   - Visit https://railway.app
   - Open your project (the one with PostgreSQL)

2. **Get the Connection String:**
   - Click on the **PostgreSQL** service
   - Go to the **"Variables"** tab
   - Find `DATABASE_URL`
   - Click the **copy icon** (or click "Reveal" if it's hidden)
   - **Copy the entire connection string**

3. **Example Format:**
   The connection string should look like this:
   ```
   postgresql://postgres:abcdefgh123456@monorail.proxy.rlwy.net:5432/railway
   ```
   
   **NOT** the template format with `${{}}` variables!

---

## Step 2: Add to Vercel Environment Variables

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com
   - Sign in and open your project

2. **Navigate to Settings:**
   - Click on your project
   - Go to **"Settings"** tab
   - Click **"Environment Variables"** in the sidebar

3. **Add DATABASE_URL:**
   - **Key:** `DATABASE_URL`
   - **Value:** Paste the connection string from Railway (the full `postgresql://...` string)
   - **Environment:** Select all environments:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **"Save"**

4. **Add Other Required Variables:**
   
   You also need these environment variables in Vercel:
   
   ```env
   DATABASE_URL=postgresql://postgres:password@host:5432/database
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=https://your-app.vercel.app
   ```
   
   **For Production, set NEXTAUTH_URL to:**
   ```
   https://your-vercel-app-name.vercel.app
   ```

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project (if not already linked)
vercel link

# Add environment variables
vercel env add DATABASE_URL production
# Paste your Railway DATABASE_URL when prompted

vercel env add NEXTAUTH_SECRET production
# Enter your secret key

vercel env add NEXTAUTH_URL production
# Enter https://your-app.vercel.app
```

---

## Step 3: Run Database Migrations

After connecting, you need to set up your database schema:

### Option 1: Using Vercel Build Script (Recommended)

Your `package.json` already has a `vercel-build` script that includes Prisma setup. Vercel will run this automatically.

### Option 2: Manual Migration via Vercel CLI

```bash
# Set environment variables locally (temporarily)
export DATABASE_URL="your-railway-connection-string"

# Push schema to Railway database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### Option 3: Using Railway CLI

```bash
# Connect to Railway database
railway run npx prisma db push
railway run npx prisma generate
```

---

## Step 4: Verify Connection

### Test Connection in Vercel:

1. **Deploy your app to Vercel**
2. **Check Vercel Build Logs:**
   - Go to your deployment
   - Check the build logs
   - Look for Prisma connection messages

3. **Test API Routes:**
   - Visit: `https://your-app.vercel.app/api/vendors`
   - Should return vendor data (or empty array if no data yet)

### Common Issues:

**❌ Error: "Can't reach database server"**
- Check if Railway database is running
- Verify DATABASE_URL is correct in Vercel
- Make sure Railway allows external connections

**❌ Error: "Authentication failed"**
- Check username/password in DATABASE_URL
- Railway generates these automatically - use the exact string from Railway

**❌ Error: "Database does not exist"**
- Run `prisma db push` to create tables
- Check database name in DATABASE_URL

---

## 📋 Complete Environment Variables Checklist

Add all these to Vercel (get values from Railway or your `.env.local`):

### Required:
- ✅ `DATABASE_URL` (from Railway)
- ✅ `NEXTAUTH_SECRET` (generate a random string)
- ✅ `NEXTAUTH_URL` (your Vercel app URL)

### Email (if using email features):
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

### Cloudinary (if using image uploads):
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Admin Settings:
- `ADMIN_EMAIL`
- `CUSTOMER_SUPPORT_EMAIL`
- `MANAGER_EMAIL`
- `CEO_EMAIL`

### WhatsApp (if using escalation):
- `WHATSAPP_PROVIDER`
- `TWILIO_ACCOUNT_SID` (if using Twilio)
- `TWILIO_AUTH_TOKEN`
- etc.

---

## 🎯 Quick Reference

**Railway DATABASE_URL Format:**
```
postgresql://[username]:[password]@[host]:[port]/[database]
```

**Where to find it in Railway:**
- PostgreSQL Service → Variables Tab → `DATABASE_URL`

**Where to add it in Vercel:**
- Project → Settings → Environment Variables → Add `DATABASE_URL`

**After adding:**
1. Redeploy your Vercel app
2. Check build logs for Prisma connection
3. Test your API routes

---

## ✅ Verification Steps

1. ✅ Railway database is running
2. ✅ DATABASE_URL copied from Railway (not template)
3. ✅ DATABASE_URL added to Vercel environment variables
4. ✅ Other required env vars added (NEXTAUTH_SECRET, etc.)
5. ✅ Vercel deployment succeeds
6. ✅ API routes work (test `/api/vendors`)

---

**Need help?** Check the build logs in Vercel for specific error messages!

