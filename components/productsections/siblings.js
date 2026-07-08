"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function Siblings({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-extrabold text-black mb-8 text-center">
        More in this Category
      </h2>
      <div className="flex justify-center mt-6 mb-8">
        <div className="w-20 h-1 bg-[#F4A11D]"></div>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={6}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id} className="pb-2">
            <Link
              href={`/${product.slug}`}
              className="group relative block bg-white border border-slate-200 transition-all duration-300 hover:border-transparent hover:shadow-xl"
            >
              {/* Gradient Lines */}
              <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>

              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-white">
                <Image
                  src={
                    product.featuredImage || product.image || "/placeholder.jpg"
                  }
                  alt={product.title || "Product"}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Title */}
              <div className="p-4 text-center">
                <h3 className="text-md font-extrabold text-slate-900 group-hover:text-[#ffa015] transition-colors leading-tight line-clamp-2">
                  {product.title}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
