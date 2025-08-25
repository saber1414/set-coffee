"use client";

import React, { useState } from "react";
import styles from "./form.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { ContactUs } from "@/types/contactUs";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const changeInputHandel = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitFormHandel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const newError = {
        name: form.name ? "" : "نام الزامی است",
        email:
          form.email && !/\S+@\S+\.\S+/.test(form.email)
            ? "ایمیل معتبر نیست"
            : "",
        phone: /^09\d{9}$/.test(form.phone) ? "" : "شماره موبایل معتبر نیست",
        message: form.message ? "" : "متن پیام الزامی است",
      };

      setError(newError);

      const hasError = Object.values(newError).some((msg) => msg !== "");

      if (hasError) {
        toast.error("لطفا فرم را برسی  کنید");
        return;
      }

      const res = await axios.post<ContactUs>("/api/contact-us", form);

      if (res.status === 201) {
        toast.success("پیفام با موفقیت ارسال شد");
        setForm({ name: "", email: "", phone: "", company: "", message: "" });
      }
    } catch (err) {
      console.log("خطا در ارسال پیغام", err);
      toast.error("خطا در ارسال پیغام");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={submitFormHandel} className={styles.form}>
        <span>فرم تماس با ما</span>
        <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
        <div className={styles.groups}>
          <div className={styles.group}>
            <label>نام و نام خانوادگی</label>
            <input
              name="name"
              value={form.name}
              onChange={changeInputHandel}
              type="text"
            />
            {error.name && <p className={styles.error}>{error.name}</p>}
          </div>
          <div className={styles.group}>
            <label>آدرس ایمیل</label>
            <input
              name="email"
              value={form.email}
              onChange={changeInputHandel}
              type="text"
            />
            {error.email && <p className={styles.error}>{error.email}</p>}
          </div>
        </div>
        <div className={styles.groups}>
          <div className={styles.group}>
            <label>شماره تماس</label>
            <input
              name="phone"
              value={form.phone}
              onChange={changeInputHandel}
              type="text"
            />
            {error.phone && <p className={styles.error}>{error.phone}</p>}
          </div>
          <div className={styles.group}>
            <label>نام شرکت</label>
            <input
              name="company"
              value={form.company}
              onChange={changeInputHandel}
              type="text"
            />
          </div>
        </div>
        <div className={styles.group}>
          <label>درخواست شما</label>
          <textarea
            name="message"
            value={form.message}
            onChange={changeInputHandel}
            id=""
            cols={30}
            rows={3}
          ></textarea>
          {error.message && <p className={styles.error}>{error.message}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <div className="spinner"></div> : "ارسال"}
        </button>
      </form>
    </>
  );
};

export default Form;
