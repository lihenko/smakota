'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RecipeCard from '@/app/components/RecipeCard';
import prisma from '../lib/prisma';

interface Recipe {
  id: number;
  title: string;
  slug: string;
  imageUrl?: string | null;
  createdAt: Date;
  averageRating: number | null;
  commentCount: number | null;
  privaterecipe: boolean;
  moderated: boolean;
  user: { name: string, slug: string };
  isInitiallyFavorite: boolean;
}

interface SearchClientProps {
  initialQuery: string;
  userId: number | null;
  favoriteIds: number[];
}

export default function SearchClient({ initialQuery, userId, favoriteIds }: SearchClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (searchQuery: string) => {
  setLoading(true);
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
    const data = await res.json();
    const recipes = data.recipes.map((r: any) => ({
      ...r,
      createdAt: new Date(r.createdAt),  // Перетворюємо строку в Date
    }));
    setResults(recipes);
  } catch (e) {
    console.error(e);
    setResults([]);
  }
  setLoading(false);
};

  useEffect(() => {
    if (queryFromUrl.trim()) {
      fetchResults(queryFromUrl);
    } else {
      setResults([]);
    }
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };


  return (
    <section className="py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Назва, інгредієнт або інструкція"
              className="input input-bordered w-full"
              autoFocus
            />
            <button type="submit" className="btn btn-primary">Пошук</button>
          </form>
        </div>

        {loading && <p>Завантаження...</p>}
        {!loading && !queryFromUrl && <p>Введіть текст для пошуку.</p>}
        {!loading && queryFromUrl && results.length === 0 && (
          <p>За запитом &quot;{queryFromUrl}&quot; нічого не знайдено.</p>
        )}

        <div className="text-center mb-8">
          <h1 className="text-xl font-bold">Результати пошуку</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              userId={userId}
              isInitiallyFavorite={favoriteIds.includes(recipe.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
