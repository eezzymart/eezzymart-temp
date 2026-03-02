import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";

export async function POST() {
  await dbConnect();
  const existing = await Admin.findOne({ email: "admin@eezzymart.com" });
  if (existing) {
    return NextResponse.json({ message: "Admin already exists" });
  }

  await Admin.create({
    name: "Admin",
    email: "admin@eezzymart.com",
    password: "admin123",
    role: "superadmin",
  });

  return NextResponse.json({ message: "Admin created successfully. Email: admin@eezzymart.com, Password: admin123" }, { status: 201 });
}
