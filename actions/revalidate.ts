'use server';

import { revalidatePath } from 'next/cache';

export async function revalidate(path: string): Promise<void> {
  return revalidatePath(path, 'page');
}
