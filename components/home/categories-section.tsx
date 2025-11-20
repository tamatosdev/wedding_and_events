"use client";

import Link from "next/link";
import Image from "next/image";
import { useHomepageCMS } from "@/hooks/useHomepageCMS";

interface Category {
  name: string;
  category: string;
  image: string;
  link: string;
}

// Default categories fallback
const defaultCategories: Category[] = [
  { 
    name: "Wedding Halls/Venues", 
    category: "Venue", 
    image: "/uploads/Vendor-1.png",
    link: "/vendors?category=Venue" 
  },
  { 
    name: "Catering", 
    category: "Catering", 
    image: "/uploads/Vendor-2.png",
    link: "/vendors?category=Catering"
  },
  { 
    name: "Decoration", 
    category: "Decoration", 
    image: "/uploads/Vendor-5.png",
    link: "/vendors?category=Decoration"
  },
  { 
    name: "Beauty Parlor", 
    category: "Beauty Parlor", 
    image: "/uploads/Vendor-3.png",
    link: "/vendors?category=Beauty%20Parlor"
  },
  { 
    name: "Boutiques", 
    category: "Boutiques", 
    image: "/uploads/Vendor-4.png",
    link: "/vendors?category=Boutiques"
  }
];

export function CategoriesSection() {
  const { data: cmsData, loading } = useHomepageCMS();
  
  // Get categories content from CMS or use defaults
  const categoriesContent = cmsData?.content?.categories;
  const categories: Category[] = (categoriesContent?.content?.items as Category[]) || defaultCategories;
  const title = categoriesContent?.title || "Find Every Vendor\nYou Need";
  const leftFloral = categoriesContent?.images?.[0] || "/uploads/Flower-1.png";
  const rightFloral = categoriesContent?.images?.[1] || "/uploads/Flower-2.png";

  return (
    <section className="relative w-full overflow-hidden py-6 sm:py-8 lg:py-10">
      <div className="container-main mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mx-auto max-w-6xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 lg:mb-12 h2eading px-2">
            {title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
          {/* Featured Categories with Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 Venues-cart">
            {categories.map((cat: Category) => {
            
              return (
                <Link 
                  key={cat.category}
                  href={cat.link}
                  className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="bg-[#F7E9DB] border-vendor p-3 sm:p-4 lg:p-6 rounded-lg w-full aspect-square flex items-center justify-center mb-2 sm:mb-3 relative overflow-hidden group">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={68}
                      height={68}
                      className="text-[#d13f43] transition-transform group-hover:scale-110 w-10 sm:w-12 md:w-14 lg:w-16 xl:w-[68px] h-auto"
                    />
                    {/* Icon overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#D13F43]/10">
                     
                    </div>
                  </div>
                  <span className="text-gray-800 font-medium vendor-span text-center text-[11px] sm:text-xs md:text-sm lg:text-base leading-tight">
                    {cat.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      {/* Floral Decorations */}
      <div className="Left-Floral hidden lg:block">
        <Image
          src={leftFloral}
          alt="Left Floral"
          width={200}
          height={600}
        />
      </div>
      <div className="Right-Floral hidden lg:block">
        <Image
          src={rightFloral}
          alt="Right Floral"
          width={400}
          height={800}
        />
      </div>
    </section>
  );
}
