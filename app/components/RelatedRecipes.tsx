import RecipeCard from "./RecipeCard";
import prisma from "@/app/lib/prisma";

interface RelatedRecipesProps {
  recipeId: number;
  dishTypeId: number;
  ingredientIds: number[];
  userId: number | null;
  favorites: Record<number, boolean>;
}

export default async function RelatedRecipes({
  recipeId,
  dishTypeId,
  ingredientIds,
  userId,
  favorites,
}: RelatedRecipesProps) {
  // 1. Спочатку шукаємо до 4 рецептів з тієї ж категорії (окрім поточного)
  const byCategory = await prisma.recipe.findMany({
    where: {
      id: { not: recipeId },
      dishTypeId,
      moderated: true,
      privaterecipe: false,
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { user: true, dishType: true },
  });

  let recipes = [...byCategory];

  // 2. Якщо менше 4, добираємо за інгредієнтами (уникаємо дублів)
  if (recipes.length < 4 && ingredientIds.length > 0) {
    const excludeIds = [recipeId, ...recipes.map(r => r.id)];
    const byIngredients = await prisma.recipe.findMany({
      where: {
        id: { notIn: excludeIds },
        moderated: true,
        privaterecipe: false,
        ingredients: {
          some: {
            ingredientId: { in: ingredientIds },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 4 - recipes.length,
      include: { user: true, dishType: true },
    });
    recipes = [...recipes, ...byIngredients];
  }

  if (!recipes.length) return null;

  return (
    <div className="mt-12 lg:mt-0">
      <h2 className="text-xl font-bold mb-4">Можливо вас зацікавить</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            userId={userId}
            isInitiallyFavorite={!!favorites[recipe.id]}
          />
        ))}
        <a
              href={`/shop/veggie-slicer`}
              className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
            >
              <div className="relative w-full aspect-[3/2]">
                <img
                  src="/shop/49aa9d8e-c889-47fd-9967-fe069d228593.webp"
                  alt="Ручна овочерізка VEGGIE SLICER"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="px-4 pt-4 pb-10">
                <h2 className="text-lg font-semibold">Ручна овочерізка VEGGIE SLICER</h2>
              </div>
            </a>
      </div>
    </div>
  );
}