'use client';

import { useState } from 'react';

type AIRecipe = {
  title: string;
  ingredients: string[];
  steps: string[];
};

export default function AIRecipeGenerator() {
  const [input, setInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<AIRecipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 🔥 нормальні повідомлення
  const getUserFriendlyError = (error: string) => {
    if (error.includes('SERVICE_UNAVAILABLE')) {
      return '⚠️ Сервіс тимчасово недоступний. Спробуйте пізніше.';
    }

    return '❌ Не вдалося згенерувати рецепт. Спробуйте ще раз.';
  };

  // ➕ додати інгредієнт
  const addIngredient = (value: string) => {
    const cleaned = value.trim().toLowerCase();

    if (!cleaned) return;

    if (!ingredients.includes(cleaned)) {
      setIngredients((prev) => [...prev, cleaned]);
    }

    setInput('');
  };

  // ❌ видалити
  const removeIngredient = (item: string) => {
    setIngredients((prev) => prev.filter((i) => i !== item));
  };

  // ⌨️ Enter = додати
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient(input);
    }
  };

  // 🤖 генерація 3 рецептів
  const handleGenerate = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setRecipes([]);
    setError(null);

    try {
      const res = await fetch('/api/ai-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'AI error');
      }

      setRecipes(
        Array.isArray(data.recipes) ? data.recipes : []
      );

    } catch (err: any) {
      setError(getUserFriendlyError(err.message));
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">
        🤖 Не знаєш що приготувати?
      </h2>
      <p className="text-gray-600 mb-4">
        Додай інгредієнти — отримай 3 ідеї рецептів
      </p>

      {/* ERROR */}
      {error && (
        <div className="mb-3 text-red-500 font-semibold">
          {error}
        </div>
      )}

      {/* ІНГРЕДІЄНТИ */}
      <div className="border rounded-lg p-3 flex flex-wrap gap-2 mb-3">
        {ingredients.map((item, idx) => (
          <span
            key={idx}
            className="bg-primary text-white px-3 py-1 rounded-full flex items-center gap-2"
          >
            {item}
            <button
              onClick={() => removeIngredient(item)}
              className="ml-1 font-bold"
            >
              ✕
            </button>
          </span>
        ))}

        <div className="flex w-full gap-2 mt-2">
          <input
            className="flex-1 input input-bordered"
            placeholder="Наприклад: курка, рис, морква"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            className="btn btn-primary"
            onClick={() => addIngredient(input)}
          >
            Додати
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          Натисни "Додати" або Enter
        </p>
      </div>

      {/* КНОПКА */}
      <button
        className="btn btn-primary w-full"
        onClick={handleGenerate}
        disabled={loading || ingredients.length === 0}
      >
        {loading ? 'Генерую...' : 'Згенерувати три рецепти'}
      </button>

      {/* РЕЗУЛЬТАТ */}
      {recipes.length > 0 && (
        <div className="mt-6 grid gap-6">
          {recipes.map((recipe, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 shadow-sm"
            >
              <h3 className="text-lg font-bold">
                {recipe.title || 'Без назви'}
              </h3>

              {recipe.ingredients?.length > 0 && (
                <>
                  <p className="font-semibold mt-3">Інгредієнти:</p>
                  <ul className="list-disc ml-5">
                    {recipe.ingredients.map((i, iIdx) => (
                      <li key={iIdx}>{i}</li>
                    ))}
                  </ul>
                </>
              )}

              {recipe.steps?.length > 0 && (
                <>
                  <p className="font-semibold mt-3">Кроки приготування:</p>
                  <ol className="list-decimal ml-5">
                    {recipe.steps.map((s, sIdx) => (
                      <li key={sIdx}>{s}</li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}