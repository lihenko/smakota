import { prisma } from '@/app/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import UserClientContent from './UserClientContent';
import type { Metadata } from "next";
import { getUserId } from '@/hooks/useAuth.server';

export type ParamsPromise = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: ParamsPromise }): Promise<Metadata> {
  const { slug } = await params;
  const DEFAULT_AVATAR = '/avatars/default-avatar.webp';

  const user = await prisma.user.findUnique({
    where: { slug },
    include: {
      avatar: true,
      _count: {
        select: {
          recipes: true,
          comments: true,
        },
      },
    },
  });

  if (!user) {
    return {
      title: "Кулінар не знайдений – Смакота",
      description: "Цей кулінар не знайдений або був видалений.",
    };
  }

  const title = `${user.name} – Кулінар на Смакота`;
  const description = `Профіль кулінара ${user.name} на Смакота. Створено страв: ${user._count.recipes}, залишено відгуків: ${user._count.comments}. Долучайтеся до спільноти домашніх кухарів!`;
  const image = user.avatar?.avatarUrl || DEFAULT_AVATAR;
  const canonicalUrl = `https://smakota.club/users/${user.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      images: [image],
      type: "profile",
      url: `/users/${user.slug}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [image],
    },
  };
}

export default async function UserPage(props: {
  params: ParamsPromise;
}) {
  const { slug } = await props.params;
  const DEFAULT_AVATAR = '/avatars/default-avatar.webp';

  const user = await prisma.user.findUnique({
    where: { slug },
    include: {
      avatar: true,
      _count: {
        select: {
          recipes: true,
          comments: true,
        },
      },
    },
  });

  if (!user) return notFound();


const userSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": user.name,
  "url": `/users/${user.slug}`,
  ...(user.avatar && {
    "image": user.avatar?.avatarUrl
  }),
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `/users/${user.slug}`
  }
};

  const userId = await getUserId();

  let favorites: number[] = [];

  if (userId) {
    const favs = await prisma.favoriteRecipe.findMany({
      where: { userId: Number(userId) },
      select: { recipeId: true },
    });
    favorites = favs.map((f) => f.recipeId);
  }



  return (
    <main>
      <script type="application/ld+json">
        {JSON.stringify(userSchema)}
      </script>
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto p-4 flex items-center gap-6 bg-white shadow rounded-lg">
            <div className="w-32 h-32 relative rounded-full overflow-hidden">
              <Image
                src={user.avatar?.avatarUrl || DEFAULT_AVATAR}
                alt="Аватар"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600 mt-2">Створено страв: {user._count.recipes}</p>
              <p className="text-gray-600">Залишено відгуків: {user._count.comments}</p>
            </div>
          </div>

          {/* Клієнтська частина (динамічні рецепти й коментарі) */}
          <UserClientContent 
                slug={slug}
                currentUserId={userId ? Number(userId) : null}
                favoriteIds={favorites}
              />
        </div>
      </section>
      
    </main>
  );
}
