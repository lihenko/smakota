import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json({ error: "No credential" }, { status: 400 });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload?.email;
    const name = payload?.name;

    if (!email) {
      return NextResponse.json({ error: "No email from Google" }, { status: 400 });
    }

    // Знайти або створити користувача
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || "Google User",
          password: nanoid(), // випадковий пароль, бо не потрібен
          balance: 0,
          slug: nanoid(10),
        },
      });
    }

    // Генерація JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Встановлюємо cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("Authorization", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ⚠️ локально можна false
      sameSite: "lax", // ⚡ щоб fetch і редірект працював
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch (err) {
    console.error("Google auth error:", err);
    return NextResponse.json({ error: "Google auth failed" }, { status: 500 });
  }
}