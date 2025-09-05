"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./table.module.css";
import totalStyles from "./tabels.module.css";
import Image from "next/image";
import Select from "react-select";
import stateData from "@/utils/stateData";
import { Cart } from "@/types/cart";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

type StateOption = {
  value: string;
  label: string;
};

const stateOptions = stateData();

const Table = () => {
  const [cart, setCart] = useState<Cart[]>([]);
  const [stateSelectedOption, setStateSelectedOption] =
    useState<StateOption | null>(null);
  const [changeAddress, setChangeAddress] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState({ discount: "" });
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);

  const calculateFinalTotal = (baseTotal: number,percent: number) => {
    const discounted = baseTotal - Math.floor(baseTotal * percent) / 100;
    setFinalTotal(discounted)
  };

  const getTotal = (cartItems: Cart[]) => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    setTotal(totalPrice);
    calculateFinalTotal(totalPrice,discountPercent)
  };

  useEffect(() => {
    const localCart: Cart[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(localCart);
    getTotal(localCart);
  }, []);

  const updateCount = (id: string, delta: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, count: Math.max(item.count + delta, 1) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    getTotal(updatedCart);
  };

  const removeItem = (id: string) => {
    const filteredCart = cart.filter((item) => item.id !== id);
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    getTotal(filteredCart);
    toast.success("محصول حذف شد");
  };

  const checkDiscount = async () => {
    const trimmedCode = discount.trim();

    if (!trimmedCode) {
      setError({ discount: "کوپن نمی‌تواند خالی باشد" });
      toast.error("لطفاً کد تخفیف را وارد کنید");
      return;
    }

    setError({ discount: "" });

    try {
      setError({ discount: "" });
      const res = await axios.put(
        "/api/discount",
        { code: discount },
        { withCredentials: true }
      );
      if (res.status === 200) {
        const percent = res.data.discount?.percent || 0;
        setDiscountPercent(percent);
        calculateFinalTotal(total,percent)
        toast.success("کوپن اعمال شد");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      const status = error.response?.status;
      const message = error.response?.data.message || "خطا در اعمال کوپن";

      if (status === 403) {
        toast.error("توکن معتبر نیست. لطفاً وارد حساب شوید");
      } else if (status === 404) {
        toast.error("کد تخفیف یافت نشد یا منقضی شده");
      } else if (status === 409) {
        toast.error("شما قبلاً از این کد استفاده کرده‌اید");
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <>
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{(item.count * item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span onClick={() => updateCount(item.id, -1)}>-</span>
                    <p>{item.count}</p>
                    <span onClick={() => updateCount(item.id, 1)}>+</span>
                  </div>
                </td>
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                  />
                  <Link href="/">{item.title}</Link>
                </td>
                <td>
                  <IoMdClose
                    className={styles.delete_icon}
                    onClick={() => removeItem(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section>
          <button type="button" className={styles.update_btn}>
            بروزرسانی سبد خرید
          </button>
          <div>
            <button
              type="button"
              onClick={checkDiscount}
              className={styles.set_off_btn}
            >
              اعمال کوپن
            </button>
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="کد تخفیف"
            />
            {error && <p className={styles.error}>{error.discount}</p>}
          </div>
        </section>
      </div>

      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء</p>
          <p>{total.toLocaleString()} تومان</p>
        </div>

        <p className={totalStyles.motor}>
          پیک موتوری: <strong>30,000</strong>
        </p>

        <div className={totalStyles.address}>
          <p>حمل و نقل</p>
          <span>حمل و نقل به تهران (فقط شهر تهران).</span>
        </div>

        <p
          className={totalStyles.change_address}
          onClick={() => setChangeAddress((prev) => !prev)}
        >
          تغییر آدرس
        </p>

        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select<StateOption>
              options={stateOptions}
              defaultValue={stateSelectedOption}
              onChange={(option) => setStateSelectedOption(option)}
              isClearable
              placeholder="استان"
              isRtl
              isSearchable
            />
            <input type="text" placeholder="شهر" />
            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{finalTotal.toLocaleString()} تومان</p>
        </div>

        <Link href="/checkout">
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
