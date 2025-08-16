"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

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
            <Image
              src="https://set-coffee.com/wp-content/uploads/2023/12/slide.jpg"
              alt="banner logo"
              width={1910}
              height={816}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/">
            <Image
              src="https://set-coffee.com/wp-content/uploads/2021/10/winter-slie.jpg"
              alt="banner logo"
              width={1910}
              height={816}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/">
            <Image
              src="https://set-coffee.com/wp-content/uploads/2022/06/fall.jpg"
              alt="banner logo"
              width={1910}
              height={816}
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
