'use client';

import { Navigation, Pagination, A11y } from 'swiper/modules';
import Image from 'next/image';
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
        <SwiperSlide className='flex items-center'><Image src="/shop/Copilot_20251017_085058.png" width={1024} height={1024} alt="Тостер Crownberg CB 1106" /></SwiperSlide>
        <SwiperSlide className='flex items-center'><Image src="/shop/Copilot_20251017_085859.png" width={1536} height={1024} alt="Тостер Crownberg CB 1106" /></SwiperSlide>
        <SwiperSlide className='flex items-center'><Image src="/shop/Copilot_20251017_085457.png" width={1536} height={1536} alt="Тостер Crownberg CB 1106" /></SwiperSlide>
        <SwiperSlide className='flex items-center'><Image src="/shop/Copilot_20251017_085201.png" width={1024} height={1024} alt="Тостер Crownberg CB 1106" /></SwiperSlide>
        <SwiperSlide className='flex items-center'><Image src="/shop/Copilot_20251017_085713.png" width={1536} height={1024} alt="Тостер Crownberg CB 1106" /></SwiperSlide>
     </Swiper>
  );
}
