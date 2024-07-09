'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import 'server-only';

export async function revalidate(path: string): Promise<void> {
  return revalidatePath(path, 'page');
}

export async function revalidateTalkLogin(): Promise<void> {
  revalidatePath('/talk/write', 'page');
}

export async function revalidateTalkArticleWrite(): Promise<void> {
  revalidateTag('talk.getArticlesMetadata');
  revalidatePath('/talk/write', 'page');
}

export async function revalidateTalkArticleEdit(articleId: string): Promise<void> {
  revalidateTag('talk.getArticle');
  revalidateTag('talk.getArticlesMetadata');
  revalidateTag('talk.getTrendingArticlesMetadata');
  revalidatePath(`/talk/article/${articleId}`, 'page');
}

export async function revalidateTalkArticleDelete(articleId: string): Promise<void> {
  revalidateTag('talk.getArticle');
  revalidateTag('talk.getArticlesMetadata');
  revalidateTag('talk.getTrendingArticlesMetadata');
  revalidatePath(`/talk/article/${articleId}`, 'page');
}

export async function revalidateTalkArticleHeart(articleId: string): Promise<void> {
  revalidateTag('talk.getArticle');
  revalidateTag('talk.getArticlesMetadata');
  revalidateTag('talk.getTrendingArticlesMetadata');
  revalidatePath(`/talk/article/${articleId}`, 'page');
}

export async function revalidateTalkCommentCreate(articleId: string): Promise<void> {
  revalidateTag('talk.getArticle');
  revalidateTag('talk.getArticlesMetadata');
  revalidateTag('talk.getArticleComments');
  revalidatePath(`/talk/article/${articleId}`, 'page');
}

export async function revalidateTalkCommentDelete(articleId: string): Promise<void> {
  revalidateTag('talk.getArticle');
  revalidateTag('talk.getArticlesMetadata');
  revalidateTag('talk.getArticleComments');
  revalidatePath(`/talk/article/${articleId}`, 'page');
}
