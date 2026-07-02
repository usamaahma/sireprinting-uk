import React from "react";

export default function ContentSection() {
  const steps = [
    {
      id: "01",
      title: "Choose Your Box Style",
      text: "Pick from our full range of custom box types, sizes and materials — or ask us to suggest the right fit for your product.",
      img: "https://s3.amazonaws.com/sireprinting.com/products/1632957661Candle%20Boxes%20Sire%20Printing.png",
    },
    {
      id: "02",
      title: "Share Your Design",
      text: "Upload your artwork, use our free design support, or start from scratch with our in-house creative team.",
      img: "https://s3.amazonaws.com/sireprinting.com/products/1632957661Candle%20Boxes%20Sire%20Printing.png",
    },
    {
      id: "03",
      title: "We Print, Pack & Deliver",
      text: "Once approved, we produce your custom boxes and dispatch them free to any UK address — usually within 6 to 10 working days.",
      img: "https://s3.amazonaws.com/sireprinting.com/products/1632957661Candle%20Boxes%20Sire%20Printing.png",
    },
  ];

  return (
    <div className="bg-white">
      <section className=" relative overflow-hidden">
        <hr className="w-full border-t border-gray-300 mb-8" />
        <div className="container mx-auto px-4 md:px-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h4 className="text-[#ffa015] font-bold tracking-widest uppercase text-m mb-4">
              HOW IT WORKS
            </h4>
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-6">
              From Idea to Your UK Door in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffa015] to-[#ffb84d]">
                {" "}
                3 Simple Steps.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                // "overflow-hidden" se lines card se bahar nahi jayengi
                className="relative group bg-white p-2 h-full flex flex-col border border-slate-200 overflow-hidden"
              >
                {/* 4 Gradient Border Lines - Z-Index fix kiya hai */}
                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#f4a11d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10"></span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#f4a11d] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right z-10"></span>
                <span className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-black to-[#f4a11d] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom z-10"></span>
                <span className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-black to-[#f4a11d] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-10"></span>

                {/* Content */}
                <div className="w-full h-72 flex items-center justify-center p-4">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <hr className="w-full border-t border-gray-300 mb-4" />

                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center px-4">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4 text-center px-4">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Yahan Button add kiya hai Steps section ke bilkul niche */}
          <div className="mt-16 text-center">
            <a
              href="/get-a-quote"
              className="inline-block bg-black hover:bg-[#ffa015] text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl"
            >
              Start Your Order Today
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-black text-white rounded-[3rem] mx-4 md:mx-10 my-10">
        <div className="container mx-auto px-8 md:px-16 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              A Partner That <br />{" "}
              <span className="text-[#ffa015]">Delivers Results</span>
            </h2>
            <a
              href="/get-a-quote"
              className="inline-block bg-[#000000] hover:bg-[#ffa015] hover:text-[#ffffff] border border-[#ffffff] text-[#ffa015] px-10 py-5 rounded-full font-bold text-lg transition-all"
            >
              Start Your Order Today
            </a>
          </div>
          {/* Stats section */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#000000] p-8 rounded-3xl border border-[#ffffff] ">
                <div className="text-4xl font-black text-[#ffa015] mb-2">
                  500+
                </div>
                <div className="text-[#ffffff]">UK Brands Served</div>
              </div>
              <div className="bg-[#000000] p-8 rounded-3xl border border-[#ffffff]">
                <div className="text-4xl font-black text-[#ffa015] mb-2">
                  4.9★
                </div>
                <div className="text-[#ffffff]">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
