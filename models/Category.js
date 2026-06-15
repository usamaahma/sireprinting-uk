import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortdescription: { type: String },
    image: { type: String }, // Main thumbnail URL
    featuredImage: { type: String }, // Banner URL
    description: { type: String }, // Full HTML content
    
    // FAQs as an Array of Objects
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],

    // SEO Section
    seoTitle: { type: String },
    seoKeywords: { type: String },
    seoDescription: { type: String },
    schema: { type: String }, // Structured Data (JSON-LD)
  },
  { timestamps: true }
);

// Next.js mein model compile karne ka sahi tareeqa
export default mongoose.models.Category || mongoose.model("Category", CategorySchema);