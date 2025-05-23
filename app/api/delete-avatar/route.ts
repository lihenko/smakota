// app/api/delete-avatar/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function DELETE(req: Request) {
  try {
    const body = await req.text();

    if (!body) {
      return NextResponse.json({ error: 'Request body is missing.' }, { status: 400 });
    }

    const { avatarUrl, userId } = JSON.parse(body);

    if (!avatarUrl) {
      return NextResponse.json({ error: 'Avatar URL is required.' }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
    }

    // Якщо дефолтний аватар — нічого не робимо
    if (avatarUrl.includes('/avatars/default-avatar.webp')) {
      return NextResponse.json({ message: 'Default avatar, no action needed.' });
    }

    // Тут НЕ чіпаємо локальні файли, бо працюємо з @vercel/blob
    // Просто видаляємо запис у базі, щоб перестати показувати цей аватар
    await prisma.avatar.deleteMany({
      where: {
        userId: Number(userId),
        avatarUrl,
      },
    });

    return NextResponse.json({ message: 'Avatar deleted successfully.' });
  } catch (error) {
    console.error('Error deleting avatar:', error);
    return NextResponse.json({ error: 'Failed to delete avatar' }, { status: 500 });
  }
}
