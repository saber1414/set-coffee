import connectDB from "@/lib/db";
import { Ticket } from "@/models";
import { authenticate } from "@/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user) {
      return NextResponse.json({ message: "توکن معتبر نیست" }, { status: 403 });
    }

    const tickets = await Ticket.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("department", "title")
      .populate("subDepartment", "title")
      .populate("answeredBy", "name role");

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json(
      { message: "خطا در دریافت تیکت ها" },
      { status: 500 }
    );
  }
}
