@echo off
REM Shadi Portal - Local Development Setup Script for Windows
REM This script helps you set up the project for local development

echo 🚀 Setting up Shadi Portal for local development...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo ✅ Docker is running

REM Check if .env.local exists
if not exist .env.local (
    echo 📝 Creating .env.local from template...
    copy env.local.example .env.local
    echo ⚠️  Please edit .env.local with your actual values before continuing
    echo    - Update DATABASE_URL if needed
    echo    - Add your Cloudinary credentials
    echo    - Add your SMTP email settings
    echo.
    pause
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Generate Prisma client
echo 🔧 Generating Prisma client...
npx prisma generate

REM Start Docker services
echo 🐳 Starting Docker services...
docker-compose up -d postgres

REM Wait for PostgreSQL to be ready
echo ⏳ Waiting for PostgreSQL to be ready...
timeout /t 10 /nobreak >nul

REM Run database migrations
echo 🗄️  Setting up database...
npx prisma db push

REM Seed the database
echo 🌱 Seeding database with sample data...
npm run db:seed

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo    1. Start the development server: npm run dev
echo    2. Open http://localhost:3000 in your browser
echo    3. Use these demo accounts:
echo       - Admin: admin@shadiportal.com / admin123
echo       - Vendor: vendor@example.com / vendor123
echo.
echo 🔧 Useful commands:
echo    - View database: npm run db:studio
echo    - Stop services: docker-compose down
echo    - View logs: docker-compose logs -f
echo.
pause
