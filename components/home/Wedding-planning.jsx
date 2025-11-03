import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WeddingPlanning() {
  return (
    <section className="relative flex items-start">
      <div className="px-4 relative z-10 container-main">
        <div className="text-center mx-auto Planning-main">
          <div className="Planning-image">
            <Image
              src="/uploads/WeddingPlanning.png" // Add your left floral image
              alt="Left Floral"
              width={220}
              height={400}
            />
          </div>
          <div className="Planning-text">
            <h2>
              Because Planning Your Wedding Should Feel Like a Celebration
            </h2>
            <p>
              We believe your wedding should be as beautiful and effortless as
              the love you’re celebrating. Our platform brings together trusted
              venues, verified vendors, and inspiring ideas all in one seamless
              experience.
            </p>
            <p>
              From discovering dream venues to connecting with decorators,
              photographers, and makeup artists, we make planning simple,
              transparent, and joyful.
            </p>
            <Link href="/venues">
              <Button className="bg-[#DD3740] hover:bg-[#DD3740] text-white px-8 py-3 rounded-full font-medium">
                About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Floral Decorations */}
      <div className="Left-Floral-Planning z-40">
        <Image
          src="/uploads/Flower-7.png" // Add your left floral image
          alt="Left Floral"
          width={290}
          height={400}
        />
      </div>
      <div className="Right-Floral-Planning z-40">
        <Image
          src="/uploads/Flower-6.png" // Add your right floral image
          alt="Right Floral"
          width={250}
          height={400}
        />
      </div>
      {/* Background Image */}
    </section>
  );
}
