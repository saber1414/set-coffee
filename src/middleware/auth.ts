import { verifyToken } from "@/lib/auth";
import User, { IUser } from "@/models/User";
import { cookies } from "next/headers";

export const authenticate = async () => {
  const token = (await cookies()).get("token")?.value;
  let user: IUser | null = null;

  if (token) {
    const tokenPayload = verifyToken(token);
    if (tokenPayload) {
      user = await User.findOne({ email: tokenPayload.email });
    }
  }

  return user;
};
