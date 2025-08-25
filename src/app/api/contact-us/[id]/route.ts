import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import { ContactUs } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { handleYupError } from "@/lib/handleYupError";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیر مجاز" }, { status: 403 });
    }

    const { id } = params;

    const deletedMessage = await ContactUs.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { message: "شناسه پیغام معتبر نیست" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "پیغام با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (err) {
    const { body, status } = handleYupError(err);
    return NextResponse.json(body, { status });
  }
}
