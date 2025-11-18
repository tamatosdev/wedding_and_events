/**
 * Demo Partner Data for Showcase
 * Mock data for displaying partner listings on the website
 */

export interface DemoPartner {
  id: string
  name: string
  businessType: 'wedding' | 'boutiques' | 'beauty-parlour' | 'decor' | 'catering'
  city: string
  area: string
  description: string
  image: string
  contact: {
    phone: string
    email?: string
    whatsapp?: string
  }
  pricing?: string
  rating?: number
  isDemo: true
}

export const demoPartners: DemoPartner[] = [
  // Wedding Venues (6)
  {
    id: 'venue-1',
    name: 'The Castle Banquet',
    businessType: 'wedding',
    city: 'Karachi',
    area: 'Shahra-e-Faisal',
    description: 'Elegant banquet hall with capacity for 500-1000 guests. Features modern amenities, bridal suite, and valet parking.',
    image: '/uploads/castel-banquee.jpg',
    contact: {
      phone: '0320 2592117',
      email: 'info@thecastlebanquet.com',
      whatsapp: '03202592117',
    },
    pricing: 'PKR 200,000 - 500,000',
    rating: 4.5,
    isDemo: true,
  },
  {
    id: 'venue-2',
    name: 'Victoria Banquet',
    businessType: 'wedding',
    city: 'Karachi',
    area: 'Dar-ul-Aman Housing Society',
    description: 'Premium marquee setup with air conditioning, beautiful lighting, and spacious lawn area. Perfect for outdoor weddings.',
    image: '/uploads/Victoria-Banquet.jpg',
    contact: {
      phone: '(021) 34385021',
      email: 'contact@royalmarquee.com',
      whatsapp: '923001234568',
    },
    pricing: 'PKR 150,000 - 400,000',
    rating: 4.7,
    isDemo: true,
  },
  {
    id: 'venue-3',
    name: 'Aurora Banquet',
    businessType: 'wedding',
    city: 'Karachi',
    area: 'Shaheed-e-Millat Rd',
    description: 'Luxurious ballroom with crystal chandeliers, modern sound system, and professional catering facilities.',
    image: '/uploads/Aurora-Banquet.jpg',
    contact: {
      phone: '(021) 34321999',
      email: 'events@crystalballroom.com',
      whatsapp: '923001234569',
    },
    pricing: 'PKR 250,000 - 600,000',
    rating: 4.8,
    isDemo: true,
  },
  {
    id: 'venue-4',
    name: 'Akacia Banquet',
    businessType: 'wedding',
    city: 'Karachi',
    area: 'Sindhi Muslim Cooperative Housing Society',
    description: 'Our spacious and beautifully designed venue is ideal for weddings, corporate events, social gatherings, and more.',
    image: '/uploads/Akacia-Banquet.jpeg',
    contact: {
      phone: ' 0330 0252242',
      email: 'info@gardenpavilion.com',
      whatsapp: '923001234570',
    },
    pricing: 'PKR 180,000 - 450,000',
    rating: 4.6,
    isDemo: true,
  },
  {
    id: 'venue-5',
    name: 'Function Hall DHA',
    businessType: 'wedding',
    city: 'Karachi',
    area: 'D.H.A. Phase 8',
    description: 'Function Hall DHA Karachi serves as the perfect venue for hosting memorable weddings and special occasions in the prestigious Defence Housing Authority area. This spacious venue offers elegant event spaces with convenient location access and dedicated service that creates an ideal setting for your dream wedding celebration. ',
    image: '/uploads/Function-Hall -DHA.jpg',
    contact: {
      phone: '042-12345679',
      email: 'bookings@elitebanquet.com',
      whatsapp: '923001234571',
    },
    pricing: 'PKR 220,000 - 550,000',
    rating: 4.9,
    isDemo: true,
  },
  {
    id: 'venue-6',
    name: 'Khan Saab Banquet',
    businessType: 'wedding',
    city: 'Karachi',
    area: 'Karachi - Hyderabad Mtwy',
    description: 'Khan Saab Marquee Karachi is the ideal venue for weddings, birthdays, corporate events, and more. Known for its exceptional service, Khan Saab Marquee caters to both intimate and large gatherings, offering flexible options ',
    image: '/uploads/Khan-Saab-Banquet.jpeg',
    contact: {
      phone: '021-12345680',
      email: 'events@skylinevenue.com',
      whatsapp: '923001234572',
    },
    pricing: 'PKR 300,000 - 700,000',
    rating: 4.7,
    isDemo: true,
  },

  // Boutiques (6)
  {
    id: 'boutique-1',
    name: 'Bridal Elegance',
    businessType: 'boutiques',
    city: 'Karachi',
    area: 'Saddar',
    description: 'Premium bridal wear with custom designs. Specializes in traditional and contemporary bridal dresses.',
    image: '/assets/demo/boutique-1.jpg',
    contact: {
      phone: '021-22345678',
      email: 'info@bridalelegance.com',
      whatsapp: '923002234567',
    },
    pricing: 'PKR 50,000 - 500,000',
    rating: 4.8,
    isDemo: true,
  },
  {
    id: 'boutique-2',
    name: 'Designer Dreams',
    businessType: 'boutiques',
    city: 'Karachi',
    area: 'MM Alam Road',
    description: 'Fashion-forward boutique offering designer bridal and formal wear. Custom tailoring available.',
    image: '/assets/demo/boutique-2.jpg',
    contact: {
      phone: '042-22345678',
      email: 'contact@designerdreams.com',
      whatsapp: '923002234568',
    },
    pricing: 'PKR 80,000 - 800,000',
    rating: 4.9,
    isDemo: true,
  },
  {
    id: 'boutique-3',
    name: 'Silk & Satin',
    businessType: 'boutiques',
    city: 'Karachi',
    area: 'F-6',
    description: 'Luxury fabrics and elegant designs. Known for intricate embroidery and premium quality.',
    image: '/assets/demo/boutique-3.jpg',
    contact: {
      phone: '051-22345678',
      email: 'info@silkandsatin.com',
      whatsapp: '923002234569',
    },
    pricing: 'PKR 60,000 - 600,000',
    rating: 4.7,
    isDemo: true,
  },
  {
    id: 'boutique-4',
    name: 'Royal Couture',
    businessType: 'boutiques',
    city: 'Karachi',
    area: 'Clifton',
    description: 'High-end couture boutique specializing in bridal and formal wear. International designers available.',
    image: '/assets/demo/boutique-4.jpg',
    contact: {
      phone: '021-22345679',
      email: 'bookings@royalcouture.com',
      whatsapp: '923002234570',
    },
    pricing: 'PKR 100,000 - 1,000,000',
    rating: 4.9,
    isDemo: true,
  },
  {
    id: 'boutique-5',
    name: 'Traditional Treasures',
    businessType: 'boutiques',
    city: 'Karachi',
    area: 'Anarkali',
    description: 'Authentic traditional wear with modern touches. Specializes in Pakistani and Indian bridal collections.',
    image: '/assets/demo/boutique-5.jpg',
    contact: {
      phone: '042-22345679',
      email: 'info@traditionaltreasures.com',
      whatsapp: '923002234571',
    },
    pricing: 'PKR 40,000 - 400,000',
    rating: 4.6,
    isDemo: true,
  },
  {
    id: 'boutique-6',
    name: 'Modern Bridal Studio',
    businessType: 'boutiques',
    city: 'Karachi',
    area: 'DHA',
    description: 'Contemporary bridal designs with focus on comfort and style. Rental options available.',
    image: '/assets/demo/boutique-6.jpg',
    contact: {
      phone: '021-22345680',
      email: 'info@modernbridal.com',
      whatsapp: '923002234572',
    },
    pricing: 'PKR 70,000 - 700,000',
    rating: 4.8,
    isDemo: true,
  },

  // Beauty Parlours (2+)
  {
    id: 'salon-1',
    name: 'Glamour Studio',
    businessType: 'beauty-parlour',
    city: 'Karachi',
    area: 'Clifton',
    description: 'Professional bridal makeup and hair styling. Uses premium international brands. Expert team with 10+ years experience.',
    image: '/assets/demo/salon-1.jpg',
    contact: {
      phone: '021-32345678',
      email: 'bookings@glamourstudio.com',
      whatsapp: '923003234567',
    },
    pricing: 'PKR 15,000 - 50,000',
    rating: 4.8,
    isDemo: true,
  },
  {
    id: 'salon-2',
    name: 'Beauty & Beyond',
    businessType: 'beauty-parlour',
    city: 'Karachi',
    area: 'Gulberg',
    description: 'Complete beauty services including makeup, hair, mehndi, and nail art. Bridal packages available.',
    image: '/assets/demo/salon-2.jpg',
    contact: {
      phone: '042-32345678',
      email: 'info@beautyandbeyond.com',
      whatsapp: '923003234568',
    },
    pricing: 'PKR 12,000 - 45,000',
    rating: 4.7,
    isDemo: true,
  },
  {
    id: 'salon-3',
    name: 'Elite Bridal Salon',
    businessType: 'beauty-parlour',
    city: 'Karachi',
    area: 'F-7',
    description: 'Luxury bridal salon offering premium makeup and hair services. Certified makeup artists.',
    image: '/assets/demo/salon-3.jpg',
    contact: {
      phone: '051-32345678',
      email: 'contact@elitebridal.com',
      whatsapp: '923003234569',
    },
    pricing: 'PKR 18,000 - 60,000',
    rating: 4.9,
    isDemo: true,
  },

  // Décor (1+)
  {
    id: 'decor-1',
    name: 'Elegant Events Décor',
    businessType: 'decor',
    city: 'Karachi',
    area: 'DHA',
    description: 'Full-service event decoration with floral arrangements, lighting, and stage setup. Custom themes available.',
    image: '/assets/demo/decor-1.jpg',
    contact: {
      phone: '021-42345678',
      email: 'info@elegantevents.com',
      whatsapp: '923004234567',
    },
    pricing: 'PKR 50,000 - 500,000',
    rating: 4.8,
    isDemo: true,
  },
  {
    id: 'decor-2',
    name: 'Royal Floral Designs',
    businessType: 'decor',
    city: 'Karachi',
    area: 'Gulberg',
    description: 'Specialized in floral decorations and event styling. Fresh flowers and premium arrangements.',
    image: '/assets/demo/decor-2.jpg',
    contact: {
      phone: '042-42345678',
      email: 'contact@royalfloral.com',
      whatsapp: '923004234568',
    },
    pricing: 'PKR 40,000 - 400,000',
    rating: 4.7,
    isDemo: true,
  },
  {
    id: 'decor-3',
    name: 'Luxury Event Styling',
    businessType: 'decor',
    city: 'Karachi',
    area: 'F-6',
    description: 'Premium event styling and decoration services. Modern and traditional themes. Complete setup included.',
    image: '/assets/demo/decor-3.jpg',
    contact: {
      phone: '051-42345678',
      email: 'info@luxuryevents.com',
      whatsapp: '923004234569',
    },
    pricing: 'PKR 60,000 - 600,000',
    rating: 4.9,
    isDemo: true,
  },

  // Catering (6)
  {
    id: 'catering-1',
    name: 'Hanif Rajput',
    businessType: 'catering',
    city: 'Karachi',
    area: 'Clifton',
    description: 'Hanif Rajput Caterers, established in 1979, is one of Pakistan’s most prestigious catering service in Karachi, known for its excellence and legacy. They cater to a wide range of events, including weddings, corporate functions.',
    image: '/assets/demo/catering-1.jpg',
    contact: {
      phone: '021-52345678',
      email: 'bookings@hanifrajput.com',
      whatsapp: '923005234567',
    },
    pricing: 'PKR 600–850 per person',
    rating: 4.8,
    isDemo: true,
  },
  {
    id: 'catering-2',
    name: 'Delicious Delights',
    businessType: 'catering',
    city: 'Karachi',
    area: 'Gulberg',
    description: 'Traditional Pakistani cuisine with modern presentation. Buffet and plated options. Vegetarian friendly.',
    image: '/assets/demo/catering-2.jpg',
    contact: {
      phone: '042-52345678',
      email: 'info@deliciousdelights.com',
      whatsapp: '923005234568',
    },
    pricing: 'PKR 1,200 - 4,000 per person',
    rating: 4.7,
    isDemo: true,
  },
  {
    id: 'catering-3',
    name: 'Elite Food Services',
    businessType: 'catering',
    city: 'Karachi',
    area: 'F-7',
    description: 'High-end catering with international menu options. Professional serving staff and equipment rental available.',
    image: '/assets/demo/catering-3.jpg',
    contact: {
      phone: '051-52345678',
      email: 'contact@elitefood.com',
      whatsapp: '923005234569',
    },
    pricing: 'PKR 2,000 - 6,000 per person',
    rating: 4.9,
    isDemo: true,
  },
  {
    id: 'catering-4',
    name: 'BBQ Masters',
    businessType: 'catering',
    city: 'Karachi',
    area: 'DHA',
    description: 'Specialized in BBQ and grilled items. Live cooking stations. Perfect for outdoor events.',
    image: '/assets/demo/catering-4.jpg',
    contact: {
      phone: '021-52345679',
      email: 'info@bbqmasters.com',
      whatsapp: '923005234570',
    },
    pricing: 'PKR 1,800 - 4,500 per person',
    rating: 4.6,
    isDemo: true,
  },
  {
    id: 'catering-5',
    name: 'Sweet Celebrations',
    businessType: 'catering',
    city: 'Karachi',
    area: 'Model Town',
    description: 'Complete catering services including main course, desserts, and beverages. Custom menu planning.',
    image: '/assets/demo/catering-5.jpg',
    contact: {
      phone: '042-52345679',
      email: 'bookings@sweetcelebrations.com',
      whatsapp: '923005234571',
    },
    pricing: 'PKR 1,500 - 5,000 per person',
    rating: 4.8,
    isDemo: true,
  },
  {
    id: 'catering-6',
    name: 'Gourmet Events',
    businessType: 'catering',
    city: 'Karachi',
    area: 'Bahria Town',
    description: 'Premium gourmet catering with fusion cuisine. Professional presentation and service.',
    image: '/assets/demo/catering-6.jpg',
    contact: {
      phone: '021-52345680',
      email: 'info@gourmetevents.com',
      whatsapp: '923005234572',
    },
    pricing: 'PKR 2,500 - 7,000 per person',
    rating: 4.9,
    isDemo: true,
  },
]

export const getPartnersByType = (type: DemoPartner['businessType']): DemoPartner[] => {
  return demoPartners.filter(partner => partner.businessType === type)
}

export const getPartnerById = (id: string): DemoPartner | undefined => {
  return demoPartners.find(partner => partner.id === id)
}

