"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  "Request A Quote",
  "Cost Estimation",
  "Packaging Design Proof",
  "Printing Process",
  "Shipping & Handling",
];

const tabContent = {
  "Request A Quote": [
    {
      id: "01",
      title: "Request A Price Quote",
      icon: "https://cheapcustompackaging.com/images/submit_quote.png",
      desc: "First, use our website or give our customer support agent a call to submit a request for a free personalised estimate. The rates will be available to you in half an hour.",
    },
    {
      id: "02",
      title: "Comparing Prices",
      icon: "https://cheapcustompackaging.com/images/budget_friendly.png",
      desc: "Ask the agent to match the pricing with your budget line. At CCP, we will make every effort to provide you with the most affordable costs.",
    },
    {
      id: "03",
      title: "Price Approval",
      icon: "https://cheapcustompackaging.com/images/Price_Approval.png",
      desc: "Please approve the prices so that the order can be placed. Joining CCP for all of your packaging requirements will be a pleasure.",
    },
  ],
  "Cost Estimation": [
    {
      id: "01",
      title: "Personalized Quote",
      icon: "https://cheapcustompackaging.com/images/Submit_Artwork.png",
      desc: "Submit your packaging details or contact our support team to receive a free, personalized cost estimate. We calculate accurate rates based on size, quantity, material, and design, ensuring transparency and no hidden fees.",
    },
    {
      id: "02",
      title: "Budget Comparison",
      icon: "https://cheapcustompackaging.com/images/Design_my_packaging_box_free.png",
      desc: "We help match your packaging needs with your budget. Our team suggests options for custom boxes wholesale or affordable custom packaging without compromising quality, so you get the best value for your investment.",
    },
    {
      id: "03",
      title: "Approval & Confirmation",
      icon: "https://cheapcustompackaging.com/images/Design_Approval.png",
      desc: "Once you review and approve the estimate, we confirm your order to proceed. This step ensures your custom packaging service aligns with your expectations, pricing, and timeline, making the process seamless and stress-free.",
    },
  ],
};

export default function OrderProcessSection() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [step, setStep] = useState(1); // 1 for dimensions, 2 for contact

  return (
    <section className="py-16 bg-[#ffa015]/10">
      {" "}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black text-center text-slate-900 mb-12">
          How to Place Your Order?
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${activeTab === tab ? "bg-[#ffa015] text-white shadow-md" : "bg-white text-slate-600 hover:text-[#ffa015]"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-6 items-start">
          {/* Cards Column */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {(tabContent[activeTab] || tabContent["Request A Quote"]).map(
                (card) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col relative overflow-hidden h-full"
                  >
                    <div className="absolute left-0 top-0 h-full w-2 bg-[#ffa015] rounded-l-2xl" />
                    <div className="absolute left-0 top-6 bg-[#ffa015] text-white text-[10px] font-bold px-2 py-1 rounded-r-md">
                      {card.id}
                    </div>
                    <div className="mt-8 flex flex-col items-center text-center">
                      <h3 className="font-bold text-slate-800 mb-8">
                        {card.title}
                      </h3>
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="w-16 h-16 object-contain mb-6"
                      />
                      <p className="mt-8 text-slate-500 text-md leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                ),
              )}
            </AnimatePresence>
          </div>

          {/* Smart Form Column */}
          <form className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full justify-center">
            <h3 className="text-center font-black text-[#ffa015] mb-4 border-b border-slate-100 pb-2">
              Get Instant Quote
            </h3>
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {["Length", "Width", "Depth", "Unit"].map((label) => (
                    <div key={label}>
                      <label className="text-[9px] font-bold text-slate-400 uppercase">
                        *{label}
                      </label>
                      <input className="w-full p-2 border border-slate-300 rounded-md text-xs outline-none" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase">
                    *Color
                  </label>
                  <select className="w-full p-2 border border-slate-300 rounded-md text-xs outline-none">
                    <option>Select Color</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase">
                      *Quantity
                    </label>
                    <select className="w-full p-2 border border-slate-300 rounded-md text-xs outline-none">
                      <option>Qty</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase">
                      File
                    </label>
                    <div className="border border-dashed border-slate-300 rounded-md py-2 flex items-center justify-center cursor-pointer hover:border-[#ffa015]">
                      <span className="text-[10px] text-slate-400">
                        + Upload
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-md hover:bg-[#ffa015] transition-colors"
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border border-slate-300 rounded-md text-xs outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border border-slate-300 rounded-md text-xs outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-2 border border-slate-300 rounded-md text-xs outline-none"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-2.5 border border-slate-300 font-bold rounded-md text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 bg-[#ffa015] text-white font-bold rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
