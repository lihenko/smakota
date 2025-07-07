import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";
import * as jose from "jose";

async function getUserIdFromCookie(): Promise<number | null> {
  const cookie = (await cookies()).get('Authorization');
  if (!cookie) return null;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const { payload } = await jose.jwtVerify(cookie.value, secret);
    const userId = Number(payload.sub);
    if (!userId || isNaN(userId)) return null;
    return userId;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { recipeId } = await req.json();
  if (!recipeId) {
    return NextResponse.json({ error: "Missing recipeId" }, { status: 400 });
  }

  await prisma.favoriteRecipe.create({
    data: {
      userId,
      recipeId,
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { recipeId } = await req.json();
  if (!recipeId) {
    return NextResponse.json({ error: "Missing recipeId" }, { status: 400 });
  }

  await prisma.favoriteRecipe.deleteMany({
    where: {
      userId,
      recipeId,
    },
  });

  return NextResponse.json({ success: true });
}