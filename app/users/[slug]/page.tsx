import { prisma } from '@/app/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export type ParamsPromise = Promise<{ slug: string }>;

export default async function UserPage(props: { params: ParamsPromise }) {
  const { slug } = await props.params;
  const DEFAULT_AVATAR = '/avatars/default-avatar.webp';
  const user = await prisma.user.findUnique({
    where: { slug: slug },
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

  return (
    <section className='py-16'>
        <div className="container">
            <div className="max-w-3xl mx-auto p-4 flex items-center gap-6 bg-white shadow rounded-lg">
                {/* Аватар зліва */}
                <div className="w-32 h-32 relative rounded-full overflow-hidden">
                    <Image
                        src={user.avatar?.avatarUrl || DEFAULT_AVATAR }
                        alt="Аватар"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Статистика справа */}
                <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600 mt-2">Створено страв: {user._count.recipes}</p>
                    <p className="text-gray-600">Залишено відгуків: {user._count.comments}</p>
                </div>
            </div>
        </div>
    </section>
    
  );
}
