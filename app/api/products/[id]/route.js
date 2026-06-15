import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

// GET: Single Product
export async function GET(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const product = await Product.findById(id)
      .populate("category")
      .populate("subcategory");

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// PUT: Update Product
export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const body = await request.json();

    await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    const product = await Product.findById(id)
      .populate("category")
      .populate("subcategory");

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// DELETE: Delete Product
export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
