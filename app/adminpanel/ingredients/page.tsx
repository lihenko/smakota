import AdminMenu from '../AdminMenu';
import prisma from "../../lib/prisma";
import { revalidatePath } from 'next/cache'; // щоб оновлювалось після змін
import { redirect } from 'next/navigation';

export default async function Page() {
  const unmoderatedIngredients = await prisma.ingredient.findMany({
    where: { moderated: false },
  });

  async function approveIngredient(formData: FormData) {
    'use server';

    const id = Number(formData.get('id'));
    const name = formData.get('name') as string;

    if (!id || !name) return;

    await prisma.ingredient.update({
      where: { id },
      data: {
        name,
        moderated: true,
      },
    });

    revalidatePath('/adminpanel/ingredients'); // або актуальний шлях
    redirect('/adminpanel/ingredients'); // редірект для оновлення сторінки
  }

  return (
    <>
      <div className="text-center pt-16">
        <h1>Панель адміністратора</h1>
      </div>
      <AdminMenu />
      <div>
        <div className="container max-w-xl mx-auto">
          <h2 className="text-center font-bold mb-4">Немодеровані інгредієнти</h2>
          <ul className="space-y-4">
            {unmoderatedIngredients.map((ingredient) => (
              <li key={ingredient.id} className="border p-4 rounded shadow">
                <form action={approveIngredient} className="flex items-center gap-2">
                  <input
                    type="hidden"
                    name="id"
                    value={ingredient.id}
                  />
                  <input
                    type="text"
                    name="name"
                    defaultValue={ingredient.name}
                    className="border px-2 py-1 rounded flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Затвердити
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
