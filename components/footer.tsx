import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#f9efe3] text-gray-800 pt-12 pb-6 mt-10 border-t border-[#e2d2bc]">
      <div className="mx-auto px-6 container-main" style={{ maxWidth: "1280px" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 mt-10 items-start main-footer-flex">
          {/* Logo & Description */}
          <div className="md:col-span-1 flex flex-col logo-desc"> 
            <div className="flex items-center mb-4">
              <Image src="/uploads/The-Wedding-and-event-logo.png" alt="Wedding & Events Logo" width={160} height={48} priority />
            </div>
            <p className="text-gray-700 text-sm max-w-xs mt-5">
              Pakistan’s most trusted wedding planning platform. We connect couples with verified venues and vendors to make wedding planning simple, stress-free, and joyful.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 Quick-links">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/blogs">Blogs</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1 services">
            <h3 className="font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Wedding Halls/Venues</li>
              <li>Catering</li>
              <li>Beauty Salon</li>
              <li>Boutiques</li>
              <li>Decoration</li>
            </ul>
          </div>

          {/* Useful */}
          <div className="md:col-span-1 useful">
            <h3 className="font-semibold mb-3">Useful</h3>
            <ul className="space-y-2 text-sm">
              <li>FAQ’s</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Vendor Signup</li>
            </ul>
          </div>

        </div>

        <hr className="border-[#2E2E2E4D] mb-6 mt-8" />

        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="footer">
            © Copyright {new Date().getFullYear()} Wedding and Events® All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
