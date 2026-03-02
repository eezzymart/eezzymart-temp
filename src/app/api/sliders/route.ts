export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Slider from "@/models/Slider";

export async function GET() {
  await dbConnect();
  const sliders = await Slider.find({ isActive: true }).sort("order").lean();
  return NextResponse.json(sliders);
}
