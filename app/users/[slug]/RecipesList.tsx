'use client';

import { useState, useEffect } from 'react';
import RecipeCard from '@/app/components/RecipeCard';

type Recipe = {
  privaterecipe: any;
  moderated: boolean;
  id: number;
  title: string;
  slug: string;
  imageUrl?: string | null;
  createdAt: Date;
  averageRating: number | null;
  commentCount: number | null;
  user: {
    name: string;
  };
};

interface RecipesListProps {
  slug: string;
}

export default function RecipesList({ slug }: RecipesListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 3;

  const fetchRecipes = async (page: number) => {
    setLoading(true);
    const res = await fetch(`/api/users/${slug}/recipes?page=${page}`);
    const data = await res.json();

    if (Array.isArray(data)) {
      // Фільтруємо тільки модераційні рецепти
      const filteredData = data.filter((r: any) => r.moderated === true);

      const processedData = filteredData.map((recipe: any) => ({
        ...recipe,
        createdAt: new Date(recipe.createdAt),
      }));

      if (page === 0) setRecipes(processedData);
      else setRecipes((prev) => [...prev, ...processedData]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(0);
    fetchRecipes(0);
  }, [slug]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRecipes(nextPage);
  };

  // Якщо немає рецептів і не йде завантаження — не рендеримо секцію
  if (!loading && recipes.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <h2 className="text-center mb-6 text-xl font-semibold">Рецепти</h2>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {loading && <p>Завантаження...</p>}

        {!loading && recipes.length >= (page + 1) * limit && (
          <button onClick={loadMore} className="btn btn-primary mt-4">
            Завантажити ще
          </button>
        )}
      </div>
    </section>
  );
}
