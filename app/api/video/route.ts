import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const revalidate = 0;

async function getVideoUrl(id: string): Promise<string> {
  const url = `https://vx2.api.izflix.net/deliver/${id}?q=1440`;
  const response = await fetch(url, {
    redirect: 'manual',
  });

  const location = response.headers.get('location');
  if (!location) throw new Error('Failed to fetch video');

  return location;
}

const getCachedVideoUrl = unstable_cache((id: string) => getVideoUrl(id), ['deliver.getVideoUrl'], {
  revalidate: 3600,
  tags: ['deliver'],
});

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return Response.json({ message: 'ID is required', ok: false }, { status: 400 });

  let location: string;

  try {
    location = await getCachedVideoUrl(id);
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'Failed to fetch video', ok: false }, { status: 500 });
  }

  redirect(location);
}
