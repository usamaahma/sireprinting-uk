import { useFieldArray, useFormContext } from "react-hook-form";
import RichTextEditor from "../RichTextEditor";
import FAQSection from "./FAQSection";
import ImageUploader from "../ImageUploader";
import { generateSlug, generateSKU, generateShortId } from "@/utils/helpers";
import { useEffect } from "react";

export default function VariantSection() {
  const { control, register, watch, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-purple-500 outline-none";

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-purple-700">
            Product Variants
          </h2>
          <p className="text-xs text-gray-500">
            Add multiple versions of this product
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            append({
              variantTitle: "",
              variantShortDescription: "",
              id: generateShortId("var"),
              sku: "",
              slug: "",
              price: 0,
              salePrice: 0,
              reviews: 0,
              availability: "in stock",
              condition: "new",
              identifierExists: false,
              brand: "",
              mpn: "",
              googleProductCategory: "",
              productType: "",
            })
          }
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md transition flex items-center gap-2"
        >
          <span>+</span> Add New Variant
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => {
          // Watch title to auto-generate slug/sku for variants
          const vTitle = watch(`variants.${index}.variantTitle`);

          return (
            <details
              key={field.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group"
            >
              <summary className="p-4 cursor-pointer font-bold bg-gray-50 hover:bg-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs uppercase">
                    Variant {index + 1}
                  </span>
                  <span className="text-gray-700">
                    {vTitle || "Untitled Variant"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 text-sm hover:bg-red-50 px-2 py-1 rounded transition"
                >
                  Remove
                </button>
              </summary>

              <div className="p-6 space-y-6 border-t bg-white">
                {/* 1. Basic Info, ID, SKU, Slug */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Variant Title
                    </label>
                    <input
                      {...register(`variants.${index}.variantTitle`)}
                      className={inputStyle}
                      placeholder="e.g. Matte Black Finish"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      ID (Auto)
                    </label>
                    <input
                      {...register(`variants.${index}.id`)}
                      className={`${inputStyle} bg-gray-50`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      SKU (Auto)
                    </label>
                    <input
                      {...register(`variants.${index}.sku`)}
                      className={inputStyle}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Variant Slug
                    </label>
                    <input
                      {...register(`variants.${index}.slug`)}
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Price
                    </label>
                    <input
                      {...register(`variants.${index}.price`)}
                      type="number"
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Sale Price
                    </label>
                    <input
                      {...register(`variants.${index}.salePrice`)}
                      type="number"
                      className={inputStyle}
                    />
                  </div>
                </div>

                {/* 2. Short & Full Description */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Short Description
                    </label>
                    <textarea
                      {...register(`variants.${index}.variantShortDescription`)}
                      className={`${inputStyle} h-20`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                      Full Description
                    </label>
                    <RichTextEditor
                      onChange={(val) =>
                        setValue(`variants.${index}.fullDescription`, val)
                      }
                      initialValue={watch(`variants.${index}.fullDescription`)}
                    />
                  </div>
                </div>

                {/* 3. Google Merchant & SEO (Comprehensive) */}
                <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                  <h4 className="text-sm font-bold text-purple-900 mb-4 uppercase tracking-tight">
                    Merchant & SEO Settings
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      {...register(`variants.${index}.brand`)}
                      placeholder="Brand"
                      className={inputStyle}
                    />
                    <input
                      {...register(`variants.${index}.mpn`)}
                      placeholder="MPN"
                      className={inputStyle}
                    />
                    <input
                      {...register(`variants.${index}.googleProductCategory`)}
                      placeholder="Google Product Category"
                      className={inputStyle}
                    />
                    <input
                      {...register(`variants.${index}.productType`)}
                      placeholder="Product Type"
                      className={inputStyle}
                    />
                    <select
                      {...register(`variants.${index}.condition`)}
                      className={inputStyle}
                    >
                      <option value="new">New</option>
                      <option value="used">Used</option>
                      <option value="refurbished">Refurbished</option>
                    </select>
                    <select
                      {...register(`variants.${index}.availability`)}
                      className={inputStyle}
                    >
                      <option value="in stock">In Stock</option>
                      <option value="out of stock">Out of Stock</option>
                    </select>
                    <input
                      {...register(`variants.${index}.seoTitle`)}
                      placeholder="SEO Title"
                      className={inputStyle}
                    />
                    <input
                      {...register(`variants.${index}.seoKeywords`)}
                      placeholder="SEO Keywords"
                      className={inputStyle}
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register(`variants.${index}.identifierExists`)}
                      />
                      <span className="text-xs font-bold">
                        Identifier Exists?
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-bold text-purple-800 uppercase mb-1">
                      JSON Schema
                    </label>
                    <textarea
                      {...register(`variants.${index}.schema`)}
                      placeholder='{ "@context": "..." }'
                      className={`${inputStyle} font-mono h-24`}
                    />
                  </div>
                </div>

                {/* 4. Variant Specific FAQs */}
                <div className="bg-white border rounded-lg p-4">
                  <FAQSection
                    name={`variants.${index}.quickFaqs`}
                    label="Variant Specific Quick FAQs"
                    isQuick={true}
                  />
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
