import { AlbumService } from '@/services/album.service';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function AlbumLayout({ children }: Props) {
  return <>{children}</>;
}

export async function generateStaticParams() {
  const albums = await AlbumService.getAll();
  return albums.map(album => ({ albumId: album.id }));
}
