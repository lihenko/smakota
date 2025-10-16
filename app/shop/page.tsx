import Link from "next/link";
import { metadata } from "./metadata";

export { metadata };

export default function ReturnPage() {
  return (
    <main className="py-16">
      <div className="container">
            <h1 className="text-3xl font-bold mb-8 text-center">Крамниця</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link
                  href={`/shop/skovoroda-4-sektsii`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/6547489198_skovoroda-s-antiprigarnym.jpg"
                      alt="Сковорода з антипригарним гранітним покриттям"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Сковорода з антипригарним гранітним покриттям</h2>
                  </div>
                </Link>
                <Link
                  href={`/shop/lapsherizka`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/63878795499311.webp"
                      alt="Pasta Set — лапшерізка, машина для приготування пасти та лапші"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Pasta Set — лапшерізка, машина для приготування пасти та лапші</h2>
                  </div>
                </Link>
                <Link
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
                </Link>
                <Link
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
                </Link>
                <Link
                  href={`/shop/smakuy-baby-bum`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/02405-700x700.jpg"
                      alt="Самогонний апарат «Бебі Бум»"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Самогонний апарат «Бебі Бум»</h2>
                  </div>
                </Link>
                <Link
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
                </Link>
                <Link
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
                </Link>
                <Link
                  href={`/shop/smakuy-profi-open`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/profi15l2-700x700.jpg"
                      alt="Самогонний апарат «Профі» на відкритому кубі"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Самогонний апарат «Профі» на відкритому кубі</h2>
                  </div>
                </Link>
                <Link
                  href={`/shop/mangal-gektor-9`}
                  className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
                >
                  <div className="relative w-full aspect-[3/2]">
                    <img
                      src="/shop/mangal-gektor-9-1.webp"
                      alt="Мангал Гектор на 9 шампурів"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <div className="px-4 pt-4 pb-10">
                    <h2 className="text-lg font-semibold">Мангал Гектор на 9 шампурів</h2>
                  </div>
                </Link>
                <Link
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
                </Link>
                <Link
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
                </Link>
                <Link
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
                </Link>
            </div>
          </div>
    </main>

);}