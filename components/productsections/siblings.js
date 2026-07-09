"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export default function Siblings({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-10 bg-white">
      <h2 className="text-2xl font-extrabold text-black mb-4 text-center">
        More in this Category
      </h2>
      <div className="flex justify-center mb-12">
        <div className="w-20 h-1 bg-[#F4A11D]"></div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay, EffectCoverflow]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={"auto"}
        spaceBetween={20}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="pb-10 !px-4"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id} className="!w-[280px]">
            <Link
              href={`/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-transparent rounded-lg overflow-hidden h-full z-10"
            >
              {/* Top Gradient */}
              <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>

              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                <Image
                  src={
                    product.featuredImage || product.image || "/placeholder.jpg"
                  }
                  alt={product.title || "Product"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="280px"
                />
              </div>

              {/* Title */}
              <div className="p-4 text-center">
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#ffa015] transition-colors leading-tight line-clamp-2">
                  {product.title}
                </h3>
              </div>

              {/* Bottom Gradient */}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
