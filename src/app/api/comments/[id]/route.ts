import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import Comment from "@/models/Comments";
import Product from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";


export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const { commentId, replyBody, replyAuthor } = await req.json();

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        isReplied: true,
        replyBody,
        replyAuthor,
      },
      { new: true }
    );

    if (!updatedComment) {
      return NextResponse.json({ message: "دیدگاه یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "پاسخ با موفقیت ثبت شد", updatedComment },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "خطا در پاسخ‌دهی" }, { status: 500 });
  }
};

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const { commentId } = await req.json();

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { isRejected: true },
      { new: true }
    );

    if (!updatedComment) {
      return NextResponse.json({ message: "دیدگاه یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "دیدگاه با موفقیت رد شد" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error rejected comment", err);
    return NextResponse.json({ message: "خطا در رد دیدگاه" }, { status: 500 });
  }
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const { id } = params;
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return NextResponse.json({ message: "دیدگاه یافت نشد" }, { status: 404 });
    }

    if (comment.product) {
      await Product.findByIdAndUpdate(comment.product, {
        $pull: { comments: comment._id },
      });
    }

    return NextResponse.json(
      { message: "دیدگاه با موفقیت حذف شد" },
      { status: 200 }
    );
  } catch (err) {
    console.error("خطا در حذف دیدگاه:", err);
    return NextResponse.json({ error: "خطا در حذف دیدگاه" }, { status: 500 });
  }
};
