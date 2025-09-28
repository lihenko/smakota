"use client";
import { useState } from "react";

interface ProductOptionsProps {
  volumes: number[];
  prices: number[];
}

export default function ProductOptions({ volumes, prices }: ProductOptionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
  <p className="mb-2 font-medium">Обери свій об&apos;єм:</p>

  <ul className="flex gap-2">
    {volumes.map((volume, index) => (
      <li
        key={volume}
        onClick={() => setSelectedIndex(index)}
      >
        <button
          className={`btn btn-sm ${
            index === selectedIndex ? "btn-primary" : "btn-outline"
          }`}
        >
          {volume} л
        </button>
      </li>
    ))}
  </ul>

  <p className="mt-4">
    Ціна:{" "}
    <span className="font-bold text-lg">
      {prices[selectedIndex]} грн
    </span>
  </p>
</div>

  );
}
