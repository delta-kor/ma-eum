import { cookies } from 'next/headers';
import 'server-only';

export default class Secure {
  private static cookieName = 'maeum_secure';
  private static key = process.env.CMS_SECURE_KEY;

  public static authorize(): never | void {
    const isAuthorized = Secure.isAuthorized();
    if (!isAuthorized) throw new Error('Unauthorized');
  }

  public static isAuthorized(): boolean {
    const cookie = cookies().get(Secure.cookieName);
    if (!cookie) return false;
    return cookie.value === Secure.key;
  }

  public static set(key: string): boolean {
    if (key !== Secure.key) return false;
    cookies().set(Secure.cookieName, key);
    return true;
  }
}
