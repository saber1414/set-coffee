"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./login.module.css";
import Sms from "./sms";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

type LoginProps = {
  showRegisterForm: () => void;
};

const Login = ({ showRegisterForm }: LoginProps) => {
  const router = useRouter();
  const [isLoginWhitOTP, setIsLoginWhitOTP] = useState<boolean>(false);
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const hideLoginOTP = () => setIsLoginWhitOTP(false);

  // change input
  const changeInputHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // signin form
  const loginFormHandel = async () => {
    setLoading(true);
    try {
      const newError = {
        identifier: form.identifier.trim()
          ? ""
          : "نام کاربری یا ایمیل الزامی است",
        password:
          form.password.length < 6 ? "رمز عبور حداقل باید 6 کاراگتر باشد" : "",
      };
      setError(newError);

      const hasError = Object.values(newError).some((msg) => msg !== "");
      if (hasError) {
        toast.error("لطفا فرم را برسی  کنید");
        return;
      }
      const res = await axios.post("/api/auth/signin", form);
      if (res.status === 201) {
        toast.success("ورود موفق");
        router.push("/");
      }
    } catch (err) {
      console.error("خطا در ورود", err);
      toast.error("نام کاربری یا رمز عبور اشتباه است");
    } finally {
      setLoading(false);
    }
  };

  return !isLoginWhitOTP ? (
    <>
      <div className={styles.form}>
        <input
          name="identifier"
          className={styles.input}
          type="text"
          value={form.identifier}
          onChange={changeInputHandel}
          placeholder="ایمیل/شماره موبایل"
        />
        {error.identifier && <p className={styles.error}>{error.identifier}</p>}
        <input
          name="password"
          className={styles.input}
          type="password"
          value={form.password}
          onChange={changeInputHandel}
          placeholder="رمز عبور"
        />
        {error.password && <p className={styles.error}>{error.password}</p>}
        <div className={styles.checkbox}>
          <input type="checkbox" name="" id="" />
          <p>مرا به یاد داشته باش</p>
        </div>
        <button
          onClick={loginFormHandel}
          disabled={loading}
          className={styles.btn}
        >
          {loading ? <div className="spinner"></div> : "ورود"}
        </button>
        <Link href={"/forget-password"} className={styles.forgot_pass}>
          رمز عبور را فراموش کرده‌اید؟
        </Link>
        <button className={styles.btn} onClick={() => setIsLoginWhitOTP(true)}>
          ورود با کد یکبار مصرف
        </button>
        <span>آیا حساب کاربری ندارید؟</span>
        <button className={styles.btn_light} onClick={showRegisterForm}>
          ثبت نام
        </button>
      </div>
      <Link href={"/"} className={styles.redirect_to_home}>
        لغو
      </Link>
    </>
  ) : (
    <Sms hideLoginOTP={hideLoginOTP} />
  );
};

export default Login;
