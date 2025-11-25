'use client';

import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from '@/app/components/Shop.module.css';





export default function ProductSlider() {




  return (
    <Swiper
        // install Swiper modules
        className={styles.productSlider}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide><img src="/shop/9c590de21909058d3bf170ad5ce86aa9.jpg" alt="Соковарка-пароварка MR-1030 Maestro Basic 8л" /></SwiperSlide>
        <SwiperSlide><img src="/shop/16e5af323ef3819939630061b60cfd00.jpg" alt="Соковарка-пароварка MR-1030 Maestro Basic 8л" /></SwiperSlide>
        <SwiperSlide><img src="/shop/d45e5f57f9981aeea405488e01fef44c.jpg" alt="Соковарка-пароварка MR-1030 Maestro Basic 8л" /></SwiperSlide>
        <SwiperSlide><img src="/shop/c3f8e3685d23eb6d3ba92bfab586d6c0.jpg" alt="Соковарка-пароварка MR-1030 Maestro Basic 8л" /></SwiperSlide>
        <SwiperSlide><img src="/shop/f2e5bbc9608dbd923b6243b4fc5e8392.jpg" alt="Соковарка-пароварка MR-1030 Maestro Basic 8л" /></SwiperSlide>
        <SwiperSlide><img src="/shop/615b11dbbdf9d685300ab8e6fa20bed3.jpg" alt="Соковарка-пароварка MR-1030 Maestro Basic 8л" /></SwiperSlide>
     </Swiper>
  );
}
