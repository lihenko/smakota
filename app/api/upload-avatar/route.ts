import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import prisma from "../../lib/prisma";

export const config = {
  api: {
    bodyParser: false, // Вимикаємо автоматичний парсер тіла запиту
  },
};

export async function POST(req: Request) {

  const cookie = (await cookies()).get('Authorization');
  if (!cookie) {
    return NextResponse.json({ error: 'Missing JWT token' }, { status: 401 }); 
  }
  
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  let CurrentUserId: string;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    CurrentUserId = payload.sub as string;
  } catch (error) {
    console.error('Failed to verify JWT:', error);
    return NextResponse.json({ error: 'Invalid JWT token' }, { status: 401 });
  }

  try {
    // Створюємо форму для завантаження
    const formData = await req.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Створюємо шлях до збереження аватара в окремій папці
    const avatarsDir = path.join(process.cwd(), 'public', 'avatars'); // Нова папка для аватарів

    // Перевіряємо, чи існує папка, і якщо ні - створюємо її
    if (!fs.existsSync(avatarsDir)) {
      fs.mkdirSync(avatarsDir, { recursive: true });
    }

    // Отримуємо ім'я файлу і створюємо унікальний шлях
    const outputFilePath = path.join(avatarsDir, `${Date.now()}.webp`);

    // Перекодовуємо файл у WebP за допомогою sharp
    const buffer = Buffer.from(await file.arrayBuffer());
    await sharp(buffer)
      .resize(200, 200, { // Змінюємо розмір до 300x300 px
        fit: 'cover', // Обрізаємо по центру
      })
      .webp({ quality: 80 })
      .toFile(outputFilePath);

    // Повертаємо URL до WebP файлу
    const avatarUrl = `/avatars/${path.basename(outputFilePath)}`;

    // Перевірка, чи є вже аватар для користувача в базі даних
    const existingAvatar = await prisma.avatar.findFirst({
      where: { userId: parseInt(CurrentUserId) }, // Замінили findUnique на findFirst для пошуку за userId
    });

    if (existingAvatar) {
      // Видаляємо старий файл аватара
      const oldAvatarPath = path.join(process.cwd(), 'public', existingAvatar.avatarUrl);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    
      // Оновлюємо URL в базі даних
      await prisma.avatar.update({
        where: { id: existingAvatar.id },
        data: { avatarUrl },
      });
    } else {
      // Якщо аватара немає, створюємо новий запис
      await prisma.avatar.create({
        data: {
          userId: parseInt(CurrentUserId),
          avatarUrl,
        },
      });
    }

    return NextResponse.json({ avatarUrl });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
