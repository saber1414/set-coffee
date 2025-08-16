import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./Article.module.css";

export type ArticleProps = {
  title: string;
  img: string;
  comments: string;
  date: string;
  href: string;
};

const Article = ({ title, img, comments, date, href }: ArticleProps) => {
  return (
    <Link href={href} className={styles.article}>
      <Image
        src={img}
        alt={title || "تصویر مقاله"}
        width={75}
        height={65}
        className={styles.image}
        priority
      />
      <div>
        <p className={styles.title}>{title}</p>
        <div>
          <p>{comments}</p>
          <p dir="rtl">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default Article;
