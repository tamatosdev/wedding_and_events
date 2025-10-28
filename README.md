# Shadi Portal - Wedding & Events Directory

A complete wedding vendor directory built with Next.js 14, PostgreSQL, and modern web technologies.

## 🚀 Features

- **Vendor Directory**: Browse and search wedding vendors by category and city
- **Vendor Portal**: Vendors can manage their listings and upload images
- **Admin Dashboard**: Approve vendors, view analytics, and manage inquiries
- **Inquiry System**: Customers can send inquiries directly to vendors
- **Email Notifications**: Automated email notifications via Nodemailer
- **Image Uploads**: Cloudinary integration for image management
- **Authentication**: Role-based authentication with NextAuth.js
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Credentials Provider)
- **Styling**: Tailwind CSS + shadcn/ui
- **Image Uploads**: Cloudinary
- **Emails**: Nodemailer (SMTP)
- **Charts**: Recharts
- **Deployment**: Vercel (frontend) + Neon.tech (PostgreSQL)

## 📁 Project Structure

```
shadi-portal/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── admin/         # Admin API endpoints
│   │   ├── auth/          # Authentication API
│   │   ├── inquiries/     # Inquiry management
│   │   ├── upload/        # File upload
│   │   └── vendors/       # Vendor API endpoints
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── vendor/            # Vendor dashboard
│   └── vendors/           # Public vendor pages
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Cloudinary account
- SMTP email service (Gmail, etc.)

### 1. Clone and Install

```bash
git clone <repository-url>
cd shadi-portal
npm install
```

### 2. Environment Setup

Copy the environment template and fill in your values:

```bash
cp env.example .env.local
```

Fill in your `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/shadi_portal"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# SMTP Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 👥 Demo Accounts

The seed script creates these demo accounts:

- **Admin**: `admin@shadiportal.com` / `admin123`
- **Vendor**: `vendor@example.com` / `vendor123`

## 📱 Key Pages & Features

### Public Pages
- **Home** (`/`): Landing page with hero section and categories
- **Vendors** (`/vendors`): Browse and search vendors
- **Vendor Detail** (`/vendors/[id]`): Individual vendor page with inquiry form

### Authentication
- **Sign In** (`/auth/signin`): User login
- **Sign Up** (`/auth/signup`): User registration

### Vendor Portal
- **Dashboard** (`/vendor/dashboard`): Manage vendor listings
  - Add new listings
  - Edit existing listings
  - Upload images
  - View approval status

### Admin Dashboard
- **Admin Panel** (`/admin`): Manage the platform
  - Approve/reject vendors
  - View analytics and charts
  - Monitor inquiries
  - Platform statistics

## 🔧 API Endpoints

### Public APIs
- `GET /api/vendors` - List approved vendors (with search/filter)
- `GET /api/vendors/[id]` - Get vendor details
- `POST /api/inquiries` - Submit vendor inquiry

### Vendor APIs (Protected)
- `GET /api/vendor/vendors` - Get vendor's listings
- `POST /api/vendor/vendors` - Create new listing
- `PUT /api/vendor/vendors/[id]` - Update listing
- `DELETE /api/vendor/vendors/[id]` - Delete listing

### Admin APIs (Protected)
- `GET /api/admin/vendors` - Get all vendors
- `GET /api/admin/inquiries` - Get all inquiries
- `GET /api/admin/stats` - Get platform statistics
- `PUT /api/admin/vendors/[id]/approve` - Approve vendor
- `PUT /api/admin/vendors/[id]/reject` - Reject vendor

### Utility APIs
- `POST /api/upload` - Upload images to Cloudinary

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?
  role          Role      @default(VENDOR)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Vendor Model
```prisma
model Vendor {
  id          String   @id @default(cuid())
  name        String
  category    String
  city        String
  pricing     String
  description String   @db.Text
  images      String[]
  approved    Boolean  @default(false)
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Inquiry Model
```prisma
model Inquiry {
  id        String   @id @default(cuid())
  vendorId  String
  name      String
  email     String
  message   String   @db.Text
  createdAt DateTime @default(now())
}
```

## 🚀 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Database (Neon.tech)

1. Create account at [neon.tech](https://neon.tech)
2. Create new PostgreSQL database
3. Copy connection string to `DATABASE_URL`
4. Run migrations: `npm run db:push`

### Environment Variables for Production

```env
DATABASE_URL="postgresql://username:password@your-neon-db-url"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-production-secret"
# ... other variables
```

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database
npm run db:migrate      # Create and run migrations
npm run db:seed         # Seed database with sample data
npm run db:studio       # Open Prisma Studio
```

## 📧 **Inquiry Management System**

### **Admin-Only Inquiry System**
- **All customer inquiries are sent directly to the admin email only**
- **Vendors do not receive inquiry emails automatically**
- **Admin can manually share inquiry details with vendors**
- **Admin coordinates between customers and vendors**

### **Environment Configuration**
Add these variables to your `.env.local`:

```bash
# Admin Contact Information
ADMIN_EMAIL="admin@shadiportal.com"
ADMIN_PHONE="+92-XXX-XXXXXXX"
ADMIN_NAME="Admin Portal"
```

### **How It Works**
1. **Customer submits inquiry** → Inquiry saved to database
2. **Admin receives email notification** → Admin reviews inquiry details
3. **Admin contacts vendor** → Admin shares inquiry with vendor manually
4. **Admin coordinates response** → Admin ensures customer satisfaction

### **Admin Email Template**
The admin receives a professional email with:
- Customer details (name, email, message)
- Vendor information (name, email, phone)
- Action buttons to reply to customer or contact vendor
- Step-by-step instructions for handling the inquiry

## 🎨 Customization

### Adding New Categories
Update the category options in:
- `app/vendors/page.tsx` (search filters)
- `app/vendor/dashboard/page.tsx` (vendor form)
- `app/page.tsx` (homepage categories)

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `app/globals.css` for global styles
- Customize shadcn/ui components in `components/ui/`

### Email Templates
Modify email templates in `lib/email.ts` for custom email designs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the demo accounts for testing

---

**Happy Wedding Planning! 💒✨**
