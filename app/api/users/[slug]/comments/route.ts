import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;
  const { slug } = params;

  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page')) || 0;
  const limit = 9;

  // Шукаємо користувача
  const user = await prisma.user.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Вибірка коментарів користувача з пагінацією + додавання інформації про страву
  const comments = await prisma.comment.findMany({
    where: { userId: user.id },
    skip: page * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      recipe: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  return NextResponse.json(comments);
}
