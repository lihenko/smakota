'use client';

import Link from 'next/link';
import { useAuthSync } from '@/hooks/useAuthSync';
import { logout } from '@/utils/logout';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

const Header: React.FC = () => {
  const isLoggedIn = useAuthSync();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закриття меню при кліку поза ним
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="bg-[#eadcc7] text-black p-4">
      <div className="flex justify-between items-center">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Smakota.svg"
            alt="Smakota Logo"
            width={160}  
            height={40}
            priority
          />
        </Link>

        {/* Меню для desktop */}
        <nav className='hidden md:block'>
          <ul className="flex text-sm space-x-3 lg:text-base lg:space-x-4">
            <li><Link href="/">Головна</Link></li>
            <li><Link href="/recipe">Рецепти</Link></li>
            <li><Link href="/shop">Крамниця</Link></li>
            <li><Link href="/calc">Калькулятор</Link></li>
            <li><Link href="/users">Наші кулінари</Link></li>

            {/* Кнопки входу/кабінету показуються тільки після визначення isLoggedIn */}
            {isLoggedIn !== null && (
              isLoggedIn ? (
                <>
                  <li><Link href="/dashboard">Кабінет кулінара</Link></li>
                  <li>
                    <button onClick={logout} className="cursor-pointer hover:underline">
                      Вийти
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link href="/register">Реєстрація</Link></li>
                  <li><Link href="/login">Вхід</Link></li>
                </>
              )
            )}
          </ul>
        </nav>

        {/* Гамбургер меню для mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
        >
          {menuOpen ? (
            <span className="relative w-6 h-6">
              <span className="absolute left-0 top-1/2 w-6 h-0.5 bg-black rotate-45"></span>
              <span className="absolute left-0 top-1/2 w-6 h-0.5 bg-black -rotate-45"></span>
            </span>
          ) : (
            <>
              <span className="block w-6 h-0.5 bg-black mb-1"></span>
              <span className="block w-6 h-0.5 bg-black mb-1"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden mt-4" ref={menuRef}>
          <ul className="flex flex-col space-y-2">
            <li><Link href="/" onClick={() => setMenuOpen(false)}>Головна</Link></li>
            <li><Link href="/recipe" onClick={() => setMenuOpen(false)}>Рецепти</Link></li>
            <li><Link href="/shop" onClick={() => setMenuOpen(false)}>Крамниця</Link></li>
            <li><Link href="/calc" onClick={() => setMenuOpen(false)}>Калькулятор</Link></li>
            <li><Link href="/users" onClick={() => setMenuOpen(false)}>Наші кулінари</Link></li>

            {isLoggedIn !== null && (
              isLoggedIn ? (
                <>
                  <li><Link href="/dashboard" onClick={() => setMenuOpen(false)}>Кабінет кулінара</Link></li>
                  <li>
                    <button
                      onClick={() => { logout(); setMenuOpen(false); }}
                      className="cursor-pointer hover:underline"
                    >
                      Вийти
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link href="/register" onClick={() => setMenuOpen(false)}>Реєстрація</Link></li>
                  <li><Link href="/login" onClick={() => setMenuOpen(false)}>Вхід</Link></li>
                </>
              )
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
