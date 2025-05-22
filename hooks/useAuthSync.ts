'use client';

import { useEffect, useState } from 'react';

export function useAuthSync(): boolean | null {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();

    const channel = new BroadcastChannel('auth');
    channel.addEventListener('message', checkAuth);

    return () => {
      channel.removeEventListener('message', checkAuth);
      channel.close();
    };
  }, []);

  return isLoggedIn;
}
