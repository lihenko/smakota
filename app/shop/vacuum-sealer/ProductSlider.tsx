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
        <SwiperSlide><img src="/shop/6638216626_vakuumnyj-upakovschik-dlya.jpg" alt="Вакуумний пакувальник" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6638216621_vakuumnyj-upakovschik-dlya.jpg" alt="Вакуумний пакувальник" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6638216623_vakuumnyj-upakovschik-dlya.jpg" alt="Вакуумний пакувальник" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6638216627_vakuumnyj-upakovschik-dlya.jpg" alt="Вакуумний пакувальник" /></SwiperSlide>
     </Swiper>
  );
}
