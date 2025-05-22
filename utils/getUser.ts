'use server';

import { cookies } from 'next/headers';
import * as jose from 'jose';
import prisma from "@/app/lib/prisma";
import { User } from '@/app/generated/prisma'; // Імпортуємо тип користувача з Prisma

export async function getUser(): Promise<User | null> {
  const cookie = (await cookies()).get('Authorization');

  if (!cookie) {
    return null;
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret);

    const currentUserId = Number(payload.sub);

    if (!currentUserId || isNaN(currentUserId)) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUserId },
      include: {
        avatar: true, // включаємо аватар
      },
    });

    return user;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
