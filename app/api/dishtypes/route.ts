import prisma from '../../lib/prisma';

export async function GET(req: Request) {
  try {
    // Отримуємо типи страв з бази даних
    const dishTypes = await prisma.dishType.findMany({
      select: { name: true }, // Вибираємо тільки назву типу страви
    });

    // Якщо типи страв знайдені, відправляємо їх у відповіді
    return new Response(JSON.stringify({ dishTypes: dishTypes.map(dt => dt.name) }), { status: 200 });
  } catch (error) {
    console.error('Error fetching dish types:', error);
    return new Response('Не вдалося отримати типи страв', { status: 500 });
  }
}
