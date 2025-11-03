# Deployment Guide: Vercel + Railway

This guide will help you deploy your Wedding & Events portal to production using Vercel (Next.js hosting) and Railway (PostgreSQL database).

## Prerequisites

1. GitHub account (for repository access)
2. Vercel account (free tier works)
3. Railway account (free tier works)
4. Domain name (optional, but recommended)

---

## Step 1: Set Up Railway PostgreSQL Database

### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### 1.2 Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"** (if you want) or **"Empty Project"**

### 1.3 Add PostgreSQL Database
1. Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway will automatically create a PostgreSQL instance
3. Wait for it to provision (takes ~1 minute)

### 1.4 Get Database Connection String
1. Click on the PostgreSQL service
2. Go to **"Variables"** tab
3. Copy the `DATABASE_URL` value
   - It looks like: `postgresql://postgres:password@host:port/railway`
   - **Save this for later!**

### 1.5 Set Up Database Schema
You have two options:

**Option A: Using Railway CLI (Recommended)**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Push Prisma schema
railway run npx prisma db push
railway run npx prisma generate

# (Optional) Seed database
railway run npm run db:seed
```

**Option B: Using Local Connection**
1. Temporarily set `DATABASE_URL` in your local `.env`
2. Run migrations:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

---

## Step 2: Set Up Vercel Deployment

### 2.1 Prepare Your Repository
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

### 2.2 Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Vercel will detect it's a Next.js project

### 2.3 Configure Build Settings
Vercel should auto-detect, but verify:
- **Framework Preset:** Next.js
- **Root Directory:** `./`
- **Build Command:** `npm run build` (or leave default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install`

### 2.4 Environment Variables
Add all these in Vercel Dashboard → **Settings** → **Environment Variables**:

#### Required Variables:

```bash
# Database (from Railway)
DATABASE_URL=postgresql://postgres:password@host:port/railway

# NextAuth.js
NEXTAUTH_SECRET=your-secret-key-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://your-app.vercel.app

# Cloudinary
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

### 2.5 Deploy
1. Click **"Deploy"**
2. Wait for build to complete (~3-5 minutes)
3. Your app will be live at: `https://your-project.vercel.app`

---

## Step 3: Post-Deployment Setup

### 3.1 Run Database Migrations
After first deployment, you need to set up the database:

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migrations (use production DATABASE_URL)
vercel env pull
npx prisma db push
npx prisma generate
```

**Option B: Using Railway CLI**
```bash
railway run npx prisma db push
railway run npx prisma generate
```

**Option C: Add to package.json build script**
See `package.json` - we've added postinstall hook for Prisma generate.

### 3.2 Verify Deployment
1. Visit your Vercel URL
2. Test authentication
3. Test database connection
4. Verify cron job is running (check Vercel logs)

### 3.3 Enable Vercel Cron Jobs
The `vercel.json` file is already configured. Vercel will automatically:
- Run cron job every 5 minutes
- Hit `/api/cron/escalation-check` endpoint

**Verify it's working:**
- Go to Vercel Dashboard → Your Project → **Crons**
- You should see the cron job listed

---

## Step 4: Custom Domain (Optional)

### 4.1 Add Domain in Vercel
1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `wedding-events.com`)
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` environment variable to your domain

### 4.2 Update Environment Variables
After adding domain, update:
```
NEXTAUTH_URL=https://yourdomain.com
```

---

## Step 5: Production Checklist

- [ ] Railway database is running
- [ ] Database schema is pushed (`prisma db push`)
- [ ] All environment variables are set in Vercel
- [ ] `NEXTAUTH_URL` matches your Vercel domain
- [ ] `NEXTAUTH_SECRET` is set and secure
- [ ] Cloudinary is configured
- [ ] SMTP email is configured and tested
- [ ] WhatsApp/Twilio is configured (if using)
- [ ] Cron job is enabled in Vercel
- [ ] Test authentication flow
- [ ] Test vendor submission
- [ ] Test contact form
- [ ] Test admin dashboard access

---

## Step 6: Monitoring & Maintenance

### 6.1 Vercel Logs
- Go to **Deployments** → Click a deployment → **View Logs**
- Monitor for errors

### 6.2 Railway Logs
- Go to your PostgreSQL service → **Deployments** → View logs

### 6.3 Database Backups
Railway provides automatic backups, but you can also:
```bash
# Backup manually
railway run pg_dump $DATABASE_URL > backup.sql
```

### 6.4 Update Database Schema
After schema changes:
```bash
# Option 1: Using Railway
railway run npx prisma db push

# Option 2: Using local connection
# Set DATABASE_URL to Railway's connection string
npx prisma db push
```

---

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should be 18+)

### Database Connection Errors
- Verify `DATABASE_URL` is correct in Vercel
- Check Railway database is running
- Ensure IP allowlist (Railway usually allows all)

### Authentication Not Working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and retry

### Cron Job Not Running
- Check Vercel Dashboard → Crons
- Verify `vercel.json` is committed
- Check cron endpoint logs in Vercel

### Images Not Loading
- Verify Cloudinary configuration
- Check image upload API route
- Verify CORS settings

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Build locally
npm run build

# Database operations
npx prisma db push          # Push schema changes
npx prisma generate         # Generate Prisma Client
npx prisma studio          # Open database GUI

# Railway CLI
railway login
railway link
railway run <command>

# Vercel CLI
vercel login
vercel link
vercel deploy
vercel env pull
```

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## Cost Estimate (Free Tier)

- **Vercel:** Free tier includes:
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless functions
  - Cron jobs
  
- **Railway:** Free tier includes:
  - $5 credit/month
  - PostgreSQL database (sufficient for small-medium projects)
  - Automatic backups

**Note:** For production with high traffic, consider upgrading plans.

