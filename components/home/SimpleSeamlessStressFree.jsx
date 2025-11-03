"use client";

import Link from "next/link";
import Image from "next/image";

export function SimpleSeamlessStressFree() {
  return (
    <section className="relative flex items-start mt-10">
      <div className="px-4 relative z-10 container-main Find-Every-Vendor">
        <div className="text-center mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 h2eading">
            Simple. Seamless. Stress-Free.
          </h1>
          {/* Featured Venues Images */}
          <div className="flex grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className=" simple-inner-item">
              <div className="bg-[#F7E9DB] border-vendor inner-item p-4 rounded-lg w-48 h-48 flex items-start justify-center mb-3">
                <span className="text-gray-800 font-medium vendor-span-first">STEP 01</span>
                <h2>Discover</h2>
                <p>Browse trusted venues and wedding vendors across major cities.</p>
              </div>
            </div>

            <div className="flex flex-col items-start simple-inner-item">
              <div className="bg-[#F7E9DB] border-vendor inner-item p-4 rounded-lg w-48 h-48 flex items-start justify-center mb-3">
                <span className="text-gray-800 font-medium vendor-span-first">STEP 02</span>
                <h2>Compare & Shortlist</h2>
                <p>Check photos, pricing, and reviews. Save your favorites for later.</p>
              </div>
            </div>

            <div className="flex flex-col items-start simple-inner-item">
              <div className="bg-[#F7E9DB] border-vendor inner-item p-4 rounded-lg w-48 h-48 flex items-start justify-center mb-3">
                <span className="text-gray-800 font-medium vendor-span-first">STEP 03</span>
                <h2>Connect & Inquire</h2>
                <p>Send inquiries, check availability, or request a quote directly.</p>
              </div>
            </div>

            <div className="flex flex-col items-start simple-inner-item">
              <div className="bg-[#F7E9DB] border-vendor inner-item p-4 rounded-lg w-48 h-48 flex items-start justify-center mb-3">
                <span className="text-gray-800 font-medium vendor-span-first">STEP 04</span>
                <h2>Book & Celebrate</h2>
                <p>Finalize your bookings and enjoy a stress-free wedding journey.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Floral Decorations */}
      <div className="Left-Floral-first">
        <Image
          src="/uploads/Flower-4.png" // Add your left floral image
          alt="Left Floral"
          width={220}
          height={400}
        />
      </div>
      <div className="Right-Floral">
        <Image
          src="/uploads/Flower-5.png" // Add your right floral image
          alt="Right Floral"
          width={250}
          height={400}
        />
      </div>
      {/* Background Image */}
    </section>
  );
}
