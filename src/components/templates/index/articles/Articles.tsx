"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import styles from "./Articles.module.css"
import Article from "./Article";

const Articles = () => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>مقالات ما</p>
        <span className={styles.description}>دانستنی های جذاب دنیای قهوه</span>
        <main>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            dir="rtl"
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            loop={true}
            navigation={true}
            modules={[Navigation, Autoplay]}
            className="mySwiper articles_slider"
          >
            <SwiperSlide>
              <Article />
            </SwiperSlide>
            <SwiperSlide>
              <Article />
            </SwiperSlide>
            <SwiperSlide>
              <Article />
            </SwiperSlide>
            <SwiperSlide>
              <Article />
            </SwiperSlide>
            <SwiperSlide>
              <Article />
            </SwiperSlide>
            <SwiperSlide>
              <Article />
            </SwiperSlide>
            <SwiperSlide>
              <Article />
            </SwiperSlide>
            <SwiperSlide>
              <Article />
            </SwiperSlide>
            <SwiperSlide>
              <Article />
            </SwiperSlide>
          </Swiper>
        </main>
      </div>
    </>
  );
};

export default Articles;
