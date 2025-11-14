# 🚀 Complete Vercel Deployment Guide

## ✅ Step 1: Database Seeded Successfully!

Your Railway database has been seeded with:
- ✅ Admin user: `admin@shadiportal.com` / `admin123`
- ✅ Vendor user: `vendor@example.com` / `vendor123`
- ✅ Homepage CMS content
- ✅ Sample vendors
- ✅ Sample inquiries

---

## 📋 Step 2: Deploy to Vercel

### 2.1: Import Your Repository

1. **Go to Vercel:** https://vercel.com
2. **Sign in** with your GitHub account
3. **Click "Add New"** → **"Project"**
4. **Import your repository:**
   - Find `wedding_and_events` (or your repo name)
   - Click **"Import"**
5. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

### 2.2: Add Environment Variables (BEFORE DEPLOYING)

**⚠️ IMPORTANT:** Add all environment variables BEFORE clicking "Deploy"!

1. **In the import screen, click "Environment Variables"** (or go to Settings → Environment Variables after import)
2. **Add each variable one by one** (click "Add New" for each)

---

## 🔐 Step 3: Environment Variables Configuration

### Priority 1: CRITICAL (App Won't Work Without These)

#### 1. DATABASE_URL
```
Key: DATABASE_URL
Value: postgresql://postgres:OMiRXXxXqQJCsXgjNFNKGhFeGqqRODCW@metro.proxy.rlwy.net:43505/railway
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 2. NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: qU0NDONxIVJQvzG2cCCOQA32Z+L72jGSHnastCcFdms=
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 3. NEXTAUTH_URL
```
Key: NEXTAUTH_URL
Value: https://your-app-name.vercel.app
Environments: ✅ Production, ✅ Preview
```
**Note:** Replace `your-app-name` with your actual Vercel project name. You'll see it after first deployment.

**For Development environment:**
```
Key: NEXTAUTH_URL
Value: http://localhost:3000
Environment: ✅ Development
```

---

### Priority 2: Core Features (Image Uploads & Email)

#### 4. CLOUDINARY_CLOUD_NAME
```
Key: CLOUDINARY_CLOUD_NAME
Value: [Your Cloudinary cloud name]
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 5. CLOUDINARY_API_KEY
```
Key: CLOUDINARY_API_KEY
Value: [Your Cloudinary API key]
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 6. CLOUDINARY_API_SECRET
```
Key: CLOUDINARY_API_SECRET
Value: [Your Cloudinary API secret]
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 7. SMTP_HOST
```
Key: SMTP_HOST
Value: smtp.gmail.com
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 8. SMTP_PORT
```
Key: SMTP_PORT
Value: 587
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 9. SMTP_USER
```
Key: SMTP_USER
Value: [Your email address]
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 10. SMTP_PASS
```
Key: SMTP_PASS
Value: [Your Gmail app password]
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Note:** Use Gmail App Password, not your regular password. Generate at: https://myaccount.google.com/apppasswords

---

### Priority 3: Admin & Contact Information

#### 11. ADMIN_EMAIL
```
Key: ADMIN_EMAIL
Value: admin@shadiportal.com
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 12. ADMIN_PHONE
```
Key: ADMIN_PHONE
Value: +92-XXX-XXXXXXX
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 13. ADMIN_NAME
```
Key: ADMIN_NAME
Value: Admin Portal
Environments: ✅ Production, ✅ Preview, ✅ Development
```

---

### Priority 4: Query Escalation System

#### 14. CUSTOMER_SUPPORT_EMAIL
```
Key: CUSTOMER_SUPPORT_EMAIL
Value: support@shadiportal.com
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 15. CUSTOMER_SUPPORT_WHATSAPP
```
Key: CUSTOMER_SUPPORT_WHATSAPP
Value: +923001234567
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 16. MANAGER_EMAIL
```
Key: MANAGER_EMAIL
Value: manager@shadiportal.com
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 17. MANAGER_WHATSAPP
```
Key: MANAGER_WHATSAPP
Value: +923001234568
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 18. CEO_EMAIL
```
Key: CEO_EMAIL
Value: ceo@shadiportal.com
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 19. CEO_WHATSAPP
```
Key: CEO_WHATSAPP
Value: +923001234569
Environments: ✅ Production, ✅ Preview, ✅ Development
```

---

### Priority 5: WhatsApp Configuration

#### 20. NEXT_PUBLIC_WHATSAPP_NUMBER
```
Key: NEXT_PUBLIC_WHATSAPP_NUMBER
Value: 923001234567
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Note:** Format: Country code + number without + or spaces (e.g., 923001234567 for Pakistan)

#### 21. WHATSAPP_PROVIDER
```
Key: WHATSAPP_PROVIDER
Value: twilio
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 22. TWILIO_ACCOUNT_SID
```
Key: TWILIO_ACCOUNT_SID
Value: [Your Twilio Account SID]
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 23. TWILIO_AUTH_TOKEN
```
Key: TWILIO_AUTH_TOKEN
Value: [Your Twilio Auth Token]
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 24. TWILIO_WHATSAPP_NUMBER
```
Key: TWILIO_WHATSAPP_NUMBER
Value: whatsapp:+14155238886
Environments: ✅ Production, ✅ Preview, ✅ Development
```

---

### Priority 6: Security & Cron Jobs

#### 25. CRON_SECRET
```
Key: CRON_SECRET
Value: [Generate random string]
Environments: ✅ Production, ✅ Preview, ✅ Development
```

**Generate CRON_SECRET:**
```bash
# PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})

