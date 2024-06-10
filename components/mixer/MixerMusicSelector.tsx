'use client';

import Icon from '@/components/core/Icon';
import LazyImage from '@/components/core/LazyImage';
import StageVideoList from '@/components/video/StageVideoList';
import { getTime } from '@/utils/time.util';
import { ImageUrl } from '@/utils/url.util';
import { Music } from '@prisma/client';
import { useState } from 'react';

interface Props {
  musics: Music[];
}

export default function MixerMusicSelector({ musics }: Props) {
  const [selectedMusic, setSelectedMusic] = useState<Music>(musics[0]);

  function handleMove(direction: number) {
    const currentIndex = musics.findIndex(music => music.id === selectedMusic.id);
    const nextIndex = (currentIndex + direction + musics.length) % musics.length;
    setSelectedMusic(musics[nextIndex]);
  }

  return (
    <div className="flex flex-col gap-32">
      <div className="-mx-24 flex items-center justify-evenly self-stretch">
        <div onClick={() => handleMove(-1)} className="-m-16 cursor-pointer p-16">
          <Icon type="left" className="w-20 text-gray-200" />
        </div>
        <LazyImage
          src={ImageUrl.album(selectedMusic.albumId!)}
          className="size-[240px] select-none rounded-16 bg-gray-100"
        />
        <div onClick={() => handleMove(1)} className="-m-16 cursor-pointer p-16">
          <Icon type="right" className="w-20 text-gray-200" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="select-none text-20 font-600 text-black lg:text-24">
          {selectedMusic.title}
        </div>
        <div className="select-none text-16 font-400 text-gray-500 lg:text-18">
          {getTime(selectedMusic.duration!)}
        </div>
      </div>
      <StageVideoList music={selectedMusic} />
    </div>
  );
}
