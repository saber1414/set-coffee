import { hashedPassword, generateToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import { handleYupError } from "@/lib/handleYupError";
import User from "@/models/User";
import { userSchema } from "@/validations/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    await userSchema.validate(body, { abortEarly: false });
    const existingUser = await User.findOne({
      $or: [{ phone: body.phone }, { email: body.email }],
    });

    if (existingUser) {
      const conflictField =
        existingUser.phone === body.phone ? "شماره تلفن" : "ایمیل";
      return NextResponse.json(
        { message: `${conflictField} قبلاً ثبت شده است` },
        { status: 409 }
      );
    }

    const hashPassword = await hashedPassword(body.password);

    const userCount = await User.countDocuments();

    const newUser = await User.create({
      ...body,
      password: hashPassword,
      role: userCount === 0 ? "ADMIN" : "USER",
    });

    const token = generateToken({
      phone: newUser.phone,
      email: newUser.email,
    });

    return NextResponse.json(
      { message: "ثبت نام موفق بود", user: newUser },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${token}; path=/; httpOnly: true; Max-Age=${
            60 * 60 * 24 * 7
          };SameSite=Strict;Secure;`,
        },
      }
    );
  } catch (err) {
    const { status, body } = handleYupError(err);
    return NextResponse.json(body, { status });
  }
}
