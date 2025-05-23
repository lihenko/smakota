'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../generated/prisma';
import { logout } from '@/utils/logout';

interface DashboardProps {
  currentUser: (User & { avatar?: { avatarUrl: string } }) | null;
}

export default function Dashboard({ currentUser }: DashboardProps) {
  const router = useRouter();

  // Redirect and logout if user is not authenticated
  useEffect(() => {
    if (!currentUser) {
      logout(); // clear cookie or token
      router.push('/');
    }
  }, [currentUser, router]);

  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar?.avatarUrl || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const DEFAULT_AVATAR = '/avatars/default-avatar.webp';
  const displayedAvatarUrl = avatarUrl || DEFAULT_AVATAR;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validFormats = ['image/jpeg', 'image/png'];
    if (!validFormats.includes(file.type)) return alert('Дозволено лише JPG або PNG');

    if (file.size > 5 * 1024 * 1024) return alert('Розмір файлу не повинен перевищувати 5MB');

    const img = new Image();
    img.onload = () => {
      if (img.width < 200 || img.height < 200) {
        alert('Зображення має бути мінімум 200x200');
      } else {
        uploadAvatar(file);
      }
    };
    img.src = URL.createObjectURL(file);
  };

  const uploadAvatar = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch('/api/upload-avatar', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) setAvatarUrl(data.avatarUrl);
      else alert('Не вдалося завантажити аватар');
    } catch {
      alert('Сталася помилка');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAvatar = async () => {
    if (!confirm('Видалити аватар?')) return;

    if (!currentUser?.id) {
      alert('Користувач не авторизований');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/delete-avatar', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl: displayedAvatarUrl, userId: currentUser?.id,}),
      });
      if (res.ok) setAvatarUrl(DEFAULT_AVATAR);
      else alert('Не вдалося видалити аватар');
    } catch {
      alert('Сталася помилка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameSubmit = async () => {
    if (!newName.trim()) return alert('Імʼя не може бути порожнім');

    try {
      const res = await fetch('/api/update-name', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setNewName(data.user?.name || newName);
      setIsEditingName(false);
      router.refresh();
    } catch {
      alert('Не вдалося оновити імʼя');
    }
  };

  const handlePasswordSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) return alert('Заповніть усі поля');
    if (newPassword !== confirmNewPassword) return alert('Паролі не співпадають');

    try {
      const res = await fetch('/api/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) return alert(data.error || 'Не вдалося змінити пароль');

      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setIsChangingPassword(false);
      alert('Пароль змінено');
    } catch {
      alert('Сталася помилка');
    }
  };

  return (
    <div className="py-16 container">
      <div className="mb-6">
        <div>
          <p onClick={() => setIsEditingName(true)} className="cursor-pointer">Імʼя: {newName}</p>
          <p>Email: {currentUser?.email}</p>
          <button className="btn btn-neutral mt-2" onClick={() => setIsEditingName(true)}>Змінити імʼя</button>
          <button className="btn btn-neutral mt-2" onClick={() => setIsChangingPassword(true)}>Змінити пароль</button>
        </div>
      </div>

      {/* Аватар */}
      <div onClick={() => !isLoading && fileInputRef.current?.click()} className="cursor-pointer inline-block opacity-100">
        <h3>Ваш аватар:</h3>
        <img src={displayedAvatarUrl} alt="Avatar" className="w-[100px] h-[100px] rounded-full object-cover" />
        <p className="text-sm text-center">Змінити аватар</p>
      </div>

      {displayedAvatarUrl !== DEFAULT_AVATAR && (
        <button
          className="btn btn-error mt-2"
          onClick={deleteAvatar}
          disabled={isLoading}
        >
          {isLoading ? '...' : 'Видалити аватар'}
        </button>
      )}

      <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden />

      {/* Модалки */}
      {isEditingName && (
        <dialog className="modal modal-open" onClick={() => setIsEditingName(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg">Змінити імʼя</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="input input-bordered w-full my-4"
              placeholder="Нове імʼя"
            />
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleNameSubmit}>Зберегти</button>
              <button className="btn" onClick={() => setIsEditingName(false)}>Скасувати</button>
            </div>
          </div>
        </dialog>
      )}

      {isChangingPassword && (
        <dialog className="modal modal-open" onClick={() => setIsChangingPassword(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg">Змінити пароль</h3>
            <input
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Поточний пароль"
              className="input input-bordered w-full my-2"
            />
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Новий пароль"
              className="input input-bordered w-full my-2"
            />
            <input
              type="password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Підтвердіть новий пароль"
              className="input input-bordered w-full my-2"
            />
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handlePasswordSubmit}>Зберегти</button>
              <button className="btn" onClick={() => setIsChangingPassword(false)}>Скасувати</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
