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
        <SwiperSlide><img src="/shop/23577062294892.webp" alt="Електрична м’ясорубка Domotec MS-2024" /></SwiperSlide>
        <SwiperSlide><img src="/shop/33668249251601.webp" alt="Електрична м’ясорубка Domotec MS-2024" /></SwiperSlide>
        <SwiperSlide><img src="/shop/13255134023626.webp" alt="Електрична м’ясорубка Domotec MS-2024" /></SwiperSlide>
        <SwiperSlide><img src="/shop/36810234493440.webp" alt="Електрична м’ясорубка Domotec MS-2024" /></SwiperSlide>
        <SwiperSlide><img src="/shop/69791704033800.webp" alt="Електрична м’ясорубка Domotec MS-2024" /></SwiperSlide>
     </Swiper>
  );
}
