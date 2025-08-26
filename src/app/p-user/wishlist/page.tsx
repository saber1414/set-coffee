import Layout from "@/components/layouts/userPanel";
import React from "react";
import styles from "@/styles/wishlist-p-admin.module.css";
import Product from "@/components/templates/p-user/wishlist/product";
import { Wishlist } from "@/models";
import connectDB from "@/lib/db";

const Page = async () => {
  await connectDB();

  const wishlist = await Wishlist.find({})
    .populate({
      path: "product",
      select: "_id title price rating images",
      populate: {
        path: "comments",
        select: "score",
      },
    })
    .lean();

  const getAverageRating = (comments: { score: number }[]) => {
    if (comments.length === 0) return 0;
    const total = comments.reduce((sum, comment) => sum + comment.score, 0);
    return total / comments.length;
  };

  return (
    <>
      <Layout>
        <main>
          <h1 className={styles.title}>
            <span>علاقه مندی ها</span>
          </h1>
          <div className={styles.container}>
            {wishlist.length ? (
              wishlist.map((wish) => {
                const averageRating = Math.round(
                  getAverageRating(wish.product.comments)
                );
                return (
                  <Product
                    key={wish.product._id}
                    {...wish.product}
                    wishlistId={wish._id}
                    averageRating={averageRating}
                  />
                );
              })
            ) : (
              <p className={styles.empty}>محصولی وجود ندارد</p>
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Page;
