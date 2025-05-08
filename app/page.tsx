import RecipeCard from "./components/RecipeCard";
import prisma from "./lib/prisma";

export default async function HomePage() {
  const recipes = await prisma.recipe.findMany({
    where: {
      moderated: true,
      privaterecipe: false,
    },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      user: true,
    },
  });

  return (
    <main className="py-16">
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">Останні рецепти</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </main>
  );
}