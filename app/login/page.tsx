'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Перевіряємо наявність токену в cookies
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('Authorization='));

    if (token) {
      // Якщо токен є, перенаправляємо на головну сторінку або dashboard
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Помилка при вході');
      return;
    }

    // Якщо авторизація успішна, зберігаємо токен у cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 3);

    document.cookie = `Authorization=${data.token}; path=/; secure; SameSite=Strict; expires=${expires.toUTCString()}`;

    const channel = new BroadcastChannel('auth');
    channel.postMessage('auth-changed');
    channel.close();

    router.push('/dashboard'); // Перенаправлення на головну сторінку після успішного входу
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3 mx-auto mt-20">
      <h1 className="text-2xl font-bold text-center">Вхід</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2"
      />
      <button type="submit" className="btn btn-primary">Увійти</button>

      {error && <p className="text-red-500">{error}</p>}
      <div className='text-center'>
          Забули пароль? <Link href="/forgot-password/">Відновити</Link>
      </div>
    </form>
  );
}
