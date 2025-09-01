import connectDB from "@/lib/db";

import { commentSchema } from "@/validations/commentSchema";
import { NextRequest, NextResponse } from "next/server";
import { handleYupError } from "@/lib/handleYupError";
import { authenticate } from "@/middleware/auth";
import { Comment, Product } from "@/models";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = await authenticate();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "فقط مدیر مجاز است همه دیدگاه ها را مشاهده کند" },
        { status: 403 }
      );
    }

    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const comments = await Comment.find({})
      .sort({ createdAt: -1 })
      .populate("product", "title")
      .skip(skip)
      .limit(limit);

    const totalComments = await Comment.countDocuments();

    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      name: comment.name,
      email: comment.email,
      body: comment.body,
      score: comment.score,
      product: comment.product,
      isAccept: comment.isAccept,
      isRejected: comment.isRejected,
      replyBody: comment.replyBody,
      replyAuthor: comment.replyAuthor,
      date: comment.createdAt,
      ...(comment.isReplied && {
        reply: {
          body: comment.replyBody,
          author: comment.replyAuthor,
        },
      }),
    }));

    return NextResponse.json(
      {
        message: "دیدگاه ها",
        comments: formattedComments,
        pagination: {
          currentPage: page,
          totalPage: Math.ceil(totalComments / limit),
          totalComments,
          hasNextPage: page * limit < totalComments,
          hasPrevPage: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    const { body, status } = handleYupError(err);
    return NextResponse.json(body, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const reqBody = await req.json();
    await commentSchema.validate(reqBody, { abortEarly: false });

    const { name, body, email, score, product } = reqBody;

    const productExists = await Product.exists({ _id: product });
    if (!productExists) {
      return NextResponse.json({ message: "محصول یافت نشد" }, { status: 404 });
    }

    const comment = await Comment.create({
      name,
      email,
      body,
      score,
      product,
      isReplied: false,
      isAccept: false,
    });

    await Product.findOneAndUpdate(
      { _id: product },
      { $push: { comments: comment._id } }
    );

    return NextResponse.json(
      { message: "دیدگاه با موفقیت ارسال شد", commentId: comment._id },
      { status: 201 }
    );
  } catch (err) {
    const { body, status } = handleYupError(err);
    return NextResponse.json(body, { status });
  }
}
