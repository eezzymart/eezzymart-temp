export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const newArrival = searchParams.get("newArrival");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "-createdAt";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const rating = searchParams.get("rating");
  const inStock = searchParams.get("inStock");

  const filter: Record<string, unknown> = { isActive: true };
  if (category) filter.category = category;
  if (featured === "true") filter.isFeatured = true;
  if (newArrival === "true") filter.isNewArrival = true;
  if (search) filter.name = { $regex: search, $options: "i" };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) (filter.price as Record<string, number>).$gte = parseFloat(minPrice);
    if (maxPrice) (filter.price as Record<string, number>).$lte = parseFloat(maxPrice);
  }
  if (rating) filter.ratings = { $gte: parseFloat(rating) };
  if (inStock === "true") filter.stock = { $gt: 0 };

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .populate("category", "name slug")
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}
