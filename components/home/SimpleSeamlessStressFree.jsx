"use client";

import Link from "next/link";
import Image from "next/image";
import { useHomepageCMS } from "@/hooks/useHomepageCMS";

// Default steps fallback
const defaultSteps = [
  { step: "STEP 01", title: "Discover", description: "Browse trusted venues and wedding vendors across major cities." },
  { step: "STEP 02", title: "Compare & Shortlist", description: "Check photos, pricing, and reviews. Save your favorites for later." },
  { step: "STEP 03", title: "Connect & Inquire", description: "Send inquiries, check availability, or request a quote directly." },
  { step: "STEP 04", title: "Book & Celebrate", description: "Finalize your bookings and enjoy a stress-free wedding journey." },
];

export function SimpleSeamlessStressFree() {
  const { data: cmsData } = useHomepageCMS();

  // Get process content from CMS or use defaults
  const processContent = cmsData?.content?.process;
  const title = processContent?.title || "Simple. Seamless. Stress-Free.";
  const steps = processContent?.content?.steps || defaultSteps;
  const leftFloral = processContent?.images?.[0] || "/uploads/Flower-4.png";
  const rightFloral = processContent?.images?.[1] || "/uploads/Flower-5.png";

  return (
    <section className="relative flex items-start mt-10">
      <div className="px-4 relative z-10 container-main Find-Every-Vendor">
        <div className="text-center mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 h2eading">
            {title}
          </h1>
          {/* Featured Venues Images */}
          <div className="flex grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {steps.map((stepItem, index) => (
              <div key={index} className={index === 0 ? "simple-inner-item" : "flex flex-col items-start simple-inner-item"}>
                <div className="bg-[#F7E9DB] border-vendor inner-item p-4 rounded-lg w-48 h-48 flex items-start justify-center mb-3">
                  <span className="text-gray-800 font-medium vendor-span-first">{stepItem.step}</span>
                  <h2>{stepItem.title}</h2>
                  <p>{stepItem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Floral Decorations */}
      <div className="Left-Floral-first">
        <Image
          src={leftFloral}
          alt="Left Floral"
          width={220}
          height={400}
        />
      </div>
      <div className="Right-Floral">
        <Image
          src={rightFloral}
          alt="Right Floral"
          width={250}
          height={400}
        />
      </div>
      {/* Background Image */}
    </section>
  );
}
