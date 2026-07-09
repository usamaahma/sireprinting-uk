import React from "react";

export default function IntroText() {
  return (
    <section className="mt-12 py-2 md:py-2 bg-white">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
          Premium Custom Boxes with Logo & Wholesale{" "}
          <span className="text-[#F4A11D]">Packaging Solutions </span>
        </h2>

        {/* Orange Small Divider */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="w-20 h-1.5 bg-[#F4A11D]"></div>
        </div>

        {/* Description Paragraph */}
        <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
          At Sire Printing, we produce branded packaging boxes that do more than
          just hold a product; they tell your brand's story from the very first
          glance. Low MOQs, zero hidden costs, sustainable materials and fast UK
          turnaround make premium packaging accessible to every business. If you
          need wholesale packaging boxes for large-scale fulfilment or custom
          orders for a growing product line, we match your brief, your budget
          and your timeline with quality that shows.
        </p>
        <br />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-8 border-y border-slate-100">
          {[
            { label: "Premium Quality" },
            { label: "Fast Turnaround" },
            { label: "Free Shipping" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center gap-2 py-3 px-4 rounded-full border-2 border-[#ffa015] bg-gradient-to-r from-white to-[#ffa015]/80 hover:from-[#F4A11D] hover:to-[#ffa015] transition-all duration-300 group cursor-default"
            >
              <span className="text-[#ffa015] group-hover:text-white text-lg transition-colors duration-300">
                ✓
              </span>
              <span className="text-black group-hover:text-white font-bold uppercase text-[10px] md:text-xs tracking-wider transition-colors duration-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
