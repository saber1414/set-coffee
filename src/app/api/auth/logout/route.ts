import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user)
      return NextResponse.json({ message: "توکن معتبر نیست" }, { status: 403 });

    (await cookies()).delete("token");

    return NextResponse.json(
      { message: "کاربر با موفقیت خارج شد" },
      { status: 200 }
    );
  } catch (err) {
    console.error("error log out", err);
    return NextResponse.json({ message: "خطا در خروج" }, { status: 500 });
  }
}
