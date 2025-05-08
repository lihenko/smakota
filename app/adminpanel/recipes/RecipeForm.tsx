'use client';

import { useState } from 'react';

interface RecipeFormProps {
  recipe: {
    id: number;
    title: string;
    slug: string;
    videoUrl: string | null;
    tiktokUrl: string | null;
    imageUrl: string | null;
    ingredients: {
      id: number;
      amount: number | null;
      unit: { name: string } | null;
      ingredient: { name: string; id: number };
      toTaste: boolean;
    }[];
    instructions: { id: number; step: string; stepNumber: number }[];
  };
  onSubmit: (formData: FormData) => void;
  onDelete: (id: number) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, onSubmit, onDelete }) => {
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);

  const handleIngredientChange = (index: number, field: string, value: string | number | boolean) => {
    const updatedIngredients = [...ingredients];
    if (field === 'amount') {
      updatedIngredients[index].amount = value as number;
    } else if (field === 'unit') {
      updatedIngredients[index].unit = { name: value as string };
    } else if (field === 'ingredient') {
      updatedIngredients[index].ingredient.name = value as string;
    } else if (field === 'toTaste') {
      updatedIngredients[index].toTaste = value as boolean;
    }
    setIngredients(updatedIngredients);
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index].step = value;
    setInstructions(updatedInstructions);
  };

  return (
    <div className="mb-16">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          onSubmit(formData);
        }}
        className="flex flex-wrap items-center gap-2"
      >
        <input type="hidden" name="id" value={recipe.id} />
        <div className="w-full">
          <input
            type="text"
            name="title"
            defaultValue={recipe.title}
            className="border px-2 py-1 rounded flex-1"
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            name="slug"
            defaultValue={recipe.slug}
            className="border px-2 py-1 rounded flex-1"
          />
        </div>
        <div className="w-full">
          {recipe.imageUrl && (
            <img src={recipe.imageUrl} alt="Зображення рецепта" className="max-w-xs mb-2 rounded shadow" />
          )}
          <input
            type="text"
            name="imageUrl"
            defaultValue={recipe.imageUrl ?? ''}
            className="border px-2 py-1 rounded flex-1"
          />
        </div>

        <div className="w-full">
          <h3>Інгредієнти</h3>
          {ingredients.map((ingredient, index) => (
            <div key={ingredient.id} className="flex gap-2 mb-2">
              <input
                type="text"
                name={`ingredient-${ingredient.id}`}
                value={ingredient.ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                className="border px-2 py-1 rounded flex-1"
                placeholder="Назва інгредієнта"
              />
              {ingredient.toTaste ? (
                <span className="text-gray-500">За смаком</span>
              ) : (
                <>
                  <input
                    type="number"
                    name={`amount-${ingredient.id}`}
                    value={ingredient.amount || ''}
                    onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                    className="border px-2 py-1 rounded w-20"
                    placeholder="Кількість"
                  />
                  <input
                    type="text"
                    name={`unit-${ingredient.id}`}
                    value={ingredient.unit?.name || ''}
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                    className="border px-2 py-1 rounded w-20"
                    placeholder="Одиниця"
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="w-full mt-4">
          <h3>Кроки приготування</h3>
          {instructions.map((instruction, index) => (
            <div key={instruction.id} className="flex gap-2 mb-2">
              <input
                type="text"
                name={`instruction-${instruction.id}`}
                value={instruction.step}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="border px-2 py-1 rounded flex-1"
                placeholder="Крок приготування"
              />
            </div>
          ))}
        </div>

        <div className="w-full">
          {recipe.videoUrl && (
            <div className="mb-2 w-full max-w-xs aspect-video">
              <iframe
                className="w-full h-full rounded shadow"
                src={recipe.videoUrl ?? ''}
                title="YouTube відео"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <input
            type="text"
            name="videoUrl"
            defaultValue={recipe.videoUrl ?? ''}
            className="border px-2 py-1 rounded flex-1"
            placeholder="Посилання на YouTube"
          />
        </div>

        <div className="w-full">
          {recipe.tiktokUrl && (
            <div className="mb-2">
              <iframe
                src={recipe.tiktokUrl ?? ''}
                className="w-full max-w-xs aspect-[9/16] rounded shadow"
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          )}
          <input
            type="text"
            name="tiktokUrl"
            defaultValue={recipe.tiktokUrl ?? ''}
            className="border px-2 py-1 rounded flex-1"
            placeholder="TikTok відео"
          />
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Затвердити
          </button>
          <button
            type="button"
            onClick={() => onDelete(recipe.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Видалити
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
