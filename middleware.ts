// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('Authorization')?.value;

  if (!jwt) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(jwt, secret);

    // Обмеження доступу до /adminpanel/ тільки для role === 'admin'
    if (request.nextUrl.pathname.startsWith('/adminpanel')) {
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }

    return NextResponse.next();

  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Застосування middleware до відповідних маршрутів
export const config = {
  matcher: ['/dashboard/:path*', '/adminpanel/:path*'],
};
