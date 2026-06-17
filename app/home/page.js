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

export default async function HomePage() {
  await dbConnect();

  // 1. Database se BINA filter ke saari subcategories utha lein taake temporary 7 ki 7 show hon
  const rawSubcategories = await Subcategory.find({}).lean();

  // 2. Map the data safely for client component
  const subcategoriesData = rawSubcategories.map((sub) => ({
    ...sub,
    _id: sub._id.toString(),
    parentCategory: sub.parentCategory ? sub.parentCategory.toString() : "",
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <IntroText />
      <PerksBar />
      <IndustrySection subcategoriesData={subcategoriesData} />
      <ContentSection />
      <Testimonials />
      <PackagingSections />
      <FAQSection />
    </div>
  );
}
