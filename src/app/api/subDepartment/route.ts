import connectDB from "@/lib/db";
import { SubDepartment } from "@/models";
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

    const { title, department } = body;

    const created = await SubDepartment.create({ title, department });

    return NextResponse.json(
      { message: "زیر منوی دپارتمنت ایجاد شد", created },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error create subDepartment", err);
    return NextResponse.json(
      { message: "خطا در ایجاد زیر منوی دپارتمنت" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const subDepartment = await SubDepartment.find({});

    return NextResponse.json({ subDepartment }, { status: 200 });
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json(
      { message: "خطا زیر منوی دپارتمان" },
      { status: 500 }
    );
  }
}
