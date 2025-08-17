import React from "react";
import styles from "@/styles/forget-password.module.css";
import Link from "next/link";
import Image from "next/image";

const ForgetPassword = () => {
  return (
    <>
      <div className={styles.forgot_password}>
        <div data-aos="fade-up" className={styles.bg}>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="ایمیل / شماره موبایل"
            />
            <button style={{ marginTop: "1rem" }} className={styles.btn}>
              بازنشانی رمزعبور
            </button>
            <Link href={"/login-register"} className={styles.back_to_login}>
              برگشت به ورود
            </Link>
          </div>
          <Link href={"/login-register"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </div>
        <section>
          <Image
            src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg"
            alt="register login image"
            width={1200}
            height={800}
          />
        </section>
      </div>
    </>
  );
};

export default ForgetPassword;
