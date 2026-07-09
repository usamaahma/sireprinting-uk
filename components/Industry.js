"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function IndustrySection({ subcategoriesData }) {
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(
    subcategoriesData && subcategoriesData.length > 0
      ? subcategoriesData[0]._id
      : null,
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeSubcategoryId) return;

    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products/subcategory/${activeSubcategoryId}`,
        );
        const result = await res.json();

        if (result.success) {
          setProducts(result.data || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeSubcategoryId]);

  const handleTabClick = (id) => {
    if (activeSubcategoryId === id) {
      setActiveSubcategoryId(null);
    } else {
      setActiveSubcategoryId(id);
    }
  };

  if (!subcategoriesData || subcategoriesData.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No active custom configurations initialized yet.
      </div>
    );
  }

  return (
    <div className="bg-white py-10 md:py-20 antialiased">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        {/* Title Section */}
        <div className="flex flex-col items-center mb-16 text-center px-6">
          {/* Sub-heading label */}
          <span className="text-[#f4a11d] font-bold tracking-[0.2em] uppercase text-xs mb-3">
            Tailored Solutions
          </span>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[1.1] mb-6 max-w-7xl">
            Explore Our <span className="text-[#f4a11d]">Custom Packaging</span>{" "}
            Boxes UK Range
          </h2>

          {/* Description with better readability */}
          <p className="text-slate-600 text-lg md:text-xl max-w-5xl leading-relaxed font-medium">
            Every product is fully customised — your dimensions, your finish,
            your brand. From single-colour prints to premium foil-stamped rigid
            boxes, we cover the full spectrum of your packaging needs.
          </p>

          {/* Stylized Divider */}
          <div className="flex items-center gap-2 mt-8">
            <div className="w-12 h-1 bg-[#f4a11d] rounded-full"></div>
            <div className="w-3 h-3 rotate-45 border-2 border-[#f4a11d]"></div>
            <div className="w-12 h-1 bg-[#f4a11d] rounded-full"></div>
          </div>
        </div>

        {/* Desktop par Parent container ko relational (relative) banaya hai aur h-full execution di hai 
          taake Right column dynamic tareeqe se Left column ki exact height adopt kar sakay.
        */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-start relative">
          {/* LEFT SIDEBAR - Takes its own natural height depending on item count (No scrollbar) */}
          <div className="w-full lg:w-[360px] xl:w-[400px] flex flex-col gap-4 shrink-0">
            {subcategoriesData.map((sub) => (
              <div key={sub._id} className="w-full flex flex-col gap-3">
                <button
                  onClick={() => handleTabClick(sub._id)}
                  className={`w-full flex overflow-hidden border-2 text-left transition-all duration-300 h-[130px] sm:h-[130px] relative ${
                    activeSubcategoryId === sub._id
                      ? "border-[#f4a11d] shadow-lg"
                      : "border-gray-100 bg-white hover:border-[#f4a11d]/50"
                  }`}
                >
                  {/* Left Side Banner Frame */}
                  <div className="w-[55%] bg-[#ffa015] p-4 flex items-center justify-center text-center transition-colors duration-300">
                    <span className="text-xs sm:text-sm font-black text-white uppercase tracking-tighter leading-tight line-clamp-3">
                      {sub.title}
                    </span>
                  </div>

                  {/* Right Side Frame: Desktop par image, Mobile par arrow layout */}
                  <div className="flex-1 bg-white  flex items-center justify-center relative">
                    {/* Desktop View Image */}
                    <div className="hidden lg:flex flex-1 items-center justify-center overflow-hidden">
                      <img
                        src={sub.image || "/placeholder.jpg"}
                        alt={sub.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Mobile View Dynamic Arrow (No Image on Mobile) */}
                    <div className="block lg:hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 text-gray-800 transition-transform duration-300 ${
                          activeSubcategoryId === sub._id
                            ? "rotate-180 text-[#f4a11d]"
                            : "rotate-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* MOBILE VIEW Accordion Grid */}
                <div className="lg:hidden">
                  <AnimatePresence>
                    {activeSubcategoryId === sub._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-6 px-1">
                          {loading ? (
                            <div className="col-span-full text-center py-4 text-gray-400 animate-pulse">
                              Loading items...
                            </div>
                          ) : products.length > 0 ? (
                            products.map((product) => (
                              <ProductCard
                                key={product._id}
                                product={product}
                              />
                            ))
                          ) : (
                            <div className="col-span-full text-center py-4 text-gray-400 text-sm">
                              No items configured.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW Right Grid Area: 
            - 'lg:absolute lg:top-0 lg:bottom-0 lg:right-0 lg:left-[384px] xl:left-[440px]' handles strict physical height mapping to match left sidebar's bounds.
          */}
          <div className="hidden lg:block lg:absolute lg:top-0 lg:bottom-0 lg:right-0 lg:left-[384px] xl:left-[440px] overflow-y-auto pr-2 scrollbar-custom">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSubcategoryId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-4 mt-2"
              >
                {loading ? (
                  <div className="col-span-full text-center py-20 text-gray-400 font-medium animate-pulse">
                    Fetching specific structural variations...
                  </div>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-gray-400 font-medium">
                    No structural specifications mapped under this view yet.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Synchronized Custom Scrollbars CSS */}
      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 5px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 9999px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link
      href={`/${product.slug}`}
      className="group relative block bg-white border border-slate-200 transition-all duration-300 hover:border-transparent"
    >
      {/* Gradient Lines */}
      <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
      <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <img
          src={product.featuredImage || product.image || "/placeholder.jpg"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#ffa015] transition-colors leading-tight">
          {product.title}
        </h3>
      </div>
    </Link>
  );
}
