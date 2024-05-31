import { ImageUrl } from '@/utils/url.util';
import { Album } from '@prisma/client';

interface Props {
  album: Album;
}

export default function AlbumCardLarge({ album }: Props) {
  const [gradientFrom, gradientTo] = album.colors;

  return (
    <div
      style={{ background: `linear-gradient(101deg, ${gradientFrom} 7.15%, ${gradientTo} 96.7%)` }}
      className="flex flex-col items-center gap-12 rounded-16 p-16"
    >
      <img
        alt={album.title}
        src={ImageUrl.album(album.id)}
        className="size-[176px] rounded-8 border-3 border-white/40"
      />
      <div className="flex flex-col items-center gap-6">
        <div className="text-24 font-700 text-white">{album.title}</div>
        <div className="text-20 font-500 text-white opacity-70">{album.description}</div>
      </div>
    </div>
  );
}
