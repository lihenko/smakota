import { NextRequest, NextResponse } from 'next/server';
import  prisma from '../../lib/prisma';
import bcrypt from "bcryptjs";
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
    const { currentPassword, newPassword } = await req.json();

    if (!CurrentUserId || !currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: parseInt(CurrentUserId) } });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: parseInt(CurrentUserId) },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
