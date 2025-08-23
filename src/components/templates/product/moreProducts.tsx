"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Product from "@/components/modules/product/Product";
import { ProductDetails } from "@/types/product";

type MoreProductsProps = {
  relatedProducts: ProductDetails[];
  currentProductId: string
};

const MoreProducts = ({ relatedProducts, currentProductId }: MoreProductsProps) => {
  const getAverageRating = (comments: { score: number }[]) => {
    if (comments.length === 0) return 0;
    const total = comments.reduce((sum, comment) => sum + comment.score, 0);
    return total / comments.length;
  };

  const filteredProducts = relatedProducts.filter((product) => product._id !== currentProductId)

  return (
    <>
      {" "}
      <div data-aos="fade-right">
        <section>
          <h2>محصولات مرتبط</h2>
          <div
            style={{
              height: "2px",
              width: "70px",
              background: "black",
              marginTop: "10px",
            }}
          ></div>
        </section>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          dir="rtl"
          rewind={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper "
        >
          {filteredProducts.map((product) => {
            const averageRating = Math.round(
              getAverageRating(product.comments)
            );
            return (
              <SwiperSlide key={product._id}>
                <Product product={product} averageRating={averageRating}/>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default MoreProducts;
