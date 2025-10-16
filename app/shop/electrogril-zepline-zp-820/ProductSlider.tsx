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
        <SwiperSlide><img src="/shop/6848136432_elektrogril-zepline-zp-820.jpg" alt="Електрогриль Zepline ZP-820" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6848140377_elektrogril-zepline-zp-820.jpg" alt="Електрогриль Zepline ZP-820" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6848140380_elektrogril-zepline-zp-820.jpg" alt="Електрогриль Zepline ZP-820" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6848140378_elektrogril-zepline-zp-820.jpg" alt="Електрогриль Zepline ZP-820" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6848140375_elektrogril-zepline-zp-820.jpg" alt="Електрогриль Zepline ZP-820" /></SwiperSlide>
     </Swiper>
  );
}
