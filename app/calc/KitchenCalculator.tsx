"use client";
import { useState } from "react";


const conversions = {
  "Борошно": { cup: 130, tablespoon: 25, teaspoon: 8 },
  "Цукор": { cup: 200, tablespoon: 20, teaspoon: 7 },
  "Сіль": { cup: 273, tablespoon: 17, teaspoon: 5 },
  "Масло вершкове": { cup: 227, tablespoon: 14, teaspoon: 5 },
  "Молоко": { cup: 240, tablespoon: 15, teaspoon: 5 },
  "Вода": { cup: 240, tablespoon: 15, teaspoon: 5 },
  "Мед": { cup: 340, tablespoon: 21, teaspoon: 7 },
  "Какао-порошок": { cup: 125, tablespoon: 8, teaspoon: 3 },
  "Рис": { cup: 185, tablespoon: 12, teaspoon: 4 },
  "Гречка": { cup: 170, tablespoon: 11, teaspoon: 4 },
  "Олія": { cup: 218, tablespoon: 14, teaspoon: 4 },
  "Сметана": { cup: 240, tablespoon: 15, teaspoon: 5 },
  "Йогурт": { cup: 245, tablespoon: 15, teaspoon: 5 },
};

type Ingredient = keyof typeof conversions;

function formatValue(value: number, type: "cup" | "tablespoon" | "teaspoon") {
  if (type === "cup") {
    // Округляємо до найближчого 0.5
    return (Math.round(value * 2) / 2).toString();
  }
  // Для ложок
  return value < 0.5 ? "<1" : Math.round(value).toString();
}

export default function KitchenCalculator() {
  const [ingredient, setIngredient] = useState<Ingredient>("Борошно");
  const [grams, setGrams] = useState<number | "">("");

  const result =
    grams !== ""
      ? {
          cup: formatValue(grams / conversions[ingredient].cup, "cup"),
          tablespoon: formatValue(grams / conversions[ingredient].tablespoon, "tablespoon"),
          teaspoon: formatValue(grams / conversions[ingredient].teaspoon, "teaspoon"),
        }
      : null;

  return (
    <main className="py-16">
      <div className="container max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Кулінарний калькулятор</h2>
        <div className="p-6 max-w-md mx-auto bg-base-200 rounded-2xl shadow-lg mb-8">
          <div className="form-control mb-3 flex">
            <label className="label mr-2">Інгредієнт</label>
            <select
              className="select select-bordered"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value as Ingredient)}
            >
              {Object.keys(conversions).map((ing) => (
                <option key={ing} value={ing}>
                  {ing}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control mb-3 flex">
            <label className="label mr-2">Вага (г)</label>
            <input
              type="number"
              value={grams}
              onChange={(e) =>
                setGrams(e.target.value ? parseFloat(e.target.value) : "")
              }
              className="input input-bordered"
            />
          </div>

          {result && (
            <div className="bg-base-100 p-4 rounded-lg space-y-1">
              <p>≈ {result.cup} склянки</p>
              <p>≈ {result.tablespoon} ст. ложок</p>
              <p>≈ {result.teaspoon} ч. ложок</p>
            </div>
          )}
        </div>
        <section className="mb-8 p-6 bg-base-200 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-3">Конвертуйте інгредієнти швидко та точно</h2>
          <p className="mb-2">
            Онлайн кулінарний калькулятор допоможе вам конвертувати популярні інгредієнти, такі як
            борошно, цукор, сіль, масло, молоко, какао, рис та інші, у склянки, столові та
            чайні ложки. Ідеально підходить для тих, у кого немає кухонних ваг.
          </p>
          <p className="mb-2">
            Просто введіть вагу інгредієнта в грамах, оберіть продукт зі списку, і калькулятор миттєво
            покаже об’ємну міру. Конверсії розраховані за стандартними кулінарними таблицями, з
            округленням до найближчої половини склянки або цілої ложки.
          </p>
          <p>
            Цей сервіс зручний для випічки, десертів, соусів та щоденного приготування страв. Він
            економить час, допомагає уникнути помилок та дозволяє точно дотримуватись рецептури навіть
            без ваг.
          </p>
        </section>
      </div>
    </main>
  );
}
