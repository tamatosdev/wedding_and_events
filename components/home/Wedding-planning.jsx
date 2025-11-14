"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useHomepageCMS } from "@/hooks/useHomepageCMS";

export default function WeddingPlanning() {
  const { data: cmsData } = useHomepageCMS();

  // Get planning content from CMS or use defaults
  const planningContent = cmsData?.content?.planning;
  const title = planningContent?.title || "Because Planning Your Wedding Should Feel Like a Celebration";
  const paragraphs = planningContent?.content?.paragraphs || [
    "Your wedding is a celebration of love and joy - and planning it should feel just as special. At The Wedding and Event, we bring trusted venues, reliable vendors, and creative ideas together in one seamless space, making every step easy, exciting, and full of heart.",
    "Because when planning feels joyful, you can focus on what truly matters - celebrating your love story, your way."
  ];
  const buttonText = planningContent?.content?.buttonText || "About Us";
  const buttonLink = planningContent?.content?.buttonLink || "/venues";
  const mainImage = planningContent?.images?.[0] || "/uploads/WeddingPlanning.png";
  const leftFloral = planningContent?.images?.[1] || "/uploads/Flower-7.png";
  const rightFloral = planningContent?.images?.[2] || "/uploads/Flower-6.png";

  return (
    <section className="relative flex items-start">
      <div className="px-4 relative z-10 container-main">
        <div className="text-center mx-auto Planning-main">
          <div className="Planning-image">
            <Image
              src={mainImage}
              alt="Wedding Planning"
              width={220}
              height={400}
            />
          </div>
          <div className="Planning-text">
            <h2>{title}</h2>
            {paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
            <Link href={buttonLink}>
              <Button className="bg-[#DD3740] hover:bg-[#DD3740] text-white px-8 py-3 rounded-full font-medium">
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Floral Decorations */}
      <div className="Left-Floral-Planning z-40">
        <Image
          src={leftFloral}
          alt="Left Floral"
          width={290}
          height={400}
        />
      </div>
      <div className="Right-Floral-Planning z-40">
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
