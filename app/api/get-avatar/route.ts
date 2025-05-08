// app/api/get-avatar/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Логіка для отримання аватара користувача, наприклад з бази даних
    const userId = 1; // Це має бути реальний userId
    const avatarUrl = await getUserAvatar(userId);

    return NextResponse.json({ avatarUrl });
  } catch (error) {
    console.error('Error fetching avatar:', error);
    return NextResponse.json({ error: 'Failed to fetch avatar' }, { status: 500 });
  }
}

// Приклад функції для отримання аватара користувача з бази даних
async function getUserAvatar(userId: number): Promise<string> {
  // Тепер можна імплементувати логіку для отримання аватара з бази даних або іншого джерела
  // Наприклад, це може бути запит до бази даних:
  // const result = await db.query('SELECT avatar_url FROM users WHERE id = $1', [userId]);

  // Для прикладу повернемо просто URL аватара
  return '/avatars/default-avatar.webp'; // Заміни на реальний шлях до аватара
}
