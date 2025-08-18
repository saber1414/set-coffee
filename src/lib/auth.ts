import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

export interface JWTPayload {
  phone?: string;
  email?: string;
}

// hashed password
export const hashedPassword = async (password: string): Promise<string> => {
  try {
    if (!password) throw new Error("خطا در هش کردن رمز عبور");
    return await hash(password, 10);
  } catch (err) {
    console.error("Error hashed password", err);
    throw new Error("Error");
  }
};

// verify password
export const verifyPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  try {
    if (!password || !hashPassword)
      throw new Error("نام کاربری یا رمز عبور اشتباه است");
    return await compare(password, hashPassword);
  } catch (err) {
    console.error("Error verify password", err);
    throw new Error("Unknown Error");
  }
};

// generate token
export const generateToken = (data: JWTPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET در محیط تعریف نشده است");
  if (!data.phone && !data.email)
    throw new Error("حداقل یکی از ایمیل یا شماره تلفن باید وجود داشته باشد");

  try {
    const token = sign({ ...data }, secret, { expiresIn: "7d" });
    return token;
  } catch (err) {
    console.error("خطا در ساخت توکن", err);
    throw new Error("خطا در ساخت توکن");
  }
};

// verify token
export const verifyToken = (token: string): JWTPayload | null => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET در محیط تعریف نشده است");

  if (!token || token.split(".").length !== 3) {
    console.error("ساختار توکن نامعتبر است");
    return null;
  }

  try {
    const decoded = verify(token, secret);

    if (
      typeof decoded === "object" &&
      ("phone" in decoded || "email" in decoded)
    ) {
      const { phone, email } = decoded as JWTPayload;
      return { phone, email };
    }

    return null;
  } catch (err) {
    console.error("توکن تایید نشد", err);
    return null;
  }
};
