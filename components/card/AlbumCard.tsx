import { ImageUrl } from '@/utils/url';
import { Album } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
  album: Album;
  menu?: boolean;
}

export default function AlbumCard({ album, menu }: Props) {
  const [gradientFrom, gradientTo] = album.colors;

  return (
    <div
      style={{ background: `linear-gradient(101deg, ${gradientFrom} 7.15%, ${gradientTo} 96.7%)` }}
      className="flex flex-col gap-12 rounded-16 p-16"
    >
      <div className="flex items-center gap-12">
        <img
          alt={album.title}
          src={ImageUrl.album(album.id)}
          className="size-[74px] rounded-8 border-3 border-white/40"
        />
        <div className="flex flex-col gap-4">
          <div className="text-24 font-700 text-white">{album.title}</div>
          <div className="text-16 font-500 text-white opacity-70">
            {format(album.release, 'yy. MM. dd.')}
          </div>
        </div>
      </div>
      {menu && (
        <div className="relative flex h-32 items-stretch">
          <div className="flex grow cursor-pointer items-center justify-center text-center text-18 font-600 text-white">
            프로모션
          </div>
          <div className="flex grow cursor-pointer items-center justify-center text-center text-18 font-600 text-white">
            퍼포먼스
          </div>
          <div className="absolute left-1/2 h-full w-2 -translate-x-1/2 bg-white opacity-30" />
        </div>
      )}
    </div>
  );
}
