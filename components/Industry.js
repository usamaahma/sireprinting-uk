"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function IndustrySection({ subcategoriesData }) {
  // 🔵 CLIENT LOG: Initial Subcategories check
  console.log("🔵 UI Received Subcategories Count:", subcategoriesData?.length, subcategoriesData);

  const [activeSubcategoryId, setActiveSubcategoryId] = useState(
    subcategoriesData && subcategoriesData.length > 0 ? subcategoriesData[0]._id : null
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeSubcategoryId) return;

    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/subcategory/${activeSubcategoryId}`);
        const result = await res.json();
        
        if (result.success) {
          // 🔵 CLIENT LOG: Active subcategory ke andar kitne products aaye
          console.log(`🍏 Fetched ${result.data?.length || 0} Products for Subcategory ID: ${activeSubcategoryId}`);
          setProducts(result.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error running evaluation loop:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeSubcategoryId]);

  if (!subcategoriesData || subcategoriesData.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No active custom configurations initialized yet.
      </div>
    );
  }

  return (
    <div className="bg-white py-10 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        
        {/* Title Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
            Custom <span className="text-[#f4a11d]">Packaging</span> Boxes
          </h2>
          <div className="w-20 h-2 bg-[#f4a11d] mt-4 rounded-full"></div>
        </div>

        {/* Layout Wrapper */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          
          {/* CATEGORIES / SUBCATEGORIES MENU TABS */}
          <div className="w-full lg:w-1/4 xl:w-1/5 flex flex-col gap-3">
            {subcategoriesData.map((sub) => (
              <div key={sub._id} className="flex flex-col gap-3">
                <button
                  onClick={() => setActiveSubcategoryId(sub._id)}
                  className={`flex items-center justify-between px-6 py-5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 border-2 text-left ${
                    activeSubcategoryId === sub._id
                      ? "bg-black border-black text-white shadow-xl"
                      : "bg-white border-gray-100 text-black hover:border-[#f4a11d]"
                  }`}
                >
                  <span>{sub.title}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform duration-300 ${activeSubcategoryId === sub._id ? "rotate-0 text-[#f4a11d]" : "-rotate-90 opacity-30"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* MOBILE VIEW Accordion */}
                <div className="lg:hidden">
                  <AnimatePresence>
                    {activeSubcategoryId === sub._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-6 pb-8 pt-2 px-2">
                          {loading ? (
                            <div className="text-center py-4 text-gray-400 animate-pulse">Loading items...</div>
                          ) : products.length > 0 ? (
                            products.map((product) => (
                              <ProductCard key={product._id} product={product} />
                            ))
                          ) : (
                            <div className="text-center py-4 text-gray-400 text-sm">No items configured.</div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW Right Grid Rendering Area */}
          <div className="hidden lg:block flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSubcategoryId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
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
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link 
      href={`/${product.slug}`}
      className="group bg-white rounded-[2.5rem] p-6 shadow-lg shadow-gray-100/50 border border-gray-100 flex flex-col h-full hover:bg-[#f4a11d] hover:border-[#f4a11d] transition-all duration-500 cursor-pointer"
    >
      <div className="aspect-square bg-gray-50 rounded-[2rem] overflow-hidden mb-6 relative border border-gray-50 group-hover:bg-white/20 transition-colors duration-500">
        <img
          src={product.featuredImage || product.image || "/placeholder.jpg"}
          alt={product.title}
          className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
        />
        <span className="absolute top-4 left-4 bg-[#f4a11d] text-white group-hover:bg-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter transition-colors">
          Hot
        </span>
      </div>

      <div className="flex flex-col flex-1 text-center">
        <h3 className="text-lg font-black text-black uppercase leading-tight mb-6 px-2 tracking-tight group-hover:text-white transition-colors line-clamp-2">
          {product.title}
        </h3>

        <button className="mt-auto w-full py-4 bg-[#f4a11d] group-hover:bg-white text-white group-hover:text-[#f4a11d] rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#f4a11d]/20 group-hover:shadow-none transition-all duration-300">
          Get Quote
        </button>
      </div>
    </Link>
  );
}