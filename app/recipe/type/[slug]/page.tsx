import { notFound } from 'next/navigation';
import prisma from '../../../lib/prisma';
import RecipeCard from '../../../components/RecipeCard';
import Pagination from '../../../components/Pagination';

interface Props {
  params: { slug: string };
  searchParams?: { page?: string };
}

const pageSize = 12;

export default async function DishTypeSlugPage({ params, searchParams }: Props) {
  const paramData = await params;
  const searchParamsData = await searchParams;
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
                <RecipeCard key={recipe.id} recipe={recipe} />
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
