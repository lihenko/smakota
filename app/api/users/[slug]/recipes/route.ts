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
  const limit = 3;

  // Знайти користувача за slug
  const user = await prisma.user.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Вибірка **тільки модераованих** рецептів користувача з пагінацією
  const recipes = await prisma.recipe.findMany({
    where: {
      userId: user.id,
      moderated: true,  // Ось фільтр
    },
    skip: page * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
    select: {
      privaterecipe: true,
      moderated: true,
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      createdAt: true,
      averageRating: true,
      commentCount: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return NextResponse.json(recipes);
}
