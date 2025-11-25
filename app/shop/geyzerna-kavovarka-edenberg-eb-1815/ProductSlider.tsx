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
        <SwiperSlide><img src="/shop/8c55e6c7-9707-4a5a-90b9-74dffc52b6d0.jpg" alt="Гейзерна кавоварка Edenberg EB-1815" /></SwiperSlide>
        <SwiperSlide><img src="/shop/395791687.webp" alt="Гейзерна кавоварка Edenberg EB-1815" /></SwiperSlide>
        <SwiperSlide><img src="/shop/395791691.webp" alt="Гейзерна кавоварка Edenberg EB-1815" /></SwiperSlide>
     </Swiper>
  );
}
