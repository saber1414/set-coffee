"use client";

import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { BsSuitHeart } from "react-icons/bs";
import Image from "next/image";
import axios from "axios";
import { User } from "@/types/user";
import { Cart } from "@/types/cart";

type NavbarProps = {
  isLogin: boolean;
};

const Navbar = ({ isLogin }: NavbarProps) => {
  const [fixTop, setFixTop] = useState<boolean>(false);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Cart[]>([]);

  const userInfo = async () => {
    try {
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      console.log("Error", err);
      throw new Error("خطا");
    }
  };

  useEffect(() => {
    userInfo();
    const fixNavbarToTop = () => {
      setFixTop(window.scrollY > 130);
    };
    const localCart: Cart[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(localCart);

    window.addEventListener("scroll", fixNavbarToTop);
    return () => window.removeEventListener("scroll", fixNavbarToTop);
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("/api/wishlist", {
          withCredentials: true,
        });

        setWishlistCount(response.data.length || 0);
      } catch (error) {
        console.error("خطا در دریافت علاقه‌مندی‌ها:", error);
      }
    };

    if (isLogin) fetchWishlist();
  }, [isLogin]);

  useEffect(() => {
    const updateCartFromStorage = () => {
      const localCart: Cart[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      setCart(localCart);
    };

    updateCartFromStorage(); 

    const handleCartChange = () => updateCartFromStorage();

    window.addEventListener("cartUpdated", handleCartChange);
    return () => window.removeEventListener("cartUpdated", handleCartChange);
  }, []);

  return (
    <nav className={fixTop ? styles.navbar_fixed : styles.navbar}>
      <main>
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={171}
              height={53}
              priority
            />
          </Link>
        </div>

        <ul className={styles.links}>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/store">فروشگاه</Link>
          </li>
          <li>
            <Link href="/blog">وبلاگ</Link>
          </li>
          <li>
            <Link href="/about-us">درباره ما</Link>
          </li>
          <li>
            <Link href="/contact-us">تماس با ما</Link>
          </li>
          <li>
            <Link href="/roles">قوانین</Link>
          </li>

          {isLogin ? (
            user?.role === "USER" ? (
              <div className={styles.dropdown}>
                <Link href="/p-user">
                  <IoIosArrowDown className={styles.dropdown_icons} />
                  حساب کاربری
                </Link>
                <div className={styles.dropdown_content}>
                  <Link href={"/p-user"}>پنل کاربری</Link>
                  <Link href="/p-user/orders">سفارشات</Link>
                  <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                  <Link href="/p-user/comments">دیدگاه ها</Link>
                  <Link href="/p-user/favorites">علاقه مندی ها</Link>
                  <Link href="/p-user/account-details">جزئیات حساب</Link>
                </div>
              </div>
            ) : (
              <div className={styles.dropdown}>
                <Link href="/p-user">
                  <IoIosArrowDown className={styles.dropdown_icons} />
                  حساب کاربری
                </Link>
                <div className={styles.dropdown_content}>
                  <Link href={"/p-admin"}>پنل مدیریت</Link>
                </div>
              </div>
            )
          ) : (
            <li>
              <Link href="/login-register">ورود / ثبت نام</Link>
            </li>
          )}
        </ul>

        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <FiShoppingCart />
            <span>{cart.length}</span>
          </Link>
          <Link href="/wishlist">
            <BsSuitHeart />
            <span>{wishlistCount}</span>
          </Link>
        </div>
      </main>
    </nav>
  );
};

export default Navbar;
