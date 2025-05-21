// /app/api/auth/login/route.ts

import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import * as jose from 'jose';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Невірний email або пароль" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Невірний email або пароль" }, { status: 400 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = 'HS256';

    const jwt = await new jose.SignJWT({ role: user.role })
      .setProtectedHeader({ alg })
      .setExpirationTime('72h')
      .setSubject(user.id.toString())
      .sign(secret);

    const response = NextResponse.json({ message: "Успішний вхід" });

    response.cookies.set('Authorization', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // обов’язково для продакшну
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 3, // 3 дні
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Йой, щось пішло не так" }, { status: 500 });
  }
}
