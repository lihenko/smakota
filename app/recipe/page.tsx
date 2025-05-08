import { redirect } from 'next/navigation';
import prisma from '../lib/prisma';
import Link from 'next/link';
import RecipeCard from '../components/RecipeCard';

interface Props {
  searchParams: { page?: string };
}

export default async function RecipesPage({ searchParams }: Props) {
  const searchParamsData = await searchParams;
  const page = Number(searchParamsData.page) || 1;
  const pageSize = 2;
  const skip = (page - 1) * pageSize;

  if (isNaN(page) || page < 1 ) {
    redirect('/recipe');
  }

  const recipes = await prisma.recipe.findMany({
    where: { privaterecipe: false, moderated: true },
    orderBy: { createdAt: 'desc' },
    skip,
    take: pageSize,
    include: { user: true },
  });

  const totalCount = await prisma.recipe.count({
    where: { privaterecipe: false, moderated: true },
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <main className="py-16">
        <div className="container">
            <h1 className="text-3xl font-bold mb-6">Рецепти</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
            </div>

            <div className="mt-8 flex justify-center items-center gap-4">
            {page > 1 && (
                <Link
                    href={page - 1 === 1 ? `/recipe` : `?page=${page - 1}`}
                    className="px-3 py-1 border rounded"
                >
                    Попередня
                </Link>
            )}
            <span>Сторінка {page} з {totalPages}</span>
            {page < totalPages && (
                <Link href={`?page=${page + 1}`} className="px-3 py-1 border rounded">
                Наступна
                </Link>
            )}
            </div>
        </div>
    </main>
  );
}
