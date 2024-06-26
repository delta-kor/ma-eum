'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import 'server-only';

export async function revalidate(path: string): Promise<void> {
  return revalidatePath(path, 'page');
}

export async function revalidateTalkLogin(): Promise<void> {
  revalidatePath('/talk/write', 'page');
}

export async function revalidateTalkWrite(): Promise<void> {
  revalidatePath('/talk', 'page');
}

export async function revalidateTalkHeart(articleId: string): Promise<void> {
  revalidateTag('talk');
  revalidatePath(`/talk/article/${articleId}`, 'page');
  revalidatePath('/talk', 'page');
}
