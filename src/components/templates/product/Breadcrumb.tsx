import Link from "next/link";
import React from "react";
import styles from "./breadcrumb.module.css";

type Props = { title: string };

const Breadcrumb = ({ title }: Props) => {
  return (
    <>
      <section className={styles.breadcrumb}>
        <Link href="/">خانه </Link>
        <span>/</span>
        <Link href="/">همه موارد </Link>
        <span>/</span>
        <p>{title}</p>
      </section>
    </>
  );
};

export default Breadcrumb;
