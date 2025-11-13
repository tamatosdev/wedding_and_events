"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BannerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      image: "/uploads/MCT Google ads Banner - R2-01.png",
      alt: "MCT Google ads Banner - Visit MCT Business",
      link: "https://mctbusiness.com/insurance/",
    },
    {
      id: 2,
      image: "/uploads/MCT Google ads Banner 02.png",
      alt: "MCT Google ads Banner 02 - Visit MCT Business",
      link: "https://mctbusiness.com/insurance/",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="relative w-full banner-section">
      <div className="container-main px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl relative">
            {/* Banner Slider Container */}
            <div className="relative overflow-hidden rounded-lg slider-container">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {banners.map((banner, index) => (
                  <div key={banner.id} className="w-full flex-shrink-0">
                    <Link 
                      href={banner.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Image
                        src={banner.image}
                        alt={banner.alt}
                        width={1200}
                        height={300}
                        className="w-full h-auto object-contain"
                        priority={index === 0}
                      />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 slider-arrow"
                aria-label="Previous banner"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 slider-arrow"
                aria-label="Next banner"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 slider-dots">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide
                        ? "bg-[#D13F43] scale-110"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}