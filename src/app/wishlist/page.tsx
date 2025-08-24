import React from "react";
import Navbar from "@/components/modules/navbar/Navbar";
import Footer from "@/components/modules/footer/Footer";
import connectDB from "@/lib/db";
import { authenticate } from "@/middleware/auth";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Product from "@/components/modules/product/Product";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import styles from "@/styles/wishlist.module.css";
import { Wishlist } from "@/models/index";

const WishlistPage = async () => {
  await connectDB();
  const user = await authenticate();

  let wishes = [];

  if (user) {
    wishes = await Wishlist.find({ user: user._id }).populate({
      path: "product",
      select: "title images price comments",
      populate: {
        path: "comments",
        select: "score",
      },
    });
  }

  const getAverageRating = (comments: { score: number }[]) => {
    if (comments.length === 0) return 0;
    const total =  comments.reduce((sum,comment) => sum + comment.score, 0);
    return total / comments.length
  };



  return (
    <>
      <Navbar isLogin={!!user} />
      <Breadcrumb route={"علاقه مندی ها"} />

      {wishes.length ? (
        <main className={styles.container} data-aos="fade-up">
          <p className={styles.title}>محصولات مورد علاقه شما</p>
          <section className={styles.products}>
            {wishes.map((wish) => {
                const averageRating = Math.round(getAverageRating(wish.product.comments ))
                return (
                    <Product
                key={wish.product._id}
                product={wish.product}
                averageRating={averageRating}
              />
                )
            })}
          </section>
        </main>
      ) : (
        <div className={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه فروشگاه محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default WishlistPage;