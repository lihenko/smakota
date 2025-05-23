// /app/api/auth/register/route.ts
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Всі поля обов'язкові" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Користувач з таким Email вже існує" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення slug на основі email
    const baseSlug = email.split("@")[0].replace(/\./g, "-");

    // Гарантуємо унікальність slug (у разі, якщо є два користувачі з однаковим "before @")
    let slug = baseSlug;
    let count = 1;
    while (await prisma.user.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role || "user",
        balance: 0,
        slug,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Щось пішло не так" }, { status: 500 });
  }
}
