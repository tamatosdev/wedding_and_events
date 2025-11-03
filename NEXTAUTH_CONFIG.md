# 🔐 NextAuth Configuration for Production

## Generated Secrets

### NEXTAUTH_SECRET

Copy this generated secret (keep it secure!):

```env
NEXTAUTH_SECRET=<generated-below>
```

**Important:**
- Use a **different secret** for production than development
- Keep this secret secure and never commit it to Git
- If compromised, generate a new one and update all environments

---

## NEXTAUTH_URL

### For Local Development:
```env
NEXTAUTH_URL=http://localhost:3000
```

### For Production (Vercel):
```env
NEXTAUTH_URL=https://your-app-name.vercel.app
```

**How to get your Vercel URL:**
1. Deploy your app to Vercel
2. Vercel will assign a URL like: `https://wedding-and-events.vercel.app`
3. Use that exact URL for `NEXTAUTH_URL`

**If you have a custom domain:**
```env
NEXTAUTH_URL=https://yourdomain.com
```

---

## 🔄 How to Generate New Secrets

### NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### Alternative (if openssl not available):
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# PowerShell (Windows)
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

### CRON_SECRET (if needed):
```bash
openssl rand -hex 32
```

---

## ✅ Quick Setup for Vercel

### Step 1: Add to Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add these:

   **NEXTAUTH_SECRET:**
   ```
   Key: NEXTAUTH_SECRET
   Value: <paste-generated-secret-below>
   Environments: Production, Preview, Development
   ```

   **NEXTAUTH_URL (after first deployment):**
   ```
   Key: NEXTAUTH_URL
   Value: https://your-app-name.vercel.app
   Environments: Production, Preview
   ```

   For Development:
   ```
   Key: NEXTAUTH_URL
   Value: http://localhost:3000
   Environment: Development
   ```

### Step 2: Update After First Deployment

1. After first deployment, Vercel will show your URL
2. Update `NEXTAUTH_URL` in Vercel to match your actual deployment URL
3. Redeploy if needed

---

## 🎯 Complete Example

```env
# Production
NEXTAUTH_SECRET=<generated-secret-below>
NEXTAUTH_URL=https://wedding-and-events.vercel.app

# Development (local)
NEXTAUTH_SECRET=<different-secret>
NEXTAUTH_URL=http://localhost:3000
```

---

## ⚠️ Important Notes

1. **Never reuse secrets** between environments
2. **Generate new secret** for production (don't use dev secret)
3. **Update NEXTAUTH_URL** after you know your Vercel deployment URL
4. **If you change domains**, update NEXTAUTH_URL accordingly
5. **Keep secrets secure** - never commit to Git

---

## 🔍 Verification

After setting up:

1. ✅ Deploy to Vercel
2. ✅ Check build succeeds
3. ✅ Try signing in: `/auth/signin`
4. ✅ Check browser console for auth errors
5. ✅ Verify sessions work across page navigation

---

**Ready! Use the generated secret below!** 🔐

