"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronRight, Loader2 } from "lucide-react";
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
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src={featuredImage || "/placeholder.jpg"}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <PerksBar />

      {/* NEW INTEGRATED DESIGN SECTION */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Custom <span className="text-orange-500">Packaging</span> Boxes
            </h2>
            <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-start relative">
            <div className="w-full lg:w-[360px] xl:w-[400px] flex flex-col gap-4 shrink-0">
              {subcategories?.map((sub) => (
                <div key={sub._id} className="w-full flex flex-col gap-3">
                  <button
                    onClick={() => setActiveSubcategoryId(sub._id)}
                    className={`w-full flex  overflow-hidden border-2 text-left transition-all duration-300 h-[130px] relative ${activeSubcategoryId === sub._id ? "border-orange-500 shadow-lg" : "border-slate-100 bg-white hover:border-orange-500/50"}`}
                  >
                    <div className="w-[55%] bg-orange-500 p-4 flex items-center justify-center text-center">
                      <span className="text-xs sm:text-sm font-black text-white uppercase tracking-tighter leading-tight line-clamp-3">
                        {sub.title}
                      </span>
                    </div>
                    <div className="flex-1 bg-white flex items-center justify-center relative">
                      <div className="hidden lg:flex flex-1 items-center justify-center overflow-hidden h-full">
                        <img
                          src={sub.image || "/placeholder.jpg"}
                          alt={sub.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="block lg:hidden">
                        <ChevronRight
                          className={`h-6 w-6 text-slate-800 transition-transform ${activeSubcategoryId === sub._id ? "rotate-90 text-orange-500" : ""}`}
                        />
                      </div>
                    </div>
                  </button>
                  <div className="lg:hidden">
                    {activeSubcategoryId === sub._id && (
                      <div className="grid grid-cols-2 gap-4 pb-6 px-1">
                        {loading ? (
                          <p className="col-span-2 text-center text-slate-400">
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
              ))}
            </div>

            <div className="hidden lg:block lg:absolute lg:top-0 lg:bottom-0 lg:right-0 lg:left-[384px] xl:left-[440px] overflow-y-auto pr-2 scrollbar-custom">
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-4 mt-2">
                {loading ? (
                  <div className="col-span-full text-center py-20 text-slate-400">
                    Fetching products...
                  </div>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-20 text-slate-400">
                    No products found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .scrollbar-custom::-webkit-scrollbar {
            width: 5px;
          }
          .scrollbar-custom::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 9999px;
          }
        `}</style>
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
        <div className="container mx-auto px-6 ">
          <div
            className="prose prose-slate prose-lg max-w-none mb-20 max-h-[400px] overflow-y-auto pr-4 scrollbar-custom border-r border-slate-100"
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
