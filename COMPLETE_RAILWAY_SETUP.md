# 🚂 Complete Railway Deployment Guide

## 📋 Overview

This guide covers **ALL deployment options** for your Wedding & Events portal on Railway.

---

## 🎯 Option 1: Full Deployment on Railway (App + Database)

Deploy both your Next.js application and PostgreSQL database on Railway.

### Step 1: Create PostgreSQL Database Service

**Via Railway Dashboard:**
1. Go to https://railway.app
2. Open project: `harmonious-serenity`
3. Click **"+ New"** button
4. Select **"Database"**
5. Choose **"Add PostgreSQL"**
6. Wait ~30 seconds for provisioning

**Via Railway CLI (if supported):**
```bash
# Check if you can create services via CLI
railway add postgresql
```

### Step 2: Create Next.js Application Service

**Via Railway Dashboard:**
1. In the same project, click **"+ New"**
2. Choose one:
   - **"GitHub Repo"** → Select `tamatosdev/wedding_and_events` (auto-deploys on push)
   - **"Empty Service"** → Manual deployment (uses `railway.json`)

**Via Railway CLI:**
```bash
# Link to GitHub repo (if using GitHub deployment)
railway link --github tamatosdev/wedding_and_events
```

### Step 3: Set Environment Variables

**Required Variables:**
```env
DATABASE_URL=postgresql://... (auto-provided from PostgreSQL service)
NEXTAUTH_SECRET=<generate-with-command-below>
NEXTAUTH_URL=https://your-app-name.railway.app
NODE_ENV=production
```

**Generate NEXTAUTH_SECRET:**
```bash
# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Or use OpenSSL (if installed)
openssl rand -base64 32
```

**Optional Variables (for full functionality):**
```env
# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Redis (if using)
REDIS_URL=redis://...

# WhatsApp API (if using)
WHATSAPP_API_KEY=...
WHATSAPP_API_SECRET=...
```

**Set Variables via CLI:**
```bash
# Set individual variables
railway variables set NEXTAUTH_SECRET="your-secret-here"
railway variables set NEXTAUTH_URL="https://your-app.railway.app"

# Or set from file
railway variables --file .env.production
```

**Set Variables via Dashboard:**
1. Click on your Next.js service
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add each variable

### Step 4: Push Database Schema

After PostgreSQL is created:

```bash
# Option A: Using Railway CLI (recommended)
railway run npx prisma db push
railway run npx prisma generate

# Option B: Using local connection
# First, get DATABASE_URL from Railway dashboard
# Then set it locally and run:
export DATABASE_URL="your-railway-database-url"
npx prisma db push
npx prisma generate
```

### Step 5: Seed Database (Optional)

```bash
railway run npm run db:seed
```

### Step 6: Deploy

Railway will automatically:
1. Install dependencies (`npm install`)
2. Run build (`npm run railway-build` from `railway.json`)
3. Start app (`npm start`)

**Monitor deployment:**
```bash
railway logs --follow
```

**Check status:**
```bash
railway status
```

---

## 🎯 Option 2: Database Only on Railway (App on Vercel)

Use Railway for PostgreSQL database, deploy Next.js app on Vercel.

### Step 1: Create PostgreSQL Database

Same as Option 1, Step 1.

### Step 2: Get Database URL

1. Click on PostgreSQL service in Railway
2. Go to **"Variables"** tab
3. Copy `DATABASE_URL`
4. **Save this** - you'll need it for Vercel

### Step 3: Push Database Schema

```bash
# Get DATABASE_URL from Railway
railway variables

# Or set locally and push
export DATABASE_URL="your-railway-database-url"
npx prisma db push
npx prisma generate
```

### Step 4: Deploy App to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Add environment variables:
   - `DATABASE_URL` (from Railway)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your Vercel domain)
   - All other required variables
4. Deploy!

See `DEPLOY_RAILWAY_VERCEL.md` for detailed Vercel setup.

---

## 🎯 Option 3: Hybrid Setup (Recommended)

- **Railway:** PostgreSQL Database + Redis (if needed)
- **Vercel:** Next.js Application (better for Next.js, free tier)
- **Cloudinary:** Image storage

This is the **recommended** setup because:
- ✅ Vercel is optimized for Next.js
- ✅ Better free tier for Next.js apps
- ✅ Automatic deployments on git push
- ✅ Better performance and CDN
- ✅ Railway database is reliable and scalable

---

## 🔧 Railway CLI Commands Reference

