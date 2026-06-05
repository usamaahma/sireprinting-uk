import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Subcategory from "@/models/Subcategory";
import Blog from "@/models/Blog"; // 👈 IMPORTANT: Blog model import kiya

export const dynamic = "force-dynamic";

/**
 * Helper function to parse slug from Catch-All array
 * Handles both multiple segments safely and filters out prefix routing noise
 */
function parseSlugParam(slugParam) {
  if (Array.isArray(slugParam)) {
    // Clean out any accidental leading API routing strings if appended by frontend custom hooks
    const cleanSegments = slugParam.filter(
      (seg) => seg !== "api" && seg !== "resolve",
    );
    return cleanSegments.join("/");
  }
  return slugParam || "";
}

/**
 * GET: Resolve Slug Logic (Variant -> Product -> Subcategory -> Category -> Blog)
 */
export async function GET(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    let fullSlug = parseSlugParam(resolvedParams?.slug);

    if (!fullSlug) {
      return NextResponse.json(
        { success: false, error: "Slug parameter is missing" },
        { status: 400 },
      );
    }

    const isObjectId = fullSlug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: fullSlug } : { slug: fullSlug };

    // =============================================
    // 🔥 STEP 1: VARIANT CHECK
    // =============================================
    const variantProduct = await Product.findOne({
      "variants.slug": fullSlug,
    }).lean();

    if (variantProduct) {
      const matchedVariant = variantProduct.variants.find(
        (v) => v.slug === fullSlug,
      );

      if (matchedVariant) {
        return NextResponse.json({
          ...matchedVariant,
          type: "variant",
          parentProduct: {
            _id: variantProduct._id,
            title: variantProduct.title,
            slug: variantProduct.slug,
            image: variantProduct.image,
            featuredImage: variantProduct.featuredImage,
            additionalImages: variantProduct.additionalImages || [],
            specifications: variantProduct.specifications || {},
            faqs: variantProduct.faqs || [],
            quickFaqs: variantProduct.quickFaqs || [],
            variants: variantProduct.variants || [],
            shortDescription: variantProduct.shortDescription,
            fullDescription: variantProduct.fullDescription,
            price: variantProduct.price,
            salePrice: variantProduct.salePrice,
            sku: variantProduct.sku,
            reviews: variantProduct.reviews,
            seoTitle: variantProduct.seoTitle,
            seoDescription: variantProduct.seoDescription,
            seoKeywords: variantProduct.seoKeywords,
          },
        });
      }
    }

    // =============================================
    // STEP 2: PRODUCT CHECK
    // =============================================
    const product = await Product.findOne(query).lean();
    if (product) {
      return NextResponse.json({
        ...JSON.parse(JSON.stringify(product)),
        type: "product",
      });
    }

    // =============================================
    // STEP 3: SUBCATEGORY CHECK (Hybrid Logic)
    // =============================================
    const subcategory = await Subcategory.findOne(query).lean();
    if (subcategory) {
      const subObj = JSON.parse(JSON.stringify(subcategory));

      const products = await Product.find({ subcategory: subObj._id })
        .select(
          "title slug featuredImage image price salePrice shortDescription sku reviews",
        )
        .sort({ createdAt: -1 })
        .limit(12)
        .lean();

      const isProductMode =
        subObj.display_as === "product" ||
        subObj.sku ||
        (subObj.variants && subObj.variants.length > 0);

      return NextResponse.json({
        success: true,
        type: "subcategory",
        display_as: isProductMode ? "product" : "simple",
        data: {
          ...subObj,
          products: products,
        },
      });
    }

    // =============================================
    // STEP 4: CATEGORY CHECK
    // =============================================
    const category = await Category.findOne(query).lean();
    if (category) {
      const categoryObj = JSON.parse(JSON.stringify(category));

      const subcategories = await Subcategory.find({
        parentCategory: categoryObj._id,
      })
        .select("title slug shortdescription featuredImage image display_as")
        .sort({ order: 1, createdAt: -1 })
        .lean();

      const subcategoriesWithProducts = await Promise.all(
        subcategories.map(async (sub) => {
          const products = await Product.find({ subcategory: sub._id })
            .select(
              "title slug featuredImage image price salePrice shortDescription sku reviews",
            )
            .sort({ createdAt: -1 })
            .limit(6)
            .lean();

          return {
            ...sub,
            products: products,
          };
        }),
      );

      return NextResponse.json({
        ...categoryObj,
        subcategories: subcategoriesWithProducts,
        type: "category",
      });
    }

    // =============================================
    // 🔥 STEP 5: BLOG CHECK (Naya Add Kiya)
    // =============================================
    const blog = await Blog.findOne(query)
      .populate("category", "title slug")
      .populate("relatedProducts", "title price image slug")
      .lean();

    if (blog) {
      // Automatic view increment safely without blocking main thread
      await Blog.updateOne(query, { $inc: { views: 1 } });

      return NextResponse.json({
        ...JSON.parse(JSON.stringify(blog)),
        type: "blog",
      });
    }

    // =============================================
    // STEP 6: NOT FOUND
    // =============================================
    return NextResponse.json(
      {
        success: false,
        error: "Requested URL slug not found across catalogue schemas",
      },
      { status: 404 },
    );
  } catch (error) {
    console.error("Critical API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

/**
 * PUT: Update Subcategory (By ID)
 */
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;

    const slugParam = resolvedParams?.slug;
    const targetId = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const body = await req.json();

    const updatedSub = await Subcategory.findByIdAndUpdate(targetId, body, {
      new: true,
      runValidators: false,
    }).lean();

    if (!updatedSub) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(updatedSub)),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

/**
 * DELETE: Remove Subcategory (By ID)
 */
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;

    const slugParam = resolvedParams?.slug;
    const targetId = Array.isArray(slugParam) ? slugParam[0] : slugParam;

    const deleted = await Subcategory.findByIdAndDelete(targetId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
