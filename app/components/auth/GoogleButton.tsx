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
      // Відправляємо credential на сервер
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      if (!res.ok) {
        throw new Error("Google login failed");
      }

      // 🔥 Повний редірект
      window.location.href = "/dashboard";

    } catch (err) {
      console.error("Google login error:", err);
      alert("Не вдалося залогінитися через Google");
    }
  };

  useEffect(() => {
    // Підвантажуємо скрипт Google Identity Services
    if (window.google?.accounts) {
      initializeGoogleButton();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = initializeGoogleButton;
    script.onerror = () => console.error("Failed to load Google Identity Services script");

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeGoogleButton = () => {
    if (!window.google?.accounts) {
      console.error("Google accounts not available");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleLogin,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large" }
    );
  };

  return <div id="google-btn" />;
}