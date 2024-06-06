import { ImageUrl } from '@/utils/url.util';
import { Album } from '@prisma/client';

interface Props {
  album: Album;
  horizontal?: boolean;
}

export default function AlbumCardLarge({ album, horizontal }: Props) {
  const [gradientFrom, gradientTo] = album.colors;

  return (
    <div
      data-horizontal={!!horizontal}
      style={{ background: `linear-gradient(101deg, ${gradientFrom} 7.15%, ${gradientTo} 96.7%)` }}
      className="group flex flex-col items-center gap-12 rounded-16 p-16 data-[horizontal=true]:flex-row lg:sticky lg:top-artistic-header-height-lg"
    >
      <img
        alt={album.title}
        src={ImageUrl.album(album.id)}
        className="size-[176px] rounded-8 border-3 border-white/40 group-data-[horizontal=true]:size-[78px]"
      />
      <div className="flex flex-col items-center gap-6 group-data-[horizontal=true]:items-stretch">
        <div className="text-24 font-700 text-white group-data-[horizontal=true]:text-20">
          {album.title}
        </div>
        <div className="text-20 font-500 text-white opacity-70 group-data-[horizontal=true]:text-16">
          {album.description}
        </div>
      </div>
    </div>
  );
}
