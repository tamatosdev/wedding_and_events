"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="container-main relative text-center text-white my-20">
      {/* Left Flowers */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 md:w-56 z-40">
        <Image
          src="/uploads/Find Your Venue flower-2.png" // replace with your left flower image path
          alt="Decorative flowers"
          width={330}
          height={330}
          className="object-contain"
        />
      </div>

      {/* Right Flowers */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 md:w-56 z-40">
        <Image
          src="/uploads/Find Your Venue flower-1.png" // replace with your right flower image path
          alt="Decorative flowers"
          width={330}
          height={330}
          className="object-contain"
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10 mx-auto bg-[#4B1F27] border border-[#6B1C1C] dream-event rounded-2xl py-16 overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Ready To Plan <br /> <span className="font-bold">Your Dream Event?</span>
        </h2>
        <p className="mt-4 text-gray-200 text-sm md:text-base">
          Discover trusted venues, book your favorite vendors, and enjoy a stress-free planning experience.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link href="/venues">
            <Button className="bg-[#DD3740] hover:bg-[#ff767b] text-white px-6 py-3 rounded-full font-medium">
              Find Your Venue
            </Button>
          </Link>
          <Link href="/vendor-signup">
            <Button variant="outline" className="border border-gray-300 text-white hover:bg-white hover:text-[#541A1A] px-6 py-3 rounded-full font-medium bg-transparent">
              Join as a Vendor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
