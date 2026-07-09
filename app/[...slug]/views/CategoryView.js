"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronRight, Package } from "lucide-react";
import PerksBar from "@/components/PerksBar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CategoryView({ data }) {
  const {
    title,
    shortdescription,
    featuredImage,
    description,
    faqs,
    subcategories,
  } = data;

  const [activeSubcategoryId, setActiveSubcategoryId] = useState(
    subcategories && subcategories.length > 0 ? subcategories[0]._id : null,
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (!activeSubcategoryId) return;
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products/subcategory/${activeSubcategoryId}`,
        );
        const result = await res.json();
        setProducts(result.success ? result.data || [] : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeSubcategoryId]);

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      {/* ─────────────── HERO ─────────────── */}
      <section className="bg-black relative overflow-hidden mt-12 pt-10 pb-20 lg:pb-28">
        {/* Subtle glow */}
        <div
          aria-hidden
          className="absolute -top-20 -right-32 w-[560px] h-[560px] rounded-full bg-[#ffa015] opacity-[0.06] blur-3xl pointer-events-none"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">
            {/* Left – copy */}
            <div className="lg:w-1/2 space-y-7 text-center lg:text-left">
              <Breadcrumbs isWhite="{true}" />{" "}
              <div className="inline-flex items-center gap-2 border border-[#ffa015]/30 bg-[#ffa015]/10 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ffa015] animate-pulse" />
                <span className="text-[#ffa015] text-xs font-black uppercase tracking-widest">
                  Custom Packaging
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                {title}
              </h1>
              <p className="text-lg text-white/55 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {shortdescription}
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="bg-[#ffa015] text-black px-8 py-4 font-black text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200">
                  Get a Free Quote
                </button>
                <button className="border border-white/20 text-white px-8 py-4 font-bold text-sm hover:border-[#ffa015] hover:text-[#ffa015] transition-colors duration-200">
                  Explore Styles
                </button>
              </div>
            </div>

            {/* Right – image + wholesale widget */}
            <div className="lg:w-1/2 flex gap-5 items-center justify-center">
              {/* Hero image */}
              <div className="relative flex-1 aspect-[4/3] overflow-hidden">
                <Image
                  src={featuredImage || "/placeholder.jpg"}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
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

      <PerksBar />

      {/* ─────────────── SUBCATEGORIES + PRODUCTS ─────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
            <div className="mb-16">
              <p className="text-[#ffa015] font-black uppercase tracking-[0.2em] text-xs mb-3">
                Browse Collection
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-black uppercase leading-tight">
                Custom <span className="text-[#ffa015]">Packaging</span> Boxes
              </h2>
              <div className="mt-4 w-16 h-[3px] bg-[#ffa015]" />
            </div>
            {/* Horizontal Wholesale Card */}
            <div className="w-auto height-auto overflow-hidden bg-white shadow-xl">
              {/* Header */}
              <div className="bg-black px-4 py-3">
                <h3 className="text-white font-black text-sm uppercase leading-tight text-center">
                  Wholesale Box Orders
                </h3>
              </div>

              {/* Features */}
              <div className="px-4 py-4">
                <div className="flex gap-x-5 gap-y-3">
                  {[
                    "MOQ from 50 units",
                    "Free 3D Mockups",
                    "Free Shipping",
                    "4–7 Day Turnaround",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ffa015] shrink-0" />
                      <span className="text-[11px] font-semibold leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button className="mt-5 w-full bg-[#ffa015] py-2.5 text-[11px] font-black uppercase tracking-wider text-black transition-all duration-300 hover:bg-black hover:text-[#ffa015]">
                  Get Category Quote
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            {/* Subcategory list */}
            <div className="w-full lg:w-[340px] xl:w-[380px] flex flex-col gap-2 shrink-0">
              {subcategories?.map((sub) => {
                const isActive = activeSubcategoryId === sub._id;
                return (
                  <div key={sub._id} className="flex flex-col gap-2">
                    <button
                      onClick={() => setActiveSubcategoryId(sub._id)}
                      className={`w-full flex overflow-hidden text-left transition-all duration-200 h-[110px] border-l-4 ${
                        isActive
                          ? "border-l-[#ffa015] shadow-lg"
                          : "border-l-transparent hover:border-l-[#ffa015]/40"
                      }`}
                    >
                      {/* Label panel */}
                      <div
                        className={`w-[55%] p-4 flex items-center justify-center text-center transition-colors duration-200 ${
                          isActive
                            ? "bg-[#ffa015]"
                            : "bg-black hover:bg-[#ffa015]/90"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-black text-white uppercase tracking-tight leading-tight line-clamp-3">
                          {sub.title}
                        </span>
                      </div>

                      {/* Thumbnail / chevron */}
                      <div className="flex-1 bg-white border border-l-0 border-black/8 flex items-center justify-center overflow-hidden">
                        <div className="hidden lg:block w-full h-full">
                          <img
                            src={sub.image || "/placeholder.jpg"}
                            alt={sub.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <ChevronRight
                          className={`block lg:hidden h-5 w-5 transition-all ${
                            isActive
                              ? "text-[#ffa015] rotate-90"
                              : "text-black/25"
                          }`}
                        />
                      </div>
                    </button>

                    {/* Mobile accordion products */}
                    <div className="lg:hidden">
                      {isActive && (
                        <div className="grid grid-cols-2 gap-3 pb-6 px-1">
                          {loading ? (
                            <p className="col-span-2 text-center text-black/30 py-8 text-sm">
                              Loading...
                            </p>
                          ) : (
                            products.map((p) => (
                              <ProductCard key={p._id} product={p} />
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop product grid */}
            <div className="hidden lg:block lg:absolute lg:top-0 lg:bottom-0 lg:right-0 lg:left-[356px] xl:left-[396px] overflow-y-auto pr-1 scrollbar-custom">
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
                {loading ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-24 text-black/30 gap-3">
                    <div className="w-6 h-6 border-2 border-[#ffa015] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm">Fetching products…</p>
                  </div>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-24 text-black/30 gap-3">
                    <Package size={36} className="opacity-25" />
                    <p className="text-sm">No products found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── WHAT SETS US APART ─────────────── */}
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
              title="No Die & Plate Charges"
              desc="Save more on every order with zero setup fees — no hidden costs, ever."
            />
            <FeatureCard
              number="02"
              title="Eco-Friendly Materials"
              desc="100% recyclable and sustainable packaging. Good for your brand, great for the planet."
            />
            <FeatureCard
              number="03"
              title="Free Graphic Support"
              desc="Our expert designers refine your artwork for flawless print results."
            />
          </div>
        </div>
      </section>

      {/* ─────────────── WHOLESALE SECTION (from design) ─────────────── */}
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
            <button className="self-start bg-[#ffa015] text-black px-8 py-4 font-black text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200">
              Get Category Quote →
            </button>
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

      {/* ─────────────── AVAILABLE MATERIALS ─────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <p className="text-[#ffa015] font-black uppercase tracking-[0.2em] text-xs mb-3">
              Build With The Best
            </p>
            <h2 className="text-4xl font-black text-black uppercase">
              Available Materials
            </h2>
            <div className="mt-4 w-16 h-[3px] bg-[#ffa015]" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Kraft", desc: "Natural & sturdy" },
              { name: "Cardboard", desc: "Versatile & light" },
              { name: "Corrugated", desc: "Maximum protection" },
              { name: "Rigid", desc: "Premium feel" },
            ].map(({ name, desc }) => (
              <div
                key={name}
                className="group border border-black/10 p-8 hover:border-[#ffa015] hover:bg-black transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 bg-[#ffa015] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="font-black text-black text-xl">
                    {name[0]}
                  </span>
                </div>
                <h4 className="font-black text-xl text-black group-hover:text-white transition-colors mb-1">
                  {name}
                </h4>
                <p className="text-xs text-black/40 group-hover:text-white/45 transition-colors">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── QUOTE FORM ─────────────── */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="text-[#ffa015] font-black uppercase tracking-[0.2em] text-xs mb-3">
                Let's Talk
              </p>
              <h2 className="text-4xl font-black text-white uppercase">
                Get Your Custom Quote
              </h2>
            </div>

            <form className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <FormInput label="Full Name" type="text" />
              <FormInput label="Email Address" type="email" />
              <FormInput label="Phone Number" type="tel" />
              <div className="grid grid-cols-3 gap-3 lg:col-span-2">
                <FormInput label="Length" type="text" />
                <FormInput label="Width" type="text" />
                <FormInput label="Height" type="text" />
              </div>
              <FormInput label="Quantity" type="number" />
              <div className="lg:col-span-3">
                <label className="block text-xs font-black uppercase tracking-[0.15em] text-white/35 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your packaging needs…"
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

      {/* ─────────────── SEO DESCRIPTION + FAQ ─────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {/* Rich-text SEO block */}
          <div
            className="prose prose-slate prose-lg max-w-none mb-20 max-h-[400px] overflow-y-auto pr-4 scrollbar-custom border-r-2 border-black/5"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* FAQ */}
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
              {faqs?.map((faq, i) => {
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
                        {faq.question}
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
                        {typeof faq.answer === "string"
                          ? faq.answer
                          : JSON.stringify(faq.answer)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
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
        <img
          src={product.featuredImage || product.image || "/placeholder.jpg"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
        type={type}
        className="w-full p-4 bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-[#ffa015] focus:outline-none transition-colors"
      />
    </div>
  );
}
