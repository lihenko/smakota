import RecipeCard from "./components/RecipeCard";
import prisma from "./lib/prisma";
import RecipeSearchForm from "./components/SearchForm";
import Link from "next/link";
import { getUserId } from "@/hooks/useAuth.server";

export const dynamic = 'force-dynamic'; 


export const metadata = {
  alternates: {
    canonical: 'https://www.smakota.club/',
  },
};



export default async function HomePage() {
  const userId = await getUserId();
  const numericUserId = userId ? Number(userId) : null;
  const recipes = await prisma.recipe.findMany({
    where: {
      moderated: true,
      privaterecipe: false,
    },
    orderBy: { createdAt: "desc" },
    take: 8,
    include: {
      user: true,
    },
  });

  let favorites: Record<number, boolean> = {};
  if (numericUserId !== null) {
    const favList = await prisma.favoriteRecipe.findMany({
      where: { userId: numericUserId },
      select: { recipeId: true },
    });
    favorites = Object.fromEntries(favList.map(f => [f.recipeId, true]));
  }

  return (
    <main className="py-16">
      <div className="container">
        <div className="mb-8">
          <RecipeSearchForm />
        </div>
        <h2 className="text-2xl font-bold mb-4">Останні рецепти</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              userId={numericUserId}
              isInitiallyFavorite={!!favorites[recipe.id]}
              isLCP={index === 0} // перше зображення без lazy
            />
          ))}
        </div>
        <div className="text-center mb-8">
          <Link href="/recipe" className="btn btn-primary">Більше рецептів</Link>
        </div>
        <section
          className="py-10 px-6 sm:px-12 rounded-2xl shadow-lg my-10">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-primary">
                Створи свою кулінарну книгу
              </h2>
              <p className="text-lg text-base-content">
                Зберігай улюблені рецепти, додавай власні, готуй із задоволенням.
              </p>
            </div>
            <div>
              <Link
                href="/dashboard/createrecipe"
                className="mt-4 lg:mt-0 inline-block px-6 py-3 bg-primary text-primary-content hover:brightness-110 font-semibold rounded-xl transition"
              >
                Почати зараз
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-center">Крамниця</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <a
                  href={`/shop/veggie-slicer`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/49aa9d8e-c889-47fd-9967-fe069d228593.webp"
                      alt="Ручна овочерізка VEGGIE SLICER"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Ручна овочерізка VEGGIE SLICER</h2>
                  </div>
                </a>
                <a
                  href={`/shop/vacuum-sealer`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/6638216620_vakuumnyj-upakovschik-dlya.jpg"
                      alt="Вакуумний пакувальник для кухні"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Вакуумний пакувальник для кухні</h2>
                  </div>
                </a>
                <a
                  href={`/shop/smakuy-start-open`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/start-15-l-700x700.jpg"
                      alt="Самогонний апарат «Старт» на відкритому кубі"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Самогонний апарат «Старт» на відкритому кубі</h2>
                  </div>
                </a>
                <a
                  href={`/shop/smakuy-start-close`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/start-15-l-zakrytyj-kub-700x700.jpg"
                      alt="Самогонний апарат «Старт» на закритому кубі"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Самогонний апарат «Старт» на закритому кубі</h2>
                  </div>
                </a>
                <a
                  href={`/shop/mangal-standart`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/MangalStandart-700x700.png"
                      alt="Мангал Стандарт"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Мангал Стандарт</h2>
                  </div>
                </a>
                <a
                  href={`/shop/skovoroda-z-borony`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/SkovorodazBorony-700x700.jpg"
                      alt="Сковорода з диска борони"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Сковорода з диска борони</h2>
                  </div>
                </a>
                <a
                  href={`/shop/koptylnya-mala`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/dscn1814-700x700.jpg"
                      alt="Коптильня Мала з нержавіючої сталі"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Коптильня Мала з нержавіючої сталі</h2>
                  </div>
                </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
