"use client";
import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import SpecSection from "./SpecSection";
import FAQSection from "./FAQSection";
import VariantSection from "./VariantCard";
import RichTextEditor from "../RichTextEditor";
import ImageUploader from "../ImageUploader";

export default function ProductForm() {
  const { register, control, watch } = useFormContext();
  const [categories, setCategories] = useState([]);

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch("/api/categories");

        const result = await res.json();

        console.log(result, "categories");

        if (result) {
          setCategories(result);
        }
      } catch (err) {
        console.error("Categories load nahi ho saki", err);
      }
    };
    fetchCats();
  }, []);

  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all";

  return (
    <div className="space-y-8">
      {/* 1. Basic Product Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
        <h2 className="text-xl font-bold border-b pb-2 text-purple-600 uppercase tracking-wide text-xs">
          Product Core Fields
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Product Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className={inputStyle}
              placeholder="e.g. Custom Tuck End Boxes"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Parent Category
            </label>
            <select
              {...register("parentCategory", {
                required: "Category is required",
              })}
              className={inputStyle}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Slug (URL)
            </label>
            <input
              {...register("slug")}
              className={inputStyle}
              placeholder="custom-tuck-boxes"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Base SKU
            </label>
            <input
              {...register("sku")}
              className={inputStyle}
              placeholder="STP-TUCK-001"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Initial Reviews Count
            </label>
            <input
              {...register("reviews")}
              type="number"
              className={inputStyle}
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
          {/* Main Image */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Main Product Image
            </label>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImageUploader
                  onChange={(url) => onChange(url)}
                  value={value}
                />
              )}
            />
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Gallery Images
            </label>
            <Controller
              name="additionalImages"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImageUploader
                  onChange={(urls) => onChange(urls)}
                  multiple={true}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
            Detailed Product Description
          </label>
          <Controller
            name="fullDescription"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RichTextEditor onChange={onChange} initialValue={value || ""} />
            )}
          />
        </div>
      </div>

      {/* 2. Specifications */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-sm font-bold mb-4 text-gray-800 uppercase tracking-widest border-b pb-2">
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SpecSection
            name="specifications.material"
            label="Material Options"
          />
          <SpecSection name="specifications.colorModels" label="Color Models" />
          <SpecSection name="specifications.finishing" label="Finishing" />
          <SpecSection name="specifications.addon" label="Addons" />
          <SpecSection
            name="specifications.coatingOption"
            label="Coating Options"
          />
          <SpecSection
            name="specifications.turnaroundTime"
            label="Turnaround Time"
          />
        </div>
      </div>

      {/* 3. Google Merchant Fields */}
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 shadow-inner">
        <h2 className="text-xs font-bold mb-4 text-purple-800 uppercase tracking-widest">
          Google Merchant Center Data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-purple-700 uppercase">
              Regular Price
            </label>
            <input
              {...register("price")}
              type="number"
              step="0.01"
              className={inputStyle}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-purple-700 uppercase">
              Sale Price
            </label>
            <input
              {...register("salePrice")}
              type="number"
              step="0.01"
              className={inputStyle}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-purple-700 uppercase">
              Brand Name
            </label>
            <input
              {...register("brand")}
              className={inputStyle}
              defaultValue="Sire Printing"
            />
          </div>

          <input
            {...register("mpn")}
            placeholder="MPN Number"
            className={inputStyle}
          />
          <input
            {...register("googleProductCategory")}
            placeholder="Google Product Category ID"
            className={inputStyle}
          />
          <input
            {...register("productType")}
            placeholder="Product Type"
            className={inputStyle}
          />

          <select {...register("condition")} className={inputStyle}>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
          <select {...register("availability")} className={inputStyle}>
            <option value="in stock">In Stock</option>
            <option value="out of stock">Out of Stock</option>
          </select>
          <label className="flex items-center gap-2 text-xs font-medium text-purple-900 cursor-pointer">
            <input
              type="checkbox"
              {...register("identifierExists")}
              className="accent-purple-600"
            />
            Identifier Exists (GTIN/MPN)
          </label>
        </div>
      </div>

      {/* 4. Variants Section */}
      <VariantSection />

      {/* 5. FAQs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FAQSection
          name="quickFaqs"
          label="Sticky Sidebar FAQs"
          isQuick={true}
        />
        <FAQSection name="faqs" label="General Bottom FAQs" isQuick={false} />
      </div>

      {/* 6. SEO Section */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4 shadow-2xl">
        <h2 className="text-xs font-bold text-green-400 uppercase tracking-widest border-b border-gray-800 pb-2">
          Search Engine optimization
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            {...register("seoTitle")}
            placeholder="SEO Browser Title"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm outline-none focus:border-green-500"
          />
          <textarea
            {...register("seoDescription")}
            placeholder="Meta Description"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm h-20 outline-none focus:border-green-500"
          />
          <input
            {...register("seoKeywords")}
            placeholder="Keywords (SEO Only)"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm outline-none focus:border-green-500"
          />
          <textarea
            {...register("schema")}
            placeholder="JSON-LD Structured Data"
            className="w-full p-2 bg-black border border-gray-800 rounded text-green-500 font-mono text-xs h-32 outline-none focus:border-green-400"
          />
        </div>
      </div>
    </div>
  );
}
