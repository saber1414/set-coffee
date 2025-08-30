import connectDB from "@/lib/db";
import { Ticket } from "@/models";
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

    const { ticketId, adminAnswer } = body;

    if (!ticketId || !adminAnswer) {
      return NextResponse.json(
        { message: "اطلاعات ناقص است" },
        { status: 400 }
      );
    }

    const ticket = await Ticket.findById(ticketId);
    ticket.adminAnswer = adminAnswer;
    ticket.answeredBy = user._id;
    ticket.answeredAt = new Date();
    ticket.isAnswer = true;
    await ticket.save();

    return NextResponse.json(
      { message: "پاسخ با موفقیت ثبت شد", ticket },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json({ message: "خطا در ثبت پاسخ" }, { status: 500 });
  }
}
