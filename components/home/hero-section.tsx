"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const [searchMode, setSearchMode] = useState<"service" | "name">("service");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const router = useRouter();

  const categories = ["Venue", "Catering", "Photography", "Fashion", "Decoration"];
  const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"];

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
    <section className="relative min-h-[150vh] flex items-center mt-10">
      {/* Floral Decorations */}
      <div className="Left-Floral">
        <Image
          src="/uploads/Artboard-2@4x.png" // Add your left floral image
          alt="Left Floral"
          width={250}
          height={700}
        />
      </div>
      <div className="Right-Floral">
        <Image
          src="/uploads/Artboard2@4x(1).png" // Add your right floral image
          alt="Right Floral"
          width={250}
          height={700}
        />
      </div>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 background-hero-img container-main">
        <div className="px-4 relative z-10 inner-background-hero-img">
          <div className="text-center mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              Your Perfect
              <br />
              <span className="text-[#d13f43]">Event</span> Starts Here!
            </h1>

            {/* Search Box */}
            <div className="bg-white rounded-2xl p-4 shadow-lg max-w-3xl mx-auto">
              {/* Search Tabs */}
              <div className="mt-1 mb-5 flex justify-center gap-4">
                <button 
                  onClick={() => {
                    setSearchMode("service");
                    setSearchTerm("");
                  }}
                  className={`px-6 py-2 rounded-full text-sm transition-colors ${
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
                  className={`px-6 py-2 rounded-full text-sm transition-colors ${
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
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter vendor name to search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#d13f43]"
                    />
                  </div>
                  <button 
                    onClick={handleSearch}
                    className="bg-[#d13f43] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#bf383c] transition-colors"
                  >
                    Search
                  </button>
                </div>
              ) : (
                /* Search by Service & City Mode */
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <select 
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#d13f43]"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Select Service</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <select 
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#d13f43]"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    onClick={handleSearch}
                    className="bg-[#d13f43] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#bf383c] transition-colors"
                  >
                    Search
                  </button>
                </div>
              )}
            </div>

            {/* Featured Venues Images */}
            <div className="mt-12 pt-4 grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto">
              <div className="relative h-100 rounded-lg overflow-hidden mt-2 pt-12">
                <Image
                  src="/uploads/Rectangle-4.png"
                  alt="Venue 1"
                  width={300}
                  height={600}
                />
              </div>
              <div className="relative h-100 rounded-lg overflow-hidden">
                <Image
                  src="/uploads/Rectangle-3.png"
                  alt="Venue 2"
                  width={300}
                  height={600}
                />
              </div>
              <div className="relative h-100 rounded-lg overflow-hidden mt-2 pt-12">
                <Image
                  src="/uploads/Rectangle-2.png"
                  alt="Venue 3"
                  width={300}
                  height={600}
                />
              </div>
              <div className="relative h-100 rounded-lg overflow-hidden">
                <Image
                  src="/uploads/Rectangle-1.png"
                  alt="Venue 4"
                  width={300}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
