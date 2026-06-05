"use client";
import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import FAQSection from "./FAQSection";
import RichTextEditor from "../RichTextEditor";
import ImageUploader from "../ImageUploader";

export default function SimpleForm() {
  const { register, control, setValue } = useFormContext();
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
    "w-full p-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all";

  return (
    <div className="space-y-6">
      {/* 1. Basic Information Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
        <h2 className="text-xl font-bold border-b pb-2 text-blue-600 uppercase tracking-wide text-xs">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className={inputStyle}
              placeholder="e.g. Business Cards"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Slug (URL)
            </label>
            <input
              {...register("slug", { required: "Slug is required" })}
              className={inputStyle}
              placeholder="business-cards"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Parent Category
            </label>
            <select {...register("parentCategory")} className={inputStyle}>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Short Description
          </label>
          <textarea
            {...register("shortDescription")}
            className={`${inputStyle} h-20 resize-none`}
            placeholder="A brief summary for category pages..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Category Image */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Main Category Image
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

          {/* Featured Image (Banner) */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Featured Image (Banner)
            </label>
            <Controller
              name="featuredImage"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ImageUploader
                  onChange={(url) => onChange(url)}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
            Full Description (Page Content)
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

      {/* 2. FAQs Section */}
      <FAQSection name="faqs" label="Category FAQs" isQuick={false} />

      {/* 3. Full SEO & Metadata Section */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 space-y-4">
        <h3 className="font-bold text-blue-800 uppercase tracking-wide text-xs border-b border-blue-200 pb-2">
          SEO & Search Engine Optimization
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase mb-1">
                SEO Meta Title
              </label>
              <input
                {...register("seoTitle")}
                className={inputStyle}
                placeholder="Meta title for Google search"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-blue-700 uppercase mb-1">
                SEO Meta Keywords
              </label>
              <input
                {...register("seoKeywords")}
                className={inputStyle}
                placeholder="e.g. printing, business cards, custom design"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-blue-700 uppercase mb-1">
              SEO Meta Description
            </label>
            <textarea
              {...register("seoDescription")}
              className={`${inputStyle} h-24 resize-none`}
              placeholder="Write a compelling meta description for search results..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-blue-700 uppercase mb-1 flex justify-between">
              JSON-LD Schema Markup
              <span className="text-[10px] text-blue-400 font-normal normal-case italic">
                Paste your script here
              </span>
            </label>
            <textarea
              {...register("schema")}
              className={`${inputStyle} font-mono h-32 text-[11px] bg-gray-900 text-green-400 border-none p-4`}
              placeholder='{ "@context": "https://schema.org", "@type": "Product", ... }'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
