import SearchClient from './SearchClient';
import { getUserId } from '@/hooks/useAuth.server';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q.trim() : '';
  const userId = await getUserId();

  let favorites: number[] = [];

  if (userId) {
    const favs = await prisma.favoriteRecipe.findMany({
      where: { userId: Number(userId) },
      select: { recipeId: true },
    });
    favorites = favs.map((f) => f.recipeId);
  }

  return (
    <SearchClient
      initialQuery={q}
      userId={userId ? Number(userId) : null}
      favoriteIds={favorites}
    />
  );
}
