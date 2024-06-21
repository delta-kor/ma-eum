import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path');
  if (!path) return Response.json({ message: 'Path is required', ok: false }, { status: 400 });

  revalidatePath(path, 'page');
  console.log(`> [Cache] Purge request sent for path: ${path}`);

  return Response.json({ message: 'Purge request sent', ok: true, path });
}
