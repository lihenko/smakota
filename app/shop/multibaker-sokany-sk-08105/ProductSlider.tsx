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
        <SwiperSlide><img src="/shop/6559397016_multipekar-5v1-600vt.jpg" alt="Мультипекар 5в1, 600Вт, Sokany SK-08105" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6559397020_multipekar-5v1-600vt.jpg" alt="Мультипекар 5в1, 600Вт, Sokany SK-08105" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6559397018_multipekar-5v1-600vt.jpg" alt="Мультипекар 5в1, 600Вт, Sokany SK-08105" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6559397015_multipekar-5v1-600vt.jpg" alt="Мультипекар 5в1, 600Вт, Sokany SK-08105" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6559397017_multipekar-5v1-600vt.jpg" alt="Мультипекар 5в1, 600Вт, Sokany SK-08105" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6559397013_multipekar-5v1-600vt.jpg" alt="Мультипекар 5в1, 600Вт, Sokany SK-08105" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6559397019_multipekar-5v1-600vt.jpg" alt="Мультипекар 5в1, 600Вт, Sokany SK-08105" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6559397014_multipekar-5v1-600vt.jpg" alt="Мультипекар 5в1, 600Вт, Sokany SK-08105" /></SwiperSlide>
     </Swiper>
  );
}
