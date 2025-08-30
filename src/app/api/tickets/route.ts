import connectDB from "@/lib/db";
import { Ticket } from "@/models";
import { authenticate } from "@/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user) {
      return NextResponse.json({ message: "توکن معتبر نیست" }, { status: 403 });
    }

    const reqBody = await req.json();
    const {
      title,
      body,
      department,
      subDepartment,
      priority,
      adminAnswer,
      isAnswer,
    } = reqBody;

    if (!title || !body || !department || !subDepartment) {
      return NextResponse.json(
        { message: "اطلاعات ناقص است" },
        { status: 400 }
      );
    }

    const createdTicket = await Ticket.create({
      title,
      body,
      department,
      subDepartment,
      priority: priority || 2,
      status: "OPEN",
      user: user._id,
      adminAnswer: "",
      isAnswer: false,
    });

    const fullTicket = await Ticket.findById(createdTicket._id).lean();

    return NextResponse.json(
      { message: "تیکت با موفقیت ثبت شد", ticket: fullTicket },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error sending ticket:", err);
    return NextResponse.json({ message: "خطا در ارسال تیکت" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const tickets = await Ticket.find({})
      .sort({ createdAt: -1 })
      .populate("department", "title")
      .populate("subDepartment", "title")
      .populate("answeredBy", "name role");

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json(
      { message: "خطا در دریافت همه تیکت ها" },
      { status: 500 }
    );
  }
}
