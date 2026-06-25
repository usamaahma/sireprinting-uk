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
  //   title: "Premium Retail",
  //   subTitle: "Packaging Solutions",
  //   desc: "Elevate your brand presence with our high-end, fully customisable retail boxes.",
  //   img: "/sire-prinitng-hero.jpg",
  //   bgColor: "#E58E00",
  // },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Safety check: Agar slides load na hui hon
  const activeSlide = slides[current] || slides[0];

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full min-h-[700px] flex items-center overflow-hidden transition-colors duration-700"
      // Yahan ab 'activeSlide' use kar rahe hain
      style={{ backgroundColor: activeSlide.bgColor }}
    >
      <div className="container mx-auto px-10 md:px-20 pt-40 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id} // Yahan bhi activeSlide
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="flex flex-col gap-6">
                  <h1 className="leading-tight">
                    <span className="block text-5xl md:text-6xl font-black text-slate-900">
                      {activeSlide.title}
                    </span>
                    <br />
                    <span className="block text-2xl md:text-3xl font-bold text-white">
                      {activeSlide.subTitle}
                    </span>
                  </h1>

                  <div className="w-24 h-1 bg-slate-900 hidden md:block"></div>

                  <p className="text-lg md:text-xl text-slate-800 font-bold max-w-xl">
                    {activeSlide.desc}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    {/* Buttons... */}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-[400px] md:h-[500px] flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-sm h-full flex justify-center"
              >
                <img
                  src={activeSlide.img}
                  alt={activeSlide.title}
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
