import { notFound } from 'next/navigation';
import prisma from '../../../lib/prisma';
import RecipeCard from '../../../components/RecipeCard';
import Pagination from '../../../components/Pagination';
import { getUserId } from "@/hooks/useAuth.server";
import { Metadata } from 'next';



export type ParamsPromise = Promise<Record<'slug', string>>;
export type SearchParamsPromise = Promise<Record<'page', string | undefined> | undefined>;

interface Props {
  params: ParamsPromise;
  searchParams?: SearchParamsPromise;
}
export async function generateMetadata({ params }: { params: ParamsPromise }): Promise<Metadata> {
  const dishType = await prisma.dishType.findUnique({
    where: { slug: (await params).slug },
  });

  if (!dishType) return { title: 'Тип страви не знайдено' };

  const title = `Рецепти типу "${dishType.name}" | Smakota.club`;
  const description = `Переглянь рецепти типу "${dishType.name}" на Smakota.club. Обирай серед улюблених страв та зберігай найкращі ідеї у своїй кулінарній книзі.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.smakota.club/recipe/type/${dishType.slug}`,
      siteName: 'Smakota.club',
      locale: 'uk_UA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const pageSize = 12;

export default async function DishTypeSlugPage({ params, searchParams }: Props) {
  const paramData = await params; // { slug: string }
  const searchParamsData = await searchParams; // { page?: string } | undefined

  const slug = paramData.slug;
  const page = Number(searchParamsData?.page) || 1;

  const dishType = await prisma.dishType.findUnique({
    where: { slug },
  });

  if (!dishType) return notFound();

  const skip = (page - 1) * pageSize;

  const [recipes, totalCount] = await Promise.all([
    prisma.recipe.findMany({
      where: {
        dishTypeId: dishType.id,
        privaterecipe: false,
        moderated: true,
      },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.recipe.count({
      where: {
        dishTypeId: dishType.id,
        privaterecipe: false,
        moderated: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const userId = await getUserId();
  const numericUserId = userId ? Number(userId) : null;

  let favorites: Record<number, boolean> = {};
    if (numericUserId !== null) {
      const favList = await prisma.favoriteRecipe.findMany({
        where: { userId: numericUserId },
        select: { recipeId: true },
      });
      favorites = Object.fromEntries(favList.map(f => [f.recipeId, true]));
    }

  return (
    <main className="py-16">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Тип: {dishType.name}</h1>

        {recipes.length === 0 ? (
          <div className="text-gray-500">Рецептів не знайдено</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                userId={numericUserId}
                                isInitiallyFavorite={!!favorites[recipe.id]}
                              />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination currentPage={page} totalPages={totalPages} />
            )}
          </>
        )}
      </div>
    </main>
  );
}
