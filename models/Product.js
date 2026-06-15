import mongoose from "mongoose";

// Reusable DetailItem Schema
const DetailItemSchema = new mongoose.Schema(
  {
    heading: String,
    description: [String],
  },
  { _id: false },
);

// Reusable FAQ Schema
const FAQSchema = new mongoose.Schema(
  {
    question: String,
    answer: mongoose.Schema.Types.Mixed, // Supports string or array
  },
  { _id: false },
);

// Variant Schema (Exactly as provided)
const VariantSchema = new mongoose.Schema({
  variantTitle: String,
  variantShortDescription: String,
  id: String,
  slug: String,
  sku: String,
  reviews: { type: Number, default: 0 },
  fullDescription: String,
  price: Number,
  salePrice: Number,
  quickFaqs: [FAQSchema],
  identifierExists: { type: Boolean, default: false },
  mpn: String,
  googleProductCategory: String,
  productType: String,
  brand: String,
  condition: { type: String, default: "new" },
  availability: { type: String, default: "in stock" },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: String,
  schema: String,
});

const ProductSchema = new mongoose.Schema(
  {
    // --- Identity & Relations ---
    title: String,
    slug: { type: String, unique: true, required: true },
    // parentCategory: String,
    // parentSubcategory: String, // Naya field jo aapne manga tha
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      index: true,
    },
    // --- Content ---
    shortDescription: String,
    fullDescription: String,
    image: String,
    featuredImage: String,
    additionalImages: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },

    // --- Product Specifics ---
    id: String,
    sku: String,
    reviews: { type: Number, default: 0 },

    specifications: {
      material: [DetailItemSchema],
      colorModels: [DetailItemSchema],
      finishing: [DetailItemSchema],
      addon: [DetailItemSchema],
      coatingOption: [DetailItemSchema],
      turnaroundTime: [DetailItemSchema],
    },

    quickFaqs: [FAQSchema],
    faqs: [FAQSchema],

    // --- Google Merchant / Pricing ---
    price: Number,
    salePrice: Number,
    identifierExists: { type: Boolean, default: false },
    mpn: String,
    googleProductCategory: String,
    productType: String,
    brand: String,
    condition: { type: String, default: "new" },
    availability: { type: String, default: "in stock" },

    // --- SEO ---
    seoTitle: String,
    seoDescription: String,
    seoKeywords: String,
    schema: String,

    // --- Variants ---
    variants: [VariantSchema],
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
