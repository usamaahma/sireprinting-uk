import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import mongoose from "mongoose";

// 1. COMBINED GET METHOD (ID aur Slug dono se fetch aur auto-populate karega)
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params; // Next.js 15 async params resolution

    let blog;

    // Check if the passed 'id' is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } }, // Automatically increments views counter
        { new: true },
      )
        .populate("category", "title slug")
        .populate("relatedProducts", "title price image slug");
    } else {
      // If it's NOT a valid ObjectId, treat it as a 'slug'
      blog = await Blog.findOneAndUpdate(
        { slug: id },
        { $inc: { views: 1 } },
        { new: true },
      )
        .populate("category", "title slug")
        .populate("relatedProducts", "title price image slug");
    }

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ...blog.toObject(),
      type: "blog",
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

    if (body.isPublished && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true },
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
