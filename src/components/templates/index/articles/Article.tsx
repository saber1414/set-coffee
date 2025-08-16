import { MdOutlineSms } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import React from "react";

import styles from "./Article.module.css";

import Image from "next/image";

const Article = () => {
  return (
    <>
      <div className={styles.card}>
        <Link className={styles.img_container} href={"/article/123"}>
          <Image
            src="https://set-coffee.com/wp-content/uploads/elementor/thumbs/-%D9%82%D9%87%D9%88%D9%87-%D8%A8%D8%A7-%D8%B4%DB%8C%D8%B1-qi8xuncj4ordgstrl43mbg5jfj1ezzamf6v9rnitn0.jpg"
            alt=""
            width={387}
            height={407}
          />
        </Link>
        <div className={styles.date}>
          <span>24</span>
          <span>بهمن</span>
        </div>
        <div className={styles.details}>
          <span className={styles.tag}>قهوه</span>
          <Link href={"/article/123"} className={styles.title}>
            مصرف قهوه با شیر برای کاهش التهاب
          </Link>
          <div>
            <p>نویسنده</p>
            <Image
              src="https://secure.gravatar.com/avatar/665a1a4dc7cc052eaa938253ef413a78?s=32&d=mm&r=g"
              alt=""
              width={40}
              height={40}
            />
            <p>Mohebi</p>
            <div>
              <MdOutlineSms />
              <span>0</span>
            </div>
            <div className={styles.share}>
              <IoShareSocialOutline />
              <div className={styles.tooltip}>
                <Link href={"/"}>
                  <FaTelegram />
                </Link>
                <Link href={"/"}>
                  <FaLinkedinIn />
                </Link>
                <Link href={"/"}>
                  <FaPinterest />
                </Link>
                <Link href={"/"}>
                  <FaTwitter />
                </Link>
                <Link href={"/"}>
                  <FaFacebookF />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
