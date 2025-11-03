# 📋 Get Railway DATABASE_URL

## Your Database is Running! ✅

The logs confirm PostgreSQL 17.6 is running and ready.

## Next Steps:

### 1. Copy DATABASE_URL from Railway

1. **Go to Railway Dashboard:**
   - https://railway.app
   - Open your project

2. **Navigate to PostgreSQL Service:**
   - Click on the **PostgreSQL** service card

3. **Get the Connection String:**
   - Click the **"Variables"** tab
   - Find `DATABASE_URL` in the list
   - Click **"Reveal"** if it's hidden
   - Click the **copy icon** (📋) next to `DATABASE_URL`
   - **Copy the ENTIRE string**

4. **What it looks like:**
   ```
   postgresql://postgres:your_password@monorail.proxy.rlwy.net:5432/railway
   ```
   
   **It's ONE long string, NOT the template format!**

---

### 2. Alternative: Get from Railway Service Settings

If you can't find it in Variables tab:

1. Click on PostgreSQL service
2. Go to **"Data"** tab
3. Look for **"Connect"** or **"Connection"** section
4. There should be a connection string there
5. Copy the full `postgresql://...` string

---

### 3. Verify Your DATABASE_URL Format

✅ **CORRECT Format:**
```
postgresql://postgres:PASSWORD@HOST:5432/DATABASE
```

❌ **WRONG (Template - Don't use this):**
```
postgresql://${{PGUSER}}:${{POSTGRES_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:5432/${{PGDATABASE}}
```

---

### 4. Test Connection (Optional)

You can test the connection locally before adding to Vercel:

```bash
# Create a test .env file (don't commit this!)
echo "DATABASE_URL=your-copied-railway-url" > .env.test

# Test connection
npx prisma db pull --schema=prisma/schema.prisma
```

If this works, your DATABASE_URL is correct!

---

### 5. Next: Add to Vercel

Once you have the DATABASE_URL:

1. Go to **Vercel Dashboard**
2. Open your project
3. **Settings** → **Environment Variables**
4. Add `DATABASE_URL` with the value from Railway
5. Select all environments (Production, Preview, Development)
6. **Save**
7. **Redeploy** your app

---

## 🎯 Quick Checklist

- [ ] Railway database is running ✅ (Confirmed from your logs)
- [ ] Opened Railway Dashboard
- [ ] Clicked on PostgreSQL service
- [ ] Went to "Variables" tab
- [ ] Copied `DATABASE_URL` (full connection string)
- [ ] Ready to add to Vercel environment variables

---

**Need help?** If you can't find the DATABASE_URL, check:
- Railway project → PostgreSQL service → Variables tab
- Make sure you're looking at the right project
- The string should start with `postgresql://`

