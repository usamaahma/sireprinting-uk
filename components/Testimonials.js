"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews([...data.reviews, ...data.reviews]);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const startAnimation = () => {
    controls.start({
      y: [0, -1000],
      transition: { duration: 35, repeat: Infinity, ease: "linear" },
    });
  };

  useEffect(() => {
    if (!loading && reviews.length > 0) startAnimation();
  }, [loading, reviews]);

  return (
    <section className="py-16 bg-white text-slate-900 overflow-hidden font-sans">
      <div className="container mx-auto px-6 md:px-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Side: Compact Content */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-orange-600 font-bold uppercase tracking-widest text-[10px]">
                Customer Feedback
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              Trusted by <span className="text-orange-500">Brands.</span>
            </h2>

            <p className="text-slate-500 text-base mb-8 leading-relaxed">
              Real reviews from Google. We take pride in delivering quality
              printing and packaging solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase rounded-lg hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
              >
                Write a Review
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </a>
              <a
                href="https://www.google.com/maps/place/?q=place_id:ChIJobCe2YFFwokRytFCw4neoUc"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-slate-200 text-slate-700 text-xs font-bold uppercase rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
              >
                View All Reviews On Google
              </a>
            </div>
          </div>

          {/* Right Side: Slimmer Vertical Carousel */}
          <div className="h-[450px] relative overflow-hidden rounded-2xl ">
            {/* Top/Bottom Fade Overlays bg-slate-50 border border-slate-100*/}
            {/* <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-50 to-transparent z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50 to-transparent z-10"></div> */}

            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <motion.div
                className="p-4 space-y-4"
                animate={controls}
                onMouseEnter={() => controls.stop()}
                onMouseLeave={() => startAnimation()}
              >
                {reviews.map((rev, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900 p-5 rounded-xl shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-sm overflow-hidden border border-white/10">
                        {rev.user?.thumbnail ? (
                          <img
                            src={rev.user.thumbnail}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          rev.user?.name?.charAt(0) || "G"
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xs">
                          {rev.user?.name || "Google User"}
                        </h4>
                        <div className="flex text-orange-400 text-[8px] mt-0.5">
                          {"★".repeat(5)}
                        </div>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-xs italic leading-snug">
                      "
                      {rev.snippet ||
                        "Excellent service and high-quality printing. Very satisfied with the results!"}
                      "
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
