import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/contactus";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Mapping: Frontend 'fullName' -> Database 'name'
    const contactData = {
      name: body.fullName, 
      email: body.email,
      phone: body.phone,
      message: body.message
    };

    const newContact = await Contact.create(contactData);
    
    return NextResponse.json(
      { success: true, message: "Message sent successfully!", data: newContact }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error, check console" }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}