"use client";

import React, { useState } from "react";
import styles from "./register.module.css";
import Sms from "./sms";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

type RegisterProps = {
  showLoginForm: () => void;
};

const Register = ({ showLoginForm }: RegisterProps) => {
  const router = useRouter();

  const [registerWithPass, setRegisterWithPass] = useState<boolean>(false);
  const [registerWithOTP, setRegisterWithOTP] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const hideLoginOTP = () => setRegisterWithOTP(false);

  const inputChangeHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // register form
  const signup = async () => {
    const newError = {
      name: form.name.trim() ? "" : "نام الزامی است",
      phone: /^09\d{9}$/.test(form.phone) ? "" : "شماره موبایل معتبر نیست",
      email:
        form.email.trim() && !/\S+@\S+\.\S+/.test(form.email)
          ? "ایمیل معتبر نیست"
          : "",
      password:
        registerWithPass && form.password.length < 6
          ? "رمز عبور حداقل باید 6 حرف باشد"
          : "",
    };
    setError(newError);

    const hasError = Object.values(newError).some((msg) => msg !== "");
    if (hasError) {
      toast.error("لطفا خطاهای فرم رو برسی کنید");
      return
    };

    try {
      const res = await axios.post<User>("/api/auth/signup", form);
      if (res.status === 201) {
        toast.success("ثبت نام با موفقیت انجام شد");
        router.push("/")
      }
    } catch (err) {
      console.error("خطا در ثبت نام", err);
      toast.error("خطا در ثبت نام")
    }
  };

  return !registerWithOTP ? (
    <>
      <div className={styles.form}>
        <input
          name="name"
          className={styles.input}
          type="text"
          placeholder="نام"
          value={form.name}
          onChange={inputChangeHandel}
        />
        {error.name && <p className={styles.error}>{error.name}</p>}
        <input
          name="phone"
          className={styles.input}
          type="text"
          placeholder="شماره موبایل  "
          value={form.phone}
          onChange={inputChangeHandel}
        />
        {error.phone && <p className={styles.error}>{error.phone}</p>}
        <input
          name="email"
          className={styles.input}
          type="email"
          placeholder="ایمیل (دلخواه)"
          value={form.email}
          onChange={inputChangeHandel}
        />
        {error.email && <p className={styles.error}>{error.email}</p>}
        {registerWithPass && (
          <>
            <input
              name="password"
              className={styles.input}
              type="password"
              placeholder="رمز عبور"
              value={form.password}
              onChange={inputChangeHandel}
            />
            {error.password && <p className={styles.error}>{error.password}</p>}
          </>
        )}
        {!registerWithPass && (
          <p
            onClick={() => setRegisterWithOTP(true)}
            style={{ marginTop: "1rem" }}
            className={styles.btn}
          >
            ثبت نام با کد تایید
          </p>
        )}
        <button
          onClick={() => {
            if (registerWithPass) {
              signup();
            } else {
              setRegisterWithPass(true);
            }
          }}
          style={{ marginTop: ".7rem" }}
          className={styles.btn}
        >
          ثبت نام با رمزعبور
        </button>
        <p className={styles.back_to_login} onClick={showLoginForm}>
          برگشت به ورود
        </p>
      </div>
      <p className={styles.redirect_to_home}>لغو</p>
    </>
  ) : (
    <Sms hideLoginOTP={hideLoginOTP} />
  );
};

export default Register;
