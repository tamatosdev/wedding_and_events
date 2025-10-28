# 🚀 Local Development Setup Guide

This guide will help you set up the Shadi Portal project for local development using Docker.

## 📋 Prerequisites

- **Docker Desktop** installed and running
- **Node.js 18+** installed
- **Git** installed

## 🛠️ Quick Setup (Automated)

### For Linux/Mac:
```bash
chmod +x setup-local.sh
./setup-local.sh
```

### For Windows:
```cmd
setup-local.bat
```

## 🔧 Manual Setup

### 1. Environment Configuration

Copy the environment template:
```bash
cp env.local.example .env.local
```

Edit `.env.local` with your values:
```env
# Database (Docker PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/shadi_portal"

# NextAuth.js (generate a random secret)
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary (optional for now)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# SMTP (optional for now)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Docker Services

```bash
# Start PostgreSQL database
docker-compose up -d postgres

# Wait for database to be ready
sleep 10
```

### 4. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Database Admin**: Run `npm run db:studio` and open http://localhost:5555

## 👥 Demo Accounts

The seed script creates these accounts:

- **Admin**: `admin@shadiportal.com` / `admin123`
- **Vendor**: `vendor@example.com` / `vendor123`

## 🐳 Docker Services

### Available Services:
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379` (optional)
- **App**: `localhost:3000`

### Useful Commands:

```bash
# View all services
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Restart services
docker-compose restart

# Remove all data (fresh start)
docker-compose down -v
```

## 🔍 Development Features

### Database Management:
```bash
# Open Prisma Studio
npm run db:studio

# Reset database
npx prisma db push --force-reset

# Generate new migration
npx prisma migrate dev --name your-migration-name
```

### Frontend Development:
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 🐛 Troubleshooting

### Common Issues:

1. **Port already in use**:
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

2. **Database connection failed**:
   ```bash
   # Restart PostgreSQL
   docker-compose restart postgres
   ```

3. **Prisma client not found**:
   ```bash
   npx prisma generate
   ```

4. **Docker not running**:
   - Start Docker Desktop
   - Wait for it to fully load
   - Try again

### Reset Everything:
```bash
# Stop and remove all containers and volumes
docker-compose down -v

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Run setup again
./setup-local.sh
```

## 📁 Project Structure

```
shadi-portal/
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                   # Utility functions
├── prisma/                # Database schema
├── docker/                # Docker configuration
├── docker-compose.yml     # Docker services
├── Dockerfile            # Production Docker image
├── Dockerfile.dev        # Development Docker image
└── setup-local.sh        # Setup script
```

## 🚀 Next Steps

1. **Explore the frontend**: Visit http://localhost:3000
2. **Test authentication**: Use demo accounts to login
3. **Add vendors**: Use vendor dashboard to add listings
4. **Admin functions**: Use admin dashboard to approve vendors
5. **Customize**: Modify components and styling as needed

## 📞 Support

If you encounter any issues:
1. Check Docker is running
2. Verify all environment variables are set
3. Check the troubleshooting section above
4. Review the logs: `docker-compose logs -f`

Happy coding! 🎉
