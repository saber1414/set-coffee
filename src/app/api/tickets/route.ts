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
    const { title, body, department, subDepartment, priority } = reqBody;

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
