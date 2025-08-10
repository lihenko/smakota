import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  // Отримати всі рецепти
  const recipes = await prisma.recipe.findMany({
    where: { moderated: true, privaterecipe: false },
    select: { slug: true },
  });

  // Додайте інші сторінки за потреби
  const urls = [
    { loc: 'https://www.smakota.club/' },
    { loc: 'https://www.smakota.club/about' },
    ...recipes.map(r => ({
      loc: `https://www.smakota.club/recipe/${r.slug}`,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${u.loc}</loc></url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}