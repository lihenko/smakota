'use client';

import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

export default function StarRating({ rating, setRating }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div>
      <label className="block mb-1">Оцінка:</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = hovered !== null ? star <= hovered : star <= rating;
          return (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              className={`text-2xl ${isActive ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </button>
          );
        })}
      </div>
    </div>
  );
}
