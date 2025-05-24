'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  slug: string;
  avatar?: {
    avatarUrl: string;
  } | null;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const DEFAULT_AVATAR = '/avatars/default-avatar.webp';

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users');
      const data: User[] = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-2xl font-bold mb-8">Наші кулінари</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/users/${user.slug}`}
              className="block text-center hover:shadow-lg rounded-lg p-4 border"
            >
              <div className="w-24 h-24 mx-auto mb-2 relative rounded-full overflow-hidden bg-gray-100">
                {user.avatar?.avatarUrl ? (
                  <Image
                    src={user.avatar.avatarUrl || DEFAULT_AVATAR }
                    alt={`${user.name} avatar`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Н/Д
                  </div>
                )}
              </div>
              <div className="text-lg font-medium">{user.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <script type="application/ld+json">
      {JSON.stringify(userListSchema)}
    </script>

    </main>
  );
};

export default UsersPage;
