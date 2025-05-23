import RecipeCard from "./components/RecipeCard";
import prisma from "./lib/prisma";
import RecipeSearchForm from "./components/SearchForm";

export const dynamic = 'force-dynamic'; 

export default async function HomePage() {
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

  return (
    <main className="py-16">
      <div className="container">
        <div className="mb-8">
          <RecipeSearchForm />
        </div>
        <h2 className="text-2xl font-bold mb-4">Останні рецепти</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </main>
  );
}
