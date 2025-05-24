import { redirect } from 'next/navigation';
import prisma from '../lib/prisma';
import RecipeCard from '../components/RecipeCard';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import RecipeSearchForm from '../components/SearchForm';
import React from 'react';

export const dynamic = 'force-dynamic';

export type SearchParamsPromise = Promise<Record<string, string | string[] | undefined>>;

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: SearchParamsPromise
}) {
  const searchParamsData = await searchParams;
  const page = Number(searchParamsData.page) || 1;
  const dishTypeId = searchParamsData.dishTypeId ? Number(searchParamsData.dishTypeId) : undefined;
  const ingredientIds =
    typeof searchParamsData.ingredientIds === 'string'
      ? searchParamsData.ingredientIds.split(',').map(Number)
      : [];

  if (isNaN(page) || page < 1) {
    redirect('/recipe');
  }

  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  const where = {
    privaterecipe: false,
    moderated: true,
    ...(dishTypeId && { dishTypeId }),
    ...(ingredientIds.length > 0 && {
      AND: ingredientIds.map((id) => ({
        ingredients: {
          some: {
            ingredientId: id,
          },
        },
      })),
    }),
  };

  const [recipes, totalCount, dishTypes, ingredients] = await Promise.all([
    prisma.recipe.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
      include: { user: true },
    }),
    prisma.recipe.count({ where }),
    prisma.dishType.findMany({ orderBy: { name: 'asc' } }),
    prisma.ingredient.findMany({ orderBy: { name: 'asc' } }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const createPaginationUrl = (newPage: number) => {
    const updatedParams = new URLSearchParams();

    if (dishTypeId) updatedParams.set('dishTypeId', dishTypeId.toString());
    if (ingredientIds.length > 0) updatedParams.set('ingredientIds', ingredientIds.join(','));
    updatedParams.set('page', newPage.toString());

    return `?${updatedParams.toString()}`;
  };

  // Формуємо JSON-LD для CollectionPage + ItemList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Колекція рецептів",
    "description": "Сторінка з колекцією смачних рецептів.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": recipes.map((recipe, index) => ({
        "@type": "ListItem",
        "position": index + 1 + (page - 1) * pageSize,
        "url": `/recipe/${recipe.slug}`,
        "name": recipe.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify з 2 пробілами для читабельності
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
      />
      <main className="py-16">
        <div className="container">
          <h1 className="text-3xl font-bold mb-6 text-center">Рецепти</h1>
          <div className="mb-8">
            <RecipeSearchForm />
          </div>
          <Filter
            dishTypes={dishTypes}
            ingredients={ingredients}
            currentDishTypeId={dishTypeId}
            currentIngredientIds={ingredientIds}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {totalCount === 0 ? (
            <div className="mt-8 text-center text-gray-500 text-lg">Рецепти не знайдено</div>
          ) : (
            totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} />
          )}
        </div>
      </main>
    </>
  );
}
