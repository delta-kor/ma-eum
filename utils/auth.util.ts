import prisma from '@/prisma/prisma';
import { TalkUser } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import 'server-only';

export default class Auth {
  private static cookieName = 'maeum_secure';
  private static readonly key = process.env.AUTH_SECURE_KEY as string;

  public static createToken(user: TalkUser): string {
    const userId = user.id;
    const token = jwt.sign({ userId }, Auth.key);
    return token;
  }

  public static getTokenCookie(): null | string {
    const cookie = cookies().get(Auth.cookieName);
    return cookie?.value || null;
  }

  public static setTokenCookie(token: string): void {
    cookies().set(Auth.cookieName, token, {
      httpOnly: true,
      maxAge: 315360000,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  public static async verifyToken(token: string): Promise<TalkUser | null> {
    const decoded = jwt.verify(token, Auth.key) as { userId?: string };
    const userId = decoded.userId;
    if (!userId) return null;

    const user = await prisma.talkUser.findUnique({
      where: {
        id: userId,
      },
    });
    return user || null;
  }
}
