import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import mongoose from "mongoose";

// COMBINED GET METHOD
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params; // Next.js 15+ require await

    let category;

    // Check if the passed 'id' is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      // If it's a valid ID, search by ID
      category = await Category.findById(id);
    } else {
      // If it's NOT a valid ObjectId, treat it as a 'slug'
      category = await Category.findOne({ slug: id });
    }

    if (!category) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    // Return the category data. If found via slug, you can append the type
    return NextResponse.json({
      ...category.toObject(),
      type: "category",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. UPDATE (PUT)
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true },
    );

    if (!updatedCategory)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
