import connectDB from "@/lib/db";
import { Wishlist } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { user, product } = body;

    if (!user || !product) {
      return NextResponse.json(
        { message: "آیدی کاربر یا محصول معتبر نیست" },
        { status: 403 }
      );
    }

    const existing = await Wishlist.findOne({ user, product });

    if (existing) {
      return NextResponse.json(
        { message: "این محصول قبلاً به لیست علاقه‌مندی‌ها اضافه شده است" },
        { status: 409 }
      );
    }

    const createWishlist = await Wishlist.create({ user, product });

    return NextResponse.json(
      {
        message: "محصول با موفقیت به لیست علاقه مندی ها اضافه شد",
        wishlist: createWishlist,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error Wishlist", err);
    return NextResponse.json(
      { message: "خطا افزودن به علاقه مندی" },
      { status: 500 }
    );
  }
}
