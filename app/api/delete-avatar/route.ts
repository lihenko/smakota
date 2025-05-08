// app/api/delete-avatar/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import prisma from '../../lib/prisma';

export async function DELETE(req: Request) {
  try {
    const body = await req.text();

    if (!body) {
      return NextResponse.json({ error: 'Request body is missing.' }, { status: 400 });
    }

    const { avatarUrl } = JSON.parse(body);

    if (!avatarUrl) {
      return NextResponse.json({ error: 'Avatar URL is required.' }, { status: 400 });
    }

    // Перевіряємо, чи це дефолтний аватар
    if (avatarUrl.includes('/avatars/default-avatar.webp')) {
      return NextResponse.json({ message: 'Default avatar, no action needed.' });
    }

    // Шлях до файлу
    const avatarFilename = avatarUrl.split('/avatars/')[1];
    const avatarPath = path.join(process.cwd(), 'public', 'avatars', avatarFilename);

    // Видаляємо файл, якщо існує
    if (fs.existsSync(avatarPath)) {
      fs.unlinkSync(avatarPath);
    }

    // Видаляємо запис у базі даних за avatarUrl
    await prisma.avatar.deleteMany({
      where: { avatarUrl },
    });

    return NextResponse.json({ message: 'Avatar deleted successfully.' });
  } catch (error) {
    console.error('Error deleting avatar:', error);
    return NextResponse.json({ error: 'Failed to delete avatar' }, { status: 500 });
  }
}