```bash
# Authentication
railway login                    # Login to Railway
railway logout                   # Logout

# Project Management
railway link                     # Link to a project
railway link --project <id>      # Link to specific project
railway unlink                   # Unlink current project
railway status                   # Check project status

# Services
railway service                  # List services
railway service <name>           # Select service
railway add postgresql           # Add PostgreSQL (if supported)

# Environment Variables
railway variables                # List all variables
railway variables set KEY=value   # Set a variable
railway variables --file .env     # Set from file
railway variables get KEY        # Get a variable

# Running Commands
railway run <command>            # Run command in Railway environment
railway run npx prisma db push  # Example: Push database schema

# Deployment
railway up                       # Deploy current directory
railway logs                     # View logs
railway logs --follow            # Follow logs in real-time
railway open                     # Open project in browser

# Database
railway connect postgresql       # Connect to PostgreSQL (if supported)
```

---

## 📝 Environment Variables Checklist

### Required for Railway Deployment:

- [ ] `DATABASE_URL` (auto-provided from PostgreSQL service)
- [ ] `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- [ ] `NEXTAUTH_URL` (your Railway app URL: `https://your-app.railway.app`)
- [ ] `NODE_ENV=production`

### Recommended for Full Functionality:

- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS`
- [ ] `REDIS_URL` (if using Redis)
- [ ] `WHATSAPP_API_KEY` (if using WhatsApp)
- [ ] `WHATSAPP_API_SECRET` (if using WhatsApp)

---

## 🚀 Quick Start Commands

### For Full Railway Deployment:

```bash
# 1. Login (already done ✅)
railway login

# 2. Link project (already done ✅)
railway link

# 3. Create services in Railway dashboard:
#    - PostgreSQL database
#    - Next.js app service

# 4. Set environment variables
railway variables set NEXTAUTH_SECRET="$(openssl rand -base64 32)"
railway variables set NODE_ENV="production"

# 5. Push database schema
railway run npx prisma db push
railway run npx prisma generate

# 6. Seed database (optional)
railway run npm run db:seed

# 7. Monitor deployment
railway logs --follow
```

### For Database Only (Vercel App):

```bash
# 1. Create PostgreSQL in Railway dashboard

# 2. Get DATABASE_URL
railway variables

# 3. Push schema
railway run npx prisma db push

# 4. Use DATABASE_URL in Vercel environment variables
```

---

## 🔍 Troubleshooting

### Issue: "No services found"
**Solution:** Create services in Railway dashboard first

### Issue: Build fails
**Check:**
- All required environment variables are set
- `DATABASE_URL` is correct and accessible
- Check build logs: `railway logs`

### Issue: Database connection fails
**Check:**
- `DATABASE_URL` format is correct
- Database service is running
- Network/firewall settings

### Issue: App won't start
**Check:**
- `NEXTAUTH_SECRET` is set
- `NEXTAUTH_URL` matches your Railway domain
- All required env vars are present
- Check logs: `railway logs`

### Issue: Environment variables not working
**Solution:**
- Variables are service-specific
- Make sure you're setting them in the correct service
- Use `railway variables` to verify

---

## 📊 Current Project Status

- ✅ Railway CLI: Installed (v4.11.0)
- ✅ Logged in: tamatos.dev@gmail.com
- ✅ Project linked: harmonious-serenity
- ⚠️ Services: Need to create (PostgreSQL + App)

---

## 🎯 Recommended Next Steps

1. **Go to Railway Dashboard:** https://railway.app/project/harmonious-serenity
2. **Add PostgreSQL Database:**
   - Click "+ New" → "Database" → "PostgreSQL"
3. **Add Next.js App Service:**
   - Click "+ New" → "GitHub Repo" → Select your repo
   - OR: "+ New" → "Empty Service" (for manual deployment)
4. **Set Environment Variables:**
   - In Next.js service → "Variables" tab
   - Add all required variables
5. **Push Database Schema:**
   ```bash
   railway run npx prisma db push
   railway run npx prisma generate
   ```
6. **Deploy and Monitor:**
   ```bash
   railway logs --follow
   ```

---

## 💡 Pro Tips

1. **Use Railway's auto-provided DATABASE_URL:**
   - Railway automatically provides `DATABASE_URL` to all services in the same project
   - No need to manually copy/paste it

2. **Monitor costs:**
   - Railway has a free tier with $5 credit
   - Monitor usage in Railway dashboard

3. **Use Railway's GitHub integration:**
   - Auto-deploys on every push to main branch
   - No need to manually deploy

4. **Database backups:**
   - Railway provides automatic backups
   - Check backup settings in PostgreSQL service

5. **Custom domains:**
   - Add custom domain in Railway dashboard
   - Update `NEXTAUTH_URL` accordingly

---

**Ready to deploy? Start with Step 1 in Railway Dashboard!** 🚀