# Or use online generator
```

---

## 🎯 Quick Copy-Paste Checklist

Copy these values directly to Vercel:

### Critical (Must Have):
```
DATABASE_URL=postgresql://postgres:OMiRXXxXqQJCsXgjNFNKGhFeGqqRODCW@metro.proxy.rlwy.net:43505/railway
NEXTAUTH_SECRET=qU0NDONxIVJQvzG2cCCOQA32Z+L72jGSHnastCcFdms=
NEXTAUTH_URL=https://your-app-name.vercel.app
```

### Update These With Your Values:
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- SMTP_USER, SMTP_PASS
- ADMIN_PHONE, CUSTOMER_SUPPORT_WHATSAPP, MANAGER_WHATSAPP, CEO_WHATSAPP
- TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
- CRON_SECRET

---

## 📝 Step 4: Deploy

1. **After adding all environment variables, click "Deploy"**
2. **Wait for build to complete** (~3-5 minutes)
3. **Your app will be live at:** `https://your-project-name.vercel.app`

---

## 🔄 Step 5: Update NEXTAUTH_URL After Deployment

1. **After first deployment, Vercel will show your URL**
2. **Go to Settings → Environment Variables**
3. **Find `NEXTAUTH_URL`**
4. **Click "Edit"**
5. **Update value to your actual Vercel URL:**
   ```
   https://your-actual-project-name.vercel.app
   ```
6. **Save**
7. **Redeploy:**
   - Go to **Deployments** tab
   - Click **⋯** on latest deployment
   - Click **"Redeploy"**

---

## ✅ Step 6: Verify Deployment

### Test Your Deployment:

1. **Visit your app:** `https://your-app.vercel.app`
2. **Test admin login:**
   - Go to: `https://your-app.vercel.app/auth/signin`
   - Email: `admin@shadiportal.com`
   - Password: `admin123`
3. **Check admin dashboard:** `https://your-app.vercel.app/admin`
4. **Test homepage:** Should show CMS content
5. **Test vendor pages:** Should show seeded vendors

### Check for Errors:

1. **Vercel Dashboard → Functions tab**
   - Check for any function errors
2. **Vercel Dashboard → Logs**
   - Check for runtime errors
3. **Browser Console (F12)**
   - Check for client-side errors

---

## 🆘 Troubleshooting

### Problem: Build Fails
**Solution:**
- Check build logs in Vercel
- Ensure all required environment variables are set
- Check that `DATABASE_URL` is correct

### Problem: 401 Authentication Error
**Solution:**
- Verify `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your actual Vercel URL
- Redeploy after adding variables

### Problem: Database Connection Error
**Solution:**
- Verify `DATABASE_URL` is correct (use `DATABASE_PUBLIC_URL` from Railway)
- Check Railway database is running
- Verify database is accessible from external IPs

### Problem: Images Not Uploading
**Solution:**
- Verify Cloudinary credentials are set
- Check Cloudinary dashboard for API keys

### Problem: Emails Not Sending
**Solution:**
- Verify SMTP credentials
- Use Gmail App Password (not regular password)
- Check SMTP_HOST and SMTP_PORT are correct

---

## 📊 Environment Variables Summary

| Category | Variables | Required |
|----------|-----------|----------|
| **Database** | DATABASE_URL | ✅ Yes |
| **Authentication** | NEXTAUTH_SECRET, NEXTAUTH_URL | ✅ Yes |
| **Images** | CLOUDINARY_* (3 vars) | ⚠️ If using uploads |
| **Email** | SMTP_* (4 vars) | ⚠️ If using email |
| **Admin** | ADMIN_* (3 vars) | ⚠️ Recommended |
| **Escalation** | CUSTOMER_SUPPORT_*, MANAGER_*, CEO_* (6 vars) | ⚠️ Recommended |
| **WhatsApp** | WHATSAPP_*, TWILIO_* (5 vars) | ⚠️ If using WhatsApp |
| **Security** | CRON_SECRET | ⚠️ If using cron jobs |

**Minimum Required:** 3 variables (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] App loads at Vercel URL
- [ ] Admin login works (`admin@shadiportal.com` / `admin123`)
- [ ] Homepage shows CMS content
- [ ] Vendors are visible
- [ ] Image uploads work (if Cloudinary configured)
- [ ] Forms submit successfully
- [ ] No console errors
- [ ] No Vercel function errors

---

## 📞 Next Steps

1. ✅ Database seeded
2. ✅ Vercel deployment configured
3. ⏭️ Deploy and test
4. ⏭️ Add custom domain (optional)
5. ⏭️ Configure monitoring (optional)

**Your app is ready to deploy!** 🚀

