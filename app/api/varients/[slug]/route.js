// /api/variants/[slug]/route.js - NAYI FILE BANAYEIN

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request, { params }) {
  await dbConnect();
  const { slug } = await params;

  try {
    // Find product containing this variant slug
    const product = await Product.findOne({
      "variants.slug": slug,
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Variant not found" },
        { status: 404 },
      );
    }

    const variant = product.variants.find((v) => v.slug === slug);

    return NextResponse.json({
      success: true,
      data: {
        variant: variant,
        parentProduct: {
          _id: product._id,
          title: product.title,
          slug: product.slug,
          image: product.image,
          featuredImage: product.featuredImage,
          additionalImages: product.additionalImages,
          specifications: product.specifications,
          faqs: product.faqs,
          variants: product.variants,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
