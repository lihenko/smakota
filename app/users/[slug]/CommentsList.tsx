'use client';
import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';
import StarDisplay from '@/app/components/StarDisplay'; // Припустимо, у тебе є цей компонент

export default function CommentsList({ slug }: { slug: string }) {
  const [page, setPage] = useState(0);
  const LIMIT = 9;

  const { data: comments = [], isLoading, mutate } = useSWR(
    `/api/users/${slug}/comments?page=${page}`,
    (url) => fetch(url).then((res) => res.json())
  );

  if (!isLoading && comments.length === 0) {
    return null;
  }

  return (
    <section className='pb-16'>
      <h2 className="text-center mb-6 text-xl font-semibold">Відгуки</h2>
      <div className="mt-10">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {comments.map((comment: any) => (
            <li key={comment.id} className="border p-4 rounded">
              {/* Зірочки рейтингу */}
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

        {comments.length === LIMIT && (
          <button onClick={() => setPage(page + 1)} className="mt-4 btn">
            Завантажити ще
          </button>
        )}

        {isLoading && <p>Завантаження...</p>}
      </div>
    </section>
  );
}
