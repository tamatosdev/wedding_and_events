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

  // Create homepage content blocks
  console.log('📝 Creating homepage content blocks...')
  
  const homepageContent = [
    {
      section: 'hero',
      title: 'Your Perfect\nEvent Starts Here!',
      images: [
        '/uploads/venues-1.png',
        '/uploads/catering-new.png',
        '/uploads/decor-1.png',
        '/uploads/bridal-1.jpg'
      ],
      content: {
        categories: ['Venues', 'Catering', 'Decoration', 'Beauty Parlor', 'Boutiques'],
        cities: ['Karachi']
      },
      visible: true,
      order: 0,
    },
    {
      section: 'featured',
      title: 'Featured Vendors',
      subtitle: 'Handpicked vendors for your special day',
      content: {
        description: 'Discover our top-rated and most popular wedding vendors, carefully selected to make your event unforgettable.',
        featuredVendorIds: [], // You can update this to include specific vendor IDs if needed
      },
      visible: true,
      order: 2,
    },
    {
      section: 'categories',
      title: 'Find Every Vendor\nYou Need',
      images: [
        '/uploads/Flower-1.png',
        '/uploads/Flower-2.png'
      ],
      content: {
        items: [
          { name: 'Wedding Halls/Venues', category: 'Wedding', image: '/uploads/Vendor-1.png', link: '/partners?type=wedding' },
          { name: 'Catering', category: 'Catering', image: '/uploads/Vendor-2.png', link: '/partners?type=catering' },
          { name: 'Decoration', category: 'Decoration', image: '/uploads/Vendor-5.png', link: '/partners?type=decor' },
          { name: 'Beauty Parlour', category: 'Beauty Parlour', image: '/uploads/Vendor-3.png', link: '/partners?type=beauty-parlour' },
          { name: 'Boutiques', category: 'Boutiques', image: '/uploads/Vendor-4.png', link: '/partners?type=boutiques' }
        ]
      },
      visible: true,
      order: 1,
    },
    {
      section: 'banner',
      content: {
        items: [
          { id: 1, image: '/uploads/MCT Google ads Banner - R2-01.png', alt: 'MCT Google ads Banner - Visit MCT Business', link: 'https://mctbusiness.com/insurance/' },
          { id: 2, image: '/uploads/MCT Google ads Banner 02.png', alt: 'MCT Google ads Banner 02 - Visit MCT Business', link: 'https://mctbusiness.com/insurance/' }
        ]
      },
      visible: true,
      order: 2,
    },
    {
      section: 'process',
      title: 'Simple. Seamless. Stress-Free.',
      images: [
        '/uploads/Flower-4.png',
        '/uploads/Flower-5.png'
      ],
      content: {
        steps: [
          { step: 'STEP 01', title: 'Discover', description: 'Browse trusted venues and wedding vendors across major cities.' },
          { step: 'STEP 02', title: 'Compare & Shortlist', description: 'Check photos, pricing, and reviews. Save your favorites for later.' },
          { step: 'STEP 03', title: 'Connect & Inquire', description: 'Send inquiries, check availability, or request a quote directly.' },
          { step: 'STEP 04', title: 'Book & Celebrate', description: 'Finalize your bookings and enjoy a stress-free wedding journey.' }
        ]
      },
      visible: true,
      order: 3,
    },
    {
      section: 'testimonials',
      title: 'What Our Customers Say?',
      content: {
        items: [
          { id: 1, quote: 'The catering service we booked through this portal was absolutely amazing. Our guests are still talking about the food!', author: 'Fatima & Ahmed', image: '/uploads/Testimonial-0.png' },
          { id: 2, quote: 'From photography to decorations, we found all our vendors in one place. Saved us so much time and effort.', author: 'Ayesha & Hassan', image: '/uploads/Testimonial-2.png' },
          { id: 3, quote: 'The vendor quality is outstanding. Every single vendor exceeded our expectations. Highly recommended!', author: 'Zara & Usman', image: '/uploads/Testimonial-3.png' },
          { id: 4, quote: 'We found our Dream Venue in Just Two Days! The Portal Made Everything So Simple And Stress-Free.', author: 'Sarah & Ali', image: '/uploads/Testimonial-4.png' },
          { id: 5, quote: 'Excellent experience — responsive vendors and fair prices. Highly recommend this portal for wedding planning.', author: 'Noor & Bilal', image: '/uploads/Testimonials-1.png' }
        ]
      },
      visible: true,
      order: 4,
    },
    {
      section: 'faq',
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our services',
      content: {
        items: [
          { id: 1, question: 'How do I book a venue through Wedding & Events?', answer: 'Browse our venue listings, compare options, and click "Inquire" to send a message to the venue owner. They will respond with availability and pricing details.' },
          { id: 2, question: 'What types of venues are available?', answer: 'We offer a wide range of venues including wedding halls, outdoor spaces, marquees, hotels, and traditional banquet halls. Filter by type to find exactly what you need.' },
          { id: 3, question: 'Can I see venue photos before booking?', answer: 'Yes! Each venue listing includes multiple photos, descriptions, capacity information, and pricing details. You can also read reviews from previous customers.' },
          { id: 4, question: 'How do I contact vendors?', answer: 'Use the contact form on each vendor page or click the WhatsApp button to message them directly. Our platform makes it easy to connect with vendors.' },
          { id: 5, question: 'Is there a booking fee?', answer: 'Wedding & Events is free to browse. Venue pricing varies by location and venue type. Contact venues directly for detailed pricing and booking information.' }
        ]
      },
      visible: true,
      order: 5,
    },
    {
      section: 'cta',
      title: 'Ready to make your dream\nevent a reality?',
      description: 'Explore beautiful venues, connect with the right vendors, and let us make your planning journey effortless and exciting.',
      images: [
        '/uploads/Find Your Venue flower-2.png',
        '/uploads/Find Your Venue flower-1.png'
      ],
      content: {
        buttons: [
          { text: 'Find Your Venue', link: '/venues', variant: 'primary' },
          { text: 'Join as a Vendor', link: '/list-business', variant: 'outline' }
        ]
      },
      visible: true,
      order: 6,
    },
    {
      section: 'planning',
      title: 'Because Planning Your Wedding Should Feel Like a Celebration',
      images: [
        '/uploads/WeddingPlanning.png',
        '/uploads/Flower-7.png',
        '/uploads/Flower-6.png'
      ],
      content: {
        paragraphs: [
          'Your wedding is a celebration of love and joy - and planning it should feel just as special. At The Wedding and Event, we bring trusted venues, reliable vendors, and creative ideas together in one seamless space, making every step easy, exciting, and full of heart.',
          'Because when planning feels joyful, you can focus on what truly matters - celebrating your love story, your way.'
        ],
        buttonText: 'About Us',
        buttonLink: '/venues'
      },
      visible: true,
      order: 7,
    },
  ]

  for (const contentData of homepageContent) {
    await prisma.homepageContent.upsert({
      where: { section: contentData.section },
      update: {},
      create: contentData,
    })
    console.log(`✅ Homepage content created: ${contentData.section}`)
  }

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
