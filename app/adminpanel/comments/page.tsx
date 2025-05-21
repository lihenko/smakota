import AdminMenu from '../AdminMenu';
import prisma from "../../lib/prisma";
import { revalidatePath } from 'next/cache';
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

    // Знаходимо коментар, щоб дізнатись recipeId, parentId, rating
    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { recipeId: true, parentId: true, rating: true },
    });

    if (!comment) return;

    // Затверджуємо коментар
    await prisma.comment.update({
      where: { id },
      data: {
        text,
        moderated: true,
      },
    });

    // Оновлення рейтингу, якщо це кореневий коментар з оцінкою
    if (comment.parentId === null && comment.rating !== null) {
      const { _avg, _count } = await prisma.comment.aggregate({
        where: { recipeId: comment.recipeId, parentId: null, moderated: true },
        _avg: { rating: true },
        _count: true,
      });

      await prisma.recipe.update({
        where: { id: comment.recipeId },
        data: {
          averageRating: _avg.rating ?? 0,
          commentCount: _count,
        },
      });
    }

    revalidatePath('/adminpanel/comments');
    redirect('/adminpanel/comments');
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
                  <input type="hidden" name="id" value={comment.id} />
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
