"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert } from "lucide-react";
import PerksBar from "@/components/PerksBar";

export default function VariantView({ data }) {
  // Safe Fallbacks mapped to variant context scope definitions
  const {
    variantTitle,
    variantShortDescription,
    fullDescription,
    sku,
    price,
    salePrice,
    quickFaqs,
    brand,
    condition,
    availability,
    parentProduct, // Reference containing upstream identifier back-linking fields if needed
  } = data;

  const resolvedMainTitle =
    variantTitle || "Custom Product Variant Design Build";
  const parentSlug = parentProduct?.slug || "";

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/* HEADER CONTROLS NAVIGATION */}
      <nav className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="container mx-auto px-6">
          <Link
            href={parentSlug ? `/${parentSlug}` : "/admin/subcategories"}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Primary Base Build Configuration
          </Link>
        </div>
      </nav>

      {/* MAIN SPEC SHEET PRESENTATION HERO */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT COLUMN: VISUAL TEMPLATE PREVIEW */}
            <div className="relative aspect-square bg-slate-50 border-4 border-dashed border-slate-200 rounded-3xl flex flex-col justify-center items-center p-8 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4 animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-1">
                Active Structural Variant Isolation Matrix
              </h2>
              <p className="text-xl font-bold text-slate-800 px-6">
                {resolvedMainTitle}
              </p>
              <div className="mt-4 px-4 py-1.5 bg-slate-900 text-white font-mono text-xs rounded-md">
                SKU: {sku || "VARIANT-ISOLATION-ID"}
              </div>
            </div>

            {/* RIGHT COLUMN: CORE SUMMARY DETAILS */}
            <div className="space-y-6">
              <span className="bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-md">
                Isolated Component View
              </span>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">
                {resolvedMainTitle}
              </h1>

              {/* Price Evaluation */}
              <div className="p-5 bg-slate-50 border rounded-xl flex items-baseline gap-4">
                <span className="text-3xl font-black text-slate-900">
                  ${salePrice || price || "TBD"}
                </span>
                {salePrice && price && (
                  <span className="text-slate-400 line-through">${price}</span>
                )}
                <span className="text-xs text-slate-500 font-medium ml-auto">
                  Brand Registry: {brand || "Sire Printing"}
                </span>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {variantShortDescription ||
                  "Isolated custom layout matrix targeting programmatic structural variants specs setup rules details."}
              </p>

              {/* Inventory Conditions Specs Indicators */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase">
                    Condition
                  </span>
                  <span className="text-sm font-bold text-slate-800 capitalize">
                    {condition || "New"}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase">
                    Availability
                  </span>
                  <span className="text-sm font-bold text-green-700 capitalize">
                    {availability || "In Stock"}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase">
                    Die Charge
                  </span>
                  <span className="text-sm font-bold text-orange-600 capitalize">
                    Waived
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PerksBar />

      {/* PRE-FILLED QUOTE ESTIMATION SUBMISSION ENGINE */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white text-slate-900 p-8 md:p-12 rounded-[2rem] shadow-2xl">
            <div className="mb-8 space-y-2">
              <h3 className="text-2xl font-bold">
                Pre-Configured Target Variant Quote Pipeline
              </h3>
              <p className="text-slate-500 text-sm">
                This process request is pre-locked onto Variant Line Item:{" "}
                <strong className="text-orange-600">{sku}</strong>.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Pre-locked Variant Build Ordered!");
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Build Target SKU Identifier
                </label>
                <input
                  readOnly
                  type="text"
                  value={sku || "N/A"}
                  className="w-full p-4 bg-slate-100 border rounded-xl font-mono text-sm text-slate-500 cursor-not-allowed outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Production Volume Target
                </label>
                <input
                  required
                  type="number"
                  placeholder="Enter target unit count..."
                  className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Procurement Coordination / Delivery Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide unique handling criteria details directly to production floor managers..."
                  className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="sm:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold uppercase tracking-wider transition-colors"
              >
                Commit Variant Specifications Build
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CORE EXTENDED TECHNICAL MARKDOWN RICH TEXT */}
      {fullDescription && (
        <section className="py-20 bg-white border-t">
          <div className="container mx-auto px-6 max-w-3xl">
            <h4 className="text-xl font-bold mb-6 text-slate-900">
              Extended Engineering & Structural Run Scope
            </h4>
            <div
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: fullDescription }}
            />
          </div>
        </section>
      )}
    </main>
  );
}
