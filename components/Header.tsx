"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useWelcomePopup } from "@/contexts/WelcomePopupContext";

export default function Header() {
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);
  const { openPopup } = useWelcomePopup();

  return (
    <header className="bg-[#fff] border-b border-gray-300 py-4">
      <nav className="mx-auto flex items-center justify-between px-6 container-main" style={{ maxWidth: "1280px" }}>
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <Link href="/" passHref className="flex items-center space-x-2">
            <Image 
              src={logoError ? "/uploads/The-Wedding-and-event-logo.png" : "/assets/logo-new.png"} 
              alt="Wedding & Events - Your Wedding, Your Way" 
              width={300} 
              height={96} 
              priority 
              className="h-24 w-auto"
              onError={() => setLogoError(true)}
            />
            {/* TODO: Replace /assets/logo-new.png with actual logo image - Currently falls back to existing logo */}
            {/* <span className="text-sm text-gray-600 font-medium hidden md:block">
              Your Wedding, Your Way
            </span> */}
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
          <li>
            <Link
              href="/contact"
              className={`main-header-nav${pathname === "/about" ? " active" : ""}`}
            >
              contact Us
            </Link>
          </li>
        </ul>
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Updates and Discounts Button */}
          <button 
            onClick={openPopup}
            className="px-6 py-3 border-2 border-gray-900 rounded-full font-semibold text-gray-900 hover:bg-gray-100 transition fontSize"
          >
            Update and Discounts
          </button>
          {/* Partner Onboarding Button */}
          <Link href="/partner-onboarding" className="px-6 py-3 rounded-full font-semibold text-white bg-[#d13f43] hover:bg-[#b82f33] transition fontSize">
            Partner Onboarding
          </Link>
        </div>
      </nav>
    </header>
  );
}