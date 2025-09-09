"use client";

import React from "react";
import styles from "./Latest.module.css";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import Product from "@/components/modules/product/Product";
import { useContextApi } from "@/context/ContextApi";

const Latest = () => {
  const { products } = useContextApi();

  return (
    <>
      <div className={styles.container}>
        <section className={styles.title}>
          <div>
            <p>آخرین محصولات</p>
            <span>Latest products</span>
          </div>
          <Link className={styles.link} href={"/category"}>
            مشاهده همه <FaChevronLeft />{" "}
          </Link>
        </section>
        <main data-aos="fade-up" className={styles.products}>
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              averageRating={product.rating}
            />
          ))}
        </main>
      </div>
    </>
  );
};

export default Latest;
