import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function getCityName(cityRef: string) {
  try {
    const res = await fetch(
      "https://api.novaposhta.ua/v2.0/json/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: process.env.NOVA_POSHTA_API_KEY,
          modelName: "Address",
          calledMethod: "getCities",
          methodProperties: { Ref: cityRef },
        }),
      }
    );

    const data = await res.json();
    return data?.data?.[0]?.Description || cityRef;
  } catch {
    return cityRef;
  }
}

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
    productName,
    productPrice,
    quantity,
    totalPrice,
    pageUrl,
  } = data;

  const paymentText = payment === "card" ? "За реквізитами" : "Післяплата";
  const cityName = await getCityName(city);

  const html = `
    <h2>Нове замовлення</h2>
    <p><strong>Товар:</strong> ${productName}</p>
    <p><strong>Ціна за 1 шт:</strong> ${productPrice} грн</p>
    <p><strong>Кількість:</strong> ${quantity}</p>
    <p><strong>Сума:</strong> ${totalPrice} грн</p>
    <hr/>
    <p><strong>Ім'я:</strong> ${firstName}</p>
    <p><strong>Призвище:</strong> ${lastName}</p>
    <p><strong>Телефон:</strong> ${phone}</p>
    <p><strong>Місто:</strong> ${cityName}</p>
    <p><strong>Відділення Нової пошти:</strong> ${npBranch}</p>
    <p><strong>Оплата:</strong> ${paymentText}</p>
    <p><strong>Примітки:</strong> ${notes || '-'}</p>
    <p><strong>Сторінка замовлення:</strong> <a href="https://smakota.club${pageUrl}">https://smakota.club${pageUrl}</a></p>
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
