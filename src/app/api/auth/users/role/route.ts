import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, newRole } = body

    if (!userId || !newRole || !["USER", "ADMIN"].includes(newRole)) {
      return NextResponse.json(
        { message: "اطلاعات نامعتبر است" },
        { status: 400 }
      );
    }

    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return NextResponse.json({ message: "کاربری یافت نشد" }, { status: 404 });
    }

    targetUser.role = newRole;
    await targetUser.save();

    return NextResponse.json(
      {
        message: "نقش کاربر با موفقیت تغییر یافت",
        user: {
          _id: targetUser._id,
          name: targetUser.name,
          role: targetUser.role,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json(
      { message: "خطا در تغییر نقش کاربر" },
      { status: 500 }
    );
  }
}
