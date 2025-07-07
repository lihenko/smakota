import RecipeCard from "./components/RecipeCard";
import prisma from "./lib/prisma";
import RecipeSearchForm from "./components/SearchForm";
import Link from "next/link";
import { getUserId } from "@/hooks/useAuth.server";

export const dynamic = 'force-dynamic'; 

export default async function HomePage() {
  const userId = await getUserId();
  const numericUserId = userId ? Number(userId) : null;
  const recipes = await prisma.recipe.findMany({
    where: {
      moderated: true,
      privaterecipe: false,
    },
    orderBy: { createdAt: "desc" },
    take: 8,
    include: {
      user: true,
    },
  });

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
        <div className="mb-8">
          <RecipeSearchForm />
        </div>
        <h2 className="text-2xl font-bold mb-4">Останні рецепти</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {recipes.map((recipe) => (
            <RecipeCard
            key={recipe.id}
            recipe={recipe}
            userId={numericUserId}
            isInitiallyFavorite={!!favorites[recipe.id]}
          />
          ))}
        </div>
        <div className="text-center">
          <Link href="/recipe" className="btn btn-primary">Більше рецептів</Link>
        </div>
      </div>
    </main>
  );
}
