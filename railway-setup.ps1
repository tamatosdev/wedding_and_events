# Railway Setup Helper Script
# This script helps you set up environment variables for Railway deployment

Write-Host "Railway Deployment Setup Helper" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Generate NEXTAUTH_SECRET
Write-Host "Generating NEXTAUTH_SECRET..." -ForegroundColor Yellow
$bytes = New-Object byte[] 32
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes)
$nextAuthSecret = [Convert]::ToBase64String($bytes)
Write-Host "Generated: $nextAuthSecret" -ForegroundColor Green
Write-Host ""

# Display required environment variables
Write-Host "Required Environment Variables for Railway:" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. NEXTAUTH_SECRET" -ForegroundColor White
Write-Host "   Value: $nextAuthSecret" -ForegroundColor Gray
Write-Host ""

Write-Host "2. NEXTAUTH_URL" -ForegroundColor White
Write-Host "   Value: https://your-app-name.railway.app" -ForegroundColor Gray
Write-Host "   (Update after deployment with your actual Railway URL)" -ForegroundColor DarkGray
Write-Host ""

Write-Host "3. NODE_ENV" -ForegroundColor White
Write-Host "   Value: production" -ForegroundColor Gray
Write-Host ""

Write-Host "4. DATABASE_URL" -ForegroundColor White
Write-Host "   Value: (Auto-provided by Railway PostgreSQL service)" -ForegroundColor Gray
Write-Host "   (No need to set manually - Railway does this automatically)" -ForegroundColor DarkGray
Write-Host ""

Write-Host "Optional but Recommended Variables:" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "CLOUDINARY_CLOUD_NAME=your-cloud-name" -ForegroundColor Gray
Write-Host "CLOUDINARY_API_KEY=your-api-key" -ForegroundColor Gray
Write-Host "CLOUDINARY_API_SECRET=your-api-secret" -ForegroundColor Gray
Write-Host "SMTP_HOST=smtp.gmail.com" -ForegroundColor Gray
Write-Host "SMTP_PORT=587" -ForegroundColor Gray
Write-Host "SMTP_USER=your-email@gmail.com" -ForegroundColor Gray
Write-Host "SMTP_PASS=your-app-password" -ForegroundColor Gray
Write-Host ""

Write-Host "Railway CLI Commands:" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Set NEXTAUTH_SECRET:" -ForegroundColor White
Write-Host "  railway variables set NEXTAUTH_SECRET=`"$nextAuthSecret`"" -ForegroundColor Green
Write-Host ""

Write-Host "Set NEXTAUTH_URL (after deployment):" -ForegroundColor White
Write-Host "  railway variables set NEXTAUTH_URL=`"https://your-app.railway.app`"" -ForegroundColor Green
Write-Host ""

Write-Host "Set NODE_ENV:" -ForegroundColor White
Write-Host "  railway variables set NODE_ENV=production" -ForegroundColor Green
Write-Host ""

Write-Host "Push database schema:" -ForegroundColor White
Write-Host "  railway run npx prisma db push" -ForegroundColor Green
Write-Host "  railway run npx prisma generate" -ForegroundColor Green
Write-Host ""

Write-Host "View all variables:" -ForegroundColor White
Write-Host "  railway variables" -ForegroundColor Green
Write-Host ""

Write-Host "View logs:" -ForegroundColor White
Write-Host "  railway logs --follow" -ForegroundColor Green
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "============" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Go to https://railway.app and open project harmonious-serenity" -ForegroundColor White
Write-Host "2. Add PostgreSQL database (click + New, then Database, then PostgreSQL)" -ForegroundColor White
Write-Host "3. Add Next.js app service (click + New, then GitHub Repo)" -ForegroundColor White
Write-Host "4. Set environment variables using commands above" -ForegroundColor White
Write-Host "5. Run database migrations: railway run npx prisma db push" -ForegroundColor White
Write-Host ""

Write-Host "See COMPLETE_RAILWAY_SETUP.md for detailed instructions." -ForegroundColor Cyan
