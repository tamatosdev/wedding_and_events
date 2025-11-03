import Header from '@/components/Header'
import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedListings } from '@/components/home/featured-listings'
import WeddingPlanning from '@/components/home/Wedding-planning'
import TestimonialsSection from '@/components/home/testimonials-section'
import { CTASection } from '@/components/ui/cta-section'
import { SimpleSeamlessStressFree } from '@/components/home/SimpleSeamlessStressFree'
import Footer from '@/components/footer'
import Image from 'next/image'

export default function HomePage() {
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
      
      <main>
        <HeroSection />
        <CategoriesSection />
        <SimpleSeamlessStressFree />
        <FeaturedListings />
        <WeddingPlanning />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}