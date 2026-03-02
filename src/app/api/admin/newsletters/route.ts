import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Newsletter from "@/models/Newsletter";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = getTokenFromHeaders(req.headers);
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const subscribers = await Newsletter.find().sort("-createdAt").lean();
  return NextResponse.json(subscribers);
}
