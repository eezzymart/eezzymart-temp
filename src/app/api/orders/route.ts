import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  const orderNumber = "EM-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();

  const order = await Order.create({
    ...body,
    orderNumber,
  });

  return NextResponse.json(order, { status: 201 });
}
