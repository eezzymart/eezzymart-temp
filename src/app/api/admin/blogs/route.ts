import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { verifyToken, getTokenFromHeaders } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = getTokenFromHeaders(req.headers);
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const blogs = await Blog.find().sort("-createdAt").lean();
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  const token = getTokenFromHeaders(req.headers);
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = await req.json();
  const blog = await Blog.create(body);
  return NextResponse.json(blog, { status: 201 });
}
