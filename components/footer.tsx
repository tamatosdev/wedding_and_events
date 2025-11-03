import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#f9efe3] text-gray-800 pt-12 pb-6 mt-10 border-t border-[#e2d2bc]">
      <div className="mx-auto px-6 container-main" style={{ maxWidth: "1280px" }}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 mt-10 items-start main-footer-flex">
          {/* Logo & Description */}
          <div className="md:col-span-1 flex flex-col logo-desc"> 
            <div className="flex items-center mb-4">
              <Image src="/uploads/main-logo.png" alt="Wedding & Events Logo" width={160} height={48} priority />
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

          {/* Newsletter */}
          <div className="md:col-span-1 newsletter">
            <h3 className="font-semibold mb-3">Subscribe To Our Newsletter</h3>
            <p className="text-sm mb-4 max-w-sm">
              Join our mailing list to stay in the loop with our newest for Event and concert
            </p>

            <form className="max-w-md">
              <div className="flex items-center justify-sub rounded-full border-2 border-[#e2d2bc] bg-transparent p-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 rounded-full"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="mr-1 bg-[#d13f43] text-white px-5 py-2 rounded-full font-semibold shadow-sm"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <hr className="border-[#2E2E2E4D] mb-6 mt-8" />

        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="footer">
            © Copyright {new Date().getFullYear()} Wedding and Events® All right reserved.
          </p>

          <div className="flex items-center space-x-3">
            <div className="flex space-x-3">
              {/* Social small circular icons */}
              <a href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e2d2bc] text-[#d13f43] bg-white hover:bg-[#fbecec]">
                <Image src="/uploads/facebook.png" alt="facebook icon" width={58} height={58} />
              </a>

              <a href="#" aria-label="X" className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e2d2bc] text-[#d13f43] bg-white hover:bg-[#fbecec]">
                <Image src="/uploads/X.com.png" alt="X icon" width={58} height={58} />
              </a>

              <a href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e2d2bc] text-[#d13f43] bg-white hover:bg-[#fbecec]">
                <Image src="/uploads/instagram.png" alt="instagram icon" width={58} height={58} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
