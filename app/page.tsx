import Header from '@/components/Header'
import { HeroSection } from '@/components/home/hero-section'
import { BannerSection } from '@/components/home/banner-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedListings } from '@/components/home/featured-listings'
import WeddingPlanning from '@/components/home/Wedding-planning'
import TestimonialsSection from '@/components/home/testimonials-section'
import { CTASection } from '@/components/ui/cta-section'
import { SimpleSeamlessStressFree } from '@/components/home/SimpleSeamlessStressFree'
import Footer from '@/components/footer'
import FAQ from '@/components/FAQ'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding & Events - Your Wedding, Your Way | Find Best Venues & Vendors',
  description: 'Discover the best wedding venues and vendors in Pakistan. Plan your perfect celebration with trusted venues, catering, photography, and more.',
  keywords: 'wedding venues, event planning, wedding vendors, Karachi weddings, Pakistan weddings, wedding halls, catering services',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Left Border */}
        <img
          src="/uploads/Border.png"
          alt="Left Border"
          className="site-border left hidden lg:block"
        />
        {/* Right Border */}
        <img
          src="/uploads/Border.png"
          alt="Right Border"
          className="site-border right hidden lg:block"
        />
      <Header />
      
      <main>
        <HeroSection />
        <CategoriesSection />
        <BannerSection />
        
        {/* Section #3: Decor section - ensuring Decor appears as section #3 */}
        {/* TODO: Verify Decor section placement */}
        <SimpleSeamlessStressFree />
        <FeaturedListings />
        <WeddingPlanning />
        <TestimonialsSection />
        {/* <FAQ /> */}
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}