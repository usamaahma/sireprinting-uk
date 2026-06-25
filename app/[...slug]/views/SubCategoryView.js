"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import PerksBar from "@/components/PerksBar";
import Breadcrumbs from "../../../components/Breadcrumbs";

// Swiper Imports (Agar aap inhe dusri jagah use kar rahe hain to rehne dein, warna hata sakte hain)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Reusable Components matching CategoryView style
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
        required
        type={type}
        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
      />
    </div>
  );
}

export default function SubCategoryView({ data }) {
  const safeData = data || {};
  const subcategoryId = safeData._id;

  const [carouselProducts, setCarouselProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

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
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:flex lg:items-center gap-16">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            <Breadcrumbs />
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              {title || "Custom Packagings"}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {shortDescription ||
                "Premium quality custom packaging configurations tailored precisely to your specifications."}
            </p>
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
              <a
                href="#quote-form"
                className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1 text-center"
              >
                Get Free Custom Quote
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-15 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src={featuredImage || "/placeholder.jpg"}
                alt={title || "Packaging"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <PerksBar />

      {/* PRODUCTS GRID */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
          </div>

          {loadingProducts ? (
            <div className="text-center py-12 text-slate-400">Loading...</div>
          ) : carouselProducts.length > 0 ? (
            // Grid alignment fix
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {carouselProducts.map((item) => (
                <Link
                  key={item._id || item.slug}
                  href={`/${item.slug}`}
                  className="group relative block bg-white border border-slate-200 transition-all duration-300 hover:border-transparent"
                >
                  {/* Gradient Lines */}
                  <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black to-[#ffa015] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>

                  {/* Image */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={
                        item.featuredImage || item.image || "/placeholder.jpg"
                      }
                      alt={item.title || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title */}
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#ffa015] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              No products found.
            </div>
          )}
        </div>
      </section>

      {/* 4. VALUE PROPOSITION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Wholesale Pricing"
              desc="Get standard industry manufacturing discounts with zero structural setup premiums."
            />
            <FeatureCard
              title="Fast Turnaround"
              desc="Production and shipping pipeline designed to meet strict retail launch timelines."
            />
            <FeatureCard
              title="Free Structural Check"
              desc="Our team cross-checks vector files and templates before run execution."
            />
          </div>
        </div>
      </section>

      {/* 5. QUOTE SECTION */}
      <section id="quote-form" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-white text-slate-900 p-8 md:p-12 rounded-[2rem] shadow-2xl">
            <h2 className="text-3xl font-bold mb-2">
              Request Production Evaluation
            </h2>
            <p className="text-slate-500 mb-8">
              Submit details below to get direct manufacturing estimates for{" "}
              {title || "your specifications"}.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Quote Submitted!");
              }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <FormInput label="Full Name" type="text" />
              <FormInput label="Email Address" type="email" />
              <FormInput label="Phone Number" type="tel" />
              <div className="grid grid-cols-3 gap-2 lg:col-span-2">
                <FormInput label="Length (in)" type="text" />
                <FormInput label="Width (in)" type="text" />
                <FormInput label="Height (in)" type="text" />
              </div>
              <FormInput label="Target Quantity" type="number" />
              <div className="lg:col-span-3">
                <textarea
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  rows={4}
                  placeholder="Describe explicit material, stock weight, or finish instructions..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="lg:col-span-3 bg-orange-600 text-white py-5 rounded-xl font-black text-xl hover:bg-orange-700 transition-all uppercase tracking-widest"
              >
                Submit Quote Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 6. DETAILED SEO CONTENT & ACCORDION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {fullDescription && (
            <div
              className="prose prose-slate prose-lg max-w-none mb-20 max-h-[400px] overflow-y-auto pr-4 scrollbar-custom border-b border-slate-100 pb-4"
              dangerouslySetInnerHTML={{ __html: fullDescription }}
            />
          )}
          {allFaqs.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-10 text-center">
                Frequently Asked Questions
              </h2>
              {allFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-slate-100 rounded-2xl bg-slate-50 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 font-bold cursor-pointer list-none select-none">
                    {faq?.question || "Question"}
                    <span className="group-open:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-200/50">
                    {typeof faq?.answer === "string"
                      ? faq.answer
                      : JSON.stringify(faq?.answer || "")}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
