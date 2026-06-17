"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Custom Packaging Boxes ",
    subTitle: "UK Businesses Actually Love",
    desc: "Premium Custom Boxes with Free UK Delivery, Low MOQ and No Hidden Costs.",
    img: "/sire-prinitng-hero.jpg",
    bgColor: "#F4A11D",
  },
  // {
  //   id: 2,
  //   title: "Custom Retail",
  //   subTitle: "Packaging",
  //   desc: "Premium quality retail boxes designed to make your brand stand out on shelves.",
  //   img: "/sire-prinitng-hero.jpg",
  //   bgColor: "#E58E00",
  // },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section
      // Height barha di hai (min-h-[700px]) taaki space milay, lekin content normal rahay ga
      className="relative w-full min-h-[700px] flex items-center overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: slides[current].bgColor }}
    >
      {/* Container mein pt-40 diya hai taaki Navbar ke niche se content start ho */}
      <div className="container mx-auto px-10 md:px-20 pt-40 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* --- LEFT CONTENT (Wahi purana size) --- */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[current].id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center md:items-start text-center md:text-left "
              >
                {/* Font size wapis 4xl/6xl kar diya hai */}
                <div className="flex flex-col gap-6">
                  <h1 className="leading-tight">
                    <span className="block text-5xl md:text-6xl font-black text-slate-900">
                      {slides[current].title}
                    </span>
                    <br />
                    <span className="block text-2xl md:text-3xl font-bold text-white">
                      {slides[current].subTitle}
                    </span>
                  </h1>

                  <div className="w-24 h-1 bg-slate-900 hidden md:block"></div>

                  <p className="text-lg md:text-xl text-slate-800 font-bold max-w-xl">
                    {slides[current].desc}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button className="bg-slate-900 text-white px-10 py-3.5 font-black uppercase text-sm tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300">
                      Get a Free Quote
                    </button>

                    <button className="border-2 border-amber-500 bg-amber-500/10 text-amber-500 px-10 py-3.5 font-black uppercase text-sm tracking-widest hover:bg-amber-500 hover:text-white hover:-translate-y-1 active:scale-95 transition-all duration-300">
                      Browse Products
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- RIGHT CONTENT (Image size normal) --- */}
          <div className="relative h-[400px] md:h-[500px] flex justify-center items-center group">
            {/* Arrows */}
            <div className="absolute inset-0 z-20 flex items-center justify-between px-2 pointer-events-none">
              <button
                onClick={prevSlide}
                className="pointer-events-auto p-2 rounded-full bg-white/20 hover:bg-white/40 text-slate-900 backdrop-blur-sm transition-all active:scale-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="pointer-events-auto p-2 rounded-full bg-white/20 hover:bg-white/40 text-slate-900 backdrop-blur-sm transition-all active:scale-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>

            {/* Image Animation (max-w-sm rakha hai taaki zyada bari na ho) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[current].id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-sm h-full flex justify-center"
              >
                <img
                  src={slides[current].img}
                  alt={slides[current].title}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
