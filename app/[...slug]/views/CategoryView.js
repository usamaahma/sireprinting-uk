// app/[...slug]/views/CategoryView.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronRight, Loader2 } from "lucide-react";
import PerksBar from "@/components/PerksBar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CategoryView({ data }) {
    console.log("Category Data:", data);
  const {
    title,
    shortdescription,
    featuredImage,
    description,
    faqs,
    subcategories,
  } = data;

  // States
  const [activeSubcategoryId, setActiveSubcategoryId] = useState(
    subcategories && subcategories.length > 0 ? subcategories[0]._id : null,
  );
  const [products, setProducts] = useState([]); // Dynamic products ki state
  const [loading, setLoading] = useState(false); // Loading state

  // Selected subcategory ka baqi data nikalne ke liye (slug wagera)
  const activeSubcategory = subcategories?.find(
    (sub) => sub._id === activeSubcategoryId,
  );

  // 🔥 EFFECT: Jab bhi subcategory change ho, API se fresh products get karo
  useEffect(() => {
    if (!activeSubcategoryId) return;

    async function fetchProducts() {
      setLoading(true);
      try {
        // Jo API aap ne banai thi, exact wahi call ho rahi hy yahan
        const res = await fetch(
          `/api/products/subcategory/${activeSubcategoryId}`,
        );
        const result = await res.json();

        if (result.success) {
          setProducts(result.data);
        } else {
          setProducts([]);
        }
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
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-16 lg:py-28 overflow-hidden">
        <div className="container mx-auto px-6 lg:flex lg:items-center gap-16">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            <Breadcrumbs />
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              {title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {shortdescription}
            </p>
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1">
                Get a Free Quote
              </button>
              <button className="bg-white border-2 border-slate-200 text-slate-800 px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                Explore Styles
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-16 lg:mt-10 relative">
            <div className="absolute -inset-4 bg-orange-100/50 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src={featuredImage || "/placeholder.jpg"}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <PerksBar />

      {/* Subcategories with Products Layout */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Custom <span className="text-orange-500">Packaging</span> Boxes
            </h2>
            <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* LEFT SIDE: Subcategories Navigation */}
            <div className="w-full lg:w-1/4 flex flex-col gap-3 sticky top-6">
              {subcategories?.map((subcategory) => {
                const isActive = subcategory._id === activeSubcategoryId;
                return (
                  <button
                    key={subcategory._id}
                    onClick={() => setActiveSubcategoryId(subcategory._id)}
                    className={`w-full flex items-center justify-between p-5 rounded-xl font-bold text-base transition-all uppercase tracking-wider border ${
                      isActive
                        ? "bg-black text-white border-black shadow-lg"
                        : "bg-white text-slate-800 border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <span>{subcategory.title}</span>
                    <ChevronRight
                      size={18}
                      className={`transition-transform ${
                        isActive
                          ? "rotate-90 text-orange-400"
                          : "text-slate-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* RIGHT SIDE: Dynamic Products Grid */}
            <div className="w-full lg:w-3/4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[400px] relative">
              {/* Case 1: Data load ho raha hy */}
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-3xl z-10">
                  <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-2" />
                  <p className="text-slate-500 font-medium">
                    Loading Products...
                  </p>
                </div>
              ) : null}

              {/* Case 2: Products mil gaye */}
              {!loading && products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <Link
                      key={product._id}
                      href={`/${product.slug}`}
                      className="group bg-white rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden block text-center"
                    >
                      <div className="relative aspect-square bg-slate-50/50 m-4 rounded-xl overflow-hidden flex items-center justify-center p-6">
                        <Image
                          src={
                            product.featuredImage ||
                            product.image ||
                            "/placeholder.jpg"
                          }
                          alt={product.title}
                          fill
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-md uppercase">
                          Hot
                        </span>
                      </div>

                      <div className="p-5 pt-0">
                        <h3 className="font-black text-xl mb-4 tracking-tight uppercase text-slate-900 line-clamp-2">
                          {product.title}
                        </h3>
                        <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-colors shadow-md shadow-orange-500/10">
                          Get Quote
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* Case 3: Agar koi product nahi mila */
                !loading && (
                  <div className="text-center py-20 bg-slate-50 rounded-2xl">
                    <p className="text-slate-500 font-medium">
                      No products available in this collection yet.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="No Die & Plate Charges"
              desc="Save more on your custom orders with zero setup fees."
            />
            <FeatureCard
              title="Eco-Friendly Materials"
              desc="We use 100% recyclable and sustainable packaging solutions."
            />
            <FeatureCard
              title="Free Graphic Support"
              desc="Our experts help refine your artwork for the best print result."
            />
          </div>
        </div>
      </section>

      {/* Available Materials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Available Materials</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {["Kraft", "Cardboard", "Corrugated", "Rigid"].map((mat) => (
              <div
                key={mat}
                className="p-8 border border-slate-100 rounded-2xl hover:bg-orange-50 transition-colors cursor-default text-center group"
              >
                <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="font-black text-orange-600">{mat[0]}</span>
                </div>
                <h4 className="font-bold text-lg">{mat}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-white text-slate-900 p-8 md:p-12 rounded-[2rem] shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">Get Your Custom Quote</h2>
            <form className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormInput label="Full Name" type="text" />
              <FormInput label="Email Address" type="email" />
              <FormInput label="Phone Number" type="tel" />
              <div className="grid grid-cols-3 gap-2 lg:col-span-2">
                <FormInput label="Length" type="text" />
                <FormInput label="Width" type="text" />
                <FormInput label="Height" type="text" />
              </div>
              <FormInput label="Quantity" type="number" />
              <div className="lg:col-span-3">
                <textarea
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  rows={4}
                  placeholder="Additional Notes"
                ></textarea>
              </div>
              <button className="lg:col-span-3 bg-orange-600 text-white py-5 rounded-xl font-black text-xl hover:bg-orange-700 transition-all uppercase tracking-widest">
                Submit Quote Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SEO & FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div
            className="prose prose-slate prose-lg max-w-none mb-20"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Frequently Asked Questions
            </h2>
            {faqs?.map((faq, i) => (
              <details
                key={i}
                className="group border border-slate-100 rounded-2xl bg-slate-50 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 font-bold cursor-pointer list-none">
                  {faq.question}
                  <span className="group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-200/50">
                  {typeof faq.answer === "string"
                    ? faq.answer
                    : JSON.stringify(faq.answer)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 text-center space-y-4">
      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
        <CheckCircle size={24} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function FormInput({ label, type }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
        {label}
      </label>
      <input
        type={type}
        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
      />
    </div>
  );
}
