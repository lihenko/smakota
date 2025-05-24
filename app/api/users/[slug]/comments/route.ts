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

  // Загальна кількість коментарів користувача
  const totalCount = await prisma.comment.count({
    where: { userId: user.id },
  });

  // Вибірка коментарів користувача з пагінацією + інформація про страву
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

  return NextResponse.json({ comments, totalCount });
}
