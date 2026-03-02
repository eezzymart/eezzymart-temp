export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Slider from "@/models/Slider";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = getTokenFromHeaders(req.headers);
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  const body = await req.json();
  const slider = await Slider.findByIdAndUpdate(id, body, { new: true });
  if (!slider) {
    return NextResponse.json({ error: "Slider not found" }, { status: 404 });
  }
  return NextResponse.json(slider);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = getTokenFromHeaders(req.headers);
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  await Slider.findByIdAndDelete(id);
  return NextResponse.json({ message: "Slider deleted" });
}
