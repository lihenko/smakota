import { notFound } from 'next/navigation';
import prisma from '../../../lib/prisma';
import RecipeCard from '../../../components/RecipeCard';
import Pagination from '../../../components/Pagination';
import { getUserId } from "@/hooks/useAuth.server";
import { Metadata } from 'next';



export type ParamsPromise = Promise<Record<'slug', string>>;
export type SearchParamsPromise = Promise<Record<'page', string | undefined> | undefined>;

interface Props {
  params: ParamsPromise;
  searchParams?: SearchParamsPromise;
}
export async function generateMetadata({ params }: { params: ParamsPromise }): Promise<Metadata> {
  const dishType = await prisma.dishType.findUnique({
    where: { slug: (await params).slug },
  });

  if (!dishType) return { title: 'Тип страви не знайдено' };

  const title = `Рецепти типу "${dishType.name}" | Smakota.club`;
  const description = `Переглянь рецепти типу "${dishType.name}" на Smakota.club. Обирай серед улюблених страв та зберігай найкращі ідеї у своїй кулінарній книзі.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://smakota.club/recipe/type/${dishType.slug}`,
      siteName: 'Smakota.club',
      locale: 'uk_UA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://smakota.club/recipe/type/${dishType.slug}`,
    },
  };
}

const pageSize = 12;

