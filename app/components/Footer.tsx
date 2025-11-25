'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#eadcc7] text-black p-4 relative">
      <div className="container">
        <div className="flex flex-wrap justify-between">
          <div className="px-4 w-full text-center mb-6 md:w-1/5 md:text-left">
            <h1 className="text-xl font-bold">Смакота</h1>
            <p className="font-bold">Твоя кулінарна книга онлайн</p>
          </div>

          <div className="px-4 w-1/2 mb-3 md:w-1/5">
            <nav>
              <ul>
                <li><Link href="/">Головна</Link></li>
                <li><Link href="/users">Наші кулінари</Link></li>
                <li><Link href="/about">Про нас</Link></li>
                <li><Link href="/privacy">Політика конфіденційності</Link></li>
                <li><Link href="/return">Повернення і обмін</Link></li>
              </ul>
            </nav>
          </div>

          <div className="px-4 w-1/2 mb-3 md:w-1/5">
            <nav>
              <ul>
                <li><Link href="/recipe/type/osnovni-stravy">Основні страви</Link></li>
                <li><Link href="/recipe/type/yushky">Юшки</Link></li>   
                <li><Link href="/recipe/type/garniry">Гарніри</Link></li>
                <li><Link href="/recipe/type/salaty">Салати</Link></li>
              </ul>
            </nav>
          </div>

          <div className="px-4 w-1/2 mb-3 md:w-1/5">
            <nav>
              <ul>
                <li><Link href="/recipe/type/zakusky">Закуски</Link></li>
                <li><Link href="/recipe/type/sousy">Соуси</Link></li>   
                <li><Link href="/recipe/type/snidanok">Сніданок</Link></li>
                <li><Link href="/recipe/type/deserty">Десерти</Link></li>
              </ul>
            </nav>
          </div>

          <div className="px-4 w-1/2 mb-3 md:w-1/5">
            <nav>
              <ul>
                <li><Link href="/recipe/type/napoyi">Напої</Link></li>
                <li><Link href="/recipe/type/vypichka">Випічка</Link></li>   
                <li><Link href="/recipe/type/torty">Торти</Link></li>
                <li><Link href="/recipe/type/konservatsiya">Консервація</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Кнопка Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed cursor-pointer w-10 h-10 flex justify-center items-center bottom-8 left-8 bg-black text-white rounded-full shadow-lg 
          transition-opacity duration-500 ease-in-out 
          ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
