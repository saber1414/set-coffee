import Link from "next/link";
import React from "react";
import styles from "./login.module.css";

type LoginProps = {
  showRegisterForm: () => void;
};

const Login = ({ showRegisterForm }: LoginProps) => {
  return (
    <>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="ایمیل/شماره موبایل"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="رمز عبور"
        />
        <div className={styles.checkbox}>
          <input type="checkbox" name="" id="" />
          <p>مرا به یاد داشته باش</p>
        </div>
        <button className={styles.btn}>ورود</button>
        <Link href={"/forget-password"} className={styles.forgot_pass}>
          رمز عبور را فراموش کرده‌اید؟
        </Link>
        <button className={styles.btn}>ورود با کد یکبار مصرف</button>
        <span>آیا حساب کاربری ندارید؟</span>
        <button className={styles.btn_light} onClick={showRegisterForm}>
          ثبت نام
        </button>
      </div>
      <Link href={"/"} className={styles.redirect_to_home}>
        لغو
      </Link>
    </>
  );
};

export default Login;
