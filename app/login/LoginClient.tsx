'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addPendingFavoriteAfterLogin } from "@/utils/favoriteFromLocalStorage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Краще просто спробувати GET-запит на щось захищене або залишити middleware для редіректу
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // ВАЖЛИВО: щоби кука з сервера приймалась
    });

    setLoading(false);
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Помилка при вході');
      return;
    }

    // Додаємо рецепт до обраного, якщо він був у localStorage
    await addPendingFavoriteAfterLogin();

    // Повідомити інші вкладки, якщо потрібно
    const channel = new BroadcastChannel('auth');
    channel.postMessage('auth-changed');
    channel.close();

    router.push('/dashboard');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:w-1/3 mx-auto mt-20 mb-20">
        <h1 className="text-2xl font-bold text-center">Вхід</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='border border-gray-300 p-2 rounded'
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='border border-gray-300 p-2 rounded'
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Зачекайте...' : 'Увійти'}
        </button>

        {error && <p className="text-red-500">{error}</p>}

        <div className="text-center">
          Забули пароль? <Link href="/forgot-password/">Відновити</Link>
        </div>
      </form>
    </div>
    
  );
}
