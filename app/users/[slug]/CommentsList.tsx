'use client';
import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';
import StarDisplay from '@/app/components/StarDisplay';

export default function CommentsList({ slug }: { slug: string }) {
  const [page, setPage] = useState(0);
  const LIMIT = 9;

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data, isLoading } = useSWR(
    `/api/users/${slug}/comments?page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  const comments = data?.comments ?? [];
  const totalCount = data?.totalCount ?? 0;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Відгуки користувача",
    "itemListElement": comments.map((comment: any, index: number) => ({
      "@type": "Review",
      "reviewBody": comment.text,
      ...(typeof comment.rating === 'number' && {
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": comment.rating.toString(),
          "bestRating": "5",
          "worstRating": "1"
        }
      }),
      "itemReviewed": {
        "@type": "Recipe",
        "name": comment.recipe.title,
        "url": `/recipe/${comment.recipe.slug}`
      },
      "author": {
        "@type": "Person",
        "name": slug
      },
      "position": index + 1
    }))
  };

  if (!isLoading && comments.length === 0) {
    return null;
  }

  return (
    <section className='pb-16'>
      <h2 className="text-center mb-6 text-xl font-semibold">Відгуки</h2>
      <div className="mt-10">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {comments.map((comment: any) => (
            <li key={comment.id} className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative p-4">
              {typeof comment.rating === 'number' && (
                <StarDisplay rating={comment.rating} />
              )}
              <p className="text-gray-700 mb-2">{comment.text}</p>
              <div className='text-[12px]'>
                До рецепта:{' '}
                <Link href={`/recipe/${comment.recipe.slug}`} className="text-black hover:underline">
                  {comment.recipe.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {/* JSON-LD schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {!isLoading && comments.length < totalCount && (
          <div className="text-center">
            <button onClick={() => setPage(page + 1)} className="mt-4 btn">
              Завантажити ще
            </button>
          </div>
        )}

        {isLoading && <p>Завантаження...</p>}
      </div>
    </section>
  );
}
