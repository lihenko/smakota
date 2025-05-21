'use client';

import { useState, useEffect, useRef } from 'react';

interface Ingredient {
  id: number;
  name: string;
}

interface Props {
  ingredients: Ingredient[];
  selected: number[];
  onChange: (selectedIds: number[]) => void;
}

export default function IngredientMultiSelect({ ingredients, selected, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Ingredient[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const lower = query.toLowerCase();
    setFiltered(
      ingredients
        .filter(
          (ingredient) =>
            ingredient.name.toLowerCase().includes(lower) &&
            !selected.includes(ingredient.id)
        )
        .slice(0, 10) // обмежити до 10 результатів
    );
  }, [query, ingredients, selected]);

  const addIngredient = (id: number) => {
    onChange([...selected, id]);
    setQuery('');
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  const removeIngredient = (id: number) => {
    onChange(selected.filter((i) => i !== id));
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleBlur = () => {
    // Затримка для вибору перед втратами фокусу
    setTimeout(() => setIsDropdownOpen(false), 150);
  };

  return (
    <div>
      <label className="block font-bold mb-1">Інгредієнти</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((id) => {
          const ing = ingredients.find((i) => i.id === id);
          if (!ing) return null;
          return (
            <div key={id} className="badge badge-primary gap-1">
              {ing.name}
              <button onClick={() => removeIngredient(id)} className="ml-1 text-white">×</button>
            </div>
          );
        })}
      </div>

      <div className="relative w-full max-w-md">
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleBlur}
          placeholder="Почніть вводити інгредієнт..."
          className="input input-bordered w-full"
        />
        {isDropdownOpen && filtered.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 shadow-md mt-1 max-h-60 overflow-y-auto rounded-box">
            {filtered.map((ing) => (
              <li
                key={ing.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => addIngredient(ing.id)}
              >
                {ing.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
