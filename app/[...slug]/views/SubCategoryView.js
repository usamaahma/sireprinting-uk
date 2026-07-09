"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import PerksBar from "@/components/PerksBar";
import Breadcrumbs from "../../../components/Breadcrumbs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SubCategoryView({ data }) {
  const safeData = data || {};
  const subcategoryId = safeData._id;

  const [carouselProducts, setCarouselProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    async function fetchSubcategoryProducts() {
      if (!subcategoryId) return;
      try {
        const res = await fetch(`/api/products/subcategory/${subcategoryId}`);
        const result = await res.json();
        if (result.success) {
          setCarouselProducts(result.data);
        }
      } catch (error) {
        console.error("Error fetching subcategory products:", error);
      } finally {
        setLoadingProducts(false);
      }
    }

    if (safeData.products && safeData.products.length > 0) {
      setCarouselProducts(safeData.products);
      setLoadingProducts(false);
    } else {
      fetchSubcategoryProducts();
    }
  }, [data, subcategoryId]);

  const {
    title,
    shortDescription,
    featuredImage,
    fullDescription,
    quickFaqs,
    faqs,
  } = safeData;

  const allFaqs = [
    ...(Array.isArray(faqs) ? faqs : []),
    ...(Array.isArray(quickFaqs) ? quickFaqs : []),
  ];

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      {/* ─────────────── HERO ─────────────── */}
      <section className="bg-black relative overflow-hidden pt-10 pb-20 lg:pb-28 mt-10">
        {/* Subtle glow */}
        <div
          aria-hidden
          className="absolute -top-20 -right-32 w-[560px] h-[560px] rounded-full bg-[#ffa015] opacity-[0.06] blur-3xl pointer-events-none"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">
            {/* Left – copy */}
            <div className="lg:w-1/2 space-y-7 text-center lg:text-left">
              <Breadcrumbs isWhite="{true}" />
              <div className="inline-flex items-center gap-2 border border-[#ffa015]/30 bg-[#ffa015]/10 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ffa015] animate-pulse" />
                <span className="text-[#ffa015] text-xs font-black uppercase tracking-widest">
                  Custom Packaging
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                {title || "Custom Packagings"}
              </h1>

              <p className="text-lg text-white/55 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {shortDescription ||
                  "Premium quality custom packaging configurations tailored precisely to your specifications."}
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="#quote-form"
                  className="bg-[#ffa015] text-black px-8 py-4 font-black text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
                >
                  Get Free Custom Quote
                </a>
              </div>
            </div>

            {/* Right – image */}
            <div className="lg:w-1/3 ">
              {" "}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featuredImage || "/placeholder.jpg"}
                  alt={title || "Packaging"}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Corner accent lines */}
                <span className="absolute bottom-0 left-0 w-1/3 h-[3px] bg-[#ffa015]" />
                <span className="absolute bottom-0 left-0 w-[3px] h-1/3 bg-[#ffa015]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── PERKS BAR ─────────────── */}
      <PerksBar />

      {/* ─────────────── FEATURED PRODUCTS ─────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="mb-16">
            <p className="text-[#ffa015] font-black uppercase tracking-[0.2em] text-xs mb-3">
              Browse Products
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-black uppercase leading-tight">
              Featured <span className="text-[#ffa015]">Products</span>
            </h2>
            <div className="mt-4 w-16 h-[3px] bg-[#ffa015]" />
          </div>

          {loadingProducts ? (
            <div className="flex flex-col items-center justify-center py-24 text-black/30 gap-3">
              <div className="w-6 h-6 border-2 border-[#ffa015] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Loading products…</p>
            </div>
          ) : carouselProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {carouselProducts.map((item) => (
                <ProductCard key={item._id || item.slug} product={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-black/30 gap-3">
              <Package size={36} className="opacity-25" />
              <p className="text-sm">No products found.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────── VALUE PROPOSITION ─────────────── */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#ffa015] font-black uppercase tracking-[0.2em] text-xs mb-3">
              Why Choose Us
            </p>
            <h2 className="text-4xl font-black text-white uppercase">
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            <FeatureCard
              number="01"
              title="Wholesale Pricing"
              desc="Get standard industry manufacturing discounts with zero structural setup premiums."
            />
            <FeatureCard
              number="02"
              title="Fast Turnaround"
              desc="Production and shipping pipeline designed to meet strict retail launch timelines."
            />
            <FeatureCard
              number="03"
              title="Free Structural Check"
              desc="Our team cross-checks vector files and templates before run execution."
            />
          </div>
        </div>
      </section>

      {/* ─────────────── WHOLESALE SECTION ─────────────── */}
      <section className="py-0 bg-white">
        <div className="grid lg:grid-cols-2">
          {/* Left – dark copy panel */}
          <div className="bg-black px-10 py-20 lg:px-16 lg:py-24 flex flex-col justify-center space-y-7">
            <p className="text-[#ffa015] font-black uppercase tracking-[0.2em] text-xs">
              Bulk & Wholesale
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase leading-tight">
              Wholesale
              <br />
              Box Orders
            </h2>
            <p className="text-white/50 text-base leading-relaxed max-w-sm">
              Order in bulk and unlock premium pricing with the same elite
              quality. Built for brands scaling their packaging operations.
            </p>
            <a
              href="#quote-form"
              className="self-start bg-[#ffa015] text-black px-8 py-4 font-black text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
            >
              Get Category Quote →
            </a>
          </div>

          {/* Right – perks grid */}
          <div className="grid grid-cols-2">
            {[
              {
                emoji: "📦",
                label: "MOQ from 50 units",
                sub: "Low minimums for every budget",
              },
              {
                emoji: "🎨",
                label: "Free 3D mockups",
                sub: "See it before you order",
              },
              {
                emoji: "🚚",
                label: "Free shipping",
                sub: "On all wholesale orders",
              },
              {
                emoji: "⚡",
                label: "4–7 day turnaround",
                sub: "Speed without compromise",
              },
            ].map(({ emoji, label, sub }, i) => (
              <div
                key={label}
                className={`p-8 lg:p-10 space-y-3 border-black/8 ${
                  i % 2 === 0 ? "border-r" : ""
                } ${i < 2 ? "border-b" : ""} group hover:bg-[#ffa015] transition-colors duration-300`}
              >
                <div className="text-3xl">{emoji}</div>
                <p className="font-black text-sm uppercase tracking-wide text-black leading-snug group-hover:text-black">
                  {label}
                </p>
                <p className="text-xs text-black/40 group-hover:text-black/60 leading-snug">
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── QUOTE FORM ─────────────── */}
      <section id="quote-form" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="text-[#ffa015] font-black uppercase tracking-[0.2em] text-xs mb-3">
                Let's Talk
              </p>
              <h2 className="text-4xl font-black text-white uppercase">
                Request Production Evaluation
              </h2>
              <p className="text-white/35 mt-3 text-sm leading-relaxed">
                Submit details below to get direct manufacturing estimates for{" "}
                {title || "your specifications"}.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Quote Submitted!");
              }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <FormInput label="Full Name" type="text" />
              <FormInput label="Email Address" type="email" />
              <FormInput label="Phone Number" type="tel" />
              <div className="grid grid-cols-3 gap-3 lg:col-span-2">
                <FormInput label="Length (in)" type="text" />
                <FormInput label="Width (in)" type="text" />
                <FormInput label="Height (in)" type="text" />
              </div>
              <FormInput label="Target Quantity" type="number" />
              <div className="lg:col-span-3">
                <label className="block text-xs font-black uppercase tracking-[0.15em] text-white/35 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe explicit material, stock weight, or finish instructions…"
                  className="w-full p-4 bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-[#ffa015] focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="lg:col-span-3 bg-[#ffa015] text-black py-5 font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors duration-200"
              >
                Submit Quote Request →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─────────────── SEO CONTENT + FAQ ─────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {/* Rich-text SEO block */}
          {fullDescription && (
            <div
              className="prose prose-slate prose-lg max-w-none mb-20 max-h-[400px] overflow-y-auto pr-4 scrollbar-custom border-r-2 border-black/5"
              dangerouslySetInnerHTML={{ __html: fullDescription }}
            />
          )}

          {/* FAQ accordion */}
          {allFaqs.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-12 text-center">
                <p className="text-[#ffa015] font-black uppercase tracking-[0.2em] text-xs mb-3">
                  Got Questions?
                </p>
                <h2 className="text-4xl font-black text-black uppercase">
                  Frequently Asked
                </h2>
              </div>

              <div className="space-y-3">
                {allFaqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className={`border-l-4 transition-all duration-200 ${
                        isOpen
                          ? "border-l-[#ffa015] bg-black"
                          : "border-l-transparent bg-black/5 hover:border-l-[#ffa015]/40"
                      }`}
                    >
                      <button
                        className="w-full flex items-center justify-between p-6 text-left"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                      >
                        <span
                          className={`font-black text-base ${
                            isOpen ? "text-white" : "text-black"
                          }`}
                        >
                          {faq?.question || "Question"}
                        </span>
                        <span
                          className={`ml-4 shrink-0 w-8 h-8 flex items-center justify-center border font-black text-lg transition-all ${
                            isOpen
                              ? "border-[#ffa015] text-[#ffa015] rotate-45"
                              : "border-black/20 text-black"
                          }`}
                        >
                          +
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 border-t border-white/10 pt-4 text-white/55 leading-relaxed text-sm">
                          {typeof faq?.answer === "string"
                            ? faq.answer
                            : JSON.stringify(faq?.answer || "")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 3px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #ffa015;
          border-radius: 9999px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </main>
  );
}

/* ─── Sub-components ─── */

function ProductCard({ product }) {
  return (
    <Link
      href={`/${product.slug}`}
      className="group relative block bg-white border border-slate-200 transition-all duration-300 hover:border-transparent"
    >
      {/* Gradient Lines */}
      <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
      <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <Image
          src={product.featuredImage || product.image || "/placeholder.jpg"}
          alt={product.title || "Product"}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#ffa015] transition-colors leading-tight">
          {product.title}
        </h3>
      </div>
    </Link>
  );
}

function FeatureCard({ number, title, desc }) {
  return (
    <div className="bg-black p-10 space-y-5 group hover:bg-[#ffa015] transition-colors duration-300 cursor-default">
      <span className="font-black text-4xl text-[#ffa015] group-hover:text-black transition-colors">
        {number}
      </span>
      <div className="w-8 h-[2px] bg-[#ffa015] group-hover:bg-black transition-colors" />
      <h3 className="text-lg font-black text-white group-hover:text-black uppercase transition-colors">
        {title}
      </h3>
      <p className="text-sm text-white/45 group-hover:text-black/60 leading-relaxed transition-colors">
        {desc}
      </p>
    </div>
  );
}

function FormInput({ label, type }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-black uppercase tracking-[0.15em] text-white/35">
        {label}
      </label>
      <input
        required
        type={type}
        className="w-full p-4 bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-[#ffa015] focus:outline-none transition-colors"
      />
    </div>
  );
}
