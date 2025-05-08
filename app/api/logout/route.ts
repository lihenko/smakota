import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(new URL('/', process.env.ROOT_URL));

  // Видаляємо cookie
  response.cookies.set('Authorization', '', {
    path: '/',
    expires: new Date(0),
  });

  const channel = new BroadcastChannel('auth');
  channel.postMessage('auth-changed');
  channel.close();

  return response;
}
