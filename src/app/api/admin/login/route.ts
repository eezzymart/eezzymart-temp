import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ id: admin._id, email: admin.email, role: admin.role });

  const response = NextResponse.json({
    message: "Login successful",
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  });

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return response;
}
