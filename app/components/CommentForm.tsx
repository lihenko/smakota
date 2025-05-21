'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StarRating from './StarRating'; // імпорт нового компонента

interface CommentFormProps {
  recipeId: number;
  parentId?: number;
}

export default function CommentForm({ recipeId, parentId }: CommentFormProps) {
  const router = useRouter();
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Додаємо стейт для успіху

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null); // Очищаємо повідомлення про успіх перед новим відправленням

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId, text, rating, parentId }),
      });

      if (!res.ok) {
        throw new Error('Помилка при надсиланні коментаря');
      }

      setText('');
      setRating(5);
      setSuccess('Ваш коментар успішно надісланий на модерацію!'); // Встановлюємо повідомлення про успіх
      router.refresh(); // Оновлюємо сторінку після відправлення
    } catch (err: any) {
      setError(err.message || 'Щось пішло не так');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="w-full border rounded p-2"
        placeholder={parentId ? 'Ваша відповідь...' : 'Ваш коментар...'}
      />
      {!parentId && <StarRating rating={rating} setRating={setRating} />}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>} {/* Виводимо повідомлення про успіх */}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Надсилається...' : parentId ? 'Відповісти' : 'Залишити коментар'}
      </button>
    </form>
  );
}
