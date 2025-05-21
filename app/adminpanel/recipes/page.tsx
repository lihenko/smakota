// app/adminpanel/recipes/page.tsx
import AdminMenu from '../AdminMenu';
import { revalidatePath } from 'next/cache';
import prisma from "../../lib/prisma";
import RecipeForm from './RecipeForm';
import { unlink } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export default async function AdminRecipesPage() {
  const recipes = await prisma.recipe.findMany({
    where: { moderated: false },
    include: {
      ingredients: {
        include: {
          ingredient: true,
          unit: true,
        },
        orderBy: { order: 'asc' },
      },
      instructions: {
        orderBy: { stepNumber: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  async function handleSubmit(formData: FormData) {
    'use server';

    const recipeId = Number(formData.get('id'));
    if (!recipeId) return;

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const videoUrl = formData.get('videoUrl') as string;
    const tiktokUrl = formData.get('tiktokUrl') as string;

    // Оновлення основної інформації про рецепт
    await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        title,
        slug,
        imageUrl,
        videoUrl,
        tiktokUrl,
        moderated: true,
      },
    });

    // Обробка інгредієнтів
    const ingredientUpdates: Promise<any>[] = [];
    for (const [key, value] of formData.entries()) {
      const matchIngredient = key.match(/^ingredient-(\d+)$/);
      const matchAmount = key.match(/^amount-(\d+)$/);
      const matchUnit = key.match(/^unit-(\d+)$/);

      if (matchIngredient) {
        const recipeIngredientId = Number(matchIngredient[1]);
        const name = value.toString().trim();
      
        // Знайти або створити інгредієнт
        const existingIngredient = await prisma.ingredient.upsert({
          where: { name },
          update: {},
          create: { name },
        });
      
        ingredientUpdates.push(
          prisma.recipeIngredient.update({
            where: { id: recipeIngredientId },
            data: {
              ingredientId: existingIngredient.id,
            },
          })
        );
      }
      

      if (matchAmount) {
        const id = Number(matchAmount[1]);
        const amount = parseFloat(value.toString());
        ingredientUpdates.push(
          prisma.recipeIngredient.update({
            where: { id },
            data: { amount: isNaN(amount) ? null : amount },
          })
        );
      }

      if (matchUnit) {
        const id = Number(matchUnit[1]);
        const unitName = value.toString();

        // Пошук або створення одиниці виміру
        const unit = await prisma.unit.upsert({
          where: { name: unitName },
          update: {},
          create: { name: unitName },
        });

        ingredientUpdates.push(
          prisma.recipeIngredient.update({
            where: { id },
            data: { unitId: unit.id },
          })
        );
      }
    }

    // Обробка інструкцій
    const instructionUpdates: Promise<any>[] = [];
    for (const [key, value] of formData.entries()) {
      const matchInstruction = key.match(/^instruction-(\d+)$/);
      if (matchInstruction) {
        const id = Number(matchInstruction[1]);
        const step = value.toString();
        instructionUpdates.push(
          prisma.instruction.update({
            where: { id },
            data: { step },
          })
        );
      }
    }

    // Паралельне оновлення інгредієнтів та інструкцій
    await Promise.all([...ingredientUpdates, ...instructionUpdates]);

    revalidatePath('/adminpanel/recipes');
  }


  async function handleDelete(id: number) {
  'use server';

  // 1. Отримуємо рецепт, щоб дізнатись imageUrl
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    select: { imageUrl: true },
  });

  // 2. Видаляємо зображення, якщо воно є
  if (recipe?.imageUrl) {
    const filePath = path.join(process.cwd(), 'public', recipe.imageUrl);
    try {
      await unlink(filePath);
    } catch (err) {
      console.error('Помилка при видаленні зображення:', err);
      // За бажанням: можеш кинути помилку або продовжити
    }
  }

  // 3. Видаляємо рецепт
  await prisma.recipe.delete({ where: { id } });

  // 4. Оновлюємо кеш
  revalidatePath('/adminpanel/recipes');
}

  return (
    <>
      <div className="text-center pt-16">
        <h1>Панель адміністратора</h1>
      </div>
            <AdminMenu />
      <div className="container py-16">
        {recipes.length === 0 ? (
          <p className="text-gray-500 text-center">Немає рецептів на модерацію.</p>
        ) : (
          recipes.map((recipe) => (
            <RecipeForm
              key={recipe.id}
              recipe={recipe}
              onSubmit={handleSubmit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </>
    
  );
}
