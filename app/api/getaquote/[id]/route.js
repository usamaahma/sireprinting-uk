import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import GetAQuote from "@/models/getaquote";

// SPECIFIC LEAD UPDATE KARNE KE LIYE (Jaise status: "contacted")
export async function PUT(req, { params }) {
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const updatedQuote = await GetAQuote.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json({ success: true, data: updatedQuote });
}

// LEAD DELETE KARNE KE LIYE
export async function DELETE(req, { params }) {
  const { id } = await params;
  await connectDB();
  await GetAQuote.findByIdAndDelete(id);
  return NextResponse.json({ success: true, message: "Quote deleted successfully" });
}