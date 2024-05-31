'use server';

import { revalidatePath } from 'next/cache';
import 'server-only';

export async function revalidate(path: string): Promise<void> {
  return revalidatePath(path, 'page');
}
