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
        <SwiperSlide><img src="/shop/5084705179_nabor-kotlov-higher.jpg" alt="Набір каструль HK-325 Червоний Higher Kitchen з антипригарним покриттям" /></SwiperSlide>
        <SwiperSlide><img src="/shop/5084705181_nabor-kotlov-higher.jpg" alt="Набір каструль HK-325 Червоний Higher Kitchen з антипригарним покриттям" /></SwiperSlide>
     </Swiper>
  );
}
