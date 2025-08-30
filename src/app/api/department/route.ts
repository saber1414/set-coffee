import connectDB from "@/lib/db";
import { Department } from "@/models";
import { authenticate } from "@/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const body = await req.json();

    const { title } = body;

    const createDepartment = await Department.create({ title });

    return NextResponse.json(
      { message: "دپارتمنت با موفقیت ایجاد شد", createDepartment },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json(
      { message: "خطا در ساخت دپارتمنت تیکیت" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const department = await Department.find({});

    return NextResponse.json({ department }, { status: 200 });
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json({ message: "خطا دپارتمان" }, { status: 500 });
  }
}
