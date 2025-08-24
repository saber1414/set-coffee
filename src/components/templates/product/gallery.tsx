"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ProductImage } from "@/types/product";
import Image from "next/image";

type GalleryProps = {
  images: ProductImage[];
};

const Gallery = ({ images }: GalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <section style={{ width: "36%" }}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image src={img} width={432} height={432} alt="تصویر محصول" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-slider-2"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              width={100.5}
              height={100.5}
              alt="تصویر کوچک محصول"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
