import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import Subcategory from "@/models/Subcategory";

import Hero from "@/components/Hero";
import PerksBar from "@/components/PerksBar";
import IntroText from "@/components/IntroText";
import IndustrySection from "@/components/Industry";
import ContentSection from "@/components/ContentSection";
import FAQSection from "@/components/Faqs";
import Testimonials from "@/components/Testimonials";
import PackagingSections from "@/components/FinalCta";
import CustomPackagingCards from "@/components/custompackagingcards";


export default async function HomePage() {
  // Database connect karein
  await dbConnect();

  // 1. Slug se exact Category dhoondein
  const category = await Category.findOne({
    slug: "custom-product-boxes",
  }).lean();

  let subcategoriesData = [];

  // 2. Agar Category mil gayi, toh uski ID se subcategories fetch karein
  if (category) {
    const rawSubcategories = await Subcategory.find({
      parentCategory: category._id,
    }).lean();

    // 3. Data ko map karein taake client component crash na ho
    subcategoriesData = rawSubcategories.map((sub) => ({
      ...sub,
      _id: sub._id.toString(),
      parentCategory: sub.parentCategory ? sub.parentCategory.toString() : "",
    }));
  } else {
    console.error("Category 'custom-product-boxes' not found in DB!");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <IntroText />
      <PerksBar />

      {/* Yahan wahi subcategories jayengi jo Custom Product Boxes ki hain */}
      <IndustrySection subcategoriesData={subcategoriesData} />
      <CustomPackagingCards />
      <ContentSection />
      <Testimonials />
      <PackagingSections />
      <FAQSection />
    </div>
  );
}
