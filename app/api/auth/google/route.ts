import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { nanoid } from "nanoid";
import { OAuth2Client } from "google-auth-library";
import * as jose from "jose";
import bcrypt from "bcryptjs";

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

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || "Google User",
          password: await bcrypt.hash(nanoid(), 10),
          balance: 0,
          slug: nanoid(10),
        },
      });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const token = await new jose.SignJWT({ role: user.role })
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(user.id.toString())
      .sign(secret);

    const response = NextResponse.json({ success: true });

    response.cookies.set("Authorization", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
    });

    return response;
  } catch (err) {
    console.error("Google auth error:", err);
    return NextResponse.json({ error: "Google auth failed" }, { status: 500 });
  }
}
