import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get('tag');
  if (!tag) return Response.json({ message: 'Tag is required', ok: false }, { status: 400 });

  revalidateTag(tag);
  console.log(`> [Cache] Purge request sent for tag: ${tag}`);

  return Response.json({ message: 'Purge request sent', ok: true, tag });
}
