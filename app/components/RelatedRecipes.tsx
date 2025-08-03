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
  // Отримати 4 схожих рецепти (за dishType або інгредієнтами, окрім поточного)
  const recipes = await prisma.recipe.findMany({
    where: {
      id: { not: recipeId },
      moderated: true,
      privaterecipe: false,
      OR: [
        { dishTypeId },
        {
          ingredients: {
            some: {
              ingredientId: { in: ingredientIds },
            },
          },
        },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: { user: true, dishType: true },
  });

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
      </div>
    </div>
  );
}