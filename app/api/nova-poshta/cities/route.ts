import { NextResponse } from "next/server";
import { getCities } from "@/app/lib/nova-poshta";

export async function GET() {
  const cities = await getCities();
  return NextResponse.json(cities);
}
