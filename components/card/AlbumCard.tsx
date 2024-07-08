import LazyImage from '@/components/core/LazyImage';
import { formatTimeAsDate } from '@/utils/time.util';
import { ImageUrl } from '@/utils/url.util';
import { Album } from '@prisma/client';
import Link from 'next/link';

interface Props {
  album: Album;
  menu?: boolean;
}

export default function AlbumCard({ album, menu }: Props) {
  const [gradientFrom, gradientTo] = album.colors;

  return (
    <div
      style={{ background: `linear-gradient(101deg, ${gradientFrom} 7.15%, ${gradientTo} 96.7%)` }}
      className="flex flex-col gap-12 rounded-16 p-12"
    >
      <Link href={`/videos/albums/${album.id}/performance`} className="flex items-center gap-12">
        <LazyImage
          alt={album.title}
          src={ImageUrl.album(album.id)}
          className="size-64 rounded-8 border-3 border-white/40 bg-white/40"
        />
        <div className="flex flex-col gap-4">
          <div className="text-20 font-700 text-white">{album.title}</div>
          <div className="text-16 font-500 text-white/70">{formatTimeAsDate(album.release)}</div>
        </div>
      </Link>
    </div>
  );
}
