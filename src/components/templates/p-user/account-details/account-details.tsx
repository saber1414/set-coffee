"use client";

import React, { useEffect, useState } from "react";
import styles from "./account-details.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import Image from "next/image";
import { AccountInformation } from "@/types/account";
import axios from "axios";
import toast from "react-hot-toast";

const AccountDetails = () => {
  const [initialEmail, setInitialEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const changeInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const information = async () => {
      const res = await axios.get<AccountInformation>("/api/auth/me", {
        withCredentials: true,
      });
      const user = res.data;
      setInitialEmail(user.email);
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
        password: "",
      });
    };

    information();
  }, []);

  const editInformationBtn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put("/api/user", form, { withCredentials: true });
      if (res.status === 200) {
        toast.success("ویرایش با موفقیت انجام شد");

        if (form.email !== initialEmail) {
          window.location.href = "/";
        } else {
          location.reload();
        }
      }
    } catch (err) {
      console.log("خطا در ویرایش ", err);
      toast.error("خطا در ویرایش اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <div className={styles.details}>
          <h1 className={styles.title}>
            <span> جزئیات اکانت</span>
          </h1>
          <div className={styles.details_main}>
            <section>
              <div>
                <label>نام کاربری</label>
                <input
                  placeholder="لطفا نام کاربری خود را وارد کنید"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={changeInputHandle}
                />
              </div>
              <div>
                <label>ایمیل</label>
                <input
                  placeholder="لطفا ایمیل خود را وارد کنید"
                  name="email"
                  value={form.email}
                  onChange={changeInputHandle}
                  type="text"
                />
              </div>
              <div>
                <label>شماره تماس</label>
                <input
                  placeholder="لطفا شماره تماس خود را وارد کنید"
                  name="phone"
                  type="number"
                  value={form.phone}
                  onChange={changeInputHandle}
                />
              </div>
            </section>
            <section>
              <div className={styles.uploader}>
                <Image
                  width={200}
                  height={200}
                  src="/images/shahin.jpg"
                  alt=""
                />
                <div>
                  <div>
                    <button>
                      <IoCloudUploadOutline />
                      تغییر
                    </button>
                    <input type="file" name="" id="" />
                  </div>
                  <button>
                    <MdOutlineDelete />
                    حذف
                  </button>
                </div>
              </div>
              <div>
                <label>رمز عبور</label>
                <div className={styles.password_group}>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={changeInputHandle}
                  />
                  <button>تغییر رمز عبور</button>
                </div>
              </div>
            </section>
          </div>
          <button
            type="submit"
            disabled={loading}
            onClick={editInformationBtn}
            className={styles.submit_btn}
          >
            {loading ? <div className="spinner"></div> : "ثبت تغییرات"}
          </button>
        </div>
      </main>
    </>
  );
};

export default AccountDetails;
