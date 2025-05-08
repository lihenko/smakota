import { cookies } from 'next/headers';
import * as jose from 'jose';




export async function getUserId(): Promise<string | null>  {
    const cookie = (await cookies()).get('Authorization');
    if (!cookie) {
      return null; 
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET,);
    const jwt = cookie.value;
  
 
    const { payload} = await jose.jwtVerify(jwt, secret, {});
    const CurrentUserId = payload.sub || null;


  return CurrentUserId;
}