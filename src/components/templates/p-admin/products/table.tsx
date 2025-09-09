"use client";

import React from "react";
import styles from "./table.module.css";
import { useContextApi } from "@/context/ContextApi";
import { FaRegStar, FaStar } from "react-icons/fa";

type TableProps = {
  title: string;
};

const Table = ({ title }: TableProps) => {
  const { products } = useContextApi();

  const renderStars = (score: number) => {
    const maxStars = 5;
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        i <= score ? (
          <FaStar key={i} color="#f5c518" />
        ) : (
          <FaRegStar key={i} color="#ccc" />
        )
      );
    }
    return <div>{stars}</div>
  };

  return (
    <div>
      <h1 className={styles.title}>
        <span>{title}</span>
      </h1>

      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>قیمت</th>
              <th>امتیاز</th>
              <th>دسته‌بندی</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.price.toLocaleString()} تومان</td>
                  <td>{renderStars(product.rating)}</td>
                  <td>{product.category}</td>
                  <td>
                    <button type="button" className={styles.delete_btn}>
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
