// models/Subcategory.js

import mongoose from "mongoose";

const DetailItemSchema = new mongoose.Schema(
  {
    heading: { type: String, default: "" },
    description: { type: [String], default: [] },
  },
  { _id: false },
);

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
  },
  { _id: false },
);

const VariantSchema = new mongoose.Schema(
  {
    variantTitle: { type: String, default: "" },
    variantShortDescription: { type: String, default: "" },
    id: { type: String, default: "" },
    slug: { type: String, default: "" },
    sku: { type: String, default: "" },
    reviews: { type: Number, default: 0 },
    fullDescription: { type: String, default: "" },
    price: { type: Number, default: 0 },
    salePrice: { type: Number, default: 0 },

    quickFaqs: { type: [FAQSchema], default: [] },

    identifierExists: { type: Boolean, default: false },
    mpn: { type: String, default: "" },
    googleProductCategory: { type: String, default: "" },
    productType: { type: String, default: "" },
    brand: { type: String, default: "" },
    condition: { type: String, default: "new" },
    availability: { type: String, default: "in stock" },

    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: String, default: "" },
    schema: { type: String, default: "" },
  },
  { _id: false },
);

const SpecificationsSchema = new mongoose.Schema(
  {
    material: { type: [DetailItemSchema], default: [] },
    colorModels: { type: [DetailItemSchema], default: [] },
    finishing: { type: [DetailItemSchema], default: [] },
    addon: { type: [DetailItemSchema], default: [] },
    coatingOption: { type: [DetailItemSchema], default: [] },
    turnaroundTime: { type: [DetailItemSchema], default: [] },
  },
  { _id: false },
);

// ================= MAIN SCHEMA =================
const SubcategorySchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      default: "",
    },

    shortDescription: { type: String, default: "" },
    image: { type: String, default: "" },
    featuredImage: { type: String, default: "" },
    fullDescription: { type: String, default: "" },

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    id: { type: String, default: "" },
    sku: { type: String, default: "" },

    additionalImages: { type: [String], default: [] },
    reviews: { type: Number, default: 0 },

    specifications: { type: SpecificationsSchema, default: {} },

    quickFaqs: { type: [FAQSchema], default: [] },
    faqs: { type: [FAQSchema], default: [] },

    identifierExists: { type: Boolean, default: false },
    mpn: { type: String, default: "" },
    price: { type: Number, default: 0 },
    salePrice: { type: Number, default: 0 },
    googleProductCategory: { type: String, default: "" },
    productType: { type: String, default: "" },
    brand: { type: String, default: "" },
    condition: { type: String, default: "new" },
    availability: { type: String, default: "in stock" },

    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: String, default: "" },
    schema: { type: String, default: "" },

    variants: { type: [VariantSchema], default: [] },

    display_as: {
      type: String,
      default: "simple",
      enum: ["simple", "configurable", "variable"],
    },
  },
  { timestamps: true },
);

// Indexes
SubcategorySchema.index({ slug: 1 });
SubcategorySchema.index({ parentCategory: 1 });

// ================= SAFE MODEL REGISTRATION =================
const Subcategory =
  mongoose.models.Subcategory ||
  mongoose.model("Subcategory", SubcategorySchema);

export default Subcategory;
