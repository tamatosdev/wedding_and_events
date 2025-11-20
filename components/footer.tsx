import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#f9efe3] pt-8 sm:pt-12 pb-4 px-4 sm:px-6 lg:px-8 mt-16 rounded-t-3xl shadow-inner">
      <div className="max-w-7xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-6 pb-8 sm:pb-12 mt-4 sm:mt-10 items-start">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col logo-desc text-left">
            <div className="flex items-center mb-4">
              <Image 
                src="/uploads/The-Wedding-and-event-logo.png" 
                alt="Wedding & Events Logo" 
                width={160} 
                height={48} 
                priority 
                className="w-32 sm:w-40 h-auto"
              />
            </div>
            <p className="text-gray-700 text-sm sm:text-base max-w-xs mt-2 sm:mt-5 leading-relaxed">
              Pakistan's most innovative wedding planning platform. We connect couples with verified venues and vendors to make every celebration seamless, joyful, and truly unforgettable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 Quick-links text-left">
            <h3 className="font-semibold mb-3 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link href="/" className="hover:text-[#D13F43] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#D13F43] transition-colors">About Us</Link></li>
              <li><Link href="/blogs" className="hover:text-[#D13F43] transition-colors">Blogs</Link></li>
              <li><Link href="/contact" className="hover:text-[#D13F43] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 services text-left">
            <h3 className="font-semibold mb-3 text-base sm:text-lg">Services</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link href="/vendors?category=Venue" className="hover:text-[#D13F43] transition-colors">Wedding Halls/Venues</Link></li>
              <li><Link href="/vendors?category=Catering" className="hover:text-[#D13F43] transition-colors">Catering</Link></li>
              <li><Link href="/vendors?category=Beauty" className="hover:text-[#D13F43] transition-colors">Beauty Salon</Link></li>
              <li><Link href="/vendors?category=Fashion" className="hover:text-[#D13F43] transition-colors">Boutiques</Link></li>
              <li><Link href="/vendors?category=Decoration" className="hover:text-[#D13F43] transition-colors">Decoration</Link></li>
            </ul>
          </div>

          {/* Useful */}
          <div className="lg:col-span-3 useful text-left">
            <h3 className="font-semibold mb-3 text-base sm:text-lg">Useful</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link href="/terms-conditions" className="hover:text-[#D13F43] transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#D13F43] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/partner-onboarding" className="hover:text-[#D13F43] transition-colors">Vendor Signup</Link></li>
            </ul>
          </div>
        </div>

        <hr className="border-[#2E2E2E4D] mb-4 sm:mb-6 mt-4 sm:mt-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-center py-4">
          <p className="footer text-center text-sm sm:text-base text-gray-700">
            © Copyright {new Date().getFullYear()} Wedding and Events® All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
