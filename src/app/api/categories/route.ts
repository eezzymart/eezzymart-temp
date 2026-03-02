export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";

export async function GET() {
  await dbConnect();
  const categories = await Category.find({ isActive: true })
    .sort("order")
    .lean();

  return NextResponse.json(categories);
}
