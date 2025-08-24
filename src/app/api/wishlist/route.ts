import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { Wishlist } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user || !user._id) {
      return NextResponse.json(
        { message: "ابتدا وارد حساب کاربری شوید" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { product } = body;

    if (!product) {
      return NextResponse.json(
        { message: "شناسه محصول معتبر نیست" },
        { status: 400 }
      );
    }

    const existing = await Wishlist.findOne({
      user: user._id,
      product,
    });

    if (existing) {
      return NextResponse.json(
        { message: "این محصول قبلاً به لیست علاقه‌مندی‌ها اضافه شده است" },
        { status: 409 }
      );
    }

    const createWishlist = await Wishlist.create({
      user: user._id,
      product,
    });

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

export async function GET() {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 401 });
    }

    const wishes = await Wishlist.find({ user: user._id });

    return NextResponse.json(
      { length: wishes.length, wishes },
      { status: 200 }
    );
  } catch (err) {
    console.error("خطا در دریافت علاقه‌مندی‌ها:", err);
    return NextResponse.json(
      { message: "خطا در دریافت اطلاعات" },
      { status: 500 }
    );
  }
}
