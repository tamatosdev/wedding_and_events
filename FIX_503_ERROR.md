# 🔧 Fix 503 Service Unavailable Errors

## ❌ The Problem

Your Vercel deployment is showing **503 errors** on `/api/vendors` endpoints:

```
/api/vendors?category=Photography: 503 Service Unavailable
/api/vendors?category=Fashion: 503 Service Unavailable
/api/vendors?category=Catering: 503 Service Unavailable
```

**503 = Service Unavailable** - This usually means the database connection is failing.

---

## ✅ The Solution

### Step 1: Check Vercel Environment Variables

The most common cause is **missing or incorrect `DATABASE_URL` in Vercel**.

1. **Go to Vercel Dashboard:**
   - https://vercel.com
   - Open your project: `wedding-and-events-dqi5-ten`

2. **Check Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Look for `DATABASE_URL`

3. **Verify it's set correctly:**
   - Should be: `postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway`
   - Make sure it's for **Production** environment

### Step 2: Add/Update DATABASE_URL in Vercel

If it's missing or wrong:

1. **Add/Edit Environment Variable:**
   - Key: `DATABASE_URL`
   - Value: `postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

2. **Redeploy:**
   - Go to **Deployments** tab
   - Click the **three dots** (⋯) on latest deployment
   - Click **Redeploy**
   - OR push a new commit to trigger redeploy

---

## 🔍 Other Possible Causes

### Cause 1: Railway Database Not Accessible

**Check Railway:**
1. Go to Railway Dashboard
2. Check if PostgreSQL service is **Running** (green status)
3. If paused/stopped, restart it

### Cause 2: Railway Database Port/URL Changed

**Solution:**
1. Go to Railway → PostgreSQL → Variables
2. Copy **fresh `DATABASE_URL`**
3. Update in Vercel environment variables
4. Redeploy

### Cause 3: Database Connection Pool Exhausted

**Solution:**
- Railway free tier has connection limits
- If you have many concurrent requests, you might hit the limit
- Consider upgrading Railway plan or optimizing database queries

### Cause 4: Network/Firewall Issues

**Solution:**
- Railway's public URLs should work from Vercel
- If using private network, enable public networking in Railway

---

## 🧪 Test Database Connection

### From Vercel Logs:

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** tab
3. Click on the latest deployment
4. Check **Build Logs** for errors
5. Look for database connection errors

### Check Vercel Function Logs:

1. Go to **Functions** tab in Vercel
2. Look for `/api/vendors` function
3. Check recent invocations for errors
4. Look for error messages like:
   - "Can't reach database server"
   - "Connection timeout"
   - "Authentication failed"

---

## 🎯 Quick Fix Checklist

- [ ] Check Vercel environment variables has `DATABASE_URL`
- [ ] Verify `DATABASE_URL` is correct (matches Railway)
- [ ] Ensure `DATABASE_URL` is set for Production environment
- [ ] Redeploy Vercel after adding/updating variables
- [ ] Check Railway database is running
- [ ] Verify Railway database is accessible (public network enabled)
- [ ] Check Vercel build/deployment logs for errors

---

## 💡 Common Issues & Solutions

### Issue: "DATABASE_URL not found"

**Solution:**
```bash
# Add to Vercel:
# Key: DATABASE_URL
# Value: postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway
```

### Issue: "Can't reach database server"

**Check:**
- Railway database is running
- DATABASE_URL uses public URL (`interchange.proxy.rlwy.net`)
- Not using internal URL (`postgres.railway.internal`)

### Issue: "Authentication failed"

**Solution:**
- Get fresh DATABASE_URL from Railway Variables tab
- Password might have changed

---

## 🚀 Step-by-Step Fix

1. **Get DATABASE_URL from Railway:**
   ```
   postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway
   ```

2. **Add to Vercel:**
   - Settings → Environment Variables
   - Add `DATABASE_URL` with Railway URL
   - Select all environments

3. **Redeploy:**
   - Go to Deployments
   - Click Redeploy on latest deployment

4. **Wait 2-3 minutes** for deployment to complete

5. **Test:**
   - Visit: `https://wedding-and-events-dqi5-ten.vercel.app/api/vendors`
   - Should return JSON (not 503 error)

---

## 📋 Verify Setup

After fixing, check:

✅ Vercel has `DATABASE_URL` environment variable  
✅ Railway database is running  
✅ Vercel deployment succeeds  
✅ API routes return data (not 503)  

---

## 🆘 Still Getting 503?

### Check Vercel Function Logs:

1. Vercel Dashboard → Project → **Functions**
2. Click on `/api/vendors` function
3. Check **Logs** tab for error details

### Common Error Messages:

- `P1001: Can't reach database server`
  → DATABASE_URL incorrect or database not running
  
- `P1000: Authentication failed`
  → Wrong password in DATABASE_URL
  
- `Connection timeout`
  → Database might be paused or network issue

---

**Most likely fix: Add DATABASE_URL to Vercel environment variables and redeploy!** 🎯

