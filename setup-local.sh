#!/bin/bash

# Shadi Portal - Local Development Setup Script
# This script helps you set up the project for local development

echo "🚀 Setting up Shadi Portal for local development..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp env.local.example .env.local
    echo "⚠️  Please edit .env.local with your actual values before continuing"
    echo "   - Update DATABASE_URL if needed"
    echo "   - Add your Cloudinary credentials"
    echo "   - Add your SMTP email settings"
    echo ""
    read -p "Press Enter to continue after updating .env.local..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

# Run database migrations
echo "🗄️  Setting up database..."
npx prisma db push

# Seed the database
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Start the development server: npm run dev"
echo "   2. Open http://localhost:3000 in your browser"
echo "   3. Use these demo accounts:"
echo "      - Admin: admin@shadiportal.com / admin123"
echo "      - Vendor: vendor@example.com / vendor123"
echo ""
echo "🔧 Useful commands:"
echo "   - View database: npm run db:studio"
echo "   - Stop services: docker-compose down"
echo "   - View logs: docker-compose logs -f"
echo ""
