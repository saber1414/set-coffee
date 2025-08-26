"use client";
import React, { useState } from "react";
import styles from "./product.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

type ProductProps = {
  title: string;
  images: string[];
  price: number;
  rating: number;
  averageRating: number;
  wishlistId: string;
};

const Product = ({
  title,
  images,
  price,
  averageRating,
  wishlistId,
}: ProductProps) => {
  const [loading, setLoading] = useState(false);

  const removeWishlistProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/wishlist/${wishlistId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("محصول از لیست علاقمندی حذف شد");
        location.reload()
      }
    } catch (err) {
      console.error("Error", err);
      toast.error("خطا");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <Link href={"/product/123"}>
          <Image width={283} height={283} src={images[0]} alt="" />
        </Link>
        <p dir="rtl">{title}</p>
        <div>
          <div>
            {[...Array(5)].map((_, index) =>
              index < averageRating ? (
                <FaStar key={index} />
              ) : (
                <FaRegStar key={index} />
              )
            )}
          </div>
          <span>{price.toLocaleString()} تومان</span>
        </div>
        <button type="button" onClick={removeWishlistProduct} className={styles.delete_btn}>
          {loading ? <div className="spinner"></div> : "حذف محصول"}
        </button>
      </div>
    </>
  );
};

export default Product;
