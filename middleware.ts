// app/middleware.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const cookie = (await cookies()).get('Authorization');

  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret);

    // Обмеження доступу до /adminpanel/ тільки для role === 'admin'
    if (request.nextUrl.pathname.startsWith('/adminpanel')) {

      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url)); // створіть цю сторінку для повідомлення про брак доступу
      }
    }

    // Інакше — дозвіл на доступ
    return NextResponse.next();

  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Застосування middleware до відповідних маршрутів
export const config = {
  matcher: ['/dashboard/:path*', '/adminpanel/:path*'],
};
