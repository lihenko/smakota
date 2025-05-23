import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import prisma from '../../lib/prisma';
import { put } from '@vercel/blob';

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: Request) {
  const cookie = (await cookies()).get('Authorization');
  if (!cookie) return NextResponse.json({ error: 'No token' }, { status: 401 });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  let userId: number;
  try {
    const { payload } = await jose.jwtVerify(cookie.value, secret);
    userId = Number(payload.sub);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('avatar') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const webpBuffer = await sharp(buffer)
    .resize(200, 200, { fit: 'cover' })
    .webp({ quality: 80 })
    .toBuffer();

  // Конвертуємо Node Buffer у Uint8Array для File constructor
  const uint8Array = new Uint8Array(webpBuffer);
  const blobFile = new File([uint8Array], `${Date.now()}.webp`, { type: 'image/webp' });

  const uploaded = await put(`avatars/${blobFile.name}`, blobFile, { access: 'public' });

  const avatarUrl = uploaded.url;

  const existing = await prisma.avatar.findFirst({ where: { userId } });
  if (existing) {
    await prisma.avatar.update({ where: { id: existing.id }, data: { avatarUrl } });
  } else {
    await prisma.avatar.create({ data: { userId, avatarUrl } });
  }

  return NextResponse.json({ avatarUrl });
}
