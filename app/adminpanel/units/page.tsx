import AdminMenu from '../AdminMenu';
import prisma from "../../lib/prisma";
import { revalidatePath } from 'next/cache'; // щоб оновлювалось після змін
import { redirect } from 'next/navigation';

export default async function Page() {
  const unmoderatedUnits = await prisma.unit.findMany({
    where: { moderated: false },
  });

  async function approveUnit(formData: FormData) {
    'use server';

    const id = Number(formData.get('id'));
    const name = formData.get('name') as string;

    if (!id || !name) return;

    await prisma.unit.update({
      where: { id },
      data: {
        name,
        moderated: true,
      },
    });

    revalidatePath('/adminpanel/units'); // або актуальний шлях
    redirect('/adminpanel/units'); // редірект для оновлення сторінки
  }

  return (
    <>
      <div className="text-center pt-16">
        <h1>Панель адміністратора</h1>
      </div>
      <AdminMenu />
      <div>
        <div className="container max-w-xl mx-auto">
          <h2 className="text-center font-bold mb-4">Немодеровані одиниці виміру</h2>
          <ul className="space-y-4">
            {unmoderatedUnits.map((unit) => (
              <li key={unit.id} className="border p-4 rounded shadow">
                <form action={approveUnit} className="flex items-center gap-2">
                  <input
                    type="hidden"
                    name="id"
                    value={unit.id}
                  />
                  <input
                    type="text"
                    name="name"
                    defaultValue={unit.name}
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
