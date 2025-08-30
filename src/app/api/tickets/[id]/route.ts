import connectDB from "@/lib/db";
import { Ticket } from "@/models";
import { authenticate } from "@/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const id = params.id;

    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const deleted = await Ticket.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "تیکت با موفقیت حذف شد", deleted },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error", err);
    return NextResponse.json({ message: "خطا در حذف تیکیت" }, { status: 500 });
  }
}
