import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@shadiportal.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@shadiportal.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create sample vendor user
  const vendorPassword = await bcrypt.hash('vendor123', 12)
  
  const vendorUser = await prisma.user.upsert({
    where: { email: 'vendor@example.com' },
    update: {},
    create: {
      name: 'Sample Vendor',
      email: 'vendor@example.com',
      password: vendorPassword,
      role: Role.VENDOR,
    },
  })

  console.log('✅ Vendor user created:', vendorUser.email)

  // Initialize CMS tables
  console.log('🔧 Initializing CMS tables...')

  // Create homepage sections
  const homepageSections = [
    {
      name: 'hero',
      title: 'Find Your Perfect Wedding Vendors',
      subtitle: 'Discover the best venues, caterers, photographers, and more for your special day',
      visible: true,
      order: 0,
    },
    {
      name: 'categories',
      title: 'Browse by Category',
      subtitle: 'Explore our wide range of wedding services',
      visible: true,
      order: 1,
    },
    {
      name: 'featured',
      title: 'Featured Vendors',
      subtitle: 'Handpicked vendors for your special day',
      visible: true,
      order: 2,
    },
    {
      name: 'process',
      title: 'How It Works',
      subtitle: 'Simple steps to plan your perfect wedding',
      visible: true,
      order: 3,
    },
    {
      name: 'testimonials',
      title: 'What Our Couples Say',
      subtitle: 'Real stories from happy couples',
      visible: true,
      order: 4,
    },
    {
      name: 'cta',
      title: 'Ready to Plan Your Wedding?',
      subtitle: 'Join thousands of couples who found their perfect vendors',
      visible: true,
      order: 5,
    },
  ]

  for (const sectionData of homepageSections) {
    await prisma.homepageSection.upsert({
      where: { name: sectionData.name },
      update: {},
      create: sectionData,
    })
    console.log(`✅ Homepage section created: ${sectionData.name}`)
  }

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      homepageSettings: {
        siteTitle: 'Wedding & Events Portal',
        siteDescription: 'Find the perfect vendors for your wedding and special events',
        siteKeywords: 'wedding, events, vendors, venues, catering, photography',
        ogImage: '/placeholder-image.jpg',
      },
      seoSettings: {
        metaTitle: 'Wedding & Events Portal - Find Your Perfect Vendors',
        metaDescription: 'Discover the best wedding vendors including venues, caterers, photographers, and more. Plan your perfect day with our trusted partners.',
        metaKeywords: 'wedding vendors, wedding venues, wedding catering, wedding photography, event planning',
      },
    },
  })
  console.log('✅ Site settings created')

  // Create sample vendors
  const vendors = [
    {
      name: 'Royal Wedding Hall',
      category: 'Venue',
      city: 'Karachi',
      pricing: 'PKR 150,000 - 300,000',
      description: 'Beautiful wedding hall with modern amenities, perfect for your special day. Can accommodate up to 500 guests.',
      images: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2'
      ],
      approved: true,
      userId: vendorUser.id,
      capacity: '500-1000',
      type: 'Hall',
      rating: 4.5,
      reviews: 25,
    },
    {
      name: 'Elite Catering Services',
      category: 'Catering',
      city: 'Lahore',
      pricing: 'PKR 500 - 1,200 per person',
      description: 'Premium catering services with a wide variety of Pakistani and continental cuisine. Professional staff and excellent service.',
      images: [
        'https://picsum.photos/800/600?random=3',
        'https://picsum.photos/800/600?random=4'
      ],
      approved: true,
      userId: vendorUser.id,
      capacity: '100-300',
      type: 'Other',
      rating: 4.8,
      reviews: 42,
    },
    {
      name: 'Dream Photography Studio',
      category: 'Photography',
      city: 'Islamabad',
      pricing: 'PKR 50,000 - 100,000',
      description: 'Professional wedding photography and videography services. We capture your precious moments with artistic excellence.',
      images: [
        'https://picsum.photos/800/600?random=5',
        'https://picsum.photos/800/600?random=6'
      ],
      approved: false,
      userId: vendorUser.id,
      capacity: '0-100',
      type: 'Other',
      rating: 4.7,
      reviews: 38,
    },
    {
      name: 'Bridal Couture House',
      category: 'Fashion',
      city: 'Karachi',
      pricing: 'PKR 25,000 - 150,000',
      description: 'Exclusive bridal wear collection with traditional and modern designs. Custom tailoring available.',
      images: [
        'https://picsum.photos/800/600?random=7',
        'https://picsum.photos/800/600?random=8'
      ],
      approved: true,
      userId: vendorUser.id,
      capacity: '0-100',
      type: 'Other',
      rating: 4.6,
      reviews: 31,
    },
    {
      name: 'Floral Paradise',
      category: 'Decorations',
      city: 'Lahore',
      pricing: 'PKR 15,000 - 50,000',
      description: 'Beautiful flower arrangements and decoration services for weddings and events. Fresh flowers and elegant designs.',
      images: [
        'https://picsum.photos/800/600?random=9',
        'https://picsum.photos/800/600?random=10'
      ],
      approved: true,
      userId: vendorUser.id,
      capacity: '100-300',
      type: 'Other',
      rating: 4.9,
      reviews: 67,
    },
    {
      name: 'WedHive Banquet',
      category: 'Venue',
      city: 'Karachi',
      pricing: 'PKR 200,000 - 500,000',
      description: 'Luxurious banquet hall with state-of-the-art facilities. Perfect for grand weddings and corporate events.',
      images: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2'
      ],
      approved: true,
      userId: vendorUser.id,
      capacity: '1000-1500',
      type: 'Hall',
      rating: 4.5,
      reviews: 18,
    },
  ]

  for (const vendorData of vendors) {
    const vendor = await prisma.vendor.upsert({
      where: { 
        name_city: {
          name: vendorData.name,
          city: vendorData.city,
        }
      },
      update: {},
      create: vendorData,
    })
    console.log(`✅ Vendor created: ${vendor.name}`)
  }

  // Create sample inquiries
  const sampleVendor = await prisma.vendor.findFirst()
  if (sampleVendor) {
    const inquiries = [
      {
        vendorId: sampleVendor.id,
        name: 'Ahmed Ali',
        email: 'ahmed@example.com',
        message: 'Hi, I am interested in booking your venue for my wedding in March 2024. Could you please provide more details about availability and pricing?',
      },
      {
        vendorId: sampleVendor.id,
        name: 'Fatima Khan',
        email: 'fatima@example.com',
        message: 'Hello, I would like to know more about your catering services for a wedding with 200 guests. Please share your menu options.',
      },
    ]

    for (const inquiryData of inquiries) {
      const inquiry = await prisma.inquiry.create({
        data: inquiryData,
      })
      console.log(`✅ Inquiry created: ${inquiry.name}`)
    }
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
