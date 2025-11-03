import Header from '@/components/Header'
import Footer from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const stats = [
  { number: '5000+', label: 'Happy Couples' },
  { number: '2000+', label: 'Verified Vendors' },
  { number: '50+', label: 'Cities' },
  { number: '10000+', label: 'Events Planned' }
]

const values = [
  {
    title: 'Trust & Reliability',
    description: 'We verify all our vendors to ensure you get the best service and peace of mind.',
    icon: '✓'
  },
  {
    title: 'Simplicity',
    description: 'We make wedding planning simple and stress-free with our easy-to-use platform.',
    icon: '✓'
  },
  {
    title: 'Excellence',
    description: 'We connect you with top-rated vendors who deliver exceptional service.',
    icon: '✓'
  },
  {
    title: 'Support',
    description: 'Our team is here to help you every step of the way in your wedding planning journey.',
    icon: '✓'
  }
]

const team = [
  {
    name: 'Wedding Planning Experts',
    role: 'Our dedicated team of wedding planners',
    description: 'Experienced professionals who understand the importance of your special day'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Left Border */}
      <Image
        width={100}
        height={100}
        src="/uploads/border.png"
        alt="Left Border"
        className="site-border left"
      />
      {/* Right Border */}
      <Image
        width={100}
        height={100}
        src="/uploads/border.png"
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
                About Us
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Pakistan&apos;s most trusted wedding planning platform. We connect couples with verified venues and vendors to make wedding planning simple, stress-free, and joyful.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 container-main mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                Wedding & Events was founded with a simple mission: to make wedding planning easier, more accessible, and less stressful for couples across Pakistan. We understand that planning a wedding can be overwhelming, with countless decisions to make and vendors to choose from.
              </p>
              <p>
                Our platform was created to solve this problem by connecting couples with verified, trusted vendors in one convenient place. We carefully vet all our partners to ensure they meet our high standards for quality, reliability, and customer service.
              </p>
              <p>
                Today, we&apos;ve helped thousands of couples plan their perfect day, working with over 2000 verified vendors across 50+ cities in Pakistan. We&apos;re proud to be Pakistan&apos;s most trusted wedding planning platform.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[#F7E9DB] mt-12">
          <div className="container-main mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#d13f43] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg text-gray-700 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 container-main mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What drives us and makes us the trusted choice for wedding planning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#d13f43] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{value.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-[#F7E9DB] mt-12">
          <div className="container-main mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
                Our Mission
              </h2>
              <p className="text-xl text-gray-700 text-center leading-relaxed">
                To empower couples to plan their perfect wedding by providing easy access to verified vendors, 
                trusted recommendations, and personalized support - making wedding planning a joyful experience 
                rather than a stressful one.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 mt-12">
          <div className="container-main mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Ready to Start Planning?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of happy couples who found their perfect vendors through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vendors">
                <Button className="bg-[#d13f43] hover:bg-[#b82f33] text-white px-8 py-3">
                  Browse Vendors
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-[#d13f43] text-[#d13f43] hover:bg-[#fbecec] px-8 py-3">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

