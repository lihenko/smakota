'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import IngredientMultiSelect from './IngredientMultiSelect';


interface FilterProps {
  dishTypes: { id: number; name: string }[];
  ingredients: { id: number; name: string }[];
  currentDishTypeId?: number;
  currentIngredientIds: number[];
}

const Filter = ({
  dishTypes,
  ingredients,
  currentDishTypeId = 0,
  currentIngredientIds,
}: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedDishTypeId, setSelectedDishTypeId] = useState(currentDishTypeId);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState(currentIngredientIds);
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams?.get('page') || 1));

  // Функція для оновлення URL
  const updateUrl = (dishTypeId: number, ingredientIds: number[], page: number) => {
    const queryParams = new URLSearchParams(searchParams?.toString());

    // Оновлення фільтру типу страви
    if (dishTypeId) {
      queryParams.set('dishTypeId', dishTypeId.toString());
    } else {
      queryParams.delete('dishTypeId');
    }

    // Оновлення фільтру інгредієнтів
    if (ingredientIds.length > 0) {
      queryParams.set('ingredientIds', ingredientIds.join(','));
    } else {
      queryParams.delete('ingredientIds');
    }

    // Оновлення сторінки, якщо вона більша за 1
    if (page > 1) {
      queryParams.set('page', page.toString());
    } else {
      queryParams.delete('page'); // Якщо на першій сторінці, не додаємо параметр page
    }

    // Оновлення URL
    router.push(`/dashboard/myrecipes?${queryParams.toString()}`);
  };

  // Скидання фільтрів при чистому /recipe
  useEffect(() => {
    const dishTypeParam = searchParams?.get('dishTypeId');
    const ingredientsParam = searchParams?.get('ingredientIds');
    const pageParam = searchParams?.get('page');

    // Якщо немає фільтрів, скидаємо значення
    if (pathname === '/dashboard/myrecipes' && !dishTypeParam && !ingredientsParam && !pageParam) {
      setSelectedDishTypeId(0);
      setSelectedIngredientIds([]);
      setCurrentPage(1); // Скидаємо на першу сторінку
    }
  }, [pathname, searchParams]);

  // Автооновлення URL
  useEffect(() => {
    updateUrl(selectedDishTypeId, selectedIngredientIds, currentPage);
  }, [selectedDishTypeId, selectedIngredientIds, currentPage]);

  // Обробка вибору типу страви
  const handleDishTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const dishTypeId = Number(event.target.value);
    setSelectedDishTypeId(dishTypeId);
    if (dishTypeId !== currentDishTypeId) {
      setCurrentPage(1); // Якщо змінено тип страви, скидаємо на першу сторінку
    }
  };

  // Обробка вибору інгредієнтів
  const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.value);
    const isChecked = event.target.checked;

    setSelectedIngredientIds((prev) =>
      isChecked ? [...prev, id] : prev.filter((item) => item !== id)
    );
    setCurrentPage(1); // Якщо змінено інгредієнт, скидаємо на першу сторінку
  };

  // Кнопка "Скинути фільтри"
  const resetFilters = () => {
    setSelectedDishTypeId(0);
    setSelectedIngredientIds([]);
    setCurrentPage(1); // Повертаємо на першу сторінку
    router.push('/dashboard/myrecipes'); // Перехід на /recipe без параметрів
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className='flex flex-col justify-between'>
          <label htmlFor="dishType" className="block font-bold mb-1">
            Тип страви
          </label>
          <select
            id="dishType"
            value={selectedDishTypeId}
            onChange={handleDishTypeChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option value={0}>Всі типи</option>
            {dishTypes.map((dishType) => (
              <option key={dishType.id} value={dishType.id}>
                {dishType.name}
              </option>
            ))}
          </select>
        </div>

        
        <div className="flex">
            <IngredientMultiSelect
            ingredients={ingredients}
            selected={selectedIngredientIds}
            onChange={(ids) => {
                setSelectedIngredientIds(ids);
                setCurrentPage(1);
            }}
            />
        </div>
        <div className='flex ml-auto items-end'>
            <button onClick={resetFilters} className="btn btn-outline btn-error">
                Скинути фільтри
            </button>
        </div>
      </div>

    </div>
  );
};

export default Filter;
