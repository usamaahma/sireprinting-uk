import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subcategory from "@/models/Subcategory";
import Product from "@/models/Product";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const isParentSearch = searchParams.get("type") === "parent";

    // --- CASE 1: Get subcategories by Parent (ID or Slug) ---
    if (isParentSearch) {
      let parentId = slug;

      // Agar slug 24 char ki ID nahi hai, to ise slug maan kar Category find karo
      if (!slug.match(/^[0-9a-fA-F]{24}$/)) {
        const category = await Category.findOne({ slug: slug }).lean();
        if (!category) {
          return NextResponse.json(
            { success: false, message: "Category nahi mili!" },
            { status: 404 },
          );
        }
        parentId = category._id;
      }

      // Sahi parentId mil gayi, ab subcategories fetch karo
      const subcategories = await Subcategory.find({
        parentCategory: parentId,
      }).lean();

      return NextResponse.json({
        success: true,
        count: subcategories.length,
        data: subcategories,
        type: "subcategory_list",
      });
    }

    // --- CASE 2: Single Fetch (Product/Subcategory/Category) ---
    const isObjectId = slug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: slug } : { slug: slug };

    let result = await Subcategory.findOne(query).lean();
    if (result)
      return NextResponse.json({
        success: true,
        data: result,
        type: "subcategory",
      });

    result = await Product.findOne(query).lean();
    if (result)
      return NextResponse.json({
        success: true,
        data: result,
        type: "product",
      });

    result = await Category.findOne(query).lean();
    if (result)
      return NextResponse.json({
        success: true,
        data: result,
        type: "category",
      });

    return NextResponse.json(
      { success: false, message: "Kuch nahi mila!" },
      { status: 404 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// UPDATE (PUT)
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await req.json();
    const updated = await Subcategory.findByIdAndUpdate(slug, body, {
      new: true,
    });
    if (!updated)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// DELETE
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const deleted = await Subcategory.findByIdAndDelete(slug);
    if (!deleted)
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 },
      );
    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
