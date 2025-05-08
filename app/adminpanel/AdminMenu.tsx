
import Link from 'next/link';


export default function AdminMenu() {


    return (
        <div>
            <div className="container py-16">
                <div className="text-center">
                    <ul className='flex gap-3 justify-center'>
                        <li>
                            <Link href="/adminpanel/">Статистика</Link>
                        </li>
                        <li>
                            <Link href="/adminpanel/ingredients/">Інгредієнти</Link>
                        </li>
                        <li>
                            <Link href="/adminpanel/units/">Одиниці виміру</Link>
                        </li>
                        <li>
                            <Link href="/adminpanel/recipes/">Рецепти</Link>
                        </li>
                        <li>
                            <Link href="/adminpanel/comments/">Коментарі</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
