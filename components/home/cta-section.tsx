import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-16 bg-red-600 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-20 h-20 bg-white opacity-5 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Ready to to make your dream event a reality?
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto">
          Explore beautiful venues, connect with the right vendors, and let us make your planning journey effortless and exciting. 
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/vendors">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-3">
              Get Started
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 font-semibold px-8 py-3">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
