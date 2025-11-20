"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useWelcomePopup } from "@/contexts/WelcomePopupContext";

export default function Header() {
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openPopup } = useWelcomePopup();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#fff] border-b border-gray-300 py-4">
      <nav className="mx-auto flex items-center justify-between px-4 sm:px-6 container-main" style={{ maxWidth: "1280px" }}>
        {/* Logo and Title */}
        <div className="flex items-center space-x-3 z-50">
          <Link href="/" passHref className="flex items-center space-x-2">
            {logoError ? (
              <Image 
                src="/uploads/The-Wedding-and-event-logo.png" 
                alt="Wedding & Events - Your Wedding, Your Way" 
                width={300} 
                height={96} 
                priority 
                className="h-16 sm:h-20 lg:h-24 w-auto"
              />
            ) : (
              <Image 
                src="/assets/logo-new.png" 
                alt="Wedding & Events - Your Wedding, Your Way" 
                width={300} 
                height={96} 
                priority 
                className="h-16 sm:h-20 lg:h-24 w-auto"
                onError={() => setLogoError(true)}
                unoptimized
              />
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-6 text-gray-700 font-medium">
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
          <li>
            <Link
              href="/contact"
              className={`main-header-nav${pathname === "/contact" ? " active" : ""}`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <button 
            onClick={openPopup}
            className="px-6 py-3 border-2 border-gray-900 rounded-full font-semibold text-gray-900 hover:bg-gray-100 transition fontSize"
          >
            Updates & Discounts
          </button>
          <Link href="/partner-onboarding" className="px-6 py-3 rounded-full font-semibold text-white bg-[#d13f43] hover:bg-[#b82f33] transition fontSize">
            Partner Onboarding
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden z-50 p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-64 sm:w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            {/* Mobile Navigation Links */}
            <ul className="flex flex-col space-y-4 mb-8">
              <li>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`main-header-nav text-lg block py-2${pathname === "/" ? " active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  onClick={closeMobileMenu}
                  className={`main-header-nav text-lg block py-2${pathname === "/services" ? " active" : ""}`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  onClick={closeMobileMenu}
                  className={`main-header-nav text-lg block py-2${pathname === "/blogs" ? " active" : ""}`}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className={`main-header-nav text-lg block py-2${pathname === "/about" ? " active" : ""}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={`main-header-nav text-lg block py-2${pathname === "/contact" ? " active" : ""}`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Mobile Actions */}
            <div className="flex flex-col space-y-3 border-t pt-6">
              <button 
                onClick={() => {
                  openPopup();
                  closeMobileMenu();
                }}
                className="w-full px-4 py-3 border-2 border-gray-900 rounded-full font-semibold text-gray-900 hover:bg-gray-100 transition text-sm"
              >
                Updates & Discounts
              </button>
              <Link 
                href="/partner-onboarding" 
                onClick={closeMobileMenu}
                className="w-full px-4 py-3 rounded-full font-semibold text-white bg-[#d13f43] hover:bg-[#b82f33] transition text-center text-sm"
              >
                Partner Onboarding
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}