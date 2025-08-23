import React from "react";
import styles from "./details.module.css";
import { FaFacebookF, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import Link from "next/link";
import Breadcrumb from "../../../components/templates/product/Breadcrumb";
import { ProductDetails } from "@/types/product";

type DetailsProps = {
  product: ProductDetails;
};

const Details = ({ product }: DetailsProps) => {
  const getAverageRating = (comments: { score: number }[]) => {
    if (comments.length === 0) return 0;
    const total = comments.reduce((sum, comment) => sum + comment.score, 0);
    return total / comments.length;
  };

  const averageRating = Math.round(getAverageRating(product.comments));

  
  return (
    <>
      <main style={{ width: "63%" }}>
        <Breadcrumb title={product.title} />
        <h2>{product.title}</h2>

        <div className={styles.rating}>
          <div>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < averageRating ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
          <p>(دیدگاه {product.comments.length} کاربر)</p>
        </div>

        <p className={styles.price}>{product.price.toLocaleString()} تومان</p>
        <span className={styles.description}>{product.shortDescription}</span>

        <hr />

        <div className={styles.Available}>
          <IoCheckmark />
          <p>موجود در انبار</p>
        </div>

        <div className={styles.cart}>
          <button>افزودن به سبد خرید</button>
          <div>
            <span>-</span>1<span>+</span>
          </div>
        </div>

        <section className={styles.wishlist}>
          <div>
            <CiHeart />
            <Link href="/">افزودن به علاقه مندی ها</Link>
          </div>
          <div>
            <TbSwitch3 />
            <Link href="/">مقایسه</Link>
          </div>
        </section>

        <hr />

        <div className={styles.details}>
          <strong>شناسه محصول: {product.slug}</strong>
          <p>
            {" "}
            <strong>دسته:</strong> {product.category}
          </p>
          <p>
            <strong>برچسب:</strong>
            {product.tags.join(", ")}
          </p>
        </div>

        <div className={styles.share}>
          <p>به اشتراک گذاری: </p>
          <Link href="/">
            <FaTelegram />
          </Link>
          <Link href="/">
            <FaLinkedinIn />
          </Link>
          <Link href="/">
            <FaPinterest />
          </Link>
          <Link href="/">
            <FaTwitter />
          </Link>
          <Link href="/">
            <FaFacebookF />
          </Link>
        </div>

        <hr />
      </main>
    </>
  );
};

export default Details;
