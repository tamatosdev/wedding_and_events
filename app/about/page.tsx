import Header from '@/components/Header'
import Footer from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// const stats = [
//   { number: '5000+', label: 'Happy Couples' },
//   { number: '2000+', label: 'Verified Vendors' },
//   { number: '50+', label: 'Cities' },
//   { number: '10000+', label: 'Events Planned' }
// ]

const values = [
  {
    title: 'Complete Convenience ',
    description: 'Access trusted & verified venues, vendors, and services all in one place without the hassle of endless searches and visits.',
    icon: '✓'
  },
  {
    title: 'Value for Money',
    description: 'Smart comparisons and budgeting options will make your BIG DAY a grand and stress-free, while keeping it affordable.',
    icon: '✓'
  },
  {
    title: 'Smart Planning Tools ',
    description: 'Enjoy a seamless experience with our easy-to-use, technology-driven platform.',
    icon: '✓'
  },
  {
    title: 'Endless Choices ',
    description: 'Explore diverse options across every category to suit your preferences, lifestyle and budget.',
    icon: '✓'
  },
  {
    title: 'Unforgettable Celebrations  ',
    description: 'We provide the option to let you craft events that leave a lasting impression on your guests and create a truly special moment for you to remember.',
    icon: '✓'
  },
  {
    title: 'Save on travel ',
    description: 'We provide all the necessities, options, and prices on a single platform, helping you avoid all the driving, parking, and traffic issues. Our site provides you with access to all of this from the comfort of your own home.',
    icon: '✓'
  },
  {
    title: 'Effortless Experience  ',
    description: 'Relax while our team and partners handle the details - from start to finish.',
    icon: '✓'
  },
  
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
        <section className="relative pt-16">
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
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Welcome to The Wedding and Event! - Pakistan’s most innovative ONE-WINDOW wedding and event planning platform. We’re here to make your BIG DAY effortless, memorable, and distinctly yours!
              </p>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">From Venue booking, Catering, Event décor, Bridal couture, Beauty salons, Groom dressing, Jewelry, Car rentals, Equipment rental, Cakes, Flowers, Travel, Security services and others – we bring everything you need to one place, just one click away!</p>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto"><strong>Our goal is simple:</strong> by saving you time, expanding your options, and reducing expenses, we aim to eliminate stress, to help you enjoy a flawless and memorable celebration that perfectly reflects your story.</p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 container-main mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4 text-center">
              <p className='text-lg text-gray-600 max-w-4xl mx-auto'>
                In today’s wedding & event planning, numerous steps, activities & pieces need to be put together for a perfect & memorable occasion.
                 It can easily become overwhelming and complex to find and coordinate multiple vendors while balancing options and costs. Coordinating every 
                little detail to perfectly fit the desired theme with endless options available becomes more stressful than it needs to be.
              </p>
              <p className='text-lg text-gray-600 max-w-4xl mx-auto'>
                That’s why we decided to create a smart, reliable online platform that connects you directly with <strong>“verified”</strong> venues and vendors - ensuring convenience, quality, options, value for money, and complete peace of mind. <strong>The Wedding and Event</strong> is seamlessly designed with a vision to transform how people plan weddings and events. 
              </p>
              <p className='text-lg text-gray-600 max-w-4xl mx-auto'>
                We are honored to help parents, families, and individuals plan seamless, joyful celebrations - turning dreams into unforgettable experiences <i>“Because every moment deserves to be celebrated”!!</i>
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* <section className="py-16 bg-[#F7E9DB] mt-12">
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
        </section> */}

        {/* Our Values Section */}
        <section className="py-16 bg-[#F7E9DB]">
          <div className="container-main mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose Us
            </h2>
            {/* <p className="text-gray-600 max-w-2xl mx-auto">
              What drives us and makes us the trusted choice for wedding planning
            </p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
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
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 mt-12">
          <div className="container-main mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
                Our Mission
              </h2>
              <p className="text-xl text-gray-700 text-center leading-relaxed">
                To simplify and innovate the way people plan weddings and events - by offering a complete, one-window solution that ensures every 
                celebration is smooth, joyful, excellent value for money and completely stress-free.
              </p>
              <p className='text-xl text-gray-700 text-center leading-relaxed pt-12'><strong>Please Note:</strong> <a href='https://theweddingandevent.com'>The Wedding and Events</a>  is a subsidiary of <a className='underline' href="https://mctbusiness.com/">MCT Business (Pvt) Ltd.</a> 
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
              Join thousands of happy customers who found their perfect vendors through our platform
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

