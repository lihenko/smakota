import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cityRef = searchParams.get('cityRef');
  const apiKey = process.env.NOVA_POSHTA_API_KEY;
  const url = "https://api.novaposhta.ua/v2.0/json/";

  if (!cityRef) {
    return NextResponse.json([]);
  }

  const body = {
    apiKey,
    modelName: "Address",
    calledMethod: "getWarehouses",
    methodProperties: {
      CityRef: cityRef
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  // Повертаємо масив відділень (Ref, Description)
  return NextResponse.json(
    Array.isArray(data.data)
      ? data.data.map((branch: any) => ({
          Ref: branch.Ref,
          Description: branch.Description
        }))
      : []
  );
}