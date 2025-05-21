import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function POST(req: Request) {
  const cookie = (await cookies()).get('Authorization');
  if (!cookie) return NextResponse.json({ error: 'Missing JWT token' }, { status: 401 });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;
  let userId: number;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret);
    const sub = payload.sub;

    if (typeof sub === 'string' && !isNaN(parseInt(sub))) {
      userId = parseInt(sub);
    } else if (typeof sub === 'number') {
      userId = sub;
    } else {
      return NextResponse.json({ error: 'Invalid sub in JWT' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JWT token' }, { status: 401 });
  }

  const { text, rating, recipeId, parentId } = await req.json();

  if (!text || !recipeId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const isReply = !!parentId;

  const comment = await prisma.comment.create({
    data: {
      text,
      rating: isReply ? null : rating,
      recipeId,
      userId,
      parentId: parentId ?? null,
      moderated: false,
    },
  });

  return NextResponse.json(comment);
}
