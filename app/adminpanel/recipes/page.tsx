'use client';

import AdminMenu from '../AdminMenu';
import prisma from '../../lib/prisma';
import RecipeForm from './RecipeForm';
import { handleSubmit, handleDelete } from './actions';

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
