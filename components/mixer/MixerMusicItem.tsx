import LazyImage from '@/components/core/LazyImage';
import { ImageUrl } from '@/utils/url.util';
import { Music } from '@prisma/client';

interface Props {
  music: Music;
}

export default async function MixerMusicItem({ music }: Props) {
  return (
    <div className="flex items-center gap-16 rounded-16 bg-black/30 p-12">
      <LazyImage
        src={ImageUrl.album(music.albumId!)}
        className="size-64 shrink-0 rounded-8 bg-black-real/30"
      />
      <div className="line-clamp-2 text-18 font-500 text-white">{music.title}</div>
    </div>
  );
}
