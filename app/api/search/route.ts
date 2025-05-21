import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rawSearch = searchParams.get('q')?.toLowerCase()

  if (!rawSearch || rawSearch.trim() === '') {
    return NextResponse.json({ recipes: [] })
  }

  const words = rawSearch
    .split(/\s+/)
    .filter(Boolean)

  const orConditions = words.flatMap((word) => [
    {
      title: {
        contains: word,
        mode: 'insensitive' as 'insensitive',
      },
    },
    {
      ingredients: {
        some: {
          ingredient: {
            name: {
              contains: word,
              mode: 'insensitive' as 'insensitive',
            },
            moderated: true,
          },
        },
      },
    },
    {
      instructions: {
        some: {
          step: {
            contains: word,
            mode: 'insensitive' as 'insensitive',
          },
        },
      },
    },
  ])

  const recipes = await prisma.recipe.findMany({
  where: {
    OR: orConditions,
    moderated: true,
    privaterecipe: false,
  },
  include: {
    user: true,  // додай це
    ingredients: {
      include: { ingredient: true, unit: true },
    },
    instructions: true,
    dishType: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
  take: 20,
})


  return NextResponse.json({ recipes })
}
