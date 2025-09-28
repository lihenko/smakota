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
        <SwiperSlide><img src="/shop/49aa9d8e-c889-47fd-9967-fe069d228593.webp" alt="Ручна овочерізка VEGGIE SLICER" /></SwiperSlide>
        <SwiperSlide><img src="/shop/3f8ec16f-79e9-4d88-aad6-813b76d7a16a.webp" alt="Ручна овочерізка VEGGIE SLICER" /></SwiperSlide>
        <SwiperSlide><img src="/shop/db83d7fd-980c-400f-944f-9f0dcb0d5690.webp" alt="Ручна овочерізка VEGGIE SLICER" /></SwiperSlide>
        <SwiperSlide><img src="/shop/acaf4b05-7407-4e91-b401-ef9bd37b3bcd.webp" alt="Ручна овочерізка VEGGIE SLICER" /></SwiperSlide>
     </Swiper>
  );
}
