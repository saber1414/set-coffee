import connectDB from "@/lib/db";
import { Wishlist } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    const deletedWishlist = await Wishlist.findByIdAndDelete(id);

    if (!deletedWishlist) {
      return NextResponse.json(
        { message: "محصولی با این شناسه یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "محصول از لیست علاقه مندی ها پاک شد" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleted wishlist", err);
    return NextResponse.json(
      { message: "خطا در پاک کردن محصول از لیست علاقه مندی" },
      { status: 500 }
    );
  }
}

