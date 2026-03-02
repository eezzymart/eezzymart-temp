import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = getTokenFromHeaders(req.headers);
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const status = searchParams.get("status");

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;

  const total = await Order.countDocuments(filter);
  const orders = await Order.find(filter)
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({ orders, total, page, pages: Math.ceil(total / limit) });
}
