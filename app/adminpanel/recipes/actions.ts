'use server';

import { revalidatePath } from 'next/cache';
import { del } from '@vercel/blob';
import prisma from '../../lib/prisma';
import { RecipeIngredient, Instruction } from '../../generated/prisma/client';

export async function handleSubmit(formData: FormData) {
  const recipeId = Number(formData.get('id'));
  if (!recipeId) return;

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const videoUrl = formData.get('videoUrl') as string;
  const tiktokUrl = formData.get('tiktokUrl') as string;

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

  const ingredientUpdates: Promise<RecipeIngredient>[] = [];

  for (const [key, value] of formData.entries()) {
    const matchIngredient = key.match(/^ingredient-(\d+)$/);
    const matchAmount = key.match(/^amount-(\d+)$/);
    const matchUnit = key.match(/^unit-(\d+)$/);

    if (matchIngredient) {
      const recipeIngredientId = Number(matchIngredient[1]);
      const name = value.toString().trim();

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

  const instructionUpdates: Promise<Instruction>[] = [];

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

  await Promise.all([...ingredientUpdates, ...instructionUpdates]);

  revalidatePath('/adminpanel/recipes');
}

export async function handleDelete(id: number) {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    select: { imageUrl: true },
  });

  if (recipe?.imageUrl && !recipe.imageUrl.includes('/recipes/default.webp')) {
    try {
      await del(recipe.imageUrl);
    } catch (err) {
      console.error('Помилка при видаленні зображення з blob:', err);
    }
  }

  await prisma.recipe.delete({ where: { id } });

  revalidatePath('/adminpanel/recipes');
}
