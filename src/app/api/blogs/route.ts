export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");

  const filter = { isPublished: true };
  const total = await Blog.countDocuments(filter);
  const blogs = await Blog.find(filter)
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({ blogs, total, page, pages: Math.ceil(total / limit) });
}
