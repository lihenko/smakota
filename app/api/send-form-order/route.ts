import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  const {
    firstName,
    lastName,
    phone,
    city,
    npBranch,
    notes,
    payment,
  } = data;

  const paymentText = payment === "card" ? "За реквізитами" : "Післяплата";

  const html = `
    <h2>Нове замовлення</h2>
    <p><strong>Ім'я:</strong> ${firstName}</p>
    <p><strong>Призвище:</strong> ${lastName}</p>
    <p><strong>Телефон:</strong> ${phone}</p>
    <p><strong>Місто:</strong> ${city}</p>
    <p><strong>Відділення Нової пошти:</strong> ${npBranch}</p>
    <p><strong>Оплата:</strong> ${paymentText}</p>
    <p><strong>Примітки:</strong> ${notes || '-'}</p>
  `;

  try {
    await resend.emails.send({
      from: "Смакота <info@smakota.club>",
      to: "info@smakota.club",
      subject: "Нове замовлення з сайту",
      html,
    });

    return NextResponse.json({ message: "Замовлення надіслано!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Помилка надсилання" }, { status: 500 });
  }
}