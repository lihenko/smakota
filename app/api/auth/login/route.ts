// /app/api/auth/login/route.ts

import prisma from "../../../lib/prisma"; // Це залежить від вашої структури
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import * as jose from 'jose'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Знайти користувача в базі за email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Невірний email або пароль" }, { status: 400 });
    }

    // Перевірка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Невірний email або пароль" }, { status: 400 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET,);
    const alg = 'HS256';
      
      const jwt = await new jose.SignJWT({ role: user.role })
        .setProtectedHeader({ alg })
        .setExpirationTime('72h')
        .setSubject(user.id.toString())
        .sign(secret);
    return Response.json({token: jwt});
    
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Йой, щось пішло не так" }, { status: 500 });
  }
}
