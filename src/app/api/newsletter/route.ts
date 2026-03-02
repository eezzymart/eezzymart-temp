import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Newsletter from "@/models/Newsletter";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const existing = await Newsletter.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: "You are already subscribed!" });
  }

  await Newsletter.create({ email });
  return NextResponse.json({ message: "Successfully subscribed!" }, { status: 201 });
}
