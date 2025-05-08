'use client';

import { useEffect, useState } from 'react';

export function useAuthSync(): boolean {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(document.cookie.includes('Authorization='));
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
