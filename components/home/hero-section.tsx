"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useHomepageCMS } from "@/hooks/useHomepageCMS";

export function HeroSection() {
  const [searchMode, setSearchMode] = useState<"service" | "name">("service");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const router = useRouter();
  const { data: cmsData, loading } = useHomepageCMS();

  // Get hero content from CMS or use defaults
  const heroContent = cmsData?.content?.hero;
  const heroTitle = heroContent?.title || "Your Perfect\nEvent Starts Here!";
  const heroImages = heroContent?.images || [
    "/uploads/wedding-hall.png",
    "/uploads/catering-new.png",
    "/uploads/decoration.png",
    "/uploads/wedding-dress.png"
  ];
  const heroCategories = heroContent?.content?.categories || ["Venues", "Catering", "Decoration", "Beauty Parlor", "Boutiques"];
  const heroCities = heroContent?.content?.cities || ["Karachi"];

  const categories = heroCategories;
  const cities = heroCities;

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchMode === "name") {
      // Search by name only
      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }
    } else {
      // Search by service & city
      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedCity) params.append("city", selectedCity);
      if (searchTerm.trim()) params.append("search", searchTerm.trim());
    }

    router.push(`/vendors?${params.toString()}`);
  };

  const featuredVenues = [
    {
      id: 1,
      name: "Royal Banquet Hall",
      image: "/placeholder-image.jpg",
      price: "PKR 150,000 - 300,000",
    },
    {
      id: 2,
      name: "Garden Venue",
      image: "/placeholder-image.jpg",
      price: "PKR 100,000 - 200,000",
    },
    {
      id: 3,
      name: "Luxury Hotel",
      image: "/placeholder-image.jpg",
      price: "PKR 200,000 - 500,000",
    },
    {
      id: 4,
      name: "Traditional Hall",
      image: "/placeholder-image.jpg",
      price: "PKR 80,000 - 150,000",
    },
  ];

  return (
    <section className="relative herro-main w-full overflow-hidden">
      {/* Floral Decorations */}
      <div className="Left-Floral hidden lg:block">
        <Image
          src="/uploads/Artboard-2@4x.png"
          alt="Left Floral"
          width={250}
          height={700}
        />
      </div>
      <div className="Right-Floral hidden lg:block">
        <Image
          src="/uploads/Artboard2@4x(1).png"
          alt="Right Floral"
          width={250}
          height={700}
        />
      </div>
      {/* Background Image */}
      <div className="w-full background-hero-img">
        <div className="container-main mx-auto px-3 sm:px-4 lg:px-6">
          <div className="inner-background-hero-img">
            <div className="text-center mx-auto max-w-4xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 px-2">
                {heroTitle.split('\n').map((line, i) => (
                  <span key={i}>
                    {line.includes('Event') ? (
                      <>
                        {line.split('Event').map((part, j) => (
                          <span key={j}>
                            {part}
                            {j === 0 && <span className="text-[#d13f43]">Event</span>}
                          </span>
                        ))}
                      </>
                    ) : (
                      line
                    )}
                    {i < heroTitle.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h1>

              {/* Search Box */}
              <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-2.5 sm:p-3 lg:p-4 shadow-lg max-w-3xl mx-auto mb-4 sm:mb-6 lg:mb-8">
                {/* Search Tabs */}
                <div className="mb-3 sm:mb-4 lg:mb-5 flex justify-center gap-1.5 sm:gap-2 lg:gap-4 flex-wrap">
                  <button 
                    onClick={() => {
                      setSearchMode("service");
                      setSearchTerm("");
                    }}
                    className={`px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm transition-colors whitespace-nowrap ${
                      searchMode === "service"
                        ? "bg-[#d13f43] text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Search by Service & City
                  </button>
                  <button 
                    onClick={() => {
                      setSearchMode("name");
                      setSelectedCategory("");
                      setSelectedCity("");
                    }}
                    className={`px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm transition-colors whitespace-nowrap ${
                      searchMode === "name"
                        ? "bg-[#d13f43] text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Search by Name
                  </button>
                </div>

                {searchMode === "name" ? (
                /* Search by Name Mode */
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter vendor name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      className="w-full p-2 sm:p-2.5 lg:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#d13f43] text-xs sm:text-sm lg:text-base"
                    />
                  </div>
                  <button 
                    onClick={handleSearch}
                    className="bg-[#d13f43] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold hover:bg-[#bf383c] transition-colors text-xs sm:text-sm lg:text-base whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
              ) : (
                /* Search by Service & City Mode */
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="flex-1">
                    <select 
                      className="w-full p-2 sm:p-2.5 lg:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#d13f43] text-xs sm:text-sm lg:text-base"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Select Service</option>
                      {categories.map((cat: string) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <select 
                      className="w-full p-2 sm:p-2.5 lg:p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#d13f43] text-xs sm:text-sm lg:text-base"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map((city: string) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    onClick={handleSearch}
                    className="bg-[#d13f43] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold hover:bg-[#bf383c] transition-colors text-xs sm:text-sm lg:text-base whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
              )}
            </div>
            </div>

            {/* Featured Venues Images */}
            <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 px-2">
              {heroImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`relative rounded-lg overflow-hidden ${index % 2 === 0 ? 'lg:mt-2 lg:pt-12' : ''}`}
                >
                  <Image
                    src={image}
                    alt={`Hero Image ${index + 1}`}
                    width={300}
                    height={600}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
