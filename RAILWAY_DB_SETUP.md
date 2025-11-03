# 🗄️ Setup Railway Database Schema & Seed Data

## Your Railway Database is Empty - Let's Fix That!

Your PostgreSQL database is running on Railway, but it needs:
1. **Database Schema** (tables, relationships)
2. **Seed Data** (initial data for testing)

---

## Method 1: Using Railway CLI (Recommended)

### Step 1: Install Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Or on Windows (PowerShell)
iwr https://railway.app/install.sh | iex
```

### Step 2: Login to Railway

```bash
railway login
```

This will open your browser to authenticate.

### Step 3: Link Your Project

```bash
# Navigate to your project directory
cd D:\projects\wedding_and_events

# Link to Railway project
railway link
```

Select your Railway project when prompted.

### Step 4: Set Environment Variables

Railway CLI will automatically use your Railway database connection:

```bash
# Check if DATABASE_URL is set
railway variables
```

If `DATABASE_URL` is available, proceed. Otherwise:

```bash
# Get DATABASE_URL from Railway dashboard and set locally (temporary)
$env:DATABASE_URL="postgresql://postgres:password@host:5432/railway"
```

### Step 5: Push Schema to Railway

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to Railway database
npx prisma db push

# Or use Railway CLI (sets DATABASE_URL automatically)
railway run npx prisma db push
```

### Step 6: Seed the Database

```bash
# Seed with initial data
npx prisma db seed

# Or use Railway CLI
railway run npx prisma db seed
```

---

## Method 2: Using Local Environment Variable (Alternative)

### Step 1: Get DATABASE_URL from Railway

1. Go to **Railway Dashboard** → Your Project
2. Click on **PostgreSQL** service
3. Go to **Variables** tab
4. Copy `DATABASE_URL` (the full connection string)

### Step 2: Set DATABASE_URL Locally

**Windows PowerShell:**
```powershell
$env:DATABASE_URL="postgresql://postgres:password@monorail.proxy.rlwy.net:5432/railway"
```

**Windows CMD:**
```cmd
set DATABASE_URL=postgresql://postgres:password@monorail.proxy.rlwy.net:5432/railway
```

**Linux/Mac:**
```bash
export DATABASE_URL="postgresql://postgres:password@monorail.proxy.rlwy.net:5432/railway"
```

### Step 3: Run Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to Railway
npx prisma db push

# Seed database
npx prisma db seed
```

### Step 4: Verify Connection

```bash
# Open Prisma Studio (GUI for database)
npx prisma studio
```

This will open a browser at `http://localhost:5555` where you can see your database tables.

---

## Method 3: Create .env.production File

### Step 1: Create Production ENV File

Create `.env.production` file (this won't be committed to git):

```env
DATABASE_URL=postgresql://postgres:password@monorail.proxy.rlwy.net:5432/railway
```

**⚠️ Important:** Replace with your actual Railway DATABASE_URL!

### Step 2: Use Production ENV

```bash
# Load production env and run commands
# Windows PowerShell
$env:NODE_ENV="production"; npx prisma db push

# Or use dotenv-cli
npm install -g dotenv-cli
dotenv -e .env.production -- npx prisma db push
```

---

## Quick One-Liner (If DATABASE_URL is in Railway Variables)

If you have Railway CLI installed and linked:

```bash
railway run npx prisma generate && railway run npx prisma db push && railway run npx prisma db seed
```

---

## Step-by-Step Guide (Easiest Method)

### Option A: Using Railway Dashboard Variables

1. **Copy DATABASE_URL from Railway:**
   - Railway Dashboard → PostgreSQL → Variables → `DATABASE_URL`
   - Copy the full connection string

2. **Temporarily set in PowerShell:**
   ```powershell
   $env:DATABASE_URL="paste-your-railway-url-here"
   ```

3. **Run setup commands:**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Create tables in Railway
   npx prisma db push

   # Add initial data
   npx prisma db seed
   ```

4. **Verify it worked:**
   ```bash
   npx prisma studio
   ```
   Open http://localhost:5555 to see your tables

### Option B: Using Railway CLI

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Link project:**
   ```bash
   railway link
   ```

4. **Run setup:**
   ```bash
   railway run npx prisma generate
   railway run npx prisma db push
   railway run npx prisma db seed
   ```

---

## What These Commands Do

### `prisma generate`
- Generates Prisma Client based on your schema
- Creates TypeScript types for your database

### `prisma db push`
- **Pushes your schema to the database**
- Creates all tables, columns, relationships
- **This is what you need to create tables!**

### `prisma db seed`
- Runs `prisma/seed.ts`
- Adds initial data (users, sample vendors, etc.)

---

## Verify Database Setup

After running `prisma db push`, you should see:

```
✅ The database is now in sync with your Prisma schema.
```

Then check your database:

```bash
# Open Prisma Studio
npx prisma studio
```

You should see tables like:
- `User`
- `Vendor`
- `ContactQuery`
- `Inquiry`
- etc.

---

## Troubleshooting

### Error: "Can't reach database server"

**Solution:**
- Check Railway database is running
- Verify DATABASE_URL is correct
- Check if Railway database allows external connections

### Error: "Authentication failed"

**Solution:**
- Get fresh DATABASE_URL from Railway Variables tab
- Make sure password is correct (Railway generates it)

### Error: "Database does not exist"

**Solution:**
- Railway creates database automatically
- Just use the DATABASE_URL from Railway Variables
- Don't change the database name in the URL

### Error: "P1001: Can't reach database server"

**Solution:**
```bash
# Test connection first
railway run npx prisma db pull

# If this works, then try push
railway run npx prisma db push
```

---

## Complete Setup Script

Create a file `setup-railway-db.ps1` (PowerShell):

```powershell
# Setup Railway Database
Write-Host "Setting up Railway database..." -ForegroundColor Green

# Step 1: Get DATABASE_URL (paste your Railway URL here)
$DATABASE_URL = Read-Host "Paste your Railway DATABASE_URL"

# Set environment variable
$env:DATABASE_URL = $DATABASE_URL

# Step 2: Generate Prisma Client
Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

# Step 3: Push schema
Write-Host "Pushing schema to Railway..." -ForegroundColor Yellow
npx prisma db push

# Step 4: Seed database
Write-Host "Seeding database..." -ForegroundColor Yellow
npx prisma db seed

Write-Host "✅ Database setup complete!" -ForegroundColor Green
Write-Host "Opening Prisma Studio..." -ForegroundColor Yellow
npx prisma studio
```

Run it:
```powershell
.\setup-railway-db.ps1
```

---

## 🎯 Quick Start (Recommended)

**Just do this:**

1. **Get DATABASE_URL from Railway Dashboard:**
   - PostgreSQL service → Variables → Copy `DATABASE_URL`

2. **Run in PowerShell:**
   ```powershell
   $env:DATABASE_URL="paste-your-railway-url-here"
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

3. **Verify:**
   ```bash
   npx prisma studio
   ```

**Done!** Your database is now set up with tables and seed data! 🎉

---

## Next Steps

After database is set up:

1. ✅ Add `DATABASE_URL` to Vercel environment variables
2. ✅ Deploy to Vercel
3. ✅ Test your app!

---

**Need help?** Check Railway logs if connection fails, or verify DATABASE_URL is correct!

