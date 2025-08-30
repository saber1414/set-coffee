import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { User, Comment, Ticket } from "@/models";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const userId = params.id;

    await Comment.deleteMany({ user: userId });
    await Ticket.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    return NextResponse.json(
      { message: "کاربر با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json({ message: "خطا در حذف کاربر" }, { status: 500 });
  }
}
