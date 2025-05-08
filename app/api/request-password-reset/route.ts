import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from "../../lib/prisma";
import { randomUUID } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const token = randomUUID(); // можна замінити на jwt, якщо хочеш

  const tokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 год

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: tokenExpiry,
    },
  });

  const resetLink = `${process.env.ROOT_URL}/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "obbdpu@gmail.com",
      subject: 'Відновлення паролю',
      html: `
        <p>Натисніть на кнопку нижче, щоб скинути пароль:</p>
        <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#6366f1;color:#fff;border-radius:6px;text-decoration:none;">Скинути пароль</a>
        <p>Або відкрийте посилання вручну:</p>
        <p>${resetLink}</p>
      `,
    });

    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
