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
        <SwiperSlide><img src="/shop/7018286797_nabor-silikonovyh-kuhonnyh.jpg" alt="Набір силіконового кухонного приладдя 19 предметів Фіолетовий Kitchen Set" /></SwiperSlide>
        <SwiperSlide><img src="/shop/7018286795_nabor-silikonovyh-kuhonnyh.jpg" alt="Набір силіконового кухонного приладдя 19 предметів Фіолетовий Kitchen Set" /></SwiperSlide>
        <SwiperSlide><img src="/shop/7018286796_nabor-silikonovyh-kuhonnyh.jpg" alt="Набір силіконового кухонного приладдя 19 предметів Фіолетовий Kitchen Set" /></SwiperSlide>
        <SwiperSlide><img src="/shop/7018286798_nabor-silikonovyh-kuhonnyh.jpg" alt="Набір силіконового кухонного приладдя 19 предметів Фіолетовий Kitchen Set" /></SwiperSlide>
        <SwiperSlide><img src="/shop/7018286799_nabor-silikonovyh-kuhonnyh.jpg" alt="Набір силіконового кухонного приладдя 19 предметів Фіолетовий Kitchen Set" /></SwiperSlide>
        <SwiperSlide><img src="/shop/7018286801_nabor-silikonovyh-kuhonnyh.jpg" alt="Набір силіконового кухонного приладдя 19 предметів Фіолетовий Kitchen Set" /></SwiperSlide>
        <SwiperSlide><img src="/shop/7018286802_nabor-silikonovyh-kuhonnyh.jpg" alt="Набір силіконового кухонного приладдя 19 предметів Фіолетовий Kitchen Set" /></SwiperSlide>
        <SwiperSlide><img src="/shop/7018295999_nabor-silikonovyh-kuhonnyh.jpg" alt="Набір силіконового кухонного приладдя 19 предметів Фіолетовий Kitchen Set" /></SwiperSlide>
        <SwiperSlide><img src="/shop/7018298991_nabor-silikonovyh-kuhonnyh.jpg" alt="Набір силіконового кухонного приладдя 19 предметів Фіолетовий Kitchen Set" /></SwiperSlide>
     </Swiper>
  );
}
