'use client';

import Link from 'next/link';
import { useAuthSync } from '@/hooks/useAuthSync';
import { logout } from '@/utils/logout';

const Footer: React.FC = () => {
  const isLoggedIn = useAuthSync();

  return (
    <footer className="bg-[#eadcc7] text-black p-4">
        <div className="container">
            <div className="flex flex-wrap justify-between">
                <div className="px-4 w-full text-center md:w-auto md:text-left">
                    <h1 className="text-xl font-bold">Смакота</h1>
                    <p>Твоя кулінарна книга онлайн.</p>
                </div>
            <div className="px-4">
                <nav>
                    <ul>
                        <li>
                        <Link href="/">Головна</Link>
                        </li>
                        <li>
                        <Link href="/users">Наші кулінари</Link>
                        </li>
                        <li>
                        <Link href="/about">Про нас</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="px-4">
                <nav>
                    <ul>
                        <li>
                        <Link href="/recipe/type/osnovni-stravy">Основні страви</Link>
                        </li>
                        <li>
                        <Link href="/recipe/type/yushky">Юшки</Link>   
                        </li>
                        <li>
                        <Link href="/recipe/type/garniry">Гарніри</Link>
                        </li>
                        <li>
                        <Link href="/recipe/type/salaty">Салати</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="px-4">
                <nav>
                    <ul>
                        <li>
                        <Link href="/recipe/type/zakusky">Закуски</Link>
                        </li>
                        <li>
                        <Link href="/recipe/type/sousy">Соуси</Link>   
                        </li>
                        <li>
                        <Link href="/recipe/type/snidanok">Сніданок</Link>
                        </li>
                        <li>
                        <Link href="/recipe/type/deserty">Десерти</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="px-4">
                <nav>
                    <ul>
                        <li>
                        <Link href="/recipe/type/napoyi">Напої</Link>
                        </li>
                        <li>
                        <Link href="/recipe/type/vypichka">Випічка</Link>   
                        </li>
                        <li>
                        <Link href="/recipe/type/torty">Торти</Link>
                        </li>
                        <li>
                        <Link href="/recipe/type/konservatsiya">Консервація</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        </div>
      
    </footer>
  );
};

export default Footer;
