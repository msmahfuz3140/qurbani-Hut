"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export default function HeroSlider() {
  const banners = [
    "/banner-images/Gemini_Generated_Image_lzw5v4lzw5v4lzw5.png",
    "/banner-images/Gemini_Generated_Image_6atq0v6atq0v6atq.png",
    "/banner-images/Gemini_Generated_Image_for7f2for7f2for7.png",
    "/banner-images/Gemini_Generated_Image_7r4fca7r4fca7r4f.png",
  ];

  return (
    <section className="relative py-8 md:py-14 bg-gradient-to-br from-slate-100 via-blue-50 to-green-50 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4">

        <Swiper
          modules={[Autoplay, Pagination, EffectCreative]}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="creative"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-120%", 0, -500],
            },
            next: {
              translate: ["120%", 0, -500],
            },
          }}
          pagination={{ clickable: true }}
          className="rounded-2xl md:rounded-[30px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
        >
          {banners.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className="
                relative w-full
                h-[380px]
                sm:h-[450px]
                md:h-[550px]
                lg:h-[650px]
                xl:h-[720px]
              "
              >
                {/* IMAGE */}
                <Image
                  src={img}
                  alt={`Banner ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover scale-110 hover:scale-105 transition-transform duration-[6000ms]"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-xl lg:max-w-2xl px-5 sm:px-8 md:px-14">

                    {/* TITLE */}
                    <motion.h1
                      initial={{ opacity: 0, y: 60 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="
                      text-2xl
                      sm:text-4xl
                      md:text-5xl
                      lg:text-6xl
                      xl:text-7xl
                      font-extrabold
                      text-white
                      leading-tight
                    "
                    >
                      Premium{" "}
                      <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                        Qurbani
                      </span>{" "}
                      Animals
                    </motion.h1>

                    {/* DESCRIPTION */}
                    <motion.p
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="
                      mt-4 md:mt-6
                      text-sm
                      sm:text-base
                      md:text-lg
                      lg:text-xl
                      text-white/90
                      leading-relaxed
                    "
                    >
                      Verified healthy cattle and goats for Eid al-Adha.
                      Quality guaranteed, from trusted farms to your home.
                    </motion.p>

                    {/* BUTTONS */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="
                      flex
                      flex-col
                      sm:flex-row
                      gap-4
                      mt-6 md:mt-8
                    "
                    >
                      <Link
                        href="/animals"
                        className="
                        text-center
                        px-6 md:px-8
                        py-3 md:py-4
                        rounded-full
                        bg-gradient-to-r
                        from-orange-500
                        to-red-500
                        text-white
                        font-bold
                        shadow-xl
                        hover:scale-105
                        transition
                      "
                      >
                        Browse All Animals
                      </Link>

                     
                    </motion.div>
                  </div>
                </div>

                {/* FLOAT EFFECT */}
                <div className="hidden md:block absolute top-10 right-10 w-20 h-20 bg-orange-500/30 blur-3xl rounded-full animate-pulse"></div>
                <div className="hidden md:block absolute bottom-10 left-10 w-24 h-24 bg-blue-500/30 blur-3xl rounded-full animate-pulse"></div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}