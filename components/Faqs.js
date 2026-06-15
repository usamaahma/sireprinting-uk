"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQCompact() {
  const [faqs, setFaqs] = useState([
    {
      question: "What is the MOQ?",
      answer: "Typically 100 units depending on the box type.",
    },
    {
      question: "Production Time?",
      answer: "Usually 8-12 business days after approval.",
    },
    {
      question: "Custom Sizes?",
      answer: "Yes, we offer fully bespoke sizing for all products.",
    },
    {
      question: "Design Assistance?",
      answer:
        "Yes, we offer design support to help refine your packaging artwork.",
    },
    {
      question: "Premium Finishes?",
      answer: "We offer Spot UV, Foiling, and Embossing for a luxury look.",
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
    <section className="py-12 bg-white font-sans">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Side: FAQs (Compact) */}
          <div className="w-full">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Frequently Asked{" "}
              <span className="text-orange-500 italic">Questions</span>
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
                      className={`text-base font-bold ${activeIndex === index ? "text-orange-600" : "text-slate-800"}`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`transition-transform duration-300 ${activeIndex === index ? "rotate-45 text-orange-500" : "text-slate-300"}`}
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
            <div className="bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
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
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 text-sm"
                />

                <textarea
                  rows="3"
                  placeholder="Message..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 text-sm resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all uppercase tracking-widest text-[10px]"
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
