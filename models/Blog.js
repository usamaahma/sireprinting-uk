import mongoose from "mongoose";

// Models circular registration safety checks
import "./Category";
import "./Product";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String, unique: true },
    excerpt: { type: String },
    content: { type: String },

    // Media
    image: { type: String },
    bannerImage: { type: String },

    // Meta / Metrics
    readTime: { type: String },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },

    // E-commerce & Taxonomy Connections
    author: {
      name: { type: String },
      image: { type: String },
      designation: { type: String },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    // 🔥 FIXED CRITICAL LINE: [{ type: String }] ko simple [String] kiya taake 'indexedPaths' error khatam ho
    tags: [String],

    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    // SEO Section
    seoTitle: { type: String },
    seoKeywords: { type: String },
    seoDescription: { type: String },
    schema: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
