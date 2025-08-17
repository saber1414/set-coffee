"use client";

import React, { useState } from "react";
import styles from "@/styles/login-register.module.css";
import { authTypes } from "@/utils/constants";
import Image from "next/image";
import Login from "@/components/templates/login-register/login";
import Register from "@/components/templates/login-register/register";

const Login_register = () => {
  const [authType, setAuthType] = useState(authTypes.LOGIN);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showLoginForm = () => setAuthType(authTypes.LOGIN);

  return (
    <>
      <div className={styles.login_register}>
        <div className={styles.form_bg} data-aos="fade-up">
          {authType === authTypes.LOGIN ? (
            <Login showRegisterForm={showRegisterForm} />
          ) : (
            <Register showLoginForm={showLoginForm} />
          )}
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

export default Login_register;
