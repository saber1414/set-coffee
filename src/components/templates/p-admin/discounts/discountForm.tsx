"use client";
import React, { useState, useEffect } from "react";
import styles from "./discountForm.module.css";
import { useContextApi } from "@/context/ContextApi";
import toast from "react-hot-toast";
import axios from "axios"; // Import AxiosError here

const DiscountForm = () => {
  const { loading, setLoading, products, refreshDiscounts } = useContextApi();
  const [form, setForm] = useState({
    code: "",
    maxUse: "",
    percent: "",
  });
  const [productId, setProductId] = useState<string>("");
  const [error, setError] = useState({
    code: "",
    maxUse: "",
    percent: "",
    product: "",
  });

  useEffect(() => {
    setError({
      code: "",
      maxUse: "",
      percent: "",
      product: "",
    });
  }, [form, productId]);

  const createDiscountHandel = async () => {
    const maxUse = Number(form.maxUse);
    const percent = Number(form.percent);

    const newError = {
      code: form.code.trim() ? "" : "کد تخفیف الزامی است",
      maxUse: form.maxUse ? "" : "حداکثر استفاده الزامی است",
      percent: form.percent ? "" : "درصد تخفیف الزامی است",
      product: productId ? "" : "یک محصول را انتخاب کنید",
    };

    setError(newError);

    const hasError = Object.values(newError).some((msg) => msg !== "");
    if (hasError) {
      toast.error("لطفاً خطاهای فرم را بررسی کنید");
      return;
    }

    if (!productId || productId === "") {
      toast.error("لطفاً یک محصول را انتخاب کنید");
      return;
    }

    if (isNaN(maxUse) || isNaN(percent)) {
      toast.error("درصد و تعداد استفاده باید عدد معتبر باشند");
      return;
    }

    try {
      setLoading(true);

      const formDetails = {
        code: form.code.trim(),
        maxUse,
        percent,
        product: productId,
      };

      const res = await axios.post("/api/discount", formDetails, {
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success("کد تخفیف با موفقیت ایجاد شد");
        await refreshDiscounts();
        setForm({ code: "", maxUse: "", percent: "" });
        setProductId("");
      }
    } catch (err) {
      console.error("Error creating discount", err);
      toast.error("خطا در ایجاد کد تخفیف");
    } finally {
      setLoading(false);
    }
  };

  const changeInputHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

  return (
    <>
      <section className={styles.discount}>
        <p>افزودن کد تخفیف جدید</p>
        <div className={styles.discount_main}>
          <div>
            <label>شناسه تخفیف</label>
            <input
              placeholder="لطفا شناسه تخفیف را وارد کنید"
              name="code"
              value={form.code}
              onChange={changeInputHandel}
              type="text"
            />
            {error.code && <p className={styles.errorForm}>{error.code}</p>}
          </div>
          <div>
            <label>درصد تخفیف</label>
            <input
              placeholder="لطفا درصد تخفیف را وارد کنید"
              type="number"
              name="percent"
              value={form.percent}
              onChange={changeInputHandel}
            />
            {error.percent && (
              <p className={styles.errorForm}>{error.percent}</p>
            )}
          </div>
          <div>
            <label>حداکثر استفاده</label>
            <input
              placeholder="حداکثر استفاده از کد تخفیف"
              type="number"
              name="maxUse"
              value={form.maxUse}
              onChange={changeInputHandel}
            />
            {error.maxUse && <p className={styles.errorForm}>{error.maxUse}</p>}
          </div>
          <div>
            <label>محصول</label>
            <select onChange={(e) => setProductId(e.target.value)}>
              <option value="">لطفا یک محصول را انتخاب کنید</option>
              {products &&
                products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.title}
                  </option>
                ))}
            </select>
            {error.product && (
              <p className={styles.errorForm}>{error.product}</p>
            )}
          </div>
        </div>
        <button type="button" disabled={loading} onClick={createDiscountHandel}>
          {loading ? <div className="spinner"></div> : "افزودن"}
        </button>
      </section>
    </>
  );
};

export default DiscountForm;
