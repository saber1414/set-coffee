"use client";
import React from "react";
import styles from "./table.module.css";
import { useContextApi } from "@/context/ContextApi";

type TableProps = {
  title: string;
};

const Table = ({ title }: TableProps) => {
  const { discounts, loading, error } = useContextApi();

  return (
    <>
      {discounts.length ? (
        <>
          <div>
            <h1 className={styles.title}>
              <span>{title}</span>
            </h1>
          </div>
          {loading ? (
            <p>صبر کنید</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className={styles.table_container}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>کد تخفیف</th>
                    <th>قابل استفاده</th>
                    <th>استفاده شده</th>
                    <th>درصد</th>
                    <th>نام محصول</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map((discount, index) => (
                    <tr key={discount._id}>
                      <td>{index + 1}</td>
                      <td>{discount.code}</td>
                      <td>{discount.maxUse}</td>
                      <td>{discount.uses}</td>
                      <td>{discount.percent}</td>
                      <td>{discount.product.title}</td>
                      <td>
                        <button type="button" className={styles.delete_btn}>
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <p>هیچ کد تخفیفی یافت نشد</p>
      )}
    </>
  );
};

export default Table;
