"use client";

import React, { useEffect, useState } from "react";
import styles from "./topBar.module.css";
import { IoIosNotifications, IoIosSearch } from "react-icons/io";
import Modal from "../modal/modal";
import Image from "next/image";
import axios from "axios";
import { User } from "@/types/user";

const TopBar = () => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [user, setUser] = useState({} as User);

  const hideModal = () => setShowModal(false);

  useEffect(() => {
    const userInfos = async () => {
      const res = await axios.get<User>("/api/auth/me", {
        withCredentials: true,
      });
      setUser(res.data);
    };

    userInfos();
  }, []);


  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div>
            <p>{user.name}</p>
            <span>{user.role === "ADMIN" ? "مدیر" : "کاربر"}</span>
          </div>
          <Image width={50} height={50} src="/images/shahin.jpg" alt="" />
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <div
            onClick={() => setShowNotifications(true)}
            className={styles.notification}
          >
            <IoIosNotifications />
            <span>0</span>
          </div>
        </section>
      </div>
      {showNotifications && (
        <div>
          <div
            onClick={() => setShowNotifications(false)}
            className={styles.notifications_overlay}
          ></div>
          <section className={styles.notifications_box}>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>

            {/* if we dont have any notif we show : */}
            {/* <div>
                    <span>پیفامی وجود ندارد</span>
                    <IoClose onClick={() => setShowNotifications(false)}/>
                  </div> */}
          </section>
        </div>
      )}
      {showModal && (
        <Modal title="از واحد پشتیبانی" hideModal={hideModal}>
          <p className={styles.modal_text}>عالی هستی ادمین عزیز</p>
        </Modal>
      )}
    </>
  );
};

export default TopBar;
