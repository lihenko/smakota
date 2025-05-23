import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import fs from 'fs';
import path from 'path';
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
    ю: 'yu', я: 'ya',
    // ' ': '-' // видалено, бо заміна пробілів робиться нижче через regex
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

// Винесена функція збереження зображення
async function saveImage(file: Blob): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const metadata = await sharp(buffer).metadata();

  if (!metadata.width || !metadata.height || metadata.width < 600 || metadata.height < 400) {
    throw new Error('Image must be at least 600x400 pixels');
  }

  const recipesDir = path.join(process.cwd(), 'public', 'recipes');
  if (!fs.existsSync(recipesDir)) fs.mkdirSync(recipesDir, { recursive: true });

  const fileName = `${Date.now()}.webp`;
  const outputFilePath = path.join(recipesDir, fileName);

  await sharp(buffer)
    .resize(600, 400, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(outputFilePath);

  return `/recipes/${fileName}`;
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

    const ingredientsRaw = JSON.parse(formData.get('ingredients') as string) as IngredientInput[];
    // нормалізація назв інгредієнтів і одиниць у нижній регістр
    const ingredients = ingredientsRaw.map(ing => ({
      ...ing,
      name: ing.name.toLowerCase(),
      unit: ing.unit?.toLowerCase(),
    }));

    const instructions = JSON.parse(formData.get('instructions') as string) as string[];
    const videoUrl = formData.get('videoUrl') as string | null;
    const tiktokUrl = formData.get('tiktokUrl') as string | null;
    const dishType = formData.get('dishType') as string;
    const file = formData.get('image');
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
      if (!file || typeof file !== 'object' || !('arrayBuffer' in file)) {
        return NextResponse.json({ error: "Зображення обов'язкове для публічних рецептів" }, { status: 400 });
      }
      if (!['image/jpeg', 'image/png'].includes((file as any).type)) {
        return NextResponse.json({ error: 'Image must be JPG or PNG' }, { status: 400 });
      }
      try {
        imageUrl = await saveImage(file as Blob);
      } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 400 });
      }
    } else if (file && typeof file === 'object' && 'arrayBuffer' in file) {
      if (!['image/jpeg', 'image/png'].includes((file as any).type)) {
        return NextResponse.json({ error: 'Image must be JPG or PNG' }, { status: 400 });
      }
      try {
        imageUrl = await saveImage(file as Blob);
      } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 400 });
      }
    }

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
