# FIX_AUTH_ERRORS.md

## 🔧 Fixing 401 Unauthorized Errors

The 401 errors you're seeing are related to authentication failures, which are typically caused by database connection issues.

### Error Analysis

```
Failed to load resource: the server responded with a status of 401 (Unauthorized)
/api/auth/callback/credentials:1
```

**Root Cause:** NextAuth is trying to authenticate but can't connect to the database, or the database connection is failing.

---

## ✅ Solution Steps

### Step 1: Check Database Connection

The error shows it's trying to connect to `localhost:5433`. Check your `DATABASE_URL`:

#### Option A: Using Local Database (Docker)

If you want to use local database:

```powershell
# Start Docker containers
docker-compose up -d

# Verify database is running
docker ps

# Check DATABASE_URL is set correctly
$env:DATABASE_URL
```

Should be:
```
postgresql://postgres:password@localhost:5433/shadi_portal
```

#### Option B: Using Railway Database

If you're using Railway database:

1. **Get Railway DATABASE_URL:**
   - Go to Railway Dashboard → PostgreSQL → Variables
   - Copy the `DATABASE_URL` (should look like: `postgresql://postgres:password@monorail.proxy.rlwy.net:5432/railway`)

2. **Set in PowerShell:**
   ```powershell
   $env:DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@monorail.proxy.rlwy.net:5432/railway"
   ```

3. **Verify connection:**
   ```powershell
   npx prisma db pull
   ```

### Step 2: Verify .env.local File

Check if `.env.local` exists and has correct `DATABASE_URL`:

```powershell
# Check if file exists
Test-Path .env.local

# View contents (be careful not to expose secrets)
Get-Content .env.local
```

**Required variables:**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5433/shadi_portal
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### Step 3: Run Prisma Commands

```powershell
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database (creates demo users)
npm run db:seed
```

### Step 4: Restart Development Server

```powershell
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

---

## 🔍 Troubleshooting

### Issue: "Can't reach database server at localhost:5433"

**Solution:**
- Start Docker: `docker-compose up -d`
- Or use Railway database URL instead

### Issue: "P1001: Can't reach database server"

**Solution:**
- Check if database is running
- Verify DATABASE_URL format
- Ensure port is correct (5433 for local Docker, 5432 for Railway)

### Issue: Still getting 401 errors after fixing database

**Possible causes:**
1. **Wrong NEXTAUTH_SECRET:** Generate a new one:
   ```powershell
   # Generate random secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Add to `.env.local` as `NEXTAUTH_SECRET`

2. **Database not seeded:** Run `npm run db:seed` to create demo users

3. **Wrong credentials:** Use demo accounts:
   - Admin: `admin@shadiportal.com` / `admin123`
   - Vendor: `vendor@example.com` / `vendor123`

---

## 🚀 Quick Fix Commands

### For Local Development:

```powershell
# 1. Start database
docker-compose up -d

# 2. Set environment variable
$env:DATABASE_URL="postgresql://postgres:password@localhost:5433/shadi_portal"

# 3. Setup database
npx prisma generate
npx prisma db push
npm run db:seed

# 4. Restart dev server
npm run dev
```

### For Railway Database:

```powershell
# 1. Get DATABASE_URL from Railway dashboard
# 2. Set environment variable
$env:DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@monorail.proxy.rlwy.net:5432/railway"

# 3. Setup database
npx prisma generate
npx prisma db push
npm run db:seed

# 4. Restart dev server
npm run dev
```

---

## 📝 Verify Setup

After fixing, test:

1. **Database connection:**
   ```powershell
   npx prisma studio
   ```
   Should open browser at `http://localhost:5555`

2. **Login functionality:**
   - Go to `/auth/signin`
   - Try logging in with: `admin@shadiportal.com` / `admin123`
   - Should not see 401 errors

3. **Check console:**
   - No database connection errors
   - No 401 errors in network tab

---

## ⚠️ Important Notes

1. **Never commit `.env.local`** - It contains sensitive data
2. **Use Railway public URL** - Not internal URL for local development
3. **Restart dev server** after changing environment variables
4. **Clear browser cache** if auth errors persist

---

## 🆘 Still Having Issues?

1. Check database logs:
   ```powershell
   docker-compose logs postgres
   ```

2. Verify Prisma schema:
   ```powershell
   npx prisma validate
   ```

3. Check NextAuth configuration:
   - Verify `lib/auth.ts` exists
   - Check `NEXTAUTH_SECRET` is set
   - Ensure `NEXTAUTH_URL` matches your dev URL

4. Clear Next.js cache:
   ```powershell
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

