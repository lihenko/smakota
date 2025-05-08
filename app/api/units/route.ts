// /app/api/units/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const units = await prisma.unit.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
        moderated: true,
      },
      take: 5,
    });

    return NextResponse.json({ units });
  } catch (error) {
    console.error('Error fetching units:', error);
    return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 });
  }
}
