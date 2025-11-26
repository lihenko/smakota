import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rawSearch = searchParams.get('q')?.toLowerCase()

  if (!rawSearch || rawSearch.trim() === '') {
    return NextResponse.json({ recipes: [] })
  }

  const phrase = rawSearch.trim()                    // "семиденська капуста"
  const words = phrase.split(/\s+/).filter(Boolean)  // ["семиденська", "капуста"]

  // ---- 1. Пошук ПОВНОЇ ФРАЗИ ----
  const phraseResults = await prisma.recipe.findMany({
    where: {
      moderated: true,
      privaterecipe: false,
      OR: [
        { title: { contains: phrase, mode: 'insensitive' } },
        {
          ingredients: {
            some: {
              ingredient: {
                name: { contains: phrase, mode: 'insensitive' },
                moderated: true,
              },
            },
          },
        },
        {
          instructions: {
            some: {
              step: { contains: phrase, mode: 'insensitive' },
            },
          },
        },
      ],
    },
    include: {
      user: true,
      ingredients: { include: { ingredient: true, unit: true } },
      instructions: true,
      dishType: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  // ---- 2. Пошук ПО ОКРЕМИХ СЛОВАХ ----
  const orConditions = words.flatMap((word) => [
    {
      title: { contains: word, mode: 'insensitive' as const },
    },
    {
      ingredients: {
        some: {
          ingredient: {
            name: { contains: word, mode: 'insensitive' as const },
            moderated: true,
          },
        },
      },
    },
    {
      instructions: {
        some: {
          step: { contains: word, mode: 'insensitive' as const },
        },
      },
    },
  ])

  const wordResults = await prisma.recipe.findMany({
    where: {
      moderated: true,
      privaterecipe: false,
      OR: orConditions,
    },
    include: {
      user: true,
      ingredients: { include: { ingredient: true, unit: true } },
      instructions: true,
      dishType: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  // ---- 3. Об’єднати без дублікатів ----
  const map = new Map()

  phraseResults.forEach((r) => map.set(r.id, r))
  wordResults.forEach((r) => {
    if (!map.has(r.id)) map.set(r.id, r)
  })

  const recipes = Array.from(map.values())

  return NextResponse.json({ recipes })
}
