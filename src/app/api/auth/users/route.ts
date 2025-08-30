import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { User } from "@/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const users = await User.find({}).sort({ createdAt: -1 }).select("-password -__v -refreshToken");

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json(
      { message: "خطا در دریافت کاربران" },
      { status: 500 }
    );
  }
}
