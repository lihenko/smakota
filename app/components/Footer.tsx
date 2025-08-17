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
          {/* Інші колонки вашого футера */}
        </div>
      </div>

      {/* Кнопка Scroll to Top з анімацією */}
      <button
        onClick={scrollToTop}
        className={`fixed cursor-pointer w-10 h-10 flex justify-center items-center bottom-8 right-8 bg-black text-white p-3 rounded-full shadow-lg 
          transition-opacity duration-500 ease-in-out 
          ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
