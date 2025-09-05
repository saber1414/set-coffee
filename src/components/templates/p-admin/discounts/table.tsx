"use client";
import React from "react";
import styles from "./table.module.css";
import { useContextApi } from "@/context/ContextApi";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";

type TableProps = {
  title: string;
};

const Table = ({ title }: TableProps) => {
  const { discounts, loading, error, setLoading, refreshDiscounts } =
    useContextApi();

  const removeDiscountHandel = async (id: string) => {
    try {
      setLoading(true);
      const res = await Swal.fire({
        icon: "warning",
        title: "حذف کد تخفیف",
        text: "آیا میخواهید کد تخفیف را حذف کنید؟",
        showCancelButton: true,
        cancelButtonText: "خیر",
        confirmButtonText: "بله",
      });

      if (res.isConfirmed) {
        const response = await axios.delete(`/api/discount/${id}`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          toast.success("کد تخفیف حذف شد");
          await refreshDiscounts();
        }
      }
    } catch (err) {
      console.log("خطا در حذف تخفیف", err);
      toast.error("خطا در حذف کد نخفیف")
    } finally {
      setLoading(false);
    }
  };

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
                        <button
                          type="button"
                          onClick={() => removeDiscountHandel(discount._id)}
                          className={styles.delete_btn}
                        >
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
