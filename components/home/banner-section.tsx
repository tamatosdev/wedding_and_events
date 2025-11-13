"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHomepageCMS } from "@/hooks/useHomepageCMS";

interface Banner {
  id: number | string;
  image: string;
  alt: string;
  link: string;
}

// Default banners fallback
const defaultBanners: Banner[] = [
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

export function BannerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: cmsData } = useHomepageCMS();

  // Get banner content from CMS or use defaults
  const bannerContent = cmsData?.content?.banner;
  const banners: Banner[] = (bannerContent?.content?.items as Banner[]) || defaultBanners;

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
        <div className="flex justify-center items-center">
          {/* Left Arrow - Outside Banner */}
          <button
            onClick={goToPrevious}
            className="bg-[#D13F43] hover:bg-[#B8363A] text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 mr-6"
            aria-label="Previous banner"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>

          {/* Banner Slider Container */}
          <div className="w-full max-w-6xl">
            <div className="relative overflow-hidden rounded-lg slider-container">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {banners.map((banner: Banner, index: number) => (
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
            </div>
          </div>

          {/* Right Arrow - Outside Banner */}
          <button
            onClick={goToNext}
            className="bg-[#D13F43] hover:bg-[#B8363A] text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 ml-6"
            aria-label="Next banner"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}