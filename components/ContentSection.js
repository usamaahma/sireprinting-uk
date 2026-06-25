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
        <div className="container mx-auto px-4 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h4 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">
              HOW IT WORKS
            </h4>
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-6">
              From Idea to Your UK Door in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                3 Simple Steps.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className="relative group p-1 rounded-[2.5rem] bg-gradient-to-b from-slate-100 to-white hover:from-orange-500 hover:to-orange-400 transition-all duration-500"
              >
                <div className="bg-white rounded-[2.4rem] p-4 h-full flex flex-col">
                  <div className="w-full h-86  flex items-center justify-center">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-5xl font-black text-slate-100 mb-4">
                    {step.id}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-2">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Yahan Button add kiya hai Steps section ke bilkul niche */}
          <div className="mt-16 text-center">
            <a
              href="/get-a-quote"
              className="inline-block bg-slate-900 hover:bg-orange-500 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl"
            >
              Start Your Order Today
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-slate-900 text-white rounded-[3rem] mx-4 md:mx-10 my-10">
        <div className="container mx-auto px-8 md:px-16 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              A Partner That <br />{" "}
              <span className="text-orange-500">Delivers Results</span>
            </h2>
            <a
              href="/get-a-quote"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg transition-all"
            >
              Start Your Order Today
            </a>
          </div>
          {/* Stats section */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <div className="text-4xl font-black text-orange-500 mb-2">
                  500+
                </div>
                <div className="text-slate-400">UK Brands Served</div>
              </div>
              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <div className="text-4xl font-black text-orange-500 mb-2">
                  4.9★
                </div>
                <div className="text-slate-400">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
