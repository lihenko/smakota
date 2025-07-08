
import Link from 'next/link';
import { User } from '../generated/prisma'; // імпорт типу User



interface UserMenuProps {
    currentUser: User & { avatar?: { avatarUrl: string } } | null;
  }

export default function UserMenu({ currentUser }: UserMenuProps) {


    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <h1 className='text-center font-bold text-2xl my-8'>Кібінет кулінара</h1>
                </div>
                <div className="text-center">
                    <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-sm sm:text-base">
                        <li>
                        <Link href="/dashboard/">Налаштування</Link>
                        </li>
                        <li>
                        <Link href="/dashboard/createrecipe/">Новий рецепт</Link>
                        </li>
                        <li>
                        <Link href="/dashboard/cookbook/">Моя кулінарна книга</Link>
                        </li>
                        <li>
                        <Link href="/dashboard/myrecipes/">Мої рецепти</Link>
                        </li>
                        {currentUser?.role === 'admin' && (
                        <li>
                            <Link href="/adminpanel/">Адмін панель</Link>
                        </li>
                        )}
                    </ul>
                </div>

            </div>
        </div>
    )
}
