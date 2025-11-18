import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#f9efe3] pt-12 pb-4 px-4 mt-16 rounded-t-3xl shadow-inner">
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 mt-10 items-start main-footer-flex m-auto">
        {/* Logo & Description */}
        <div className="md:col-span-2 flex flex-col logo-desc text-left">
          <div className="flex items-center mb-4">
            <Image src="/uploads/The-Wedding-and-event-logo.png" alt="Wedding & Events Logo" width={160} height={48} priority />
          </div>
          <p className="text-gray-700 text-sm max-w-xs mt-5">
            Pakistan’s most innovative wedding planning platform. We connect couples with verified venues and vendors to make every celebration seamless, joyful, and truly unforgettable.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1 Quick-links text-left">
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/blogs">Blogs</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="md:col-span-1 services text-left">
          <h3 className="font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/vendors?category=Venue">Wedding Halls/Venues</Link></li>
            <li><Link href="/vendors?category=Catering">Catering</Link></li>
            <li><Link href="/vendors?category=Beauty">Beauty Salon</Link></li>
            <li><Link href="/vendors?category=Fashion">Boutiques</Link></li>
            <li><Link href="/vendors?category=Decoration">Decoration</Link></li>
          </ul>
        </div>

        {/* Useful */}
        <div className="md:col-span-1 useful text-left">
          <h3 className="font-semibold mb-3">Useful</h3>
          <ul className="space-y-2 text-sm">
            <li>FAQ’s</li>
            <li><Link href="/terms-conditions">Terms &amp; Conditions</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li>Vendor Signup</li>
          </ul>
        </div>
      </div>

      <hr className="border-[#2E2E2E4D] mb-6 mt-8" />

      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <p className="footer text-center w-full mt-4 md:mt-0">
          © Copyright {new Date().getFullYear()} Wedding and Events® All right reserved.
        </p>
      </div>
    </footer>
  );
}


