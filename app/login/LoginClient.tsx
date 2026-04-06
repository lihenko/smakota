'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { addPendingFavoriteAfterLogin } from "@/utils/favoriteFromLocalStorage";
import GoogleButton from "@/app/components/auth/GoogleButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    setLoading(false);
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Помилка при вході');
      return;
    }

    await addPendingFavoriteAfterLogin();

    const channel = new BroadcastChannel('auth');
    channel.postMessage('auth-changed');
    channel.close();

    router.push('/dashboard');
  };

  return (
    <div className="container">
      {/* Правильне підключення Google SDK */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:w-1/3 mx-auto mt-20 mb-3">
        <h1 className="text-2xl font-bold text-center">Вхід</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded"
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Зачекайте...' : 'Увійти'}
        </button>

      </form>
      <div className='md:w-1/3 mx-auto mb-20'>
        <GoogleButton />

        {error && <p className="text-red-500">{error}</p>}

        <div className="text-center mt-8">
          Забули пароль? <Link href="/forgot-password/" className='underline'>Відновити</Link>
        </div>

        <div className="text-center">
          Немає акаунту? <Link href="/register/" className='underline'>Зареєструватися</Link>
        </div>
      </div>
    </div>
  );
}