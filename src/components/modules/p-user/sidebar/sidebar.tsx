"use client"

import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdLogout, MdOutlineAttachMoney, MdSms } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "@/types/user";

const Sidebar = () => {
  const path = usePathname();
  const route = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const logoutHandler = () => {
    Swal.fire({
      icon: "info",
      title: "خروج از حساب کاربری",
      text: "آیا میخواهید خارخ شوید؟",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      showCancelButton: true,
    }).then(async(res) => {
      if ((res.isConfirmed)) {
        const response = await axios.post("/api/auth/logout","",{ withCredentials: true });

        if (response.status === 200) {
          toast.success("خروج موفق");
          route.push("/")
        }
      }
    })
  };

  useEffect(() => {
    const userInfo = async() => {
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      setUser(res.data)
    };

    userInfo()
  }, [])

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar_header}>
          <p>خوش اومدی {user?.name}</p>
        </div>
        <ul className={styles.sidebar_main}>
          {path.includes("/p-user") ? (
            <>
              <Link href={"/p-user"} className={styles.sidebar_link_active}>
                <ImReply />
                پیشخوان
              </Link>
              <Link href={"/p-user/orders"}>
                <FaShoppingBag />
                سفارش ها
              </Link>
              <Link href={"/p-user/tickets"}>
                <MdSms />
                تیکت های پشتیبانی
              </Link>
              <Link href={"/p-user/comments"}>
                <FaComments />
                دیدگاه ها
              </Link>
              <Link href={"/p-user/wishlist"}>
                <FaHeart />
                علاقه مندی
              </Link>
              <Link href={"/p-user/account-details"}>
                <TbListDetails />
                جزئیات اکانت
              </Link>
            </>
          ) : (
            <>
              <Link href={"/p-admin"} className={styles.sidebar_link_active}>
                <ImReply />
                پیشخوان
              </Link>

              <Link href={"/p-admin/products"}>
                <FaShoppingBag />
                محصولات
              </Link>
              <Link href={"/p-admin/users"}>
                <FaUsers />
                کاربران
              </Link>
              <Link href={"/p-admin/comments"}>
                <FaComments />
                کامنت ها
              </Link>

              <Link href={"/p-admin/tickets"}>
                <MdSms />
                تیکت ها
              </Link>
              <Link href={"/p-admin/discounts"}>
                <MdOutlineAttachMoney />
                تخفیفات
              </Link>
            </>
          )}
        </ul>
        <div onClick={logoutHandler} className={styles.logout}>
          <MdLogout />
          خروج
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
