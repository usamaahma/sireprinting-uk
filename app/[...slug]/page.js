import { notFound } from "next/navigation";
import CategoryView from "./views/CategoryView";
import SubCategoryView from "./views/SubCategoryView";
import ProductView from "./views/ProductView";
import Breadcrumbs from "@/components/Breadcrumbs";

async function getDynamicData(slugPath) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/resolve/${slugPath}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Routing Core Error:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams?.slug || [];

  if (slugArray.length === 0) {
    return <div>Home Page Content</div>;
  }

  const currentSlug = slugArray.join("/");
  const responseData = await getDynamicData(currentSlug);

  if (!responseData) return notFound();

  // 🔥 FIX LAYER: Standardize and Merge Data
  // Top-level properties (type, display_as, aur inject kiye hue products) ko
  // inner data object (faqs, title, etc.) ke saath safely blend kar rahe hain.
  let finalData = {};

  if (responseData.success && responseData.data) {
    finalData = {
      ...responseData.data, // FAQs, title, description sab yahan se aaya
      type: responseData.type, // Top-level type wrapper layer
      display_as: responseData.display_as, // Top-level display mode
      products: responseData.products || responseData.data.products || [], // Teeno layers se products fallback layer
    };
  } else {
    finalData = { ...responseData };
  }

  // Pure data variables extraction matching layout conditions
  const dataType = finalData.type;
  const displayAs = finalData.display_as;

  // Render components based on unwrapped data mapping
  switch (dataType) {
    case "category":
      return <CategoryView data={finalData} />;

    case "subcategory":
      if (displayAs === "product") {
        return (
          <ProductView
            data={finalData}
            isHybrid={true}
            initialVariantSlug={null}
          />
        );
      }
      return <SubCategoryView data={finalData} />;

    case "product":
      return (
        <div className="mt-24">
          <ProductView data={finalData} initialVariantSlug={null} />
        </div>
      );

    case "variant":
      return (
        <div className="mt-24">
          <ProductView
            data={finalData.parentProduct || finalData}
            initialVariantSlug={finalData.slug}
          />
        </div>
      );

    default:
      return notFound();
  }
}
