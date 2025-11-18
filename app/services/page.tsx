import Header from '@/components/Header'
import Footer from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const services = [
  {
    id: 1,
    name: 'Wedding Halls/Venues',
    category: 'Venue',
    description: 'Discover stunning wedding halls and event spaces designed to make your special day unforgettable. From cozy gatherings to grand celebrations, find the perfect venue that matches your vision.',
    image: '/uploads/Vendor-1.png',
    features: ['Indoor & Outdoor Options', 'Multiple Capacity Choices', 'Custom Catering Services', 'Convenient Parking Facilities']
  },
  {
    id: 2,
    name: 'Catering',
    category: 'Catering',
    description: 'Experience premium catering that delights every palate. From authentic Pakistani flavors to elegant continental cuisine, our expert chefs and professional staff ensure every meal is served with perfection and care.',
    image: '/uploads/Vendor-2.png',
    features: ['Authentic Pakistani Cuisine', 'Exquisite Continental Options', 'Customized Menu Selections', 'Professional Service Team']
  },
  {
    id: 3,
    name: 'Decoration',
    category: 'Decoration',
    description: 'Bring your dream wedding to life with breathtaking décor. From enchanting floral arrangements to stunning stage designs, we create an ambiance that leaves a lasting impression.',
    image: '/uploads/Vendor-5.png',
    features: ['Exquisite Floral Arrangements', 'Elegant Stage Décor', 'Customized Lighting Setups', 'Themed Event Decorations']
  },
  {
    id: 4,
    name: 'Beauty Parlor',
    category: 'Beauty',
    description: 'Step into the spotlight with our professional bridal beauty and salon services -  where every look is crafted to make you feel radiant on your big day. From flawless makeup to elegant hairstyles, we ensure you shine with confidence and grace.',
    image: '/uploads/Vendor-3.png',
    features: ['Signature Bridal Makeup', 'Elegant Hairstyling', 'Traditional Mehndi Art', 'Custom Bridal Packages']
  },
  {
    id: 5,
    name: 'Boutiques',
    category: 'Fashion',
    description: 'Explore an exclusive bridal wear collection that blends timeless tradition with modern elegance. From designer ensembles to custom-tailored creations, find the perfect look to make your special day truly unforgettable.',
    image: '/uploads/Vendor-4.png',
    features: ['Designer Bridal Collections', 'Custom Tailoring Services', 'Traditional & Contemporary Styles', 'Elegant Accessories']
  },
  
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Left Border */}
      <img
        src="/uploads/Border.png"
        alt="Left Border"
        className="site-border left"
      />
      {/* Right Border */}
      <img
        src="/uploads/Border.png"
        alt="Right Border"
        className="site-border right"
      />
      <Header />

      <main className="mt-20">
        {/* Hero Section */}
        <section className="relative py-16">
          <div className="Left-Floral absolute left-0 top-0 z-0">
            <Image
              src="/uploads/Flower-1.png"
              alt="Left Floral"
              width={200}
              height={600}
            />
          </div>
          <div className="Right-Floral absolute right-0 top-0 z-0">
            <Image
              src="/uploads/Flower-2.png"
              alt="Right Floral"
              width={400}
              height={800}
            />
          </div>
          
          <div className="container-main mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
                Our Services
              </h1>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                We’re here to make your BIG DAY effortless, memorable, and distinctly yours! 
              </p>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Complete wedding & event planning made effortless.
              </p>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                From Venue booking, Catering, Event décor, Bridal couture, Beauty salons and other ,  
we connect you with trusted vendors who bring your dream day to life.

              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 container-main mx-auto px-4 services-grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="bg-[#F7E9DB] p-8 flex items-center justify-center">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.name}</h3>
                  <p className="text-gray-600 mb-4 service-desc">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-[#d13f43]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/vendors?category=${service.category}`}>
                    <Button className="w-full bg-[#d13f43] hover:bg-[#b82f33] text-white">
                      Browse {service.name}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-[#F7E9DB] mt-12">
          <div className="container-main mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Why Choose Our Services?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We make wedding planning simple, stress-free, and joyful
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/uploads/verified.png"
                    alt="Verified Vendor"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Verified Vendors</h3>
                <p className="text-gray-600">A smart, reliable online platform that connects you directly with “verified” venues and vendors - ensuring convenience, quality, options, value for money, and complete peace of mind.</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Image
                    src="/uploads/value.png"
                    alt="Verified Vendor"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Value for Money</h3>
                <p className="text-gray-600">Smart comparisons and budgeting options will make your BIG DAY a grand and stress-free one, while keeping it affordable.</p>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/uploads/thumb-ups.png"
                    alt="Verified Vendor"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Complete Convenience </h3>
                <p className="text-gray-600">Access trusted & verified venues, vendors, and services all in one place without the hassle of endless searches and visits.</p>
              </div>

               <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/uploads/tool.png"
                    alt="Verified Vendor"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Smart Planning Tools  </h3>
                <p className="text-gray-600">Enjoy a seamless experience with our easy-to-use, technology-driven platform.</p>
              </div>

               <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/uploads/choice.png"
                    alt="Verified Vendor"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Endless Choices  </h3>
                <p className="text-gray-600">Explore diverse options across every category to suit your preferences, lifestyle and budget.</p>
              </div>

              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/uploads/travel-agency.png"
                    alt="Verified Vendor"
                    width={32}
                    height={32}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Save on travel </h3>
                <p className="text-gray-600">We provide all the necessities, options, and prices on a single platform, helping you avoid all the driving, parking, and traffic issues. Our site provides you with access to all of this from the comfort of your own home.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 mt-12">
          <div className="container-main mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Ready to Plan Your Wedding?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Browse our vendors and find the perfect services for your special day
            </p>
            <Link href="/vendors">
              <Button className="bg-[#d13f43] hover:bg-[#b82f33] text-white px-8 py-3 mr-4">
                Browse Vendors
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-[#d13f43] text-[#d13f43] hover:bg-[#fbecec] px-8 py-3">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

