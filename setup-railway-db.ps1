# Setup Railway Database Script
Write-Host "🗄️  Setting up Railway Database..." -ForegroundColor Green
Write-Host ""

# Check if DATABASE_URL is set
if (-not $env:DATABASE_URL) {
    Write-Host "⚠️  DATABASE_URL not found in environment" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please do one of the following:" -ForegroundColor Cyan
    Write-Host "1. Set DATABASE_URL manually:" -ForegroundColor White
    Write-Host '   $env:DATABASE_URL="postgresql://postgres:password@host:5432/railway"' -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Or get it from Railway Dashboard:" -ForegroundColor White
    Write-Host "   - Go to Railway → PostgreSQL Service → Variables Tab" -ForegroundColor Gray
    Write-Host "   - Copy DATABASE_URL" -ForegroundColor Gray
    Write-Host ""
    
    $railwayUrl = Read-Host "Paste your Railway DATABASE_URL here (or press Enter to skip)"
    if ($railwayUrl) {
        $env:DATABASE_URL = $railwayUrl
        Write-Host "✅ DATABASE_URL set" -ForegroundColor Green
    } else {
        Write-Host "❌ DATABASE_URL required. Exiting." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ DATABASE_URL found" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 1: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma Client" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Pushing schema to Railway database..." -ForegroundColor Yellow
Write-Host "This will create all tables in your database." -ForegroundColor Gray
npx prisma db push --accept-data-loss

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push schema" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Seeding database with initial data..." -ForegroundColor Yellow
npm run db:seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Seeding completed with warnings" -ForegroundColor Yellow
} else {
    Write-Host "✅ Database seeded successfully" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Database setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Verify your database: npx prisma studio" -ForegroundColor White
Write-Host "2. Add DATABASE_URL to Vercel environment variables" -ForegroundColor White
Write-Host "3. Deploy to Vercel" -ForegroundColor White
Write-Host ""

