import { AlbumService } from '@/services/album.service';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function AlbumLayout({ children }: Props) {
  return <>{children}</>;
}

export async function generateStaticParams() {
  if (process.env.GENERATE_STATIC_PAGES !== '1') return [];

  const albums = await AlbumService.getAll();
  return albums.map(album => ({ albumId: album.id }));
}
