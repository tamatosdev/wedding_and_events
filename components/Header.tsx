"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-[#fff] border-b border-gray-300 py-4">
      <nav className="mx-auto flex items-center justify-between px-6 container-main" style={{ maxWidth: "1280px" }}>
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <Link href="/" passHref>
            <Image src="/uploads/The-Wedding-and-event-logo.png" alt="Wedding & Events Logo" width={150} height={48} priority />
          </Link>
        </div>
        {/* Navigation */}
        <ul className="flex items-center space-x-6 text-gray-700 font-medium">
          <li>
            <Link
              href="/"
              className={`main-header-nav${pathname === "/" ? " active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/venues"  
              className={`main-header-nav${pathname === "/venues" ? " active" : ""}`}
            >   
              Venues 
            </Link>
          </li> 
          <li>
            <Link
              href="/services"
              className={`main-header-nav${pathname === "/services" ? " active" : ""}`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className={`main-header-nav${pathname === "/blogs" ? " active" : ""}`}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`main-header-nav${pathname === "/about" ? " active" : ""}`}
            >
              About Us
            </Link>
          </li>
        </ul>
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Contact Us Button */}
          <Link href="/contact" className="px-6 py-3 border-2 border-gray-900 rounded-full font-semibold text-gray-900 hover:bg-gray-100 transition fontSize">
            Contact Us
          </Link>
          {/* List your Business Button */}
          <Link href="/list-business" className="px-6 py-3 rounded-full font-semibold text-white bg-[#d13f43] hover:bg-[#b82f33] transition fontSize">
            List your Business
          </Link>
        </div>
      </nav>
    </header>
  );
}