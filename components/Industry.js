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
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-3xl font-black text-black uppercase tracking-tighter">
            Explore Our{" "}
            <span className="text-[#f4a11d]">Custom Packaging Boxes</span> UK
            Range
          </h2>
          <p>
            Every product comes fully customised — your dimensions, your finish,
            your brand. From single-colour prints to premium foil-stamped rigid
            boxes, we cover the full spectrum of custom packaging needs.
          </p>
          <div className="w-20 h-2 bg-[#f4a11d] mt-4 rounded-full"></div>
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
                  className={`w-full flex rounded-2xl overflow-hidden border-2 text-left transition-all duration-300 h-[130px] sm:h-[130px] relative ${
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
      className="block w-full group cursor-pointer"
    >
      <div className="w-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#f4a11d] shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5">
        {/* Image */}
        <div className="aspect-square w-full overflow-hidden bg-white">
          <img
            src={product.featuredImage || product.image || "/placeholder.jpg"}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <div className="p-3">
          <h3 className="text-xs md:text-sm font-bold text-gray-900 tracking-tight text-center leading-snug line-clamp-2 min-h-[36px] group-hover:text-[#f4a11d] transition-colors duration-200">
            {product.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
