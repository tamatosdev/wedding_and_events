# ✅ Vercel Environment Variables Checklist

## ⚠️ Important: Don't Upload .env Files Directly!

**Never upload `.env` or `.env.local` directly to Vercel!**

Instead, manually add each variable in Vercel Dashboard:
- Go to **Settings** → **Environment Variables**
- Add variables one by one
- Select environments (Production, Preview, Development)

---

## 📋 Complete Checklist

### ✅ CRITICAL (App Won't Work Without These)

| Variable | Source | Notes |
|----------|--------|-------|
| `DATABASE_URL` | **Railway** | Copy from Railway PostgreSQL service → Variables tab |
| `NEXTAUTH_SECRET` | **Generate new** | Run: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | **Your Vercel URL** | `https://your-app.vercel.app` |

### ⚠️ IMPORTANT (Core Features)

| Variable | Required For | Status |
|----------|--------------|--------|
| `CLOUDINARY_CLOUD_NAME` | Image uploads | If using Cloudinary |
| `CLOUDINARY_API_KEY` | Image uploads | If using Cloudinary |
| `CLOUDINARY_API_SECRET` | Image uploads | If using Cloudinary |
| `SMTP_HOST` | Email sending | If using email features |
| `SMTP_PORT` | Email sending | Usually `587` |
| `SMTP_USER` | Email sending | Your email |
| `SMTP_PASS` | Email sending | App password (not regular password) |

### 📧 ADMIN & ESCALATION (Optional but Recommended)

| Variable | Purpose | Default/Example |
|----------|----------|-----------------|
| `ADMIN_EMAIL` | Admin contact | `admin@yourdomain.com` |
| `ADMIN_PHONE` | Admin contact | `+92-XXX-XXXXXXX` |
| `ADMIN_NAME` | Admin name | `Admin Portal` |
| `CUSTOMER_SUPPORT_EMAIL` | Escalation Level 1 | `support@yourdomain.com` |
| `CUSTOMER_SUPPORT_WHATSAPP` | Escalation Level 1 | `+923001234567` |
| `MANAGER_EMAIL` | Escalation Level 2 | `manager@yourdomain.com` |
| `MANAGER_WHATSAPP` | Escalation Level 2 | `+923001234568` |
| `CEO_EMAIL` | Escalation Level 3 | `ceo@yourdomain.com` |
| `CEO_WHATSAPP` | Escalation Level 3 | `+923001234569` |

### 📱 WHATSAPP (Optional - Only if using WhatsApp)

| Variable | Required If | Notes |
|----------|-------------|-------|
| `WHATSAPP_PROVIDER` | Using WhatsApp | Options: `twilio` or `whatsapp-business` |
| `TWILIO_ACCOUNT_SID` | Using Twilio | Get from Twilio dashboard |
| `TWILIO_AUTH_TOKEN` | Using Twilio | Get from Twilio dashboard |
| `TWILIO_WHATSAPP_NUMBER` | Using Twilio | Format: `whatsapp:+14155238886` |
| `WHATSAPP_ACCESS_TOKEN` | Using WhatsApp Business | Get from Meta |
| `WHATSAPP_PHONE_NUMBER_ID` | Using WhatsApp Business | Get from Meta |

### 🔒 SECURITY (Optional but Recommended)

| Variable | Purpose | How to Generate |
|----------|---------|-----------------|
| `CRON_SECRET` | Protect cron endpoint | `openssl rand -hex 32` |

---

## 🎯 Quick Setup Guide

### Step 1: Check Your Local .env

Look at your `.env.local` file (or `.env`) and verify you have values for these:

```bash
# Copy these values (you'll need to update some for production)
DATABASE_URL=          # ⚠️ UPDATE: Use Railway URL
NEXTAUTH_SECRET=       # ✅ Use same or generate new
NEXTAUTH_URL=          # ⚠️ UPDATE: Use Vercel URL
CLOUDINARY_*=          # ✅ Copy if using
SMTP_*=                # ✅ Copy if using
ADMIN_*=               # ✅ Copy or update
CUSTOMER_SUPPORT_*=    # ✅ Copy or update
MANAGER_*=             # ✅ Copy or update
CEO_*=                 # ✅ Copy or update
WHATSAPP_*=            # ✅ Copy if using
CRON_SECRET=           # ✅ Generate new or use existing
```

### Step 2: Values That MUST Be Updated

