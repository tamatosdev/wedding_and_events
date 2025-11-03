"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Wedding Halls/Venues", category: "Venue", image: "/uploads/Vendor-1.png" },
  { name: "Catering", category: "Catering", image: "/uploads/Vendor-2.png" },
  { name: "Beauty Salon", category: "Beauty", image: "/uploads/Vendor-3.png" },
  { name: "Boutiques", category: "Fashion", image: "/uploads/Vendor-4.png" },
  { name: "Decoration", category: "Decoration", image: "/uploads/Vendor-5.png" }
];

export function CategoriesSection() {
  return (
    <section className="relative flex items-center mt-10">
      <div className="px-4 relative z-10 container-main Find-Every-Vendor">
        <div className="text-center mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 h2eading">
            Find Every Vendor
            <br /> You Need
          </h1>
          {/* Featured Venues Images */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12 Venues-cart">
            {categories.map((cat) => (
              <Link 
                key={cat.category}
                href={`/vendors?category=${cat.category}`}
                className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="bg-[#F7E9DB] border-vendor p-6 rounded-lg w-48 h-48 flex items-center justify-center mb-3">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={68}
                    height={68}
                    className="text-[#d13f43]"
                  />
                </div>
                <span className="text-gray-800 font-medium vendor-span">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Floral Decorations */}
      <div className="Left-Floral">
        <Image
          src="/uploads/Flower-1.png" // Add your left floral image
          alt="Left Floral"
          width={200}
          height={600}
        />
      </div>
      <div className="Right-Floral">
        <Image
          src="/uploads/Flower-2.png" // Add your right floral image
          alt="Right Floral"
          width={400}
          height={800}
        />
      </div>
      {/* Background Image */}
    </section>
  );
}
