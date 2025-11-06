# 🌱 Seed Database - Create Admin User

## ❌ Current Problem

Your Railway PostgreSQL `User` table is **EMPTY**. There are no admin users to login with, causing 401 errors when trying to access the admin dashboard.

---

## ✅ Quick Fix: Run Database Seed

The seed script will create:
- **Admin User:** `admin@shadiportal.com` / `admin123`
- **Vendor User:** `vendor@example.com` / `vendor123`

---

## 🚀 Option 1: Run Seed Script Locally (Recommended)

### Step 1: Set DATABASE_URL Environment Variable

**Windows PowerShell:**
```powershell
$env:DATABASE_URL="postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway"
```

**Windows CMD:**
```cmd
set DATABASE_URL=postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway
```

**Linux/Mac:**
```bash
export DATABASE_URL="postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway"
```

### Step 2: Run Seed Script

```bash
npm run db:seed
```

**Expected Output:**
```
🌱 Starting database seed...
✅ Admin user created: admin@shadiportal.com
✅ Vendor user created: vendor@example.com
✅ Homepage section created: hero
...
🎉 Database seeded successfully!
```

---

## 🚀 Option 2: Use Prisma Studio (Alternative)

### Step 1: Set DATABASE_URL (same as above)

### Step 2: Open Prisma Studio

```bash
npm run db:studio
```

### Step 3: Create Admin User Manually

1. Click on **User** table
2. Click **"+ Row"** button
3. Fill in:
   - **name:** `Admin User`
   - **email:** `admin@shadiportal.com`
   - **password:** (You need to hash this - use Option 1 instead!)
   - **role:** `ADMIN`
   - **isActive:** `true`

**Note:** You need to hash the password with bcrypt. Option 1 is easier!

---

## 🚀 Option 3: Create Admin via Railway CLI (If Available)

If you have Railway CLI installed:

```bash
railway run npm run db:seed
```

---

## ✅ After Seeding

### Test Login:

1. Go to: `https://wedding-and-events-dqi5-ten.vercel.app/auth/signin`
2. Login with:
   - **Email:** `admin@shadiportal.com`
   - **Password:** `admin123`
3. You should be redirected to `/admin` dashboard

---

## 🔍 Verify Users Were Created

### Option A: Railway Dashboard
- Go to Railway Dashboard
- Open your PostgreSQL database
- Check **User** table - should show:
  - `admin@shadiportal.com` (ADMIN role)
  - `vendor@example.com` (VENDOR role)

### Option B: Prisma Studio
```bash
npm run db:studio
```
- Open **User** table
- You should see the admin and vendor users

---

## 🆘 Troubleshooting

### Error: "Can't reach database server"

**Fix:** Make sure DATABASE_URL is correct and Railway database is running.

### Error: "Table doesn't exist"

**Fix:** Run schema migration first:
```bash
npm run db:push
npm run db:seed
```

### Still Getting 401 After Seeding?

1. **Verify users exist** in Railway database
2. **Check NEXTAUTH_SECRET** is set in Vercel
3. **Redeploy** Vercel after seeding
4. **Clear browser cache** and try again

---

## 📋 Quick Command Reference

```bash
# Set database URL (Windows PowerShell)
$env:DATABASE_URL="postgresql://postgres:bzMuzauvDMqaMaoLNFJksZdcPVjGJOqN@interchange.proxy.rlwy.net:28108/railway"

# Run seed script
npm run db:seed

# Verify with Prisma Studio
npm run db:studio
```

---

**Run the seed script now to create your admin user!** 🌱

