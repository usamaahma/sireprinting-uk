import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const resolvedParams = await params;
    const id = resolvedParams.id;

    // ID Validate karein
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Category or Subcategory ID" },
        { status: 400 },
      );
    }

    const objectId = new mongoose.Types.ObjectId(id);

    // 🔥 HYBRID QUERY: Pehle check karo subcategory mein, agar wahan nahi milta to category mein dhoondo
    let products = await Product.find({ subcategory: objectId });

    if (products.length === 0) {
      // Agar subcategory mein kuch nahi mila, to check karo kya yeh main category ki ID hy?
      products = await Product.find({ category: objectId });
    }

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        data: products,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
