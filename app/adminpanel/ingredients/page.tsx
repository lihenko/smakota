import AdminMenu from '../AdminMenu';
import prisma from "../../lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'; 

export default async function Page() {
  const unmoderatedIngredients = await prisma.ingredient.findMany({
    where: { moderated: false },
  });

async function handleIngredient(formData: FormData) {
  'use server';

  const id = Number(formData.get('id'));
  const name = (formData.get('name') as string) ?? '';
  const action = (formData.get('action') as string) ?? '';

  if (!id) return;

  try {
    if (action === 'approve' && name.trim()) {
      // Затверджуємо інгредієнт
      await prisma.ingredient.update({
        where: { id },
        data: { name: name.trim(), moderated: true },
      });
    } else if (action === 'delete') {
      // Просто видаляємо інгредієнт – CASCADE видалить RecipeIngredient
      await prisma.ingredient.delete({
        where: { id },
      });
    }
  } catch (err: any) {
    console.error('Ingredient action error:', err);
    throw err; // Next.js покаже помилку
  }

  // Оновлюємо сторінку
  revalidatePath('/adminpanel/ingredients');
  redirect('/adminpanel/ingredients');
}

  return (
    <>
      <div className="text-center pt-16">
        <h1>Панель адміністратора</h1>
      </div>
      <AdminMenu />
      <div className='py-16'>
        <div className="container max-w-xl mx-auto">
          <h2 className="text-center font-bold mb-4">Немодеровані інгредієнти</h2>
          <ul className="space-y-4">
  {unmoderatedIngredients.map((ingredient) => (
    <li key={ingredient.id} className="border p-4 rounded shadow flex items-center gap-2">
      <input
        type="text"
        name="name"
        defaultValue={ingredient.name}
        className="border px-2 py-1 rounded flex-1"
        form={`approve-${ingredient.id}`}
      />

      {/* Форма для затвердження */}
      <form id={`approve-${ingredient.id}`} action={handleIngredient}>
        <input type="hidden" name="id" value={ingredient.id} />
        <input type="hidden" name="action" value="approve" />
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Затвердити
        </button>
      </form>

      {/* Форма для видалення */}
      <form action={handleIngredient}>
        <input type="hidden" name="id" value={ingredient.id} />
        <input type="hidden" name="action" value="delete" />
        <button
          type="submit"
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Видалити
        </button>
      </form>
    </li>
  ))}
</ul>

        </div>
      </div>
    </>
  );
}
