"use client";
import React, { useState, useEffect } from "react";
import ImageUploader from "@/components/ImageUploader";
import RichTextEditor from "@/components/RichTextEditor";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const initialForm = {
    // Identity
    title: "",
    slug: "",
    category: "",
    subcategory: "",
    id: "",
    sku: "",

    // Content
    shortDescription: "",
    fullDescription: "",
    image: "",
    featuredImage: "",
    additionalImages: [],

    // Reviews
    reviews: 0,

    // Specifications
    specifications: {
      material: [],
      colorModels: [],
      finishing: [],
      addon: [],
      coatingOption: [],
      turnaroundTime: [],
    },

    // FAQs
    quickFaqs: [],
    faqs: [],

    // Pricing
    price: 0,
    salePrice: 0,
    identifierExists: false,
    mpn: "",
    googleProductCategory: "",
    productType: "",
    brand: "Sire Printing",
    condition: "new",
    availability: "in stock",

    // SEO
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    schema: "",

    // Variants
    variants: [],
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchProducts();
    fetchDropData();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const json = await res.json();
    if (json.success) setProducts(json.data);
  };

  const fetchDropData = async () => {
    try {
      console.log("Fetching data...");

      const [resCat, resSub] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/subcategories"),
      ]);

      const catJson = await resCat.json();
      const subJson = await resSub.json();

      console.log("Raw Category Data:", catJson);

      // --- Category Logic ---
      if (Array.isArray(catJson)) {
        setCategories(catJson);
        console.log("Category set as direct array");
      } else if (catJson.success && Array.isArray(catJson.data)) {
        setCategories(catJson.data);
        console.log("Category set from .data property");
      }

      // --- Subcategory Logic ---
      if (Array.isArray(subJson)) {
        setSubcategories(subJson);
      } else if (subJson.success && Array.isArray(subJson.data)) {
        setSubcategories(subJson.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // Sanitize product data for editing
  const sanitizeProductForEdit = (product) => {
    // Deep clone to remove any MongoDB references
    const cleanProduct = JSON.parse(JSON.stringify(product));

    // Convert populated category to ID string
    if (cleanProduct.category && typeof cleanProduct.category === "object") {
      cleanProduct.category = cleanProduct.category._id || "";
    }

    // Convert populated subcategory to ID string
    if (
      cleanProduct.subcategory &&
      typeof cleanProduct.subcategory === "object"
    ) {
      cleanProduct.subcategory = cleanProduct.subcategory._id || "";
    }

    // Ensure all required arrays exist
    cleanProduct.additionalImages = cleanProduct.additionalImages || [];
    cleanProduct.quickFaqs = cleanProduct.quickFaqs || [];
    cleanProduct.faqs = cleanProduct.faqs || [];
    cleanProduct.variants = cleanProduct.variants || [];

    // Ensure specifications object exists with all required keys
    if (!cleanProduct.specifications) {
      cleanProduct.specifications = {
        material: [],
        colorModels: [],
        finishing: [],
        addon: [],
        coatingOption: [],
        turnaroundTime: [],
      };
    }

    // Set defaults for missing fields
    cleanProduct.reviews = cleanProduct.reviews || 0;
    cleanProduct.price = cleanProduct.price || 0;
    cleanProduct.salePrice = cleanProduct.salePrice || 0;
    cleanProduct.identifierExists = cleanProduct.identifierExists || false;
    cleanProduct.mpn = cleanProduct.mpn || "";
    cleanProduct.googleProductCategory =
      cleanProduct.googleProductCategory || "";
    cleanProduct.productType = cleanProduct.productType || "";
    cleanProduct.brand = cleanProduct.brand || "Sire Printing";
    cleanProduct.condition = cleanProduct.condition || "new";
    cleanProduct.availability = cleanProduct.availability || "in stock";
    cleanProduct.seoTitle = cleanProduct.seoTitle || "";
    cleanProduct.seoDescription = cleanProduct.seoDescription || "";
    cleanProduct.seoKeywords = cleanProduct.seoKeywords || "";
    cleanProduct.schema = cleanProduct.schema || "";

    return cleanProduct;
  };

  // Helper to add items to arrays
  const addArrayItem = (path, newItem) => {
    const keys = path.split(".");
    let newData = { ...formData };
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
    current[keys[keys.length - 1]] = [
      ...current[keys[keys.length - 1]],
      newItem,
    ];
    setFormData(newData);
  };

  const removeArrayItem = (path, index) => {
    const keys = path.split(".");
    let newData = { ...formData };
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
    current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter(
      (_, i) => i !== index,
    );
    setFormData(newData);
  };

  const updateArrayItem = (path, index, field, value) => {
    const keys = path.split(".");
    let newData = { ...formData };
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
    current[keys[keys.length - 1]][index][field] = value;
    setFormData(newData);
  };

  // Variant handlers
  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        {
          variantTitle: "",
          variantShortDescription: "",
          id: `var_${Date.now()}`,
          slug: "",
          sku: "",
          reviews: 0,
          fullDescription: "",
          price: 0,
          salePrice: 0,
          quickFaqs: [],
          identifierExists: false,
          mpn: "",
          googleProductCategory: "",
          productType: "",
          brand: formData.brand,
          condition: "new",
          availability: "in stock",
          seoTitle: "",
          seoDescription: "",
          seoKeywords: "",
          schema: "",
        },
      ],
    });
  };

  const updateVariant = (vIdx, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[vIdx][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const removeVariant = (vIdx) => {
    const filtered = formData.variants.filter((_, i) => i !== vIdx);
    setFormData({ ...formData, variants: filtered });
  };

  // Variant FAQ handlers
  const addVariantFaq = (vIdx, faqType) => {
    const newVariants = [...formData.variants];
    newVariants[vIdx][faqType].push({ question: "", answer: "" });
    setFormData({ ...formData, variants: newVariants });
  };

  const updateVariantFaq = (vIdx, faqType, fIdx, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[vIdx][faqType][fIdx][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const removeVariantFaq = (vIdx, faqType, fIdx) => {
    const newVariants = [...formData.variants];
    newVariants[vIdx][faqType] = newVariants[vIdx][faqType].filter(
      (_, i) => i !== fIdx,
    );
    setFormData({ ...formData, variants: newVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setIsModalOpen(false);
      fetchProducts();
      setFormData(initialForm);
      setEditingId(null);
    }
    setLoading(false);
  };

  // Helper function to get category title by id
  const getCategoryTitle = (categoryId) => {
    if (!categoryId) return "—";
    // If it's an object, try to get the title directly
    if (typeof categoryId === "object" && categoryId.title) {
      return categoryId.title;
    }
    const category = categories.find((c) => c._id === categoryId);
    return category ? category.title : categoryId;
  };

  // Helper function to get subcategory title by id
  const getSubcategoryTitle = (subcategoryId) => {
    if (!subcategoryId) return "—";
    // If it's an object, try to get the title directly
    if (typeof subcategoryId === "object" && subcategoryId.title) {
      return subcategoryId.title;
    }
    const subcategory = subcategories.find((s) => s._id === subcategoryId);
    return subcategory ? subcategory.title : subcategoryId;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Products</h1>
        <button
          onClick={() => {
            setFormData(initialForm);
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all"
        >
          + Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-5 text-gray-400 uppercase text-xs font-black">
                Product
              </th>
              <th className="p-5 text-gray-400 uppercase text-xs font-black">
                Category
              </th>
              <th className="p-5 text-gray-400 uppercase text-xs font-black">
                SKU
              </th>
              <th className="p-5 text-gray-400 uppercase text-xs font-black">
                Price
              </th>
              <th className="p-5 text-gray-400 uppercase text-xs font-black">
                Variants
              </th>
              <th className="p-5 text-right text-gray-400 uppercase text-xs font-black">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-blue-50/30 transition">
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={p.image}
                      className="w-12 h-12 object-contain rounded-lg border"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.png";
                      }}
                    />
                    <div>
                      <div className="font-bold text-gray-800">{p.title}</div>
                      <div className="text-xs text-gray-500">{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <div className="text-sm">
                    {getCategoryTitle(p.category)} /{" "}
                    {getSubcategoryTitle(p.subcategory)}
                  </div>
                </td>
                <td className="p-5 text-sm font-mono">{p.sku || "—"}</td>
                <td className="p-5">
                  <div className="font-bold text-gray-900">${p.price}</div>
                  {p.salePrice > 0 && (
                    <div className="text-xs text-red-500 line-through">
                      ${p.salePrice}
                    </div>
                  )}
                </td>
                <td className="p-5">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                    {p.variants?.length || 0} Variants
                  </span>
                </td>
                <td className="p-5 text-right space-x-4">
                  <button
                    onClick={() => {
                      const sanitizedProduct = sanitizeProductForEdit(p);
                      setFormData(sanitizedProduct);
                      setEditingId(p._id);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 font-bold hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Permanently delete?")) {
                        await fetch(`/api/products/${p._id}`, {
                          method: "DELETE",
                        });
                        fetchProducts();
                      }
                    }}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mega Modal with ALL Fields */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex justify-center items-center z-50 p-6">
          <div className="bg-white w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
                {editingId
                  ? `Editing: ${formData.title}`
                  : "Create New Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-white border w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition"
              >
                &times;
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b px-6 bg-gray-50">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { id: "basic", label: "Basic Info" },
                  { id: "content", label: "Content & Images" },
                  { id: "specs", label: "Specifications" },
                  { id: "faqs", label: "FAQs" },
                  { id: "pricing", label: "Pricing & SEO" },
                  {
                    id: "variants",
                    label: `Variants (${formData.variants.length})`,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 font-bold transition ${
                      activeTab === tab.id
                        ? "border-b-2 border-indigo-600 text-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-8 space-y-8"
            >
              {/* TAB 1: BASIC INFO */}
              {activeTab === "basic" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 outline-none"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-indigo-500 outline-none"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Product ID
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.id}
                        onChange={(e) =>
                          setFormData({ ...formData, id: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        SKU
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.sku}
                        onChange={(e) =>
                          setFormData({ ...formData, sku: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Subcategory
                      </label>
                      <select
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.subcategory}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            subcategory: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Subcategory</option>
                        {subcategories.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Brand
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.brand}
                        onChange={(e) =>
                          setFormData({ ...formData, brand: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Reviews Count
                      </label>
                      <input
                        type="number"
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.reviews}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reviews: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Short Description
                    </label>
                    <textarea
                      className="w-full border-2 border-gray-200 rounded-xl p-3 h-24"
                      value={formData.shortDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shortDescription: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Description
                    </label>
                    <RichTextEditor
                      value={formData.fullDescription}
                      onChange={(html) =>
                        setFormData({ ...formData, fullDescription: html })
                      }
                      label="Full Description"
                      height={300}
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: CONTENT & IMAGES */}
              {activeTab === "content" && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Thumbnail Image
                    </label>
                    <ImageUploader
                      value={formData.image}
                      onChange={(url) =>
                        setFormData({ ...formData, image: url })
                      }
                      label="Main Product Image"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Featured Image
                    </label>
                    <ImageUploader
                      value={formData.featuredImage}
                      onChange={(url) =>
                        setFormData({ ...formData, featuredImage: url })
                      }
                      label="Featured/Hero Image"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Additional Images (Gallery)
                    </label>
                    <ImageUploader
                      value={formData.additionalImages}
                      onChange={(urls) =>
                        setFormData({ ...formData, additionalImages: urls })
                      }
                      multiple={true}
                      label="Upload multiple images"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: SPECIFICATIONS */}
              {activeTab === "specs" && (
                <div className="space-y-8">
                  {Object.entries(formData.specifications).map(
                    ([specKey, specItems]) => (
                      <div
                        key={specKey}
                        className="border rounded-xl p-6 bg-gray-50"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-lg capitalize">
                            {specKey.replace(/([A-Z])/g, " $1").trim()}
                          </h3>
                          <button
                            type="button"
                            onClick={() =>
                              addArrayItem(`specifications.${specKey}`, {
                                heading: "",
                                description: [],
                              })
                            }
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700"
                          >
                            + Add Specification
                          </button>
                        </div>
                        <div className="space-y-3">
                          {specItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex gap-3 bg-white p-3 rounded-lg"
                            >
                              <input
                                placeholder="Heading (e.g., Material, Size, Weight)"
                                className="flex-1 border rounded-lg p-2"
                                value={item.heading}
                                onChange={(e) =>
                                  updateArrayItem(
                                    `specifications.${specKey}`,
                                    idx,
                                    "heading",
                                    e.target.value,
                                  )
                                }
                              />
                              <input
                                placeholder="Description (comma separated values)"
                                className="flex-2 border rounded-lg p-2"
                                value={item.description.join(", ")}
                                onChange={(e) =>
                                  updateArrayItem(
                                    `specifications.${specKey}`,
                                    idx,
                                    "description",
                                    e.target.value
                                      .split(",")
                                      .map((s) => s.trim()),
                                  )
                                }
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeArrayItem(
                                    `specifications.${specKey}`,
                                    idx,
                                  )
                                }
                                className="text-red-500 font-bold px-3"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}

              {/* TAB 4: FAQS */}
              {activeTab === "faqs" && (
                <div className="space-y-8">
                  {/* Quick FAQs */}
                  <div className="border rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">
                        Quick FAQs (Short answers)
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          addArrayItem("quickFaqs", {
                            question: "",
                            answer: "",
                          })
                        }
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
                      >
                        + Add Quick FAQ
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.quickFaqs.map((faq, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                          <input
                            placeholder="Question"
                            className="w-full border rounded-lg p-2 mb-2 font-bold"
                            value={faq.question}
                            onChange={(e) =>
                              updateArrayItem(
                                "quickFaqs",
                                idx,
                                "question",
                                e.target.value,
                              )
                            }
                          />
                          <textarea
                            placeholder="Answer"
                            className="w-full border rounded-lg p-2"
                            rows="2"
                            value={faq.answer}
                            onChange={(e) =>
                              updateArrayItem(
                                "quickFaqs",
                                idx,
                                "answer",
                                e.target.value,
                              )
                            }
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem("quickFaqs", idx)}
                            className="text-red-500 text-sm mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed FAQs */}
                  <div className="border rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">
                        Detailed FAQs (Long answers)
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          addArrayItem("faqs", { question: "", answer: "" })
                        }
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
                      >
                        + Add Detailed FAQ
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.faqs.map((faq, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                          <input
                            placeholder="Question"
                            className="w-full border rounded-lg p-2 mb-2 font-bold"
                            value={faq.question}
                            onChange={(e) =>
                              updateArrayItem(
                                "faqs",
                                idx,
                                "question",
                                e.target.value,
                              )
                            }
                          />
                          <RichTextEditor
                            value={faq.answer}
                            onChange={(html) =>
                              updateArrayItem("faqs", idx, "answer", html)
                            }
                            label="Answer"
                            height={150}
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem("faqs", idx)}
                            className="text-red-500 text-sm mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PRICING & SEO */}
              {activeTab === "pricing" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Sale Price
                      </label>
                      <input
                        type="number"
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.salePrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salePrice: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Condition
                      </label>
                      <select
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.condition}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            condition: e.target.value,
                          })
                        }
                      >
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="refurbished">Refurbished</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Availability
                      </label>
                      <select
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.availability}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            availability: e.target.value,
                          })
                        }
                      >
                        <option value="in stock">In Stock</option>
                        <option value="out of stock">Out of Stock</option>
                        <option value="preorder">Pre-order</option>
                        <option value="backorder">Backorder</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        MPN (Manufacturer Part Number)
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.mpn}
                        onChange={(e) =>
                          setFormData({ ...formData, mpn: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Google Product Category
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.googleProductCategory}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            googleProductCategory: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Product Type
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-xl p-3"
                        value={formData.productType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            productType: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="identifierExists"
                        checked={formData.identifierExists}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            identifierExists: e.target.checked,
                          })
                        }
                        className="w-5 h-5"
                      />
                      <label
                        htmlFor="identifierExists"
                        className="text-sm font-bold text-gray-700"
                      >
                        Identifier Exists (GTIN, UPC, EAN)
                      </label>
                    </div>
                  </div>

                  {/* SEO Section */}
                  <div className="border-t pt-6">
                    <h3 className="font-bold text-lg mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          SEO Title
                        </label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-xl p-3"
                          value={formData.seoTitle}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              seoTitle: e.target.value,
                            })
                          }
                          placeholder="Meta title for search engines"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          SEO Description
                        </label>
                        <textarea
                          className="w-full border-2 border-gray-200 rounded-xl p-3 h-24"
                          value={formData.seoDescription}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              seoDescription: e.target.value,
                            })
                          }
                          placeholder="Meta description for search engines"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          SEO Keywords
                        </label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-xl p-3"
                          value={formData.seoKeywords}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              seoKeywords: e.target.value,
                            })
                          }
                          placeholder="Comma separated keywords"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          JSON-LD Schema
                        </label>
                        <textarea
                          className="w-full border-2 border-gray-200 rounded-xl p-3 h-40 font-mono text-sm"
                          value={formData.schema}
                          onChange={(e) =>
                            setFormData({ ...formData, schema: e.target.value })
                          }
                          placeholder='{"@context": "https://schema.org", ...}'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: VARIANTS */}
              {activeTab === "variants" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center sticky top-0 bg-white py-4 z-10">
                    <h3 className="font-bold text-xl">Product Variants</h3>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg"
                    >
                      + Add New Variant
                    </button>
                  </div>

                  {formData.variants.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <p className="text-gray-500">
                        No variants yet. Click "Add New Variant" to get started.
                      </p>
                    </div>
                  )}

                  {formData.variants.map((variant, vIdx) => (
                    <div
                      key={vIdx}
                      className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                    >
                      {/* Variant Header */}
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 border-b flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                            {vIdx + 1}
                          </span>
                          <input
                            type="text"
                            placeholder="Variant Title"
                            className="text-xl font-bold bg-transparent border-b-2 border-pink-300 focus:border-pink-600 outline-none px-2"
                            value={variant.variantTitle}
                            onChange={(e) =>
                              updateVariant(
                                vIdx,
                                "variantTitle",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVariant(vIdx)}
                          className="text-red-500 hover:text-red-700 font-bold px-4 py-2 rounded-lg hover:bg-red-50"
                        >
                          Delete Variant
                        </button>
                      </div>

                      {/* Variant Content */}
                      <div className="p-6 space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Variant ID
                            </label>
                            <input
                              className="w-full border rounded-lg p-2 text-sm"
                              value={variant.id}
                              onChange={(e) =>
                                updateVariant(vIdx, "id", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Slug
                            </label>
                            <input
                              className="w-full border rounded-lg p-2 text-sm"
                              value={variant.slug}
                              onChange={(e) =>
                                updateVariant(vIdx, "slug", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              SKU
                            </label>
                            <input
                              className="w-full border rounded-lg p-2 text-sm font-mono"
                              value={variant.sku}
                              onChange={(e) =>
                                updateVariant(vIdx, "sku", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        {/* Short Description */}
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                            Short Description
                          </label>
                          <input
                            className="w-full border rounded-lg p-2"
                            value={variant.variantShortDescription}
                            onChange={(e) =>
                              updateVariant(
                                vIdx,
                                "variantShortDescription",
                                e.target.value,
                              )
                            }
                          />
                        </div>

                        {/* Full Description with Rich Text */}
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                            Full Description
                          </label>
                          <RichTextEditor
                            value={variant.fullDescription}
                            onChange={(html) =>
                              updateVariant(vIdx, "fullDescription", html)
                            }
                            label="Variant Description"
                            height={200}
                          />
                        </div>

                        {/* Pricing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Price
                            </label>
                            <input
                              type="number"
                              className="w-full border rounded-lg p-2 text-green-600 font-bold"
                              value={variant.price}
                              onChange={(e) =>
                                updateVariant(
                                  vIdx,
                                  "price",
                                  parseFloat(e.target.value),
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Sale Price
                            </label>
                            <input
                              type="number"
                              className="w-full border rounded-lg p-2"
                              value={variant.salePrice}
                              onChange={(e) =>
                                updateVariant(
                                  vIdx,
                                  "salePrice",
                                  parseFloat(e.target.value),
                                )
                              }
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Brand
                            </label>
                            <input
                              className="w-full border rounded-lg p-2"
                              value={variant.brand}
                              onChange={(e) =>
                                updateVariant(vIdx, "brand", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              MPN
                            </label>
                            <input
                              className="w-full border rounded-lg p-2"
                              value={variant.mpn}
                              onChange={(e) =>
                                updateVariant(vIdx, "mpn", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Google Product Category
                            </label>
                            <input
                              className="w-full border rounded-lg p-2"
                              value={variant.googleProductCategory}
                              onChange={(e) =>
                                updateVariant(
                                  vIdx,
                                  "googleProductCategory",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Product Type
                            </label>
                            <input
                              className="w-full border rounded-lg p-2"
                              value={variant.productType}
                              onChange={(e) =>
                                updateVariant(
                                  vIdx,
                                  "productType",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Condition
                            </label>
                            <select
                              className="w-full border rounded-lg p-2"
                              value={variant.condition}
                              onChange={(e) =>
                                updateVariant(vIdx, "condition", e.target.value)
                              }
                            >
                              <option value="new">New</option>
                              <option value="used">Used</option>
                              <option value="refurbished">Refurbished</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                              Availability
                            </label>
                            <select
                              className="w-full border rounded-lg p-2"
                              value={variant.availability}
                              onChange={(e) =>
                                updateVariant(
                                  vIdx,
                                  "availability",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="in stock">In Stock</option>
                              <option value="out of stock">Out of Stock</option>
                              <option value="preorder">Pre-order</option>
                            </select>
                          </div>
                        </div>

                        {/* Variant FAQs */}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-3">
                            <label className="text-xs font-bold text-gray-500 uppercase">
                              Variant FAQs
                            </label>
                            <button
                              type="button"
                              onClick={() => addVariantFaq(vIdx, "quickFaqs")}
                              className="text-indigo-600 text-sm font-bold"
                            >
                              + Add FAQ
                            </button>
                          </div>
                          {variant.quickFaqs.map((faq, fIdx) => (
                            <div
                              key={fIdx}
                              className="bg-gray-50 p-3 rounded-lg mb-3"
                            >
                              <input
                                placeholder="Question"
                                className="w-full border rounded-lg p-2 mb-2 font-bold text-sm"
                                value={faq.question}
                                onChange={(e) =>
                                  updateVariantFaq(
                                    vIdx,
                                    "quickFaqs",
                                    fIdx,
                                    "question",
                                    e.target.value,
                                  )
                                }
                              />
                              <textarea
                                placeholder="Answer"
                                className="w-full border rounded-lg p-2 text-sm"
                                rows="2"
                                value={faq.answer}
                                onChange={(e) =>
                                  updateVariantFaq(
                                    vIdx,
                                    "quickFaqs",
                                    fIdx,
                                    "answer",
                                    e.target.value,
                                  )
                                }
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeVariantFaq(vIdx, "quickFaqs", fIdx)
                                }
                                className="text-red-500 text-xs mt-2"
                              >
                                Remove FAQ
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Variant SEO */}
                        <div className="border-t pt-4">
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-3">
                            Variant SEO
                          </label>
                          <div className="space-y-3">
                            <input
                              placeholder="SEO Title"
                              className="w-full border rounded-lg p-2 text-sm"
                              value={variant.seoTitle}
                              onChange={(e) =>
                                updateVariant(vIdx, "seoTitle", e.target.value)
                              }
                            />
                            <textarea
                              placeholder="SEO Description"
                              className="w-full border rounded-lg p-2 text-sm h-20"
                              value={variant.seoDescription}
                              onChange={(e) =>
                                updateVariant(
                                  vIdx,
                                  "seoDescription",
                                  e.target.value,
                                )
                              }
                            />
                            <input
                              placeholder="SEO Keywords (comma separated)"
                              className="w-full border rounded-lg p-2 text-sm"
                              value={variant.seoKeywords}
                              onChange={(e) =>
                                updateVariant(
                                  vIdx,
                                  "seoKeywords",
                                  e.target.value,
                                )
                              }
                            />
                            <textarea
                              placeholder="JSON-LD Schema"
                              className="w-full border rounded-lg p-2 text-sm font-mono h-24"
                              value={variant.schema}
                              onChange={(e) =>
                                updateVariant(vIdx, "schema", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        {/* Identifier Checkbox */}
                        <div className="flex items-center gap-2 border-t pt-4">
                          <input
                            type="checkbox"
                            id={`variant_identifier_${vIdx}`}
                            checked={variant.identifierExists}
                            onChange={(e) =>
                              updateVariant(
                                vIdx,
                                "identifierExists",
                                e.target.checked,
                              )
                            }
                            className="w-4 h-4"
                          />
                          <label
                            htmlFor={`variant_identifier_${vIdx}`}
                            className="text-sm text-gray-600"
                          >
                            Identifier Exists (GTIN/UPC/EAN) for this variant
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Form Actions */}
              <div className="sticky bottom-0 bg-white border-t pt-6 mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingId
                      ? "Update Product"
                      : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
