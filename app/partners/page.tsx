import Header from '@/components/Header'
import Footer from '@/components/footer'
import PartnerShowcase from '@/components/partner-showcase/PartnerShowcase'
import WhatsAppFloating from '@/components/whatsapp-floating'

export default function PartnersPage() {
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
      <PartnerShowcase />
      <Footer />
      <WhatsAppFloating />
    </div>
  )
}
