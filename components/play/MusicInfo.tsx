import { MusicWithPlayData } from '@/services/music.service';
import { Album } from '@prisma/client';
import { ReactNode } from 'react';

interface Props {
  album: Album;
  music: MusicWithPlayData;
  children: ReactNode;
}

export default function MusicInfo({ album, music, children }: Props) {
  return (
    <div className="flex items-center gap-16">
      {/*<LazyImage*/}
      {/*  alt={music.title}*/}
      {/*  src={ImageUrl.album(album.id)}*/}
      {/*  className="size-72 rounded-8 border-3 border-white/40"*/}
      {/*/>*/}
      {children}
      <div className="flex flex-col gap-4">
        <div className="text-20 font-600 text-white">{music.title}</div>
        <div className="text-18 font-500 text-white/70">{album.title}</div>
      </div>
    </div>
  );
}
