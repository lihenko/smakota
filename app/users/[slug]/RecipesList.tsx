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
  const [totalCount, setTotalCount] = useState(0);
  const limit = 3;

  const fetchRecipes = async (page: number) => {
    setLoading(true);
    const res = await fetch(`/api/users/${slug}/recipes?page=${page}`);
    const data = await res.json();

    if (data && Array.isArray(data.recipes)) {
      const processedData = data.recipes.map((recipe: any) => ({
        ...recipe,
        createdAt: new Date(recipe.createdAt),
      }));

      if (page === 0) setRecipes(processedData);
      else setRecipes((prev) => [...prev, ...processedData]);

      setTotalCount(data.totalCount ?? 0);
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Рецепти користувача",
    "itemListElement": recipes.map((recipe, index) => ({
      "@type": "Recipe",
      "name": recipe.title,
      "url": `/recipe/${recipe.slug}`,
      ...(recipe.imageUrl && { "image": recipe.imageUrl }),
      "author": {
        "@type": "Person",
        "name": recipe.user.name
      },
      ...(recipe.averageRating !== null && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": recipe.averageRating.toFixed(1),
          "reviewCount": recipe.commentCount ?? 0,
          "bestRating": "5",
          "worstRating": "1"
        }
      }),
      "position": index + 1
    }))
  };

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

        {!loading && recipes.length < totalCount && (
          <div className="text-center">
            <button onClick={loadMore} className="btn btn-primary mt-4">
              Завантажити ще
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
