"use client";

import Image from "next/image";
import Link from "next/link";

export function BannerSection() {
  return (
    <section className="relative w-full banner-section">
      <div className="container-main px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <Link 
              href="https://mctbusiness.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Image
                src="/uploads/MCT Google ads Banner - R2.png"
                alt="MCT Google ads Banner - Visit MCT Business"
                width={1200}
                height={300}
                className="w-full h-auto object-contain"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}