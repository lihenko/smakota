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
        <SwiperSlide><img src="/shop/63878795499311.webp" alt="Pasta Set — лапшерізка, машина для приготування пасти та лапші" /></SwiperSlide>
        <SwiperSlide><img src="/shop/11381118947422.webp" alt="Pasta Set — лапшерізка, машина для приготування пасти та лапші" /></SwiperSlide>
        <SwiperSlide><img src="/shop/32157649947352.webp" alt="Pasta Set — лапшерізка, машина для приготування пасти та лапші" /></SwiperSlide>
     </Swiper>
  );
}
