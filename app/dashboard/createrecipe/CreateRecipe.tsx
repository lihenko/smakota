'use client';

import { useState, useEffect } from 'react';
import { useIngredientSuggestions } from '@/hooks/useIngredientSuggestions';
import { useUnitSuggestions } from '@/hooks/useUnitSuggestions';

type IngredientInput = {
  name: string;
  amount: string;
  unit: string;
  toTaste?: boolean;
};

export default function CreateRecipePage() {
  const [title, setTitle] = useState('');
  const [dishType, setDishType] = useState('');
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    { name: '', amount: '', unit: '', toTaste: false },
  ]);
  const [instructions, setInstructions] = useState(['']);
  const [dishTypes, setDishTypes] = useState<string[]>([]);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState<number | null>(null);
  const [activeUnitIndex, setActiveUnitIndex] = useState<number | null>(null);
  const [queryList, setQueryList] = useState<string[]>(['']);
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const activeQuery = activeIngredientIndex !== null ? queryList[activeIngredientIndex] : '';
  const { suggestions: ingredientSuggestions, isLoading: ingredientLoading } = useIngredientSuggestions(activeQuery);
  const activeUnit = activeUnitIndex !== null ? ingredients[activeUnitIndex] : ingredients[0];
  const { suggestions: unitSuggestions, isLoading: unitLoading } = useUnitSuggestions(
    activeUnit?.unit || ''
  );

  const [privateRecipe, setPrivateRecipe] = useState<boolean | false>(false);



  const getTiktokEmbedUrl = (url: string): string => {
    try {
      const cleanUrl = url.split('?')[0];
      const match = cleanUrl.match(/tiktok\.com\/(@[\w.-]+)\/video\/(\d+)/);
      if (!match) return '';
      const videoId = match[2];
      return `https://www.tiktok.com/embed/${videoId}`;
    } catch {
      return '';
    }
  };

  const [videoUrl, setVideoUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [embedYoutube, setEmbedYoutube] = useState('');
  const [embedTiktok, setEmbedTiktok] = useState('');
  const [youtubeError, setYoutubeError] = useState('');
  const [tiktokError, setTiktokError] = useState('');
  

 
  useEffect(() => {
    if (!videoUrl) {
      setEmbedYoutube('');
      setYoutubeError('');
      return;
    }
    const regex = /(?:youtube\.com\/(?:.*v=|v\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoUrl.match(regex);
    if (match) {
      setEmbedYoutube(`https://www.youtube.com/embed/${match[1]}`);
      setYoutubeError('');
    } else {
      setEmbedYoutube('');
      setYoutubeError('❌ Невірне посилання на YouTube');
    }
  }, [videoUrl]);

  // Функція для формування embed URL для TikTok
  useEffect(() => {
    if (!tiktokUrl) {
      setEmbedTiktok('');
      setTiktokError('');
      return;
    }
    const regex = /tiktok\.com\/(@[\w.-]+)\/video\/(\d+)/;
    const match = tiktokUrl.match(regex);
    if (match) {
      setEmbedTiktok(`https://www.tiktok.com/embed/${match[2]}`);
      setTiktokError('');
    } else {
      setEmbedTiktok('');
      setTiktokError('❌ Невірне посилання на TikTok');
    }
  }, [tiktokUrl]);
  

  useEffect(() => {

    const fetchDishTypes = async () => {
      try {
        const res = await fetch('/api/dishtypes');
        const data = await res.json();
        setDishTypes(data.dishTypes || []);
      } catch {
        setMessage('❌ Не вдалося завантажити типи страв');
      }
    };

    fetchDishTypes();
  }, []);

  const handleIngredientChange = (
    idx: number,
    field: keyof IngredientInput,
    value: string | boolean
  ) => {
    const updated = [...ingredients];
    if (field === 'toTaste') {
      updated[idx].toTaste = value as boolean;
    } else {
      updated[idx][field] = value as string;
    }
    setIngredients(updated);
  };

  const handleUnitChange = (idx: number, value: string) => {
    const updated = [...ingredients];
    updated[idx].unit = value;
    setIngredients(updated);
  };

  const handleImageValidation = (file: File) => {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setMessage('❌ Лише JPG або PNG');
      setImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 600 || img.height < 400) {
          setMessage('❌ Мінімальні розміри — 600x400');
          setImage(null);
        } else {
          setImage(file);
          setMessage('');
        }
      };
      if (typeof event.target?.result === 'string') {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privateRecipe && !image) {
      setMessage('❌ Для публічного рецепту обов’язково додати зображення');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('dishType', dishType);
    formData.append('videoUrl', embedYoutube);
    formData.append('tiktokUrl', embedTiktok);
    formData.append('privateRecipe', privateRecipe ? "true" : "false");
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('instructions', JSON.stringify(instructions));
    if (image) formData.append('image', image);

    const res = await fetch('/api/createrecipe', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setMessage('✅ Рецепт успішно створено!');
      setTitle('');
      setDishType('');
      setVideoUrl('');
      setTiktokUrl('');
      setIngredients([{ name: '', amount: '', unit: '' }]);
      setInstructions(['']);
      setImage(null);
      setQueryList(['']);
    } else {
      const data = await res.json();
      setMessage(`❌ Помилка: ${data.error || 'невідомо'}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Додати рецепт</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title, Dish Type, Ingredients, Instructions, Image, Videos - all UI */}
        <input
          type="text"
          placeholder="Назва рецепту"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <select
          value={dishType}
          onChange={(e) => setDishType(e.target.value)}
          className="select select-bordered w-full"
          required
        >
          <option value="" disabled>Тип страви</option>
          {dishTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div>
          <h2 className="font-semibold mb-2">Інгредієнти</h2>
          {ingredients.map((ingredient, idx) => (
            <div key={idx} className="flex gap-2 mb-2 relative items-center">
              <div className='relative'>
                <input
                  type="text"
                  placeholder="Назва"
                  value={ingredient.name}
                  onChange={(e) => {
                    handleIngredientChange(idx, 'name', e.target.value);
                    const updatedQueries = [...queryList];
                    updatedQueries[idx] = e.target.value;
                    setQueryList(updatedQueries);
                  }}
                  onFocus={() => setActiveIngredientIndex(idx)}
                  onBlur={() => setTimeout(() => setActiveIngredientIndex(null), 100)}
                  className="input input-bordered w-full"
                  required
                />
                {activeIngredientIndex === idx && ingredientSuggestions.length > 0 && (
                    <ul className="absolute top-full bg-white border rounded-md shadow-lg w-fit max-h-40 overflow-auto z-10">
                      {ingredientSuggestions.map((ingredient) => (
                        <li
                          key={ingredient.id}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onMouseDown={() => handleIngredientChange(activeIngredientIndex!, 'name', ingredient.name)}
                        >
                          {ingredient.name}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
              <div>
                <input
                  type="number"
                  step="any"
                  placeholder="К-сть"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(idx, 'amount', e.target.value)}
                  className="input input-bordered w-24"
                  disabled={ingredient.toTaste}
                />
              </div>
              <div className='relative'>
                <input
                  type="text"
                  placeholder="Одиниця"
                  value={ingredient.unit}
                  onFocus={() => setActiveUnitIndex(idx)}
                  onBlur={() => setTimeout(() => setActiveUnitIndex(null), 100)}
                  onChange={(e) => handleUnitChange(idx, e.target.value)}
                  className="input input-bordered w-24"
                  disabled={ingredient.toTaste}
                />
                {/* Підказки для одиниць виміру */}
                  {activeUnitIndex === idx && unitSuggestions.length > 0 && (
                    <ul className="absolute top-full bg-white border rounded-md shadow-lg w-fit max-h-40 overflow-auto z-10">
                      {unitSuggestions.map((unit) => (
                        <li
                          key={unit.id}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onMouseDown={() => handleUnitChange(idx, unit.name)}
                        >
                          {unit.name}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
              <div>
                <label className="ml-2">
                  <input
                    className='toggle mr-3'
                    type="checkbox"
                    checked={ingredient.toTaste || false}
                    onChange={(e) => handleIngredientChange(idx, 'toTaste', e.target.checked)}
                  />
                  За смаком
                </label>
              </div>
              {idx !== 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = ingredients.filter((_, i) => i !== idx);
                    setIngredients(updated);
                    const updatedQueries = queryList.filter((_, i) => i !== idx);
                    setQueryList(updatedQueries);
                  }}
                  className="btn btn-xs btn-error ml-2"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
              setQueryList([...queryList, '']);
            }}
            className="btn btn-outline btn-sm"
          >
            Додати інгредієнт
          </button>
        </div>

        {/* Кроки приготування */}
        <div>
          <h2 className="font-semibold mb-2">Кроки приготування</h2>
          {instructions.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 mb-2">
              <textarea
                placeholder={`Крок ${idx + 1}`}
                value={step}
                onChange={(e) => {
                  const updated = [...instructions];
                  updated[idx] = e.target.value;
                  setInstructions(updated);
                }}
                className="textarea textarea-bordered w-full"
                required
              />
              {idx !== 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = instructions.filter((_, i) => i !== idx);
                    setInstructions(updated);
                  }}
                  className="btn btn-xs btn-error"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setInstructions([...instructions, ''])}
            className="btn btn-outline btn-sm"
          >
            Додати крок
          </button>
        </div>

        {/* Фото рецепту */}
        <div>
          <h2 className="font-semibold mb-2">Фото рецепту</h2>
          <input
            type="file"
            accept="image/webp,image/png,image/jpeg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageValidation(file);
            }}
            className="file-input file-input-bordered w-full"
          />
        </div>

        

        {/* Відео */}
        <input
          type="url"
          placeholder="YouTube відео (необов’язково)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="input input-bordered w-full"
        />

        {youtubeError && (
          <p className="text-red-600">{youtubeError}</p>
        )}

        {embedYoutube && (
          <div className="aspect-video w-full my-4">
            <iframe
              className="w-full h-full rounded-lg"
              src={embedYoutube}
              allowFullScreen
            ></iframe>
          </div>
        )}

        <input
          type="url"
          placeholder="TikTok відео (необов’язково)"
          value={tiktokUrl}
          onChange={(e) => setTiktokUrl(e.target.value)}
          className="input input-bordered w-full"
        />
        {tiktokError && <p className="text-red-600">{tiktokError}</p>}
        {tiktokUrl && getTiktokEmbedUrl(tiktokUrl) && (
        <iframe
          src={getTiktokEmbedUrl(tiktokUrl)}
          width="325"
          height="575"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="border rounded-xl mt-2"
        />
        )}
        <div className='mb-6'>
          <label>
            <input 
            type="checkbox" 
            className='toggle mr-3'
            onChange={(e) => setPrivateRecipe(e.target.checked)} />
            Приватний рецепт
          </label>
        </div>
        
        
        <button type="submit" className="btn btn-primary w-full">
          Зберегти рецепт
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
