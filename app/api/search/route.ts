import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import {
  normalizeText,
  splitWords,
  extractPhrases,
  getVariants,
} from '@/app/lib/searchSynonyms'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rawQuery = searchParams.get('q')

  if (!rawQuery || rawQuery.trim() === '') {
    return NextResponse.json({ recipes: [] })
  }

  const phrase = normalizeText(rawQuery)

  // 🔥 1. знайти фрази
  const detectedPhrases = extractPhrases(phrase)

  // 🔥 2. прибрати їх з тексту
  let cleaned = phrase
  for (const p of detectedPhrases) {
    cleaned = cleaned.replace(p, '')
  }

  // 🔥 3. отримати слова
  const words = splitWords(cleaned)

  // 🔥 4. фінальні токени (слова + фрази)
  const tokens = [...words, ...detectedPhrases]

  // 🔥 5. AND між токенами + OR між синонімами
  const andConditions = tokens.map((token) => {
    const variants = getVariants(token)

    return {
      OR: variants.map((v) => ({
        OR: [
          {
            title: { contains: v, mode: 'insensitive' as const },
          },
          {
            ingredients: {
              some: {
                ingredient: {
                  name: { contains: v, mode: 'insensitive' as const },
                  moderated: true,
                },
              },
            },
          },
          {
            instructions: {
              some: {
                step: { contains: v, mode: 'insensitive' as const },
              },
            },
          },
        ],
      })),
    }
  })

  const recipes = await prisma.recipe.findMany({
    where: {
      moderated: true,
      privaterecipe: false,
      AND: andConditions,
    },
    include: {
      user: true,
      ingredients: { include: { ingredient: true, unit: true } },
      instructions: true,
      dishType: true,
    },
    take: 50,
  })

  // 🔥 6. SCORING
  const scored = recipes.map((recipe) => {
    let score = 0
    const title = recipe.title.toLowerCase()

    // ⭐ повна фраза
    if (title.includes(phrase)) score += 100

    for (const token of tokens) {
      const variants = getVariants(token)

      for (const v of variants) {
        if (title.includes(v)) score += 20

        if (
          recipe.ingredients.some((i) =>
            i.ingredient.name.toLowerCase().includes(v)
          )
        ) {
          score += 15
        }

        if (
          recipe.instructions.some((step) =>
            step.step.toLowerCase().includes(v)
          )
        ) {
          score += 5
        }
      }
    }

    // ⭐ рейтинг
    if (recipe.averageRating) {
      score += recipe.averageRating * 2
    }

    // ⭐ коментарі
    if (recipe.commentCount) {
      score += Math.min(recipe.commentCount, 20)
    }

    return { ...recipe, score }
  })

  // 🔥 7. сортування
  const sorted = scored.sort((a, b) => b.score - a.score)

  return NextResponse.json({ recipes: sorted })
}