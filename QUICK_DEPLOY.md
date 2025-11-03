# Quick Deployment Guide

Follow these steps in order to deploy to production.

## 🚀 Step-by-Step Deployment

### 1️⃣ Set Up Railway Database (5 minutes)

1. Go to [railway.app](https://railway.app) and sign up
2. Click **"New Project"** → **"Empty Project"**
3. Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
4. Wait for database to provision
5. Click on PostgreSQL service → **"Variables"** tab
6. Copy the `DATABASE_URL` - **SAVE THIS!**

### 2️⃣ Push Database Schema

```bash
# Set DATABASE_URL temporarily
export DATABASE_URL="postgresql://postgres:password@host:port/railway"

# Or create .env.production file with DATABASE_URL

# Push schema
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

**OR use Railway CLI:**
```bash
npm i -g @railway/cli
railway login
railway link
railway run npx prisma db push
railway run npx prisma generate
```

### 3️⃣ Deploy to Vercel (10 minutes)

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Click **"Deploy"** (skip environment variables for now)

### 4️⃣ Configure Environment Variables

In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**:

1. Click **"Add New"**
2. Add each variable from `.env.production.example`
3. **Important:** Set `NEXTAUTH_URL` to your Vercel URL: `https://your-project.vercel.app`
4. **Generate secrets:**
   ```bash
   # Generate NEXTAUTH_SECRET
   openssl rand -base64 32
   
   # Generate CRON_SECRET
   openssl rand -hex 32
   ```

### 5️⃣ Redeploy

1. Go to **Deployments** tab in Vercel
2. Click **"..."** on latest deployment → **"Redeploy"**
3. Wait for build to complete

### 6️⃣ Verify Deployment

1. Visit your Vercel URL
2. Test sign up / sign in
3. Check admin dashboard
4. Test contact form
5. Verify cron job in Vercel Dashboard → **Crons**

### 7️⃣ (Optional) Custom Domain

1. In Vercel → **Settings** → **Domains**
2. Add your domain
3. Follow DNS instructions
4. Update `NEXTAUTH_URL` environment variable
5. Redeploy

---

## ✅ Checklist Before Going Live

- [ ] Railway database is running and accessible
- [ ] Database schema is pushed (`prisma db push`)
- [ ] All environment variables set in Vercel
- [ ] `NEXTAUTH_URL` matches your domain
- [ ] `NEXTAUTH_SECRET` is set
- [ ] Cloudinary credentials are correct
- [ ] Email SMTP is configured
- [ ] WhatsApp/Twilio is configured (if using)
- [ ] Cron job is enabled (check Vercel → Crons)
- [ ] Tested authentication flow
- [ ] Tested vendor submission
- [ ] Tested admin access
- [ ] Tested contact form

---

## 🔧 Troubleshooting

**Build fails?**
- Check Vercel build logs
- Ensure `DATABASE_URL` is set
- Verify Node.js version (should be 18+)

**Database errors?**
- Verify `DATABASE_URL` is correct
- Check Railway database is running
- Try: `railway run npx prisma db push`

**Auth not working?**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies

**Cron not running?**
- Check Vercel Dashboard → Crons
- Verify `vercel.json` is committed
- Check cron endpoint logs

---

## 📞 Need Help?

- Check full guide: `DEPLOYMENT.md`
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app

