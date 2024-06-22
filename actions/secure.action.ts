'use server';

import Secure from '@/utils/secure.util';
import 'server-only';

export async function setSecureKey(key: string): Promise<boolean> {
  return Secure.set(key);
}
