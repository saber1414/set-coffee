import { verifyToken } from "@/lib/auth";
import User, { IUser } from "@/models/User";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";

export const authenticate = async (): Promise<IUser | null> => {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const tokenPayload = verifyToken(token);
    if (tokenPayload?.email) {
      const user = await User.findOne({ email: tokenPayload.email });

      if (user && user.role === "ADMIN") {
        return user;
      }
    }
  } catch (err) {
    console.error("❌ Authentication error:", err);
  }

  return null;
};
