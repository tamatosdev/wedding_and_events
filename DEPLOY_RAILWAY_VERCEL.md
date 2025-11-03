# 🚀 Deploy to Railway (Database) + Vercel (App)

Complete guide to deploy your Wedding & Events portal.

## 📋 Overview

- **Railway:** PostgreSQL Database
- **Vercel:** Next.js Application (Frontend + API Routes)

---

## Part 1: Set Up Railway PostgreSQL Database

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (same account you use for code)

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Empty Project"**
3. Name it: `wedding-events-db`

### Step 3: Add PostgreSQL Database
1. Click **"+ New"** button
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Wait for database to provision (~30 seconds)

### Step 4: Get Database Connection String
1. Click on the PostgreSQL service
2. Go to **"Variables"** tab
3. Find `DATABASE_URL`
4. Click to copy the connection string
   - Format: `postgresql://postgres:password@host:port/railway`
5. **SAVE THIS** - you'll need it for Vercel!

### Step 5: Push Database Schema
You have two options:

**Option A: Using Railway CLI (Recommended)**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Set DATABASE_URL (Railway auto-sets it)
# Push schema
railway run npx prisma db push

# Generate Prisma Client
railway run npx prisma generate
```

**Option B: Using Local Connection**
1. Create `.env.production` file:
   ```bash
   DATABASE_URL="your-railway-database-url-here"
   ```

2. Run migrations:
   ```bash
   # Make sure you're using the Railway DATABASE_URL
   npx prisma db push
   npx prisma generate
   ```

---

## Part 2: Deploy to Vercel

### Step 1: Push Code to GitHub (If Not Already)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"Add New Project"**
4. Find your repository: `tamatosdev/wedding_and_events`
5. Click **"Import"**

### Step 3: Configure Project Settings
Vercel should auto-detect Next.js. Verify:

- **Framework Preset:** Next.js ✅
- **Root Directory:** `./` ✅
- **Build Command:** `npm run build` ✅
- **Output Directory:** `.next` ✅
- **Install Command:** `npm install` ✅

### Step 4: Add Environment Variables
**Before deploying, add all environment variables:**

1. In Vercel Dashboard, go to **Settings** → **Environment Variables**
2. Add each variable (click "Add New" for each):

#### Required Variables:

```bash
# Database (from Railway - Step 1.4)
DATABASE_URL=postgresql://postgres:password@host:port/railway

# NextAuth.js
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://your-app.vercel.app

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PHONE=+92-XXX-XXXXXXX
ADMIN_NAME=Admin Portal

# Escalation - Customer Support
CUSTOMER_SUPPORT_EMAIL=support@yourdomain.com
CUSTOMER_SUPPORT_WHATSAPP=+923001234567

# Escalation - Manager
MANAGER_EMAIL=manager@yourdomain.com
MANAGER_WHATSAPP=+923001234568

# Escalation - CEO
CEO_EMAIL=ceo@yourdomain.com
CEO_WHATSAPP=+923001234569

# WhatsApp
WHATSAPP_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Cron Security
CRON_SECRET=generate-random-string-here
```

#### Generate Secrets:

**NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**CRON_SECRET:**
```bash
openssl rand -hex 32
```

**Important Notes:**
- Set `NEXTAUTH_URL` to your Vercel URL: `https://your-project.vercel.app`
- After deployment, update `NEXTAUTH_URL` if you add a custom domain
- Select **"Production"** environment for all variables

### Step 5: Deploy
1. Click **"Deploy"** button
2. Wait for build to complete (~3-5 minutes)
3. Your app will be live! 🎉

### Step 6: Verify Deployment
1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Test authentication
3. Test database connection
4. Check admin dashboard

---

## Part 3: Post-Deployment Setup

### Step 1: Run Database Migrations
After first deployment, ensure database schema is up to date:

**Using Railway CLI:**
```bash
railway run npx prisma db push
```

**Or manually:**
1. Set `DATABASE_URL` locally to Railway's URL
2. Run: `npx prisma db push`

### Step 2: Verify Cron Jobs
1. Go to Vercel Dashboard → Your Project → **Crons** tab
2. You should see: `*/5 * * * *` → `/api/cron/escalation-check`
3. Cron runs automatically every 5 minutes

### Step 3: Test Everything
- ✅ Homepage loads
- ✅ Sign up / Sign in works
- ✅ Database connection works
- ✅ Image uploads work (Cloudinary)
- ✅ Contact form works
- ✅ Admin dashboard accessible
- ✅ Vendor listings work

---

## Part 4: Custom Domain (Optional)

### Step 1: Add Domain in Vercel
1. Go to **Settings** → **Domains**
2. Enter your domain (e.g., `wedding-events.com`)
3. Follow DNS configuration instructions

### Step 2: Update Environment Variable
1. Go to **Settings** → **Environment Variables**
2. Update `NEXTAUTH_URL` to your custom domain:
   ```
   NEXTAUTH_URL=https://wedding-events.com
   ```
3. Redeploy (or it auto-deploys)

---

## 🆘 Troubleshooting

### Database Connection Fails
- Verify `DATABASE_URL` is correct in Vercel
- Check Railway database is running
- Ensure Railway database is publicly accessible
- Check Vercel build logs for errors

### Build Fails
- Check Vercel build logs
- Verify all dependencies in `package.json`
- Check for TypeScript errors
- Ensure `prisma generate` runs (it's in build script)

### Authentication Not Working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your Vercel domain
- Clear browser cookies
- Check Vercel logs for errors

### Images Not Loading
- Verify Cloudinary credentials
- Check image upload API route
- Verify Cloudinary settings allow your domain

### Cron Job Not Running
- Check Vercel Dashboard → Crons tab
- Verify `vercel.json` is committed
- Check cron endpoint logs in Vercel

---

## 📊 Cost Estimate

### Free Tier (Sufficient for starting):

**Railway:**
- $5 credit/month (free tier)
- PostgreSQL database included
- Enough for small-medium projects

**Vercel:**
- Unlimited deployments
- 100GB bandwidth/month
- Serverless functions included
- Cron jobs included
- Custom domains included

**Total:** Free! (for starting)

---

## ✅ Deployment Checklist

Before going live:
- [ ] Railway database created and running
- [ ] Database schema pushed (`prisma db push`)
- [ ] All environment variables set in Vercel
- [ ] `NEXTAUTH_URL` matches Vercel domain
- [ ] `NEXTAUTH_SECRET` generated and set
- [ ] Cloudinary configured
- [ ] SMTP email configured
- [ ] Tested authentication flow
- [ ] Tested database operations
- [ ] Cron job enabled in Vercel
- [ ] Tested contact form
- [ ] Tested admin dashboard

---

## 🔄 Future Updates

**To update your deployed app:**

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. Vercel automatically deploys! 🚀

**To update database schema:**
```bash
# Option 1: Railway CLI
railway run npx prisma db push

# Option 2: Set DATABASE_URL locally
export DATABASE_URL="railway-database-url"
npx prisma db push
```

---

## 📚 Quick Reference

**Railway:**
- Dashboard: https://railway.app
- Docs: https://docs.railway.app

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs

**Your Project:**
- GitHub: https://github.com/tamatosdev/wedding_and_events
- Vercel: https://vercel.com (after deployment)

---

**Ready to deploy?** Follow the steps above, and you'll have your app live in 15-20 minutes! 🎉

