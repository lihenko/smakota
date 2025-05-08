'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


export default function SignupPage() {
  const router = useRouter();
  
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  // Використовуємо onInput для обробки введення даних (в тому числі автозаповнення)
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  // Перевірка на заповненість полів після рендеру
  useEffect(() => {
    // Примусово оновлюємо стейт при автозаповненні
    const formFields = ['name', 'email', 'password'];
    formFields.forEach(field => {
      // Приводимо елемент до типу HTMLInputElement
      const inputElement = document.querySelector(`[name=${field}]`) as HTMLInputElement;

      if (inputElement && inputElement.value && form[field as keyof typeof form] !== inputElement.value) {
        setForm(prevForm => ({
          ...prevForm,
          [field]: inputElement.value,
        }));
      }
    });
  }, []); // Виконати лише після початкового рендеру

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      alert('Помилка при реєстрації');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3 mx-auto mt-20">
      <input 
        name="name" 
        type="text" 
        placeholder="Ім'я" 
        value={form.name} 
        onInput={handleInput} 
        required 
      />
      <input 
        name="email" 
        type="email" 
        placeholder="Email" 
        value={form.email} 
        onInput={handleInput} 
        required 
      />
      <input 
        name="password" 
        type="password" 
        placeholder="Пароль" 
        value={form.password} 
        onInput={handleInput} 
        required 
      />
      <button type="submit" className="btn btn-primary">Зареєструватися</button>
    </form>
  );
}
