"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useHomepageCMS } from "@/hooks/useHomepageCMS";

export function CTASection() {
  const { data: cmsData } = useHomepageCMS();

  // Get CTA content from CMS or use defaults
  const ctaContent = cmsData?.content?.cta;
  const title = ctaContent?.title || "Ready to make your dream\nevent a reality?";
  const description = ctaContent?.description || "Explore beautiful venues, connect with the right vendors, and let us make your planning journey effortless and exciting.";
  const leftFlower = ctaContent?.images?.[0] || "/uploads/Find Your Venue flower-2.png";
  const rightFlower = ctaContent?.images?.[1] || "/uploads/Find Your Venue flower-1.png";
  const buttons = ctaContent?.content?.buttons || [
    { text: "Find Your Venue", link: "/venues", variant: "primary" },
    { text: "Join as a Vendor", link: "/list-business", variant: "outline" }
  ];

  return (
    <section className="container-main relative text-center text-white my-20">
      {/* Left Flowers */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 md:w-56 z-40">
        <Image
          src={leftFlower}
          alt="Decorative flowers"
          width={330}
          height={330}
          className="object-contain flower-1"
        />
      </div>

      {/* Right Flowers */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 md:w-56 z-40">
        <Image
          src={rightFlower}
          alt="Decorative flowers"
          width={330}
          height={330}
          className="object-contain flower-2"
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10 mx-auto bg-[#4B1F27] border border-[#6B1C1C] dream-event rounded-2xl py-16 overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-semibold">
          {title.split('\n').map((line, i) => (
            <span key={i}>
              {line.includes('event') ? (
                <>
                  {line.split('event').map((part, j) => (
                    <span key={j}>
                      {part}
                      {j === 0 && <span className="font-bold"> event</span>}
                    </span>
                  ))}
                </>
              ) : (
                line
              )}
              {i < title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className="mt-4 text-gray-200 text-sm md:text-base">
          {description}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {buttons.map((button: any, index: number) => (
            <Link key={index} href={button.link}>
              <Button 
                className={
                  button.variant === "primary"
                    ? "bg-[#DD3740] hover:bg-[#ff767b] text-white px-6 py-3 rounded-full font-medium"
                    : "border border-gray-300 text-white hover:bg-white hover:text-[#541A1A] px-6 py-3 rounded-full font-medium bg-transparent"
                }
              >
                {button.text}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
