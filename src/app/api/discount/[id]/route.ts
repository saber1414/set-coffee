import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { NextRequest, NextResponse } from "next/server";
import { Discount } from "@/models";
import { discountSchema } from "@/validations/discountSchema";
import { Types } from "mongoose";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const admin = await authenticate();
    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const discountId = params.id;

    if (!Types.ObjectId.isValid(discountId)) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 }
      );
    }

    const body = await req.json();

    await discountSchema.validate(body, { abortEarly: true });

    const discount = await Discount.findById(discountId);

    if (!discount) {
      return NextResponse.json(
        { message: "کد تخفیف یافت نشد" },
        { status: 404 }
      );
    }

    if (body.code && body.code !== discount.code) {
      const duplicate = await Discount.findOne({ code: body.code });
      if (duplicate) {
        return NextResponse.json(
          { message: "کد تخفیف تکراری است" },
          { status: 409 }
        );
      }
      discount.code = body.code;
    }

    if (body.code) discount.code = body.code;
    if (body.percent) discount.percent = body.percent;
    if (body.maxUse) discount.maxUse = body.maxUse;

    await discount.save();

    return NextResponse.json(
      { message: "کد تخفیف با موفقیت بروزرسانی شد", discount },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json(
      { message: "خطا در ویرایش کد تخفیف" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const admin = await authenticate();
    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const discountId = params.id;
    if (!Types.ObjectId.isValid(discountId)) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 }
      );
    }

    const deletedDiscount = await Discount.findByIdAndDelete(discountId);
    if (!Types.ObjectId.isValid(discountId)) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 }
      );
    }

    if (!deletedDiscount) {
      return NextResponse.json(
        { message: "کد تخفیف یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "کد تخفیف با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json(
      { message: "خطا در حذف کد تخفیف" },
      { status: 500 }
    );
  }
}
