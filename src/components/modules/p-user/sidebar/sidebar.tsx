"use client"

import React from "react";
import styles from "./sidebar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdLogout, MdOutlineAttachMoney, MdSms } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const Sidebar = () => {
  const path = usePathname()

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar_header}>
          <p>خوش اومدی شاهین عزیز</p>
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
                کامنت ها
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
              <Link href={"/p-admin/discount"}>
                <MdOutlineAttachMoney />
                تخفیفات
              </Link>
            </>
          )}
        </ul>
        <div className={styles.logout}>
          <MdLogout />
          خروج
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
