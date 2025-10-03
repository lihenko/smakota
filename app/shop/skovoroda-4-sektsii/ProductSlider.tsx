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
        <SwiperSlide><img src="/shop/6547489198_skovoroda-s-antiprigarnym.jpg" alt="Сковорода з антипригарним гранітним покриттям" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6547489196_skovoroda-s-antiprigarnym.jpg" alt="Сковорода з антипригарним гранітним покриттям" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6547489199_skovoroda-s-antiprigarnym.jpg" alt="Сковорода з антипригарним гранітним покриттям" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6547489194_skovoroda-s-antiprigarnym.jpg" alt="Сковорода з антипригарним гранітним покриттям" /></SwiperSlide>
        <SwiperSlide><img src="/shop/6547489197_skovoroda-s-antiprigarnym.jpg" alt="Сковорода з антипригарним гранітним покриттям" /></SwiperSlide>
     </Swiper>
  );
}
