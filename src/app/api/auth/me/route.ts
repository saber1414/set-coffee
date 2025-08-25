import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { User } from "@/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const tokenPayload = await authenticate();

    if (!tokenPayload || !tokenPayload.phone) {
      return NextResponse.json({ message: "توکن معتبر نیست" }, { status: 403 });
    }

    const user = await User.findOne(
      { phone: tokenPayload.phone },
      "_id name email phone role"
    ).lean();

    if (!user) {
      return NextResponse.json({ message: "کاربر یافت نشد" }, { status: 400 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Error user information list", err);
    return NextResponse.json(
      { message: "خطا در دریافت اطلاعات کاربر" },
      { status: 500 }
    );
  }
}
