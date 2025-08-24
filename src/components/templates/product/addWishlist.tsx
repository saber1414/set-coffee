"use client";

import { useParams } from "next/navigation";
import React from "react";
import { CiHeart } from "react-icons/ci";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

const AddWishlist = () => {
  const { id: productId } = useParams();

  const addToWishlist = async () => {
    try {
      const response = await axios.post(
        "/api/wishlist",
        { product: productId },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("✅ محصول با موفقیت به علاقه‌مندی‌ها اضافه شد");
      } else {
        toast("📌 وضعیت نامشخص دریافت شد");
      }
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 409) {
        toast.error(" این محصول قبلاً در لیست علاقه‌مندی‌ها وجود دارد");
      } else if (err.response?.status === 401) {
        toast.error(" لطفاً ابتدا وارد حساب کاربری شوید");
      } else {
        toast.error("خطا در افزودن به علاقه‌مندی‌ها");
      }
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <CiHeart
        style={{ fontSize: "1.5rem", cursor: "pointer" }}
        onClick={addToWishlist}
      />
      <div style={{ cursor: "pointer" }} onClick={addToWishlist}>
        افزودن به علاقه مندی ها
      </div>
    </div>
  );
};

export default AddWishlist;
