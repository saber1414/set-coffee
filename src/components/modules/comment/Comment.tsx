import React from "react";
import styles from "./comment.module.css";
import { FaStar } from "react-icons/fa";
import { ProductComments } from "@/types/product";
import jalaali from "jalaali-js";

const Comment = ({ name, body, date, score, product }: ProductComments) => {
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const formatJalaliDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const { jy, jm, jd } = jalaali.toJalaali(date);
    const monthName = persianMonths[jm - 1]; 
    return `${jd}/${monthName}/${jy}`;
  };

  console.log(product)

  return (
    <>
      <section className={styles.comment}>
        <img src="/images/shahin.jpg" className={styles.avatar} alt="" />
        <div>
          <div className={styles.main_details}>
            <div className={styles.user_info}>
              <strong>{name}</strong>
              <p>{formatJalaliDate(date)}</p>
            </div>
            <div className={styles.stars}>
              {[...Array(score)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
          <p>{body}</p>
        </div>
      </section>
    </>
  );
};

export default Comment;
