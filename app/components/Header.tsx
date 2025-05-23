'use client';

import Link from 'next/link';
import { useAuthSync } from '@/hooks/useAuthSync';
import { logout } from '@/utils/logout';
import Image from 'next/image';

const Header: React.FC = () => {
  const isLoggedIn = useAuthSync();

  if (isLoggedIn === null) {
    return null; // або прелоадер, або статичне меню
  }

  return (
    <header className="bg-orange-200 text-black p-4">
       <div className="flex justify-between items-center">
         <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Smakota.svg"
            alt="Smakota Logo"
            width={160}  
            height={40}
            priority
          />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">Головна</Link>
            </li>
            <li>
              <Link href="/recipe">Рецепти</Link>
            </li>
            <li>
              <Link href="/users">Наші кулінари</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/dashboard">Кабінет кулінара</Link>
                </li>
                <li>
                  <button onClick={logout} className="cursor-pointer hover:underline">
                    Вийти
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/register">Реєстрація</Link>
                </li>
                <li>
                  <Link href="/login">Вхід</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
