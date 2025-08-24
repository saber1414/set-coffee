import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { Comment } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const acceptedComment = await Comment.findByIdAndUpdate(
      params.id,
      { isAccept: true },
      { new: true }
    );

    if (!acceptedComment) {
      return NextResponse.json({ message: "دیدگاه یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "دیدگاه با موفقیت تایید شد", isAccept: acceptedComment },
      { status: 200 }
    );
  } catch (err) {
    console.error("خطا در تایید دیدگاه", err);
    return NextResponse.json(
      { message: "خطا در تایید دیدگاه" },
      { status: 500 }
    );
  }
}
