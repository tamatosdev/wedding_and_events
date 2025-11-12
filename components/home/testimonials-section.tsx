"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { useRef, useEffect } from "react";
import "swiper/css";
import Image from "next/image";

export default function TestimonialsSection() {
  const swiperRef = useRef<any>(null);

  // Ensure autoplay continues after user interaction
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (swiperRef.current && swiperRef.current.autoplay) {
        if (document.hidden) {
          swiperRef.current.autoplay.stop();
        } else {
          swiperRef.current.autoplay.start();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      quote:
        "The catering service we booked through this portal was absolutely amazing. Our guests are still talking about the food!",
      author: "Fatima & Ahmed",
      image: "/uploads/Testimonial-0.png",
    },
    {
      id: 2,
      quote:
        "From photography to decorations, we found all our vendors in one place. Saved us so much time and effort.",
      author: "Ayesha & Hassan",
      image: "/uploads/Testimonial-2.png",
    },
    {
      id: 3,
      quote:
        "The vendor quality is outstanding. Every single vendor exceeded our expectations. Highly recommended!",
      author: "Zara & Usman",
      image: "/uploads/Testimonial-3.png",
    },
    {
      id: 4,
      quote:
        "We found our Dream Venue in Just Two Days! The Portal Made Everything So Simple And Stress-Free.",
      author: "Sarah & Ali",
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
      <div className="container-main px-4">
        <h2 className="text-4xl md:text-6xl text-center font-bold mb-12 h2eading">What Our Customers Say?</h2>
        
        {/* Full Width Marquee Slider */}
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={30}
          freeMode={true}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false,
            waitForTransition: false,
          }}
          allowTouchMove={true}
          grabCursor={true}
          resistanceRatio={0.5}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={() => {
            // Slide changed, autoplay will continue
          }}
          onTouchStart={(swiper) => {
            // Pause autoplay briefly on touch
            swiper.autoplay.stop();
          }}
          onTouchEnd={(swiper) => {
            // Resume autoplay after touch interaction
            setTimeout(() => {
              if (swiper && swiper.autoplay && !swiper.destroyed) {
                swiper.autoplay.start();
              }
            }, 1000);
          }}
          onAutoplayStop={(swiper) => {
            // Ensure autoplay restarts after any interruption
            setTimeout(() => {
              if (swiper && swiper.autoplay) {
                swiper.autoplay.start();
              }
            }, 2000);
          }}
          className="testimonials-marquee padding-bottom"
        >
          {[...testimonials, ...testimonials, ...testimonials].map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`} className="!w-[550px]">
              <div className="bg-white rounded-2xl shadow-md w-[550px] p-4 Testimonial-cards">
                <div className="flex flex-row h-80">
                  <div className="w-2/5 relative">
                    <Image
                      width={220}
                      height={320}
                      src={item.image}
                      alt={item.author}
                      className="w-full h-full object-cover rounded-l-xl"
                    />
                  </div>
                  <div className="w-3/5 p-6 flex flex-col justify-center inner-testimonial">
                    <p className="text-gray-700 text-base mb-6 leading-relaxed font-medium">
                      "{item.quote}"
                    </p>
                    <span className="text-[#D13F43] text-sm font-semibold">
                      — {item.author}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
