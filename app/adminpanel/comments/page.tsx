import AdminMenu from '../AdminMenu';
import prisma from "../../lib/prisma";
import { revalidatePath } from 'next/cache'; // щоб оновлювалось після змін
import { redirect } from 'next/navigation';

export default async function Page() {
  const unmoderatedComments = await prisma.comment.findMany({
    where: { moderated: false },
  });

  async function approveComment(formData: FormData) {
    'use server';

    const id = Number(formData.get('id'));
    const text = formData.get('text') as string;

    if (!id || !text) return;

    await prisma.comment.update({
      where: { id },
      data: {
        text,
        moderated: true,
      },
    });

    revalidatePath('/adminpanel/comments'); // або актуальний шлях
    redirect('/adminpanel/comments'); // редірект для оновлення сторінки
  }

  return (
    <>
      <div className="text-center pt-16">
        <h1>Панель адміністратора</h1>
      </div>
      <AdminMenu />
      <div>
        <div className="container max-w-xl mx-auto">
          <h2 className="text-center font-bold mb-4">Немодеровані коментарі</h2>
          <ul className="space-y-4">
            {unmoderatedComments.map((comment) => (
              <li key={comment.id} className="border p-4 rounded shadow">
                <form action={approveComment} className="flex items-center gap-2">
                  <input
                    type="hidden"
                    name="id"
                    value={comment.id}
                  />
                  <input
                    type="textarea"
                    name="text"
                    defaultValue={comment.text}
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
