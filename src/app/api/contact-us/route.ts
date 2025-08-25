import connectDB from "@/lib/db";
import { contactUsSchema } from "@/validations/contactUsSchema";
import { ContactUs } from "@/models";
import { NextRequest, NextResponse } from "next/server";

import { ValidationError } from "yup";
import { authenticate } from "@/middleware/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    await contactUsSchema.validate(body, { abortEarly: false });

    const newContactUs = await ContactUs.create(body);

    return NextResponse.json(
      { message: "پیغام شما با موفقیت ثبت شد", newContactUs },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = err.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));

      return NextResponse.json(
        { message: "اعتبارسنجی ناموفق بود", errors },
        { status: 422 }
      );
    }

    console.error("Error sending message", err);
    return NextResponse.json(
      { message: "خطا در ارسال پیغام" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const allMessages = await ContactUs.find();

    return NextResponse.json(allMessages, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "خطا در دریافت پیغام ها" },
      { status: 500 }
    );
  }
}
