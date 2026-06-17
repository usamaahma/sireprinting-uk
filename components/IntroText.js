import React from "react";

export default function IntroText() {
  return (
    <section className="mt-12 py-2 md:py-2 bg-white">
      <div className="container mx-auto px-4 max-w-5xl text-center">
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

        {/* Optional: Small Sub-text or secondary pitch */}
        <p className="mt-6 text-sm md:text-base text-slate-400 italic">
          High-quality materials • Fast Turnaround • Free Shipping across USA
        </p>
      </div>
    </section>
  );
}
