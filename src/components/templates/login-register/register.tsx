"use client";

import React, { useState } from "react";
import styles from "./register.module.css";
import Sms from "./sms";

type RegisterProps = {
  showLoginForm: () => void;
};

const Register = ({ showLoginForm }: RegisterProps) => {
  const [registerWithPass, setRegisterWithPass] = useState<boolean>(false);
  const [registerWithOTP, setRegisterWithOTP] = useState<boolean>(false);

  const hideLoginOTP = () => setRegisterWithOTP(false);

  return !registerWithOTP ? (
    <>
      <div className={styles.form}>
        <input className={styles.input} type="text" placeholder="نام" />
        <input
          className={styles.input}
          type="text"
          placeholder="شماره موبایل  "
        />
        <input
          className={styles.input}
          type="email"
          placeholder="ایمیل (دلخواه)"
        />
        {registerWithPass && (
          <input
            className={styles.input}
            type="password"
            placeholder="رمز عبور"
          />
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
          onClick={() => setRegisterWithPass(true)}
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
