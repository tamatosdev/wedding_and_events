# 🔐 Railway Database Connection Details

## ✅ Schema Pushed Successfully!

Your database schema has been pushed to Railway PostgreSQL.

---

## 🔑 Database Connection URLs

### For External Access (Your Local Machine / Vercel):
```
DATABASE_PUBLIC_URL=postgresql://postgres:OMiRXXxXqQJCsXgjNFNKGhFeGqqRODCW@metro.proxy.rlwy.net:43505/railway
```

### For Internal Access (Railway Services):
```
DATABASE_URL=postgresql://postgres:OMiRXXxXqQJCsXgjNFNKGhFeGqqRODCW@postgres.railway.internal:5432/railway
```

---

## 📋 Environment Variables Already Set in Railway

- ✅ `DATABASE_URL` (internal - for Railway services)
- ✅ `DATABASE_PUBLIC_URL` (external - for Vercel/local)
- ✅ `NEXTAUTH_SECRET`
- ✅ `NODE_ENV=production`

---

## 🚀 Next Steps

### Option 1: Deploy App on Railway

1. **Add Next.js Service:**
   - Go to Railway dashboard
   - Click "+ New" → "GitHub Repo"
   - Select your repository
   - Railway will auto-detect Next.js

2. **Set Environment Variables in Next.js Service:**
   - Railway will automatically provide `DATABASE_URL` (internal)
   - Add other required variables:
     ```bash
     railway service  # Select your Next.js service
     railway variables set NEXTAUTH_SECRET="qU0NDONxIVJQvzG2cCCOQA32Z+L72jGSHnastCcFdms="
     railway variables set NEXTAUTH_URL="https://your-app.railway.app"
     ```

3. **Deploy:**
   - Railway will auto-deploy on push to main branch
   - Or manually: `railway up`

### Option 2: Deploy App on Vercel (Recommended)

1. **Go to Vercel:** https://vercel.com
2. **Import your GitHub repository**
3. **Add Environment Variables:**
   - `DATABASE_URL` = `DATABASE_PUBLIC_URL` from Railway (the external one)
   - `NEXTAUTH_SECRET` = (same as Railway)
   - `NEXTAUTH_URL` = `https://your-app.vercel.app`
   - All other required variables

4. **Deploy!**

---

## 🌱 Seed Database (Optional)

If you want to add initial data:

```bash
# Using Railway CLI
railway service  # Select Postgres service
railway run npm run db:seed

# Or using local connection
$env:DATABASE_URL="postgresql://postgres:OMiRXXxXqQJCsXgjNFNKGhFeGqqRODCW@metro.proxy.rlwy.net:43505/railway"
npm run db:seed
```

---

## 🔒 Security Notes

⚠️ **Important:**
- Never commit `DATABASE_PUBLIC_URL` to git
- Keep passwords secure
- Use Railway's internal `DATABASE_URL` for services within Railway
- Use `DATABASE_PUBLIC_URL` only for external services (Vercel)

---

## ✅ Current Status

- ✅ PostgreSQL database running on Railway
- ✅ Database schema pushed successfully
- ✅ Prisma Client generated
- ✅ Environment variables configured
- ⏭️ Next: Deploy your Next.js app (Railway or Vercel)

---

**Your Railway database is ready!** 🎉

