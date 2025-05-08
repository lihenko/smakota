import { NextRequest, NextResponse } from 'next/server';
import  prisma from '../../lib/prisma'; // або шлях до твого Prisma екземпляру
import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function PUT(req: NextRequest) {

  const cookie = (await cookies()).get('Authorization');
    if (!cookie) {
      return NextResponse.json({ error: 'Missing JWT token' }, { status: 401 }); 
    }
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;
  
    let CurrentUserId: string;
  
    try {
      const { payload } = await jose.jwtVerify(jwt, secret, {});
      CurrentUserId = payload.sub as string;
    } catch (error) {
      console.error('Failed to verify JWT:', error);
      return NextResponse.json({ error: 'Invalid JWT token' }, { status: 401 });
    }

  try {
    const { newName } = await req.json();

    if (!CurrentUserId || !newName.trim()) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(CurrentUserId) },
      data: { name: newName.trim() },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating name:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
