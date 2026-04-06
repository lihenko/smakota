import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect(new URL("/", "http://localhost:9000"));

  res.cookies.set("Authorization", "", {
    path: "/",
    expires: new Date(0),
  });

  return res;
}