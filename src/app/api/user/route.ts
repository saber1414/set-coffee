import { hashedPassword } from "@/lib/auth";
import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user) {
      return NextResponse.json({ message: "توکن معتبر نیست" }, { status: 403 });
    }

    const body = await req.json();

    const { name, email, phone, password, role, } = body;

    const updatedUser = await User.findById(user._id);

    if (!updatedUser) {
      return NextResponse.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (phone) updatedUser.phone = phone;
    if (role) updatedUser.role = role;
    if (password) updatedUser.password = await hashedPassword(password);

    await updatedUser.save();

    return NextResponse.json(
      { message: "اطلاعات با موفقیت بروزرسانی شد", updatedUser },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updated information", err);
    return NextResponse.json(
      { message: "خطا در ویرایش اطلاعات" },
      { status: 500 }
    );
  }
}
