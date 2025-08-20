
import React from "react";
import styles from "./details.module.css";
import { FaFacebookF, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import Link from "next/link";
import Breadcrumb from "../../../components/templates/product/Breadcrumb";

const Details = () => {
  return (
    <>
      <main style={{ width: "63%" }}>
        <Breadcrumb
          title={
            "کپسول قهوه SETpresso سازگار با دستگاه نسپرسو ( GOLD ) ده -10- عددی"
          }
        />
        <h2>
          کپسول قهوه SETpresso سازگار با دستگاه نسپرسو ( GOLD ) ده -10- عددی
        </h2>

        <div className={styles.rating}>
          <div>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <p>(دیدگاه 7 کاربر)</p>
        </div>

        <p className={styles.price}>205,000 تومان</p>
        <span className={styles.description}>
          کپسول قهوه ست مدل Gold سازگار با دستگاههای کپسولی نسپرسو می باشد .
          ترکیب این قهوه عربیکا بوده و با برشته کاری متوسط درجاتی از اسیدیته به
          همراه تن واری متوسط , و برای ترکیب با شیر بسیار عالی می باشد.
        </span>

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
          <strong>شناسه محصول: GOLD Nespresso Compatible capsule</strong>
          <p>
            {" "}
            <strong>دسته:</strong> Coffee Capsule, کپسول قهوه, همه موارد
          </p>
          <p>
            <strong>برچسب:</strong> کپسول قهوه،کپسول قهوه ست پرسو،کپسول قهوه
            ایرانی،کپسول قهوه نسپرسو ایرانی،قهوه ست ، Setpresso،Gold Setpresso
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
