"use client";
import OrderForm from "@/app/components/OrderForm";
import HtmlContent from "@/app/components/HtmlContentProps";
import { useState } from "react";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from '@/app/components/Shop.module.css';

interface ProductOptionsProps {
  product_name: string;
  volumes: number[];
  prices: number[];
  short_description: string;
  descriptions: string;
  gallery: string[];
}



export default function ProductOptions({ volumes, prices, product_name, short_description, descriptions, gallery }: ProductOptionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <main className="py-16">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full lg:w-1/2 px-3">
            <div className="flex justify-center mb-6">
              <Swiper
                // install Swiper modules
                className={styles.productSlider}
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                >
                {gallery.map((image, index) => (
                <SwiperSlide key={index}>
                    <Image src={'/shop/' + image} alt={product_name} width={700} height={500} />
                </SwiperSlide>
                ))}

            </Swiper>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-3 xl:pl-10">
            <h1 className="text-3xl font-bold mb-6 text-center lg:text-left">{ product_name }</h1>
            <div className="text-lg mb-4">
                <HtmlContent html={short_description} />
            </div>
            <div className="text-lg mb-4">
              <div>
                <p className="mb-2 font-medium">Обери свій об&apos;єм:</p>

                <ul className="flex gap-2">
                    {volumes.map((volume, index) => (
                    <li
                        key={volume}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <button
                        className={`btn btn-sm ${
                            index === selectedIndex ? "btn-primary" : "btn-outline"
                        }`}
                        >
                        {volume} л
                        </button>
                    </li>
                    ))}
                </ul>

                <p className="mt-4">
                    Ціна:{" "}
                    <span className="font-bold text-lg">
                    {prices[selectedIndex]} грн
                    </span>
                </p>
                </div>
            </div>
            <div className="text-lg mb-4">
              <a className="btn btn-primary" href="#order">Замовити</a>
            </div>
          </div>
        </div>
        <div className="flex -mx-3 mb-6">
          <div className="w-full px-3">
            <HtmlContent html={descriptions} />
            <h2 id="order" className="text-2xl font-bold mb-6">Замовлення:</h2>
            <p className="mb-3">Щоб замовити вакуумний пакувальник, заповніть форму нижче:</p>
            <OrderForm productName={product_name + ' ' + volumes[selectedIndex] + 'л'} productPrice={prices[selectedIndex]} />
          </div>
        </div>
      </div>
    </main>
    

  );
}
