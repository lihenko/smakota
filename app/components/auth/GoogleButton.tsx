'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleButton() {
  const handleLogin = async (response: any) => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ credential: response.credential }),
      });

      if (!res.ok) {
        throw new Error('Google login failed');
      }

      window.location.assign('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      alert('Не вдалося залогінитися через Google');
    }
  };

  const initializeGoogleButton = () => {
    if (!window.google?.accounts) {
      console.error('Google accounts not available');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleLogin,
    });

    const buttonContainer = document.getElementById('google-btn');

    if (!buttonContainer) {
      console.error('Google button container not found');
      return;
    }

    buttonContainer.innerHTML = '';

    window.google.accounts.id.renderButton(buttonContainer, {
      theme: 'outline',
      size: 'large',
      width: 320,
    });
  };

  useEffect(() => {
    if (window.google?.accounts) {
      initializeGoogleButton();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );

    if (existingScript) {
      initializeGoogleButton();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleButton;
    script.onerror = () => {
      console.error('Failed to load Google Identity Services script');
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div id="google-btn" />
    </div>
  );
}
