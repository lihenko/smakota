import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/app/lib/prisma'; // або свій імпорт prisma
import React from 'react';

interface User {
  id: number;
  name: string;
  slug: string;
  avatarUrl?: string | null;
}

const DEFAULT_AVATAR = '/avatars/default-avatar.webp';

async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      avatar: {
        select: { avatarUrl: true }
      }
    }
  });

  return users.map(u => ({
    id: u.id,
    name: u.name,
    slug: u.slug,
    avatarUrl: u.avatar?.avatarUrl ?? null,
  }));
}

export default async function UsersPage() {
  const users = await getUsers();

  const userListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Автори рецептів",
    "itemListElement": users.map((user, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Person",
        "name": user.name,
        "url": `/users/${user.slug}`
      }
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(userListSchema) }}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-2xl font-bold mb-8">Наші кулінари</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {users.map(user => (
              <Link
                key={user.id}
                href={`/users/${user.slug}`}
                className="block text-center hover:shadow-lg rounded-lg p-4 border"
              >
                <div className="w-24 h-24 mx-auto mb-2 relative rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={user.avatarUrl || DEFAULT_AVATAR}
                    alt={`${user.name} avatar`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-lg font-medium">{user.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
