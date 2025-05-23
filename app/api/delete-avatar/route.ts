import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import prisma from '@/app/lib/prisma'; // змінити на актуальний шлях до твого prisma

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

    // Не видаляємо дефолтний аватар
    if (avatarUrl.includes('/avatars/default-avatar.webp')) {
      return NextResponse.json({ message: 'Default avatar, no action needed.' });
    }

    // Видалити blob з Vercel Blob
    await del(avatarUrl); // або: await del(new URL(avatarUrl).pathname);

    // Видалити запис із бази (якщо аватари зберігаються окремо)
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
