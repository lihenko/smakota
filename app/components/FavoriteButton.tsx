'use client';

import { useState } from "react";

interface FavoriteButtonProps {
  recipeId: number;
}

export default function FavoriteButton({ recipeId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite((prev) => !prev);
    // TODO: Додайте тут реальний запит до API для додавання/видалення з обраного
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-2 right-2 z-10 bg-white/80 cursor-pointer rounded-full p-2 transition ${isFavorite ? "bg-red-100" : "hover:bg-red-100"}`}
      aria-label={isFavorite ? "Видалити з обраного" : "Додати в обране"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isFavorite ? "#7c2808" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#7c2808"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.507 0-2.823.74-3.6 1.872A4.494 4.494 0 0 0 3 8.25c0 7.22 9 11.25 9 11.25s9-4.03 9-11.25z"
        />
      </svg>
    </button>
  );
}