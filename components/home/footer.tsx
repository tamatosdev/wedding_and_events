import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Wedding & Events</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner in wedding planning. We connect you with the best vendors 
              to make your special day unforgettable.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/press" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/vendors" className="text-gray-400 hover:text-white transition-colors">Find Vendors</a></li>
              <li><a href="/vendors?category=catering" className="text-gray-400 hover:text-white transition-colors">Catering</a></li>
              <li><a href="/vendors?category=venue" className="text-gray-400 hover:text-white transition-colors">Venues</a></li>
              <li><a href="/vendors?category=decorations" className="text-gray-400 hover:text-white transition-colors">Decor</a></li>
              <li><a href="/vendors?category=photography" className="text-gray-400 hover:text-white transition-colors">Photographers</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/refund" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">Subscribe To Our Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Get the latest updates on vendors, tips, and special offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2024 Wedding & Events. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
