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
    category: "Wedding", 
    image: "/uploads/Vendor-1.png",
    link: "/partners?type=wedding"
  },
  { 
    name: "Catering", 
    category: "Catering", 
    image: "/uploads/Vendor-2.png",
    link: "/partners?type=catering"
  },
  { 
    name: "Decoration", 
    category: "Decoration", 
    image: "/uploads/Vendor-5.png",
    link: "/partners?type=decor"
  },
  { 
    name: "Beauty Parlor", 
    category: "Beauty Parlor", 
    image: "/uploads/Vendor-3.png",
    link: "/partners?type=beauty-parlor"
  },
  { 
    name: "Boutiques", 
    category: "Boutiques", 
    image: "/uploads/Vendor-4.png",
    link: "/partners?type=boutiques"
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
    <section className="relative flex items-center mt-10">
      <div className="px-4 relative z-10 container-main Find-Every-Vendor">
        <div className="text-center mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 h2eading">
            {title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
          {/* Featured Categories with Icons */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12 Venues-cart">
            {categories.map((cat: Category) => {
            
              return (
                <Link 
                  key={cat.category}
                  href={cat.link}
                  className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="bg-[#F7E9DB] border-vendor p-6 rounded-lg w-48 h-48 flex items-center justify-center mb-3 relative overflow-hidden group">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={68}
                      height={68}
                      className="text-[#d13f43] transition-transform group-hover:scale-110"
                    />
                    {/* Icon overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#D13F43]/10">
                     
                    </div>
                  </div>
                  <span className="text-gray-800 font-medium vendor-span">
                    {cat.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      {/* Floral Decorations */}
      <div className="Left-Floral">
        <Image
          src={leftFloral}
          alt="Left Floral"
          width={200}
          height={600}
        />
      </div>
      <div className="Right-Floral">
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
