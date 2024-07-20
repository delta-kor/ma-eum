import Secure from '@/utils/secure.util';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');
  const type = req.nextUrl.searchParams.get('type');

  if (!key || !Secure.isAuthorizedWithKey(key))
    return Response.json({ message: 'Unauthorized', ok: false }, { status: 401 });

  switch (type) {
    case 'feed':
      revalidateTag('feed');
      revalidatePath('/', 'page');
      revalidatePath('/discover', 'page');
      break;
    case 'talk':
      revalidateTag('talk');
      revalidatePath('/talk', 'page');
      revalidatePath('/talk/article/[articleId]', 'page');
      break;
    case 'video':
      revalidateTag('video');
      revalidateTag('category');
      revalidateTag('album');
      revalidateTag('music');
      revalidatePath('/(main)/(header)/(details)/videos', 'layout');
      revalidatePath('/video/[videoId]', 'page');
      break;
    case 'schedule':
      revalidateTag('schedule');
      revalidatePath('/', 'page');
      revalidatePath('/schedules', 'page');
      break;
    default:
      return Response.json({ message: 'Invalid type', ok: false }, { status: 400 });
  }
}
