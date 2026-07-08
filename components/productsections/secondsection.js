"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SirePrintingLayout() {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      name: "Doug Arnold",
      role: "Entrepreneur",
      text: "Through collaboration with this agency I have been able to take my business to the next level.",
      img: "https://i.pravatar.cc/150?u=1",
    },
    {
      name: "Sarah Jenkins",
      role: "Marketing Manager",
      text: "Exceptional quality and speed. Their packaging solutions transformed our brand.",
      img: "https://i.pravatar.cc/150?u=2",
    },
  ];

  const features = [
    { title: "High Quality", icon: "/hero-box.png" },
    { title: "Custom Design", icon: "/hero-box.png" },
    { title: "Eco Friendly", icon: "/hero-box.png" },
    { title: "Free Delivery", icon: "/hero-box.png" },
    { title: "Affordable", icon: "/hero-box.png" },
    { title: "24/7 Support", icon: "/hero-box.png" },
  ];

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: Testimonials + Features */}
          <div className="space-y-6">
            {/* Auto-play Testimonial Slider */}
            <div className="bg-[#f0a068]/10 p-6 rounded-2xl relative overflow-hidden cursor-grab active:cursor-grabbing">
              <h2 className="text-2xl font-black text-black mb-4 text-center">
                Testimonials
              </h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 50)
                      setIndex(
                        (prev) =>
                          (prev - 1 + testimonials.length) %
                          testimonials.length,
                      );
                    else if (info.offset.x < -50)
                      setIndex((prev) => (prev + 1) % testimonials.length);
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="flex items-center justify-center gap-4 px-2"
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <div className="absolute top-0 left-0 w-16 h-16 bg-[#f0a068] rounded-full opacity-60 translate-x-[-5px] translate-y-[-5px]"></div>
                    <img
                      src={testimonials[index].img}
                      className="w-16 h-16 rounded-full border-2 border-white shadow-md relative z-10"
                    />
                  </div>
                  <div>
                    <p className="text-slate-700 italic text-sm mb-1">
                      "{testimonials[index].text}"
                    </p>
                    <h4 className="font-bold text-[#ffa015] text-sm">
                      {testimonials[index].name}
                    </h4>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-1.5 mt-4">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-[#ffa015]" : "w-2 bg-slate-300"}`}
                  />
                ))}
              </div>
            </div>

            {/* Features Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white border border-slate-200 rounded-xl transition-all duration-300 hover:shadow-xl p-5 flex flex-col items-center text-center overflow-hidden"
                >
                  <span className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-black to-[#ffa015] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <div className="w-16 h-16 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-[#ffa015] transition-colors">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Request Template */}
          <div className="bg-white border border-slate-200 p-10 shadow-2xl rounded-3xl sticky top-6">
            <div className="h-56 bg-slate-100 mb-8 flex items-center justify-center rounded-2xl overflow-hidden border border-slate-200">
              <img
                alt="Template"
                src="https://cheapcustompackaging.com/images/Request_Template-01.png"
                className="max-h-full"
              />
            </div>
            <h3 className="text-3xl font-black text-black text-center mb-4">
              Request Box Template
            </h3>
            <p className="text-slate-600 text-center mb-8">
              Upload your custom artwork today and get a professional production
              proof in 48 hours.
            </p>
            <button className="w-full py-5 bg-[#ffa015] text-white font-bold text-lg hover:bg-black transition-all rounded-xl">
              Get Free Sample
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
