"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
export default function TestimonialsMarquee() {
  const testimonials = [
    {
      id: 1,
      quote:
        "We found our Dream Venue in Just Two Days! The Portal Made Everything So Simple And Stress-Free.",
      author: "Sarah & Ali",
      image: "/uploads/Testimonials-1.png",
    },
    {
      id: 2,
      quote:
        "The catering service we booked through this portal was absolutely amazing. Our guests are still talking about the food!",
      author: "Fatima & Ahmed",
      image: "/uploads/Testimonial-2.png",
    },
    {
      id: 3,
      quote:
        "From photography to decorations, we found all our vendors in one place. Saved us so much time and effort.",
      author: "Ayesha & Hassan",
      image: "/uploads/Testimonial-3.png",
    },
    {
      id: 4,
      quote:
        "The vendor quality is outstanding. Every single vendor exceeded our expectations. Highly recommended!",
      author: "Zara & Usman",
      image: "/uploads/Testimonial-4.png",
    },
    {
      id: 5,
      quote:
        "Excellent experience — responsive vendors and fair prices. Highly recommend this portal for wedding planning.",
      author: "Noor & Bilal",
      image: "/uploads/Testimonials-1.png",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <h2 className="text-4xl md:text-6xl text-center font-bold mb-8 h2eading">What Our Customers Say?</h2>
      {/* ===== TOP MARQUEE ===== */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        loop={true}
        speed={8000} // <- speed ko barhao taake smooth scroll mile
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        allowTouchMove={false}
        className="padding-bottom flex items-center"
      >
        {[...testimonials, ...testimonials].map((item) => (
          <SwiperSlide key={`top-${item.id}-${Math.random()}`} className="!w-[550px]">
            <div className="flex bg-white rounded-2xl shadow-md w-[550px] p-4 flex-col Testimonial-cards">
              <Image
              width={550}
              height={550}
                src={item.image}
                alt={item.author}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <div className="inner-testimonial">
                <p className="text-gray-700 text-sm mb-2">“{item.quote}”</p>
                <span className="text-blue-600 text-sm font-semibold">— {item.author}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ===== BOTTOM MARQUEE (Opposite Direction) ===== */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        loop={true}
        speed={8000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        allowTouchMove={false}
        className="padding-bottom flex items-center"
      >
        {[...testimonials, ...testimonials].map((item) => (
          <SwiperSlide key={`bottom-${item.id}-${Math.random()}`} className="!w-[550px]">
            <div className="bg-white rounded-2xl shadow-md w-[550px] p-4 flex flex-col Testimonial-cards">
              <Image
              width={550}
              height={550}
                src={item.image}
                alt={item.author}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <div className="inner-testimonial">
                <p className="text-gray-700 text-sm mb-2">“{item.quote}”</p>
                <span className="text-green-600 text-sm font-semibold">— {item.author}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
