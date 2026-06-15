import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subcategory from "@/models/Subcategory";
import Product from "@/models/Product";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";

/**
 * READ (GET): 3-in-1 Logic
 * 1. By ID (ObjectId)
 * 2. By Slug (Text)
 * 3. By parentCategory (Query Param: ?type=parent)
 */
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params; // Next.js 15+ needs await
    const { searchParams } = new URL(req.url);
    const isParentSearch = searchParams.get("type") === "parent";

    // --- CASE 1: Get all subcategories by parentCategory ---
    // Usage: /api/resolve/CATEGORY_NAME_OR_ID?type=parent
    if (isParentSearch) {
      const subcategories = await Subcategory.find({ parentCategory: slug });
      return NextResponse.json({
        success: true,
        count: subcategories.length,
        data: subcategories,
        type: "subcategory_list",
      });
    }

    // Check if the parameter is a valid MongoDB ObjectId
    const isObjectId = slug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: slug } : { slug: slug };

    // --- CASE 2 & 3: Single Fetch (ID or Slug) ---
    // Priority: Subcategory -> Product -> Category

    // 1. Check Subcategory
    let result = await Subcategory.findOne(query);
    if (result) {
      return NextResponse.json({
        success: true,
        data: result,
        type: "subcategory",
      });
    }

    // 2. Check Product
    result = await Product.findOne(query);
    if (result) {
      return NextResponse.json({
        success: true,
        data: result,
        type: "product",
      });
    }

    // 3. Check Category
    result = await Category.findOne(query);
    if (result) {
      return NextResponse.json({
        success: true,
        data: result,
        type: "category",
      });
    }

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

/**
 * UPDATE (PUT): Update by ID
 */
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params; // Yahan 'slug' folder name hai, but it acts as ID
    const body = await req.json();

    const updated = await Subcategory.findByIdAndUpdate(slug, body, {
      new: true,
      runValidators: false,
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

/**
 * DELETE: Remove by ID
 */
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
