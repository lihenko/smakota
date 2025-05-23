import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import { put } from '@vercel/blob';
import sharp from 'sharp';

// Тип для інгредієнтів
type IngredientInput = {
  name: string;
  unit?: string;
  amount?: string;
  toTaste?: boolean;
};

// Функція для транслітерації українських символів у латиницю
function transliterate(text: string): string {
  const map: { [key: string]: string } = {
    а: 'a', б: 'b', в: 'v', г: 'h', д: 'd', е: 'e', є: 'ye', ж: 'zh', з: 'z', и: 'y',
    і: 'i', ї: 'yi', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
    ю: 'yu', я: 'ya', ' ': '-',
  };
  return text.toLowerCase().split('').map(char => map[char] || char).join('');
}

// Функція для генерації унікального slug
async function generateSlug(title: string): Promise<string> {
  const slug = transliterate(title)
    .replace(/['’]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  let counter = 1;
  let uniqueSlug = slug;

  while (await prisma.recipe.findUnique({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slug}-${counter++}`;
  }

  return uniqueSlug;
}

// Функція завантаження картинки у Vercel Blob з конвертацією у webp та ресайзом
async function uploadImageToVercelBlob(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  // Конвертуємо у webp та ресайзимо
  const webpBuffer = await sharp(Buffer.from(arrayBuffer))
    .resize(600, 400, { fit: 'cover' })
    .webp({ quality: 80 })
    .toBuffer();

  // Перетворюємо Node.js Buffer у Uint8Array, потім у Blob
  const uint8Array = new Uint8Array(webpBuffer);
  const webpBlob = new Blob([uint8Array], { type: 'image/webp' });

  const fileName = `recipes/img${Date.now()}.webp`;

  const blob = await put(fileName, webpBlob, {
    access: 'public',
  });

  return blob.url;
}


export async function POST(request: Request) {
  const cookie = (await cookies()).get('Authorization');
  if (!cookie) return NextResponse.json({ error: 'Missing JWT token' }, { status: 401 });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;
  let userId: number;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret);
    const sub = payload.sub;

    if (typeof sub === 'string' && !isNaN(parseInt(sub))) {
      userId = parseInt(sub);
    } else if (typeof sub === 'number') {
      userId = sub;
    } else {
      return NextResponse.json({ error: 'Invalid sub in JWT' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JWT token' }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const ingredients = JSON.parse(formData.get('ingredients') as string) as IngredientInput[];
    const instructions = JSON.parse(formData.get('instructions') as string) as string[];
    const videoUrl = formData.get('videoUrl') as string | null;
    const tiktokUrl = formData.get('tiktokUrl') as string | null;
    const dishType = formData.get('dishType') as string;
    const file = formData.get('image') as File | null;
    const privaterecipe = formData.get('privateRecipe') === 'true';

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json({ error: 'Ingredients are required' }, { status: 400 });
    }

    const slug = await generateSlug(title);

    const dishTypeRecord = await prisma.dishType.findUnique({
      where: { name: dishType },
    });

    if (!dishTypeRecord) {
      return NextResponse.json({ error: 'Dish type not found' }, { status: 400 });
    }

    let imageUrl: string | null = null;

    if (!privaterecipe) {
      if (file == null) {
        return NextResponse.json({ error: "Зображення обов'язкове для публічних рецептів" }, { status: 400 });
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        return NextResponse.json({ error: 'Image must be JPG or PNG' }, { status: 400 });
      }

      // Завантаження картинки через Vercel Blob
      imageUrl = await uploadImageToVercelBlob(file);
    } else if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        return NextResponse.json({ error: 'Image must be JPG or PNG' }, { status: 400 });
      }

      // Завантаження картинки через Vercel Blob
      imageUrl = await uploadImageToVercelBlob(file);
    }

    // Обробка одиниць виміру
    const unitPromises = ingredients.map(async (ingredient: IngredientInput) => {
      if (ingredient && ingredient.unit) {
        const unitName = ingredient.unit.toLowerCase();

        const unit = await prisma.unit.upsert({
          where: { name: unitName },
          update: {},
          create: { name: unitName },
        });

        return { id: unit.id };
      }
      return null;
    });

    const units = await Promise.all(unitPromises);

    // Створення рецепта
    const recipe = await prisma.recipe.create({
      data: {
        title,
        slug,
        videoUrl,
        tiktokUrl,
        userId,
        imageUrl,
        privaterecipe,
        dishTypeId: dishTypeRecord.id,
        ingredients: {
          create: ingredients.map((ingredient: IngredientInput, index: number) => ({
            ingredient: {
              connectOrCreate: {
                where: { name: ingredient.name },
                create: { name: ingredient.name },
              },
            },
            amount: ingredient?.toTaste
              ? null
              : ingredient?.amount
                ? parseFloat(ingredient.amount)
                : null,
            toTaste: ingredient?.toTaste ?? false,
            order: index,
            ...(ingredient && !ingredient.toTaste && units[index]
              ? {
                  unit: {
                    connect: { id: units[index]!.id },
                  },
                }
              : {}),
          })),
        },
        instructions: {
          create: instructions.map((step: string, index: number) => ({
            step,
            stepNumber: index + 1,
          })),
        },
      },
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (err) {
    console.error('Error while creating recipe:', err);
    return NextResponse.json({ message: 'Failed to create recipe' }, { status: 500 });
  }
}
