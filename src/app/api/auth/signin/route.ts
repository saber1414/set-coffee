import connectDB from "@/lib/db";
import User from "@/models/User";
import { generateRefreshToken, generateToken, verifyPassword } from "@/lib/auth";
import { handleYupError } from "@/lib/handleYupError";
import { NextRequest, NextResponse } from "next/server";
import { signinSchema } from "@/validations/userSchema";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    await signinSchema.validate(body, { abortEarly: false });

    const { identifier, password } = body;

    const user = await User.findOne({
      $or: [{ name: identifier }, { email: identifier }],
    });

    if (!user)
      return NextResponse.json(
        { message: "کاربری با این مشخصات یافت نشد" },
        { status: 404 }
      );

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword)
      return NextResponse.json(
        { message: "نام کاربری یا رمز عبور اشتباه است" },
        { status: 401 }
      );

    const token = generateToken({
      phone: user.phone,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      phone: user.phone,
      email: user.email
    });

    await User.findOneAndUpdate({ email: user.email }, {
      $set: { refreshToken }
    })

    return NextResponse.json(
      { message: "ورود موفق بود" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${token}; path=/;httpOnly=true; Max-Age=${
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
