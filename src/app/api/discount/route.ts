import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { NextRequest, NextResponse } from "next/server";
import { Discount } from "@/models";
import { discountSchema } from "@/validations/discountSchema";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const admin = await authenticate();

    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const body = await req.json();

    await discountSchema.validate(body, { abortEarly: true });

    const existing = await Discount.findOne({ code: body.code });

    if (existing) {
      return NextResponse.json(
        { message: "کد تخفیف تکراری است" },
        { status: 409 }
      );
    }

    const discount = await Discount.create({ ...body, usedBy: [] });

    return NextResponse.json(
      { message: "کد تخفیف با موفقیت ایجاد شد", discount },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json(
      { message: "خطا در ایجاد کد تخفیف" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user) {
      return NextResponse.json({ message: "توکن معتبر نیست" }, { status: 403 });
    }

    const { code } = await req.json();

    const discount = await Discount.findOne({ code });

    if (discount.uses >= discount.maxUse) {
      return NextResponse.json(
        { message: "مهلت استفاده از این کد تمام شده است" },
        { status: 404 }
      );
    }

    if (discount.useBy.includes(user._id)) {
      return NextResponse.json(
        { message: "شما قبلا از این کد استفاده کرده اید" },
        { status: 409 }
      );
    }

    discount.uses += 1;
    discount.useBy.push(user._id);
    await discount.save();

    return NextResponse.json(
      { message: "تخفیف با موفقیت اعمال شد", discount },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json(
      { message: "خطا در اعمال کد تخفیف" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const admin = await authenticate();
    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const discounts = await Discount.find({})
        .sort({ createdAt: -1 })
        .populate("product", "title")

    return NextResponse.json({ discounts }, { status: 200 });
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json(
      { message: "خطا در دریافت کدهای تخفیف" },
      { status: 500 }
    );
  }
}
