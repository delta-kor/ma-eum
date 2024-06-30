import Secure from '@/utils/secure.util';
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (!Secure.isAuthorized())
    return Response.json({ message: 'Unauthorized', ok: false }, { status: 401 });

  const tag = req.nextUrl.searchParams.get('tag');
  if (!tag) return Response.json({ message: 'Tag is required', ok: false }, { status: 400 });

  revalidateTag(tag);
  console.log(`> [Cache] Purge request sent for tag: ${tag}`);

  return Response.json({ message: 'Purge request sent', ok: true, tag });
}
