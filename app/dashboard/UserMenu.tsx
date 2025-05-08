
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
                    <h1 className='text-center my-8'>Кібінет кулінара</h1>
                </div>
                <div className="text-center">
                    <ul className='flex gap-3 justify-center'>
                        <li>
                            <Link href="/dashboard/">Налаштування</Link>
                        </li>
                        <li>
                            <Link href="/dashboard/createrecipe/">Новий рецепт</Link>
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
