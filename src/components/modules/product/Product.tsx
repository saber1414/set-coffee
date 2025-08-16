import React from "react";
import styles from "./Product.module.css";
import { CiHeart, CiSearch } from "react-icons/ci";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa";
import Image from "next/image";

const Product = () => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.details_container}>
          <Image
            src="https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png"
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
          <Link href={"/"}>
            کپسول قهوه SETpresso سازگار با دستگاه نسپرسو ( RED ) 10 عددی LIMITED
            EDITION
          </Link>
          <div>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
          </div>
          <span>825,000 تومان</span>
        </div>
      </div>
    </>
  );
};

export default Product;
