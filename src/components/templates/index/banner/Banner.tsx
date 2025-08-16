"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";

const Banner: React.FC = () => {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{ delay: 10000 }}
        className="mySwiper home-slider"
      >
        <SwiperSlide>
          <Link href="/">
            <img
              src="https://set-coffee.com/wp-content/uploads/2023/12/slide.jpg"
              alt="slide img"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/">
            <img
              src="https://set-coffee.com/wp-content/uploads/2021/10/winter-slie.jpg"
              alt="slide img"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/">
            <img
              src="https://set-coffee.com/wp-content/uploads/2022/06/fall.jpg"
              alt="slide img"
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
