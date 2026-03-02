import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Category from "@/models/Category";
import Blog from "@/models/Blog";
import Newsletter from "@/models/Newsletter";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = getTokenFromHeaders(req.headers);
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const [totalProducts, totalOrders, totalCategories, totalBlogs, totalSubscribers, recentOrders, revenue] =
    await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Category.countDocuments(),
      Blog.countDocuments(),
      Newsletter.countDocuments(),
      Order.find().sort("-createdAt").limit(5).lean(),
      Order.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
    ]);

  return NextResponse.json({
    totalProducts,
    totalOrders,
    totalCategories,
    totalBlogs,
    totalSubscribers,
    recentOrders,
    totalRevenue: revenue[0]?.total || 0,
  });
}
