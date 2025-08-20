import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar"
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import { verifyToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import User, { IUser } from "@/models/User";
import { cookies } from "next/headers";

export default async function Home() {
  await connectDB()
  const token = (await cookies()).get("token")?.value;
  let user: IUser | null = null

  if (token) {
    const tokenPayload = verifyToken(token);
    if (tokenPayload) {
       user = await User.findOne({ email: tokenPayload.email })
    }
  }

  return (
    <>
      <Navbar isLogin={!!user} />
      <Banner />
      <Latest />
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
