import prisma from "../../lib/prisma";
import { notFound } from "next/navigation";
import CommentForm from "../../components/CommentForm";
import { cookies } from 'next/headers';
import * as jose from 'jose';
import Link from 'next/link';
import StarDisplay from "../../components/StarDisplay";
import ReplyFormToggle from "@/app/components/ReplyFormToggle";
import styles from '../../components/RecipeCard.module.css';
import Image from "next/image";

export type ParamsPromise = Promise<Record<'slug', string>>;

export default async function RecipePage(props: { params: ParamsPromise }) {
  const params = await props.params;
  const slug = params.slug;

  let userId: number | undefined;
  const cookie = (await cookies()).get('Authorization');
  if (cookie) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;
    try {
      const { payload } = await jose.jwtVerify(jwt, secret);
      const sub = payload.sub;
      if (typeof sub === 'string' && !isNaN(parseInt(sub))) {
        userId = parseInt(sub);
      } else if (typeof sub === 'number') {
        userId = sub;
      }
    } catch (error) {
      // помилка - userId залишиться undefined
    }
  }

  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    include: {
      user: true,
      ingredients: {
        include: {
          ingredient: true,
          unit: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
      instructions: {
        orderBy: {
          stepNumber: 'asc',
        },
      },
      dishType: true,
    },
  });

  if (!recipe) {
    notFound();
  }

  const isOwner = userId === recipe.userId;

  if (!isOwner && (recipe.privaterecipe || !recipe.moderated)) {
    notFound();
  }
  

  const allowComments = recipe.moderated && !recipe.privaterecipe;

  const comments = await prisma.comment.findMany({
    where: {
      recipeId: recipe.id,
      moderated: true,
      parentId: null,
    },
    include: {
      replies: {
        where: { moderated: true },
        include: {
          user: true,
        },
        orderBy: { createdAt: 'asc' },
      },
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const createdDate = new Date(recipe.createdAt);
  const formattedDate = `${createdDate.getDate().toString().padStart(2, "0")}.${(createdDate.getMonth()+1).toString().padStart(2, "0")}.${createdDate.getFullYear()}`;

  const ratings = comments
  .map(c => c.rating)
  .filter((r): r is number => typeof r === 'number');

const averageRating = ratings.length
  ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
  : undefined;

const reviewCount = ratings.length;

function generateDescription(recipe: { title: any; ingredients: any[]; }): string {
  const title = recipe.title;
  const ingredientNames = recipe.ingredients
    .map(i => i.ingredient.name)
    .slice(0, 3)
    .join(", ");

  const base = `Дізнайтеся, як приготувати ${title.toLowerCase()}`;

  const withIngredients = ingredientNames
    ? ` з інгредієнтами: ${ingredientNames}`
    : "";

  return `${base}${withIngredients}. Смачний покроковий рецепт з фото та відео.`;
}


  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "author": {
      "@type": "Person",
      "name": recipe.user.name,
    },
    "datePublished": recipe.createdAt.toISOString(),
    "description": generateDescription(recipe),
    "image": recipe.imageUrl || "/recipes/placeholder.webp",
    "recipeIngredient": recipe.ingredients.map((item) => {
      const amount = item.toTaste ? 'за смаком' : `${item.amount ?? ''} ${item.unit?.name ?? ''}`;
      return `${item.ingredient.name} ${amount}`.trim();
    }),
    "recipeInstructions": recipe.instructions.map(step => ({
      "@type": "HowToStep",
      "text": step.step,
    })),
    ...(recipe.videoUrl && {
      "video": {
        "@type": "VideoObject",
        "name": recipe.title,
        "contentUrl": recipe.videoUrl,
        "thumbnailUrl": recipe.imageUrl || "/recipes/placeholder.webp",
        "uploadDate": recipe.createdAt.toISOString(),
      }
    }),
    ...(averageRating && reviewCount > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": averageRating,
        "reviewCount": reviewCount.toString(),
      }
    })
  };


  return (
    <main className="py-16">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              Автор: {recipe.user.name} • {formattedDate}
            </p>

            <div className="relative overflow-hidden">
              <Image
                src={recipe.imageUrl || "/recipes/placeholder.webp"}
                alt={recipe.title}
                width={600} // або відповідна ширина
                height={400} // або відповідна висота
                className="mb-6 rounded-t-xl"
                priority
              />

              {recipe.privaterecipe && (
                <span className={styles.recipelabel}>
                  Приватний
                </span>
              )}
              {!recipe.moderated && !recipe.privaterecipe && (
                <span className={styles.recipelabel}>
                  На модерації
                </span>
              )}
            </div>

            <h2 className="text-xl font-semibold mt-4 mb-2">Інгредієнти</h2>
            <ul className="mb-4">
              {recipe.ingredients.map((item) => (
                <li key={item.id}>
                  {item.ingredient.name}{' '}
                  {item.toTaste ? 'за смаком' : `${item.amount ?? ''} ${item.unit?.name ?? ''}`}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">Приготування</h2>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions.map((step) => (
                <li key={step.id}>{step.step}</li>
              ))}
            </ol>

            {recipe.videoUrl && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Відео приготування</h2>
                <div className="aspect-video w-full my-4">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={recipe.videoUrl}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {recipe.tiktokUrl && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Відео приготування</h2>
                <iframe
                  src={recipe.tiktokUrl}
                  width="325"
                  height="575"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="border rounded-xl mt-2"
                />
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3" />
        </div>

        <div className="flex">
          <div className="w-full">
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Коментарі</h2>

              {!allowComments ? (
                <p>Коментарі тимчасово вимкнено.</p>
              ) : comments.length === 0 ? (
                <p>Поки що немає коментарів.</p>
              ) : (
                <ul className="space-y-4">
                  {comments.map((comment) => (
                    <li key={comment.id} className="border p-4 rounded-lg">
                      <div className="font-semibold">{comment.user.name}</div>
                      {typeof comment.rating === 'number' && (
                        <StarDisplay rating={comment.rating} />
                      )}
                      <p>{comment.text}</p>

                      {comment.replies.length > 0 && (
                        <ul className="pl-4 mt-2 space-y-2 border-l border-gray-200">
                          {comment.replies.map((reply) => (
                            <li key={reply.id} className="pl-2">
                              <div className="text-sm font-semibold">{reply.user.name}</div>
                              <p className="text-sm">{reply.text}</p>
                            </li>
                          ))}
                        </ul>
                      )}

                      {typeof userId === 'number' && userId > 0 ? (
                        <ReplyFormToggle recipeId={recipe.id} commentId={comment.id} />
                      ) : (
                        <div className="py-3">
                          <p>Вам потрібно <Link className="underline" href="/login">увійти</Link>, щоб залишити відповідь.</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {allowComments && (
              typeof userId === 'number' && userId > 0 ? (
                <div className="py-16">
                  <h2 className="mb-6">Залишити коментар</h2>
                  <CommentForm recipeId={recipe.id} />
                </div>
              ) : (
                <div className="py-16">
                  <p>Вам потрібно <Link className="underline" href="/login">увійти</Link>, щоб залишити коментар. </p>
                </div>
              )
            )}
          </div>
        </div>

      </div>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(recipeSchema)}
      </script>
    </main>
  );
}
