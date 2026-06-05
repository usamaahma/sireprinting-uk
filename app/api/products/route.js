import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");

    const query = {};

    if (category) {
      query.category = category;
    }

    if (subcategory) {
      query.subcategory = subcategory;
    }

    const products = await Product.find(query)
      .populate("category")
      .populate("subcategory")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: products,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 },
    );
  }
}

// POST: Create Product
export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();

    const product = await Product.create(body);

    const populatedProduct = await Product.findById(product._id)
      .populate("category")
      .populate("subcategory");

    return NextResponse.json(
      {
        success: true,
        data: populatedProduct,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 },
    );
  }
}