Before adding to Vercel, these need production values:

1. **`DATABASE_URL`**
   - ❌ Don't use: `postgresql://postgres:password@localhost:5432/shadi_portal`
   - ✅ Use: Railway connection string from Railway dashboard

2. **`NEXTAUTH_URL`**
   - ❌ Don't use: `http://localhost:3000`
   - ✅ Use: `https://your-app.vercel.app` (your actual Vercel URL)

### Step 3: Generate Missing Secrets

If you don't have these, generate them:

```bash
# NEXTAUTH_SECRET (32+ characters)
openssl rand -base64 32

# CRON_SECRET (random hex)
openssl rand -hex 32
```

### Step 4: Add to Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Click **"Add New"** for each variable
3. **Important:** Select environments:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

---

## ✅ Minimum Required for App to Work

At minimum, you need these 3:

```
DATABASE_URL=<from Railway>
NEXTAUTH_SECRET=<generate new>
NEXTAUTH_URL=https://your-app.vercel.app
```

**Without these, your app will fail to deploy or won't work properly!**

---

## 📝 What to Copy from Your .env

From your `env.example`, you have ALL the variables listed. Here's what to do:

### ✅ Copy These (Keep Same Values):
- Cloudinary credentials (if you use them)
- SMTP settings (if you use email)
- Admin contact info
- Escalation emails/WhatsApp numbers
- WhatsApp provider settings (if using)
- CRON_SECRET (or generate new)

### ⚠️ Update These (Production Values):
- `DATABASE_URL` → Railway connection string
- `NEXTAUTH_URL` → Your Vercel URL
- `NEXTAUTH_SECRET` → Generate fresh one (recommended)

---

## 🚀 Quick Add Script (Manual Process)

Since Vercel doesn't support bulk upload, here's the order to add:

### Priority 1 (Do First):
1. `DATABASE_URL` (from Railway)
2. `NEXTAUTH_SECRET` (generate: `openssl rand -base64 32`)
3. `NEXTAUTH_URL` (your Vercel URL)

### Priority 2 (Core Features):
4. `CLOUDINARY_CLOUD_NAME`
5. `CLOUDINARY_API_KEY`
6. `CLOUDINARY_API_SECRET`
7. `SMTP_HOST`
8. `SMTP_PORT`
9. `SMTP_USER`
10. `SMTP_PASS`

### Priority 3 (Admin & Escalation):
11. `ADMIN_EMAIL`
12. `ADMIN_PHONE`
13. `ADMIN_NAME`
14. `CUSTOMER_SUPPORT_EMAIL`
15. `CUSTOMER_SUPPORT_WHATSAPP`
16. `MANAGER_EMAIL`
17. `MANAGER_WHATSAPP`
18. `CEO_EMAIL`
19. `CEO_WHATSAPP`

### Priority 4 (Optional):
20. `WHATSAPP_PROVIDER`
21. `TWILIO_*` (if using Twilio)
22. `WHATSAPP_ACCESS_TOKEN` (if using WhatsApp Business)
23. `WHATSAPP_PHONE_NUMBER_ID` (if using WhatsApp Business)
24. `CRON_SECRET`

---

## 🔍 Verification

After adding all variables:

1. ✅ Check Vercel Dashboard shows all variables
2. ✅ Deploy your app
3. ✅ Check build logs for errors
4. ✅ Test API routes: `/api/vendors`
5. ✅ Test authentication: `/auth/signin`

---

## 💡 Pro Tips

- **Generate new secrets for production** (don't reuse dev secrets)
- **Use different NEXTAUTH_SECRET for production**
- **Update NEXTAUTH_URL after deployment** (once you know your Vercel URL)
- **Test each feature** after deployment to ensure env vars work
- **Keep a backup** of your production env vars (securely stored)

---

## ❓ FAQ

**Q: Can I use the same values from my local .env?**
A: Yes, except `DATABASE_URL` (use Railway) and `NEXTAUTH_URL` (use Vercel URL)

**Q: Do I need all variables?**
A: No, only `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` are critical. Others depend on features you use.

**Q: Can I bulk import?**
A: No, Vercel requires manual entry. But it's quick - just copy from your .env one by one.

**Q: What if I forget a variable?**
A: The app will error. Check Vercel build logs to see which variable is missing.

---

**Ready? Start with the 3 critical variables, then add the rest!** 🚀

