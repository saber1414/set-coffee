import React from "react";
import styles from "./Product.module.css";
import { CiHeart, CiSearch } from "react-icons/ci";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import Image from "next/image";
import { ProductDetails } from "@/types/product";

type ProductProps = {
  product: ProductDetails;
  averageRating: number;
};

const Product = ({ product, averageRating }: ProductProps) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.details_container}>
          <Image
            src={product.images[0]}
            alt="Product Image"
            width={430}
            height={430}
            priority
          />
          <div className={styles.icons}>
            <Link href="/">
              <CiSearch />
              <p className={styles.tooltip}>مشاهده سریع</p>
            </Link>
            <div>
              <CiHeart />
              <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
            </div>
          </div>
          <button>افزودن به سبد خرید</button>
        </div>

        <div className={styles.details}>
          <Link href={"/"}>{product.title}</Link>
          <div>
            {[...Array(5)].map((_, index) =>
              index < averageRating ? (
                <FaRegStar key={index} />
              ) : (
                <FaStar key={index} />
              )
            )}
          </div>
          <span>{product.price.toLocaleString()} تومان</span>
        </div>
      </div>
    </>
  );
};

export default Product;
