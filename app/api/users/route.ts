// app/api/users/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        avatar: {
          select: {
            avatarUrl: true,
          },
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
