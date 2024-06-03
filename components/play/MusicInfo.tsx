import LazyImage from '@/components/core/LazyImage';
import { MusicWithPlayData } from '@/services/music.service';
import { ImageUrl } from '@/utils/url.util';
import { Album } from '@prisma/client';

interface Props {
  album: Album;
  music: MusicWithPlayData;
}

export default function MusicInfo({ album, music }: Props) {
  return (
    <div className="flex items-center gap-16">
      <LazyImage
        alt={music.title}
        src={ImageUrl.album(album.id)}
        className="size-72 rounded-8 border-3 border-white/40"
      />
      <div className="flex flex-col gap-4">
        <div className="text-20 font-600 text-white">{music.title}</div>
        <div className="text-18 font-500 text-white/70">{album.title}</div>
      </div>
    </div>
  );
}
