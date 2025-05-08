// /app/api/ingredients/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query');
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const ingredients = await prisma.ingredient.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive', // нечутливий до регістру
          
        },
        moderated: true,
      },
      take: 5, // Повертаємо тільки перші 5 результатів
    });
    
    return NextResponse.json({ ingredients });
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return NextResponse.json({ error: 'Failed to fetch ingredients' }, { status: 500 });
  }
}