export default async function DishTypeSlugPage({ params, searchParams }: Props) {
  const paramData = await params; // { slug: string }
  const searchParamsData = await searchParams; // { page?: string } | undefined

  const slug = paramData.slug;
  const page = Number(searchParamsData?.page) || 1;

  const dishType = await prisma.dishType.findUnique({
    where: { slug },
  });

  if (!dishType) return notFound();

  const skip = (page - 1) * pageSize;

  const [recipes, totalCount] = await Promise.all([
    prisma.recipe.findMany({
      where: {
        dishTypeId: dishType.id,
        privaterecipe: false,
        moderated: true,
      },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.recipe.count({
      where: {
        dishTypeId: dishType.id,
        privaterecipe: false,
        moderated: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const userId = await getUserId();
  const numericUserId = userId ? Number(userId) : null;

  let favorites: Record<number, boolean> = {};
    if (numericUserId !== null) {
      const favList = await prisma.favoriteRecipe.findMany({
        where: { userId: numericUserId },
        select: { recipeId: true },
      });
      favorites = Object.fromEntries(favList.map(f => [f.recipeId, true]));
    }

  const dishTypeDescriptions: Record<string, string> = {
    yushky: "Юшки — це смачні та поживні перші страви, які ідеально підходять для сімейного обіду чи затишної вечері. Вони можуть бути легкими овочевими, наваристими м’ясними або ароматними рибними. Українські традиційні рецепти поєднують свіжі інгредієнти та насичений смак, даруючи тепло та користь організму. Готуючи юшки, ви отримаєте не лише смачну страву, а й корисний суп для здоров’я.",
    salaty: "Салати — універсальні страви, що можуть бути легкою закускою або повноцінною трапезою. Вони поєднують свіжі овочі, зелень, фрукти, м’ясо, рибу чи морепродукти, створюючи гармонію смаку та користі. Літні, зимові, святкові чи дієтичні салати підійдуть на будь-який випадок. Правильно підібрані інгредієнти допоможуть підкреслити смак та додати яскравості вашому столу.",
    osnovni_stravy: "Основні страви — серце будь-якого обіду чи вечері. Це ситні та різноманітні кулінарні шедеври, що можуть бути приготовані з м’яса, риби, птиці, овочів чи бобових. Вони поєднують багатий смак, апетитний аромат і корисні властивості. Готуючи основні страви за домашніми або сучасними рецептами, ви зможете вразити близьких та створити неповторну атмосферу на кухні.",
    garniry: "Гарніри — чудове доповнення до м’ясних, рибних чи овочевих страв. Вони можуть бути простими та швидкими у приготуванні або вишуканими для святкового столу. Картопля, крупи, макарони, овочі та бобові — основа більшості гарнірів, які збагачують основну страву смаком та поживністю. Правильний гарнір допоможе збалансувати харчування та зробити трапезу смачнішою.",
    zakusky: "Закуски — маленькі, але яскраві кулінарні шедеври, що розпалюють апетит перед основною стравою. Вони бувають холодними та гарячими, простими чи вишуканими, підходять як для повсякденного меню, так і для святкового застілля. Закуски з м’яса, риби, овочів чи сирів урізноманітнять меню та стануть чудовим початком будь-якої трапези.",
    deserty: "Десерти — солодке завершення обіду чи вечері, яке дарує справжнє задоволення. Вони можуть бути легкими фруктовими, ніжними кремовими або насиченими шоколадними. Домашні десерти не лише смачні, а й можуть бути корисними, якщо приготовані зі свіжих інгредієнтів. Випічка, муси, торти та морозиво створюють святковий настрій щодня.",
    napoyi: "Напої — невід’ємна частина будь-якого столу. Освіжаючі літні коктейлі, зігріваючі зимові напої, чай, кава чи смузі підкреслюють смак страв та дарують задоволення. Вони можуть бути тонізуючими, заспокійливими або поживними. Домашні рецепти напоїв дозволяють створювати смачні та корисні варіанти без штучних добавок.",
    vypichka: "Випічка — ароматна насолода, що підкорює серце з першого шматочка. Булочки, пироги, печиво, хліб чи круасани створюють затишок і тепло в домі. Домашня випічка відрізняється особливим смаком і натуральністю інгредієнтів. Вона чудово підходить до чаю чи кави та може стати як повсякденним частуванням, так і святковим частуванням для гостей.",
    torty: "Торти — справжня окраса святкового столу. Вони можуть бути багатошаровими, з ніжним кремом, фруктовими начинками чи насиченим шоколадним смаком. Домашній торт — це любов, вкладена в кожен шар і прикрасу. Правильне поєднання інгредієнтів робить торт не лише смачним, а й незабутнім кулінарним шедевром для будь-якої події.",
    konservatsiya: "Консервація — найкращий спосіб зберегти смак та користь сезонних продуктів на цілий рік. Домашні соління, варення, маринади та джеми дозволяють насолоджуватися овочами, фруктами й ягодами навіть взимку. Це не лише смачно, а й економно. Рецепти консервації допомагають зберегти натуральність та аромат інгредієнтів без зайвої хімії.",
    sousy: "Соуси — кулінарна магія, яка перетворює навіть просту страву на витвір мистецтва. Вони можуть бути гострими, ніжними, солодкими чи кислими, ідеально доповнюючи м’ясо, рибу, пасту або овочі. Домашні соуси готуються зі свіжих продуктів, підкреслюючи смак основної страви та додаючи їй нових відтінків.",
    snidanok: "Сніданок — найважливіший прийом їжі, що заряджає енергією на весь день. Він може бути ситним з яйцями, кашами та сендвічами або легким із фруктами та йогуртом. Правильний сніданок допомагає підтримувати гарне самопочуття та активність. Різноманітні рецепти дозволяють щодня готувати щось нове й корисне для всієї родини.",
    dietychne_menu: "Дієтичне меню — це добірка корисних і збалансованих страв для щоденного харчування. Тут зібрані легкі сніданки, поживні основні страви та корисні перекуси, які допомагають підтримувати здоров’я, гарне самопочуття та контроль ваги. Рецепти створені з простих інгредієнтів, з мінімальною кількістю жирів і цукру, але зі збереженням смаку. Дієтичне меню підійде для тих, хто прагне харчуватися правильно без жорстких обмежень і нудної їжі.",
  };

  const normalizedSlug = slug.replace(/-/g, '_');
  const dishDescription = dishTypeDescriptions[normalizedSlug];

  return (
    <main className="py-16">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Тип: {dishType.name}</h1>

        {recipes.length === 0 ? (
          <div className="text-gray-500">Рецептів не знайдено</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                userId={numericUserId}
                                isInitiallyFavorite={!!favorites[recipe.id]}
                              />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination currentPage={page} totalPages={totalPages} basePath={`/recipe/type/${slug}`} />
            )}
          </>
        )}
        {/* Виводимо опис типу страви після пагінації */}
        {dishDescription && (
          <section className="my-10 p-6 bg-base-200 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Про цей тип страв</h2>
            <p>{dishDescription}</p>
          </section>
        )}
      </div>
    </main>
  );
}
