import Secure from '@/utils/secure.util';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (!Secure.isAuthorized())
    return Response.json({ message: 'Unauthorized', ok: false }, { status: 401 });

  const path = req.nextUrl.searchParams.get('path');
  if (!path) return Response.json({ message: 'Path is required', ok: false }, { status: 400 });

  const type = req.nextUrl.searchParams.get('type') === 'layout' ? 'layout' : 'page';

  revalidatePath(path, type);
  console.log(`> [Cache] Purge request sent for path: ${path}`);

  return Response.json({ message: 'Purge request sent', ok: true, path });
}
