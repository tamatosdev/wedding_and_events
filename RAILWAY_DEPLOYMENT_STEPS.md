# 🚂 Railway Deployment Guide

## Current Status
- ✅ Railway CLI installed and logged in
- ✅ Project linked: `harmonious-serenity`
- ⚠️ No services configured yet

## Step-by-Step Deployment

### Option A: Full Deployment on Railway (App + Database)

#### Step 1: Add PostgreSQL Database
1. Go to [railway.app](https://railway.app)
2. Open your project: `harmonious-serenity`
3. Click **"+ New"** button
4. Select **"Database"**
5. Choose **"Add PostgreSQL"**
6. Wait for database to provision (~30 seconds)

#### Step 2: Get Database URL
1. Click on the PostgreSQL service
2. Go to **"Variables"** tab
3. Copy the `DATABASE_URL` value
4. Save it - you'll need it for environment variables

#### Step 3: Add Your Next.js Application Service
1. In the same Railway project, click **"+ New"**
2. Select **"GitHub Repo"** (or **"Empty Service"** if you want to deploy manually)
3. If using GitHub:
   - Select your repository: `tamatosdev/wedding_and_events`
   - Railway will auto-detect Next.js
4. If using Empty Service:
   - Railway will use the `railway.json` configuration

#### Step 4: Set Environment Variables
In your Next.js service, add these environment variables:

**Required:**
```env
DATABASE_URL=postgresql://... (from PostgreSQL service)
NEXTAUTH_SECRET=your-secret-key (generate with: openssl rand -base64 32)
NEXTAUTH_URL=https://your-app.railway.app
NODE_ENV=production
```

**Optional but Recommended:**
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Step 5: Push Database Schema
After database is created, run:

```bash
# Railway will auto-set DATABASE_URL, so just run:
railway run npx prisma db push
railway run npx prisma generate
```

Or if you want to seed the database:
```bash
railway run npm run db:seed
```

#### Step 6: Deploy
Railway will automatically:
1. Install dependencies (`npm install`)
2. Run build command (`npm run railway-build` from railway.json)
3. Start the app (`npm start`)

### Option B: Database Only (Use Vercel for App)

If you prefer to use Vercel for the app and Railway only for database:

1. **Create PostgreSQL in Railway** (same as Step 1 above)
2. **Get DATABASE_URL** (same as Step 2 above)
3. **Deploy app to Vercel** - See `DEPLOY_RAILWAY_VERCEL.md`
4. **Add DATABASE_URL to Vercel** environment variables

---

## Quick Commands Reference

```bash
# Check project status
railway status

# View environment variables
railway variables

# Run commands in Railway environment
railway run <command>

# View logs
railway logs

# Open Railway dashboard
railway open

# Unlink current project
railway unlink

# Link to different project
railway link
```

## Troubleshooting

### Issue: "No services found"
**Solution:** Create services in Railway dashboard first (PostgreSQL + App service)

### Issue: Build fails
**Check:**
1. All environment variables are set
2. `DATABASE_URL` is correct
3. Build logs in Railway dashboard

### Issue: Database connection fails
**Check:**
1. `DATABASE_URL` is set correctly
2. Database service is running
3. Network settings allow connections

### Issue: App won't start
**Check:**
1. `NEXTAUTH_SECRET` is set
2. `NEXTAUTH_URL` matches your Railway domain
3. All required env vars are present

## Next Steps

1. **Go to Railway Dashboard:** https://railway.app
2. **Open your project:** `harmonious-serenity`
3. **Add PostgreSQL database service**
4. **Add Next.js application service**
5. **Set environment variables**
6. **Deploy!**

