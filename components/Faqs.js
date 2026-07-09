"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQCompact() {
  const [faqs, setFaqs] = useState([
    {
      question: "What is the minimum order quantity for custom boxes?",
      answer:
        "Our minimum order starts from just 50 units — making us one of the most accessible custom box manufacturers in the UK. Whether you are a startup testing a new product or an established brand needing a small top-up run, we accommodate your volume without compromising on quality.",
    },
    {
      question: "How long does production and delivery take?",
      answer:
        "Standard production takes 6 to 10 working days from artwork approval. Rush orders may be available depending on product type — contact our team and we will do our best to accommodate tight deadlines. All orders include free delivery to any UK address.",
    },
    {
      question: "Do you offer free design support for custom packaging?",
      answer:
        "Yes, every order includes complimentary design assistance. Our in-house creative team can work from your existing logo and brand guidelines, or help you develop a look from scratch. You will receive a digital proof for approval before anything goes to print.",
    },
    {
      question: "Can I order custom boxes in any size?",
      answer:
        "Absolutely. All our boxes are fully bespoke — choose your exact dimensions, material weight and finish. If you are unsure what size works best for your product, our packaging specialists will guide you through the selection process free of charge.",
    },
    {
      question: "Are your materials eco-friendly and FSC-certified?",
      answer:
        "Yes. We use FSC-certified boards across our packaging range, and all materials meet UK environmental compliance standards. If sustainability is a priority for your brand, ask our team about our full range of recyclable and biodegradable packaging options.",
    },
    {
      question: "Do you provide samples before I place a full order?",
      answer:
        "We offer digital proofs as standard with every order. Physical samples may be available for larger orders — contact our team for details. We want you to be fully confident in your packaging before a single unit goes into production.",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch("/api/faqs");
        const data = await res.json();
        if (data.faqs && data.faqs.length > 0) setFaqs(data.faqs);
      } catch (err) {
        console.error(err);
      }
    }
    fetchFaqs();
  }, []);

  return (
    <section className="py-8 bg-white font-sans">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Side: FAQs (Compact) */}
          <div className="w-full">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Frequently Asked{" "}
              <span className="text-[#ffa015] italic">Questions</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Find solutions to common queries about our services.
            </p>
            <br />
            <div className="space-y-1">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-100">
                  <button
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between py-3 text-left focus:outline-none"
                  >
                    <span
                      className={`text-base font-bold ${activeIndex === index ? "text-[#ffa015]" : "text-slate-800"}`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`transition-transform duration-300 ${activeIndex === index ? "rotate-45 text-[#ffa015]" : "text-slate-300"}`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M12 6v12M6 12h12"
                        />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-slate-500 text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Wider but Short Form */}
          <div className="w-full">
            <div className="bg-[#000000]  p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-1">
                Can’t Find an Answer?
              </h3>
              <p className="text-slate-400 text-xs mb-6">
                Expert help is just a message away.
              </p>

              <form className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-black border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-black border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full bg-black border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                />

                <textarea
                  rows="3"
                  placeholder="Message..."
                  className="w-full bg-black border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 text-sm resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#ffa015] hover:border border-[#ffa015] hover:bg-[#ffffff] hover:text-[#ffa015] text-white font-bold py-3.5 rounded-xl transition-all uppercase tracking-widest text-[10px]"
                >
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
