// app/api/resolve-tiktok/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL не передано' }, { status: 400 });
  }

  try {
    const response = await fetch(url, { redirect: 'follow' });
    return NextResponse.json({ finalUrl: response.url });
  } catch {
    return NextResponse.json({ error: 'Не вдалося розпізнати посилання TikTok' }, { status: 500 });
  }
}
