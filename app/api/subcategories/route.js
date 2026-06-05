import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Subcategory from "@/models/Subcategory";

export async function GET() {
  try {
    await dbConnect();
    const data = await Subcategory.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    let body = await req.json();

    // Cleaning system fields
    delete body._id;
    delete body.__v;
    delete body.__t;

    // Automatic timestamps manually added because direct collection inserts skip mongoose hooks
    body.createdAt = new Date();
    body.updatedAt = new Date();

    // Direct MongoDB insertion layer - Mongoose models bypass ho jayenge yahan
    const result = await Subcategory.collection.insertOne(body);

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...body },
    });
  } catch (error) {
    console.error("FULL ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
