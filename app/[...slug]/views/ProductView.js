"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  ChevronDown,
  Upload,
  Star,
  ArrowRight,
  Box,
  Check,
  ShieldCheck,
  HelpCircle,
  FileText,
  Calendar,
  PenTool,
  Truck,
} from "lucide-react";
import PerksBar from "@/components/PerksBar";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SirePrintingLayout from "../../../components/productsections/secondsection";
import SirePrintingTabs from "../../../components/productsections/howtoplaceorder";
import Siblings from "../../../components/productsections/siblings";

export default function ProductView({
  data,
  isHybrid = false,
  initialVariantSlug = null,
}) {
  const router = useRouter();
  const pathname = usePathname();

  // 1. Destructure all fields from parent product payload comprehensively
  const {
    _id: baseId = "",
    id: altId = "",
    title: baseTitle = "",
    slug: baseSlug = "",
    sku: baseSku = "",
    price: basePrice = 0,
    salePrice: baseSalePrice = 0,
    reviews: baseReviews = 47,
    shortDescription: baseShortDesc = "",
    fullDescription: baseFullDesc = "",
    image: baseImg = "",
    featuredImage: baseFeaturedImg = "",
    additionalImages = [],
    variants = [],
    specifications = {},
    quickFaqs: baseQuickFaqs = [],
    faqs = [],
  } = data || {};

  const resolvedProductId = baseId || altId;

  // 2. Identify initial active configuration state mapping
  const [selectedVariant, setSelectedVariant] = useState(() => {
    if (initialVariantSlug && variants.length > 0) {
      return variants.find((v) => v.slug === initialVariantSlug) || null;
    }
    return null;
  });
  const [siblings, setSiblings] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  // 3. Dynamic Interactive Pricing Matrix Calculator States
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    depth: "",
    unit: "Inches",
  });
  const [printingColor, setPrintingColor] = useState("");
  const [quantity, setQuantity] = useState("100");

  // Accordion interface toggles
  const [openSpecSection, setOpenSpecSection] = useState("material");
  const [openQuickFaq, setOpenQuickFaq] = useState(null);
  const [openBottomFaq, setOpenBottomFaq] = useState(null);

  // 4. Strict Image Gallery Allocation Mapping Engine
  const baseGalleryImages = useMemo(() => {
    const initialMainImage = baseFeaturedImg || baseImg || "/placeholder.jpg";
    let extraArray = [];
    if (Array.isArray(additionalImages)) {
      extraArray = additionalImages;
    } else if (typeof additionalImages === "string") {
      try {
        extraArray = JSON.parse(additionalImages);
      } catch (e) {
        extraArray = [additionalImages];
      }
    }
    return [initialMainImage, ...extraArray].filter(Boolean);
  }, [baseFeaturedImg, baseImg, additionalImages]);

  // Handle active preview images based on variant state rules
  const [activeImage, setActiveImage] = useState(
    baseGalleryImages[0] || "/placeholder.jpg",
  );

  // Sync state if routing changes externally (Maintains clean URL /vf/abc)
  useEffect(() => {
    if (selectedVariant) {
      const variantIdx = variants.findIndex((v) => v.id === selectedVariant.id);
      if (variantIdx !== -1 && baseGalleryImages[variantIdx + 1]) {
        setActiveImage(baseGalleryImages[variantIdx + 1]);
      }

      const newPath = `/${selectedVariant.slug}`;
      if (pathname !== newPath) {
        router.replace(newPath, { scroll: false });
      }
    } else {
      setActiveImage(baseGalleryImages[0]);

      const defaultPath = `/${baseSlug}`;
      if (pathname !== defaultPath && !isHybrid && baseSlug) {
        router.replace(defaultPath, { scroll: false });
      }
    }
  }, [
    selectedVariant,
    variants,
    baseGalleryImages,
    baseSlug,
    pathname,
    router,
    isHybrid,
  ]);

  // 5. Computed Merged Display Objects with Complete ID & Core Data Overrides
  const displayData = useMemo(() => {
    if (!selectedVariant) {
      return {
        id: resolvedProductId,
        slug: baseSlug,
        title: baseTitle,
        sku: baseSku,
        price: basePrice,
        salePrice: baseSalePrice,
        reviews: baseReviews,
        shortDescription: baseShortDesc,
        fullDescription: baseFullDesc,
        quickFaqs: baseQuickFaqs,
        isVariant: false,
      };
    }
    return {
      id: selectedVariant.id || selectedVariant._id || resolvedProductId,
      slug: selectedVariant.slug || baseSlug,
      title: `${baseTitle} - ${selectedVariant.variantTitle}`,
      sku: selectedVariant.sku || baseSku,
      price: selectedVariant.price || basePrice,
      salePrice: selectedVariant.salePrice || baseSalePrice,
      reviews: selectedVariant.reviews || baseReviews,
      shortDescription:
        selectedVariant.variantShortDescription || baseShortDesc,
      fullDescription: selectedVariant.fullDescription || baseFullDesc,
      quickFaqs:
        selectedVariant.quickFaqs && selectedVariant.quickFaqs.length > 0
          ? selectedVariant.quickFaqs
          : baseQuickFaqs,
      isVariant: true,
    };
  }, [
    selectedVariant,
    data,
    resolvedProductId,
    baseSlug,
    baseTitle,
    baseSku,
    basePrice,
    baseSalePrice,
    baseReviews,
    baseShortDesc,
    baseFullDesc,
    baseQuickFaqs,
  ]);

  // Handle thumbnail actions
  // const handleThumbnailInteract = (img, idx) => {
  //   setActiveImage(img);
  //   if (variants.length > 0) {
  //     if (idx === 0) {
  //       setSelectedVariant(null);
  //     } else if (variants[idx - 1]) {
  //       setSelectedVariant(variants[idx - 1]);
  //     }
  //   }
  // };
  //new//
  const handleThumbnailInteract = (img, idx) => {
    setActiveImage(img);

    if (variants.length > 0) {
      if (idx === 0) {
        // Base product selected
        setSelectedVariant(null);
        // Update URL to base product slug
        router.replace(`/${baseSlug}`, { scroll: false });
      } else if (variants[idx - 1]) {
        const variant = variants[idx - 1];
        setSelectedVariant(variant);
        // Update URL to variant slug
        router.replace(`/${variant.slug}`, { scroll: false });
      }
    }
  };
  useEffect(() => {
    // Agar subcategory ID mojood hai toh fetch karein
    if (data?.subcategory) {
      fetch(`/api/products/subcategory/${data.subcategory}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            // Current product ko list se filter kar denge taake wo khud wahan na dikhe
            const filtered = res.data.filter((p) => p._id !== data._id);
            setSiblings(filtered);
          }
        })
        .catch((err) => console.error("Error fetching siblings:", err));
    }
  }, [data.subcategory, data._id]);
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <section className="py-10 lg:py-14 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {isHybrid && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-[#002f6c] text-xs font-bold flex items-center gap-2">
              <Box size={16} /> Hybrid Product Segment Stream optimization
              active. All dynamic configurations loaded.
            </div>
          )}

          {/* MAIN PRODUCT INTERFACE DISPLAY GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
            {/* LEFT WORKSPACE: SYNCED THUMBNAIL GALLERY */}
            <div className="lg:col-span-6 grid grid-cols-12 gap-3 lg:sticky lg:top-6">
              <Breadcrumbs />
              <div className="col-span-2 flex flex-col gap-2.5 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
                {baseGalleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailInteract(img, idx)}
                    className={`relative aspect-square bg-white border rounded-xl overflow-hidden transition-all p-1 ${
                      activeImage === img
                        ? "border-[#002f6c] ring-2 ring-blue-50 shadow-sm"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`preview-${idx}`}
                      fill
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>

              {/* <div className="col-span-10 relative aspect-[4/3] bg-white border border-slate-200 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={activeImage}
                  alt={displayData.title}
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div> */}
              <div
                // Fixed height add karein yahan
                className="col-span-10 relative bg-white overflow-hidden flex items-center justify-center cursor-zoom-in h-[500px] w-full"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
              >
                {/* Original Image */}
                <Image
                  src={activeImage}
                  alt={displayData.title}
                  fill
                  // object-contain ki jagah agar aap chahte hain
                  // ke container poora fill ho toh 'object-cover' try karein
                  className="object-contain p-4"
                  priority
                />

                {/* Zoom Overlay */}
                {showZoom && (
                  <div
                    className="absolute inset-0 z-50 pointer-events-none"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${position.x}% ${position.y}%`,
                      backgroundSize: "200%",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "white",
                    }}
                  />
                )}
              </div>
            </div>

            {/* RIGHT WORKSPACE: CONFIGURATOR PANEL */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1.5">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#ffa015] tracking-tight leading-tight">
                  {displayData.title}
                </h1>

                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span className="font-black text-slate-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                    4.9
                  </span>
                  <span className="text-slate-500 font-medium">
                    ({displayData.reviews} Reviews)
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-bold">
                    SKU: {displayData.sku}
                  </span>
                  {displayData.id && (
                    <>
                      <span className="text-slate-300">|</span>
                      <span className="font-mono text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-[10px]">
                        ID: {displayData.id}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-slate-600 text-xs md:text-sm leading-relaxed border-l-2 border-slate-300 pl-3">
                {displayData.shortDescription}
              </p>
              <div className="flex gap-3 text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                {/* Free Shipping */}
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-emerald-600" />
                  <span>FREE shipping on bulk orders nationwide</span>
                </div>

                {/* Design Support */}
                <div className="flex items-center gap-3">
                  <PenTool size={18} className="text-blue-600" />
                  <span>Free design support & 3D mockups</span>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-amber-600" />
                  <span>Ships in 8–12 business days</span>
                </div>
              </div>
              {/* INTERACTIVE PACKAGING MATRIX CALCULATOR FORM */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-4 shadow-sm">
                {/* <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Box size={14} className="text-[#002f6c]" /> 1. Sizing
                    Dimensions & Run Parameters
                  </h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-0.5 cursor-pointer hover:text-slate-600">
                    <HelpCircle size={12} /> Die Guidelines
                  </span>
                </div> */}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["length", "width", "depth"].map((dim) => (
                    <div key={dim} className="space-y-1">
                      <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider capitalize block">
                        {dim} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={dim.charAt(0).toUpperCase() + dim.slice(1)}
                        value={dimensions[dim]}
                        onChange={(e) =>
                          setDimensions({
                            ...dimensions,
                            [dim]: e.target.value,
                          })
                        }
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-[#002f6c]"
                      />
                    </div>
                  ))}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">
                      Unit <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={dimensions.unit}
                        onChange={(e) =>
                          setDimensions({ ...dimensions, unit: e.target.value })
                        }
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:border-[#002f6c]"
                      >
                        <option>Inches</option>
                        <option>CM</option>
                        <option>MM</option>
                      </select>
                      <ChevronDown
                        size={12}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">
                      Color & Ink Options
                    </label>
                    <div className="relative">
                      <select
                        value={printingColor}
                        onChange={(e) => setPrintingColor(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:border-[#002f6c]"
                      >
                        <option value="">Select Surface Coating Options</option>
                        <option value="cmyk">Premium Full CMYK Matrix</option>
                        <option value="pms">
                          PMS Pantone Matching Process
                        </option>
                        <option value="monochrome">Single Tint Spot Hue</option>
                        <option value="unprinted">
                          Raw Kraft Unprinted Stocks
                        </option>
                      </select>
                      <ChevronDown
                        size={12}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">
                      Quantity Count <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 outline-none focus:border-[#002f6c]"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">
                    Artwork Reference Layout
                  </label>
                  <label className="border-2 border-dashed border-slate-200 bg-white rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-[#002f6c] transition-all">
                    <Upload size={16} className="text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-700">
                      Upload Structural Artwork Matrix
                    </span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>

              {/* STRUCTURAL VARIANT SELECTOR DROPDOWN */}
              {/* {variants && variants.length > 0 && (
                <div className="space-y-1.5 border border-slate-200 rounded-xl p-3.5 bg-white shadow-sm">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Choose Structural Style Variant:
                  </label>
                  <div className="relative">
                    <select
                      value={selectedVariant ? selectedVariant.id : ""}
                      onChange={(e) => {
                        const target = variants.find(
                          (v) => v.id === e.target.value,
                        );
                        setSelectedVariant(target || null);
                      }}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 appearance-none outline-none pr-10 focus:border-[#002f6c]"
                    >
                      <option value="">
                        Base Product Configuration ({baseTitle})
                      </option>
                      {variants.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.variantTitle} — ${v.salePrice || v.price}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                  </div>
                </div>
              )} */}

              {/* PRICING ROW / CTA CALLOUT ENGINE */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-4 gap-4">
                <div>
                  {/* Deal Price row */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium">
                      Deal Price:
                    </span>
                    <span className="text-3xl font-bold text-[#ffa015]">
                      ${displayData.salePrice || displayData.price}
                    </span>
                  </div>

                  {/* List Price and Save % row */}
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-500">
                      List Price:{" "}
                      <span className="line-through">${displayData.price}</span>
                    </span>
                    {displayData.salePrice && (
                      <span className="text-green-700 font-bold">
                        Save{" "}
                        {Math.round(
                          ((displayData.price - displayData.salePrice) /
                            displayData.price) *
                            100,
                        )}
                        %
                      </span>
                    )}
                  </div>

                  {/* MOQ row */}
                  <div className="text-slate-500 text-sm mt-1">
                    Per unit · MOQ{" "}
                    <span className="text-[#ffa015] font-bold">50 boxes</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `Quote pipeline locked on Item Identifier: ${displayData.sku} (ID: ${displayData.id})`,
                    )
                  }
                  className="bg-[#ffa015] hover:bg-blue-950 text-white font-black text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  Get Custom Quote <ArrowRight size={14} strokeWidth={2.5} />
                </button>
              </div>

              {/* SPECIFICATION INHERITANCE DISPLAY PANEL */}
              <div className="border-t border-slate-200 pt-5 space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                  Product Specifications Matrix
                </p>
                {specifications &&
                  Object.entries(specifications).map(
                    ([sectionKey, arrayItems]) => {
                      if (
                        !arrayItems ||
                        !Array.isArray(arrayItems) ||
                        arrayItems.length === 0
                      )
                        return null;
                      const isCurrentOpen = openSpecSection === sectionKey;

                      return (
                        <div
                          key={sectionKey}
                          className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenSpecSection(
                                isCurrentOpen ? null : sectionKey,
                              )
                            }
                            className="w-full p-3 flex justify-between items-center bg-slate-50/60 hover:bg-slate-100/40 transition-colors text-left text-xs font-black text-slate-800 capitalize tracking-wide"
                          >
                            {sectionKey.replace(/([A-Z])/g, " $1")}
                            <ChevronDown
                              size={14}
                              className={`text-slate-500 transition-transform duration-200 ${isCurrentOpen ? "rotate-180" : ""}`}
                            />
                          </button>

                          {isCurrentOpen && (
                            <div className="p-3.5 border-t border-slate-100 bg-white space-y-3.5">
                              {arrayItems.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="pb-2.5 border-b border-slate-100 last:border-0 last:pb-0 text-xs"
                                >
                                  {item.heading && (
                                    <strong className="block text-[10px] font-black text-[#002f6c] uppercase tracking-wider mb-0.5">
                                      {item.heading}:
                                    </strong>
                                  )}
                                  <p className="text-slate-600 font-medium leading-relaxed">
                                    {Array.isArray(item.description)
                                      ? item.description.join(", ")
                                      : item.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    },
                  )}
              </div>

              {/* IN-PLACE ACCORDION VARIANT QUICK FAQS */}
              {displayData.quickFaqs && displayData.quickFaqs.length > 0 && (
                <div className="border-t border-slate-200 pt-5 space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                    Quick Configuration Support
                  </p>
                  <div className="space-y-1.5">
                    {displayData.quickFaqs.map((faq, index) => {
                      const isQuickOpen = openQuickFaq === index;
                      return (
                        <div
                          key={index}
                          className="border border-slate-200 rounded-lg bg-white overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenQuickFaq(isQuickOpen ? null : index)
                            }
                            className="w-full p-2.5 flex justify-between items-center text-left text-xs font-bold text-slate-700 bg-slate-50/30 hover:bg-slate-50 transition-colors"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              size={12}
                              className={`text-slate-400 transition-transform ${isQuickOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          {isQuickOpen && (
                            <div className="p-3 border-t border-slate-100 bg-white text-xs text-slate-600 font-medium leading-relaxed">
                              {Array.isArray(faq.answer)
                                ? faq.answer.join(", ")
                                : faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <PerksBar />
          <SirePrintingLayout />
          <SirePrintingTabs />
          {/* FIXED HEIGHT SCROLLABLE FULL DESCRIPTION SECTION */}
          {displayData.fullDescription && (
            <div className="mt-14 border border-slate-200 rounded-2xl bg-slate-50/50 p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
                <FileText size={18} className="text-[#ffa015]" />
                <h2 className="text-lg font-extrabold text-[##ffa015]">
                  Product Structural Specifications Summary
                </h2>
              </div>

              {/* Dynamic scroll view wrapper */}
              <div className="max-h-[350px] overflow-y-auto pr-3 bg-white border border-slate-100 rounded-xl p-4 md:p-5 shadow-inner text-xs md:text-sm leading-relaxed text-slate-600 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                <div
                  className="prose prose-slate max-w-none focus:outline-none"
                  dangerouslySetInnerHTML={{
                    __html: displayData.fullDescription,
                  }}
                />
              </div>
            </div>
          )}

          {/* GLOBAL FAQS ARRAY */}
          {faqs && faqs.length > 0 && (
            <div className="mt-12 border-t border-slate-200 pt-8 space-y-3">
              <h2 className="text-xl font-extrabold text-[#002f6c] mb-1">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {faqs.map((faq, index) => {
                  const isBottomOpen = openBottomFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenBottomFaq(isBottomOpen ? null : index)
                        }
                        className="w-full p-4 flex justify-between items-center text-left text-xs md:text-sm font-black text-slate-800 bg-slate-50 hover:bg-slate-100/50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span className="bg-[#002f6c] text-white rounded text-[9px] px-1.5 py-0.5 uppercase">
                            Q
                          </span>
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`text-slate-400 transition-transform ${isBottomOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isBottomOpen && (
                        <div className="p-4 border-t border-slate-200 bg-white text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                          {Array.isArray(faq.answer)
                            ? faq.answer.join(", ")
                            : faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <Siblings products={siblings} />
      </section>
    </main>
  );
}
