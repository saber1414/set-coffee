import Link from "next/link";
import React from "react";
import styles from "@/styles/404.module.css";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد | Set-Coffee",
};

const page = () => {
  return (
    <>
      <Head>
        <title>صفحه پیدا نشد | Set-Coffee</title>
      </Head>

      <div className={styles.contents}>
        <p className={styles.left_number}>4</p>
        <div className={styles.mug}></div>
        <p className={styles.right_number}>4</p>
      </div>
      <div className={styles.texts}>
        <p>صفحه مورد نظر یافت نشد :((</p>
        <Link href="/">برگشت به صفحه اصلی</Link>
      </div>
    </>
  );
};

export default page;
