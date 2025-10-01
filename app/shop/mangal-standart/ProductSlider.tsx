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
        <SwiperSlide><img src="/shop/MangalStandart-700x700.png" alt="Мангал Стандарт" /></SwiperSlide>
        <SwiperSlide><img src="/shop/MangalStandart-1-1-700x700.jpg" alt="Мангал Стандарт" /></SwiperSlide>
        <SwiperSlide><img src="/shop/MangalStandart-2-1-700x700.jpg" alt="Мангал Стандарт" /></SwiperSlide>
     </Swiper>
  );
}
